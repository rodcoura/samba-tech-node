import * as React from "react";
import { Container, Navbar, NavbarBrand, Jumbotron, Button, Input, Progress } from "reactstrap";
import { Route } from "react-router-dom";

import Watcher from "./components/watcher/Watcher";
import Videos from "./components/videos/Videos";

import { ServicesFactory, InstanceLifeCicle } from "./services/ServicesFactory";
import { VideoService } from "./services/VideoService";
import { AppComponentState } from "./interfaces/AppComponent";
import { VIDEO_STATUS_ERROR, VIDEO_STATUS_MEANS_DONE } from "./consts/VideoStatus";

class App extends React.Component<{}, AppComponentState> {
  private servicesFactory: ServicesFactory = new ServicesFactory()
  private fileInput: HTMLInputElement | null

  constructor(props: any) {
    super(props)
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
      const vds = this.servicesFactory.Instance(VideoService)
      const data = new FormData()
      data.append('file', event.target.files[0])

      const video = await vds.upload(data, (progress: any) => { 
        this.setState({ 
          uploadingText: `Enviando... ${progress}% ${progress == 100 ? " - Aguardando Processamento do Upload" : ""}`, 
          uploading: true 
        })
      })
      
      if (video && video.status !== VIDEO_STATUS_ERROR) {
        this.setState({
          videos: [video, ...this.state.videos],
          uploadingText: "Envie seu vídeo",
          uploading: false
        }, () => {
          let statusPolling = setInterval(() => {
            vds.getVideoUrl(video.id).then(response => {
              if (response && VIDEO_STATUS_MEANS_DONE.indexOf(response.status) >= 0) {
                clearInterval(statusPolling)
                const currStateVideos = this.state.videos.filter(a => a.id != response.id)
                this.setState({ videos: currStateVideos })
                currStateVideos.unshift(response)
                this.setState({ videos: currStateVideos })
              }
            })
          }, 1000)
        })
      } else
        alert(video.message)
    }
  }

  public handleOnClickUpload() {
    if (this.fileInput)
      this.fileInput.click()
  }

  async componentDidMount() {
    try {
      this.setState({ loadingVideos: true })
      const vds = this.servicesFactory.Instance(VideoService)
      const videos = await vds.getVideos()
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
        <Route exact={true} path="/watch/:id" render={(props) => <Watcher {...props} vds={this.servicesFactory.Instance(VideoService)} />} />
      </div>
    )
  }
}

export default App
