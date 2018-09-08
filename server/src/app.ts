import Koa = require('koa')
import Router = require('koa-router')
import Body = require('koa-body')
import AWS = require('aws-sdk')
import fs = require('fs')
import Zencoder = require('zencoder')
import cors = require('@koa/cors')

const app = new Koa();
const router = new Router();
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
})
const encoder = new Zencoder(process.env.ZENCODER_KEY) // se ZENCODER_API_KEY não precisa colocar
const PORT = 1337;

app.use(Body({ multipart: true }))
app.use(cors())
router.post('/api/upload', Body(), async (ctx: Koa.Context) => {
  ctx.request.socket.setTimeout(10 * 60 * 1000)
  let files = ctx.request.files

  if (files) {
    try {
      const stream = fs.createReadStream(files.file.path)

      const result = await s3.putObject({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `uploads/${files.file.name}`,
        ContentType: files.file.type,
        Body: stream,
        ACL: "public-read"
      }).promise()

      if (result) {
        let encResult = await encoder.Job.create({
          input: `s3://${process.env.AWS_S3_BUCKET}/uploads/${files.file.name}`,
          outputs: [
            {
              public: true,
              url: `http://s3-${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET}/decoded/${files.file.name}.mp4`,
              h264_profile: "high",
              label: files.file.name
            }
          ]
        })
        if (encResult && encResult.data) {
          ctx.body = {
            id: encResult.data.id,
            status: 'encoding',
            url: `http://s3-${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET}/decoded/${files.file.name}.mp4`,
            name: files.file.name
          }
        }
      } else {
        ctx.body = {
          status: 'error',
          message: 'Não foi possivel enviar o video para file server!'
        }
      }
    } catch (e) {
      ctx.body = {
        status: 'error',
        message: 'Um erro ocorreu ao realizar o upload!',
        error: e
      }
    }
  } else {
    ctx.body = {
      status: 'error',
      message: 'É necessário enviar um arquivo!'
    }
  }
})

// @TODO - Adicionar DB
router.get('/api/videos', async (ctx: Koa.Context) => {
  try {
    let jobs = await encoder.Job.list()

    if (jobs) {
      let videos = jobs.data.filter(item => item.job.output_media_files[0].label != null).map(item => {
        return {
          id: item.job.id,
          status: item.job.state,
          name: item.job.output_media_files[0].label,
          url: item.job.output_media_files[0].url
        }
      })

      ctx.body = videos
    } else
      ctx.body = []
  } catch (e) {
    ctx.body = {
      status: 'error',
      error: e
    }
  }
})

router.get('/api/video/:id', async (ctx: Koa.Context) => {
  try {
    if (ctx.params && ctx.params.id) {
      let encResult = await encoder.Job.details(ctx.params.id)
      console.log(encResult.data)
      if (encResult)
        ctx.body = {
          id: encResult.data.job.id,
          status: encResult.data.job.state,
          name: encResult.data.job.output_media_files[0].label,
          url: encResult.data.job.output_media_files[0].url
        }
    }
  } catch (e) {
    ctx.body = {
      error: e
    }
  }
})

app.use(router.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;