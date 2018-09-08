import * as React from "react";
import { Container, Navbar, NavbarBrand, Jumbotron, Button, Input, Progress } from "reactstrap";
import { Route } from "react-router-dom";

import { ServicesFactory, InstanceLifeCicle } from "./services/ServicesFactory";
import { VideoService } from "./services/VideoService";
import { Video } from "./model/Video";
import Watcher from "./components/watcher/Watcher";
import Videos from "./components/videos/Videos";

class App extends React.Component<{}, { loadingVideos: boolean | undefined, uploading: boolean, uploadingText: string, videos: Video[] }> {
  private servicesFactory: ServicesFactory = new ServicesFactory()
  private fileInput: HTMLInputElement | null

  constructor(props: any) {
    super(props);
    this.servicesFactory.Register(VideoService, InstanceLifeCicle.Singleton)

    this.state = {
      videos: [],
      loadingVideos: false,
      uploadingText: "Envie seu vídeo",
      uploading: false
    }

    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleOnClickUpload = this.handleOnClickUpload.bind(this)
  }

  public async handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      let vds = this.servicesFactory.Instance(VideoService)
      let data = new FormData()
      data.append('file', event.target.files[0])
      let video = await vds.upload(data, (progress: any) => this.setState({uploadingText : `Enviando... ${progress}% ${progress == 100 ? " - Aguardando AWS" : ""}`, uploading: true}))
      if (video && video.status !== "error") {
        this.setState({
          videos: [
            video,
            ...this.state.videos
          ],
          uploadingText: "Envie seu vídeo",
          uploading: false
        }, () => {
          let statusPolling = setInterval(() => {
              vds.getVideoUrl(video.id).then(response => {
                if (response && (response.status === "finished" || response.status === "error" || response.status === "failed" || response.status === "cancelled")) {
                  clearInterval(statusPolling)
                  let currStateVideos = this.state.videos
                  currStateVideos = currStateVideos.filter(a => a.id != response.id)
                  currStateVideos.unshift(response)
                  this.setState({ videos: currStateVideos })
                }
              })
            }, 1000)
        })
      } else {
        alert(video.message)
      }
    }
  }

  public handleOnClickUpload() {
    if (this.fileInput)
      this.fileInput.click()
  }

  async componentDidMount() {
    try {
      this.setState({ loadingVideos: true })
      let vds = this.servicesFactory.Instance(VideoService)
      let videos = await vds.getVideos()
      this.setState({ videos: videos, loadingVideos: false })
    } catch (e) {
      this.setState({ loadingVideos: undefined })
    }
  }

  public render() {
    return (
      <div>
        <Navbar color="light" light={true} expand="md">
          <Container>
            <NavbarBrand href="/">samba-video-node</NavbarBrand>
          </Container>
        </Navbar>
        <Route exact={true} path="/" render={() =>
          <Container className="animated fadeIn">
            <Jumbotron className="mt-4">
              <h1>Bem vindo ao Samba-Video-Node</h1>
              <p>Faça o upload de seus videos em qualquer formato para enviar para seus amigos!</p>
              <Button color="primary" onClick={this.handleOnClickUpload} disabled={this.state.uploading}>{this.state.uploadingText}</Button>
              <Input type="file" name="file" id="file" innerRef={(ref) => this.fileInput = ref} onChange={this.handleFileChange} className="collapse" />
            </Jumbotron>
            <h5 className="mt-4">Lista de vídeos enviados</h5>
            <hr />
            {this.state.loadingVideos && <Progress animated={true} color="info" value="100" />}
            {this.state.loadingVideos === undefined && <p>Ocorreu um erro não esperado ao carregar os vídeos</p>}
            {this.state.videos.length > 0 && <Videos videos={this.state.videos} />}
          </Container>
        } />
        <Route exact={true} path="/watch/:id" render={(props) => <Watcher {...props} vds={this.servicesFactory.Instance(VideoService)} ></Watcher>} />
      </div>
    );
  }
}

export default App;
