import Koa = require('koa')
import Router = require('koa-router')
import Body = require('koa-body')
import AWS = require('aws-sdk')
import fs = require('fs')
import Zencoder = require('zencoder')
import cors = require('@koa/cors')

const VIDEO_STATUS_ENCODING = "encoding"
const VIDEO_STATUS_ERROR = "error"
const AWS_S3_ACL = "public-read"

const app = new Koa()
const PORT = process.env.SAMBA_NODE_PORT || 1337
const router = new Router()
const encoder = new Zencoder(process.env.ZENCODER_KEY)
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
})

app.use(Body({ multipart: true }))
app.use(cors())

router.post('/api/upload', Body(), async (ctx: Koa.Context) => {
  ctx.request.socket.setTimeout(10 * 60 * 1000)
  const files = ctx.request.files

  if (files) {
    try {
      const stream = fs.createReadStream(files.file.path)

      const result = await s3.putObject({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `uploads/${files.file.name}`,
        ContentType: files.file.type,
        Body: stream,
        ACL: AWS_S3_ACL
      }).promise()

      if (result) {
        const encResult = await encoder.Job.create({
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
            status: VIDEO_STATUS_ENCODING,
            url: `http://s3-${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET}/decoded/${files.file.name}.mp4`,
            name: files.file.name
          }
        }
      } else {
        ctx.body = {
          status: VIDEO_STATUS_ERROR,
          message: 'Não foi possivel enviar o video para file server!'
        }
      }
    } catch (e) {
      ctx.body = {
        status: VIDEO_STATUS_ERROR,
        message: 'Um erro ocorreu ao realizar o upload!',
        error: e
      }
    }
  } else {
    ctx.body = {
      status: VIDEO_STATUS_ERROR,
      message: 'É necessário enviar um arquivo!'
    }
  }
})

router.get('/api/videos', async (ctx: Koa.Context) => {
  try {
    const jobs = await encoder.Job.list()

    if (jobs)
      ctx.body = jobs.data.filter(item => item.job.output_media_files[0].label != null).map(item => {
        const { id, state, output_media_files } = item.job

        return {
          id: id,
          status: state,
          name: output_media_files[0].label,
          url: output_media_files[0].url
        }
      })
    else
      ctx.body = []
  } catch (e) {
    ctx.body = {
      status: VIDEO_STATUS_ERROR,
      error: e
    }
  }
})

router.get('/api/video/:id', async (ctx: Koa.Context) => {
  try {
    if (ctx.params && ctx.params.id) {
      const encResult = await encoder.Job.details(ctx.params.id)

      if (encResult) {
        const { id, state, output_media_files } = encResult.data.job

        ctx.body = {
          id: id,
          status: state,
          name: output_media_files[0].label,
          url: output_media_files[0].url
        }
      }
    }
  } catch (e) {
    ctx.body = {
      status: VIDEO_STATUS_ERROR,
      error: e
    }
  }
})

app.use(router.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;