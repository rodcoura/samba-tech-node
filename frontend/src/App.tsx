import * as React from "react";
import { Container, Navbar, NavbarBrand, Jumbotron, Button, Input, Progress } from "reactstrap";
import { Route } from "react-router-dom";

import { ServicesFactory, InstanceLifeCicle } from "./services/ServicesFactory";
import { VideoService } from "./services/VideoService";
import { Video } from "./model/Video";
import Watcher from "./components/watcher/Watcher";
import Videos from "./components/videos/Videos";

class App extends React.Component<{}, { loadingVideos: boolean, videos: Video[] }> {
  private servicesFactory: ServicesFactory = new ServicesFactory()
  private fileInput: HTMLInputElement | null

  constructor(props: any) {
    super(props);
    this.servicesFactory.Register(VideoService, InstanceLifeCicle.Singleton)

    this.state = {
      videos: [],
      loadingVideos: false
    }

    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleOnClickUpload = this.handleOnClickUpload.bind(this)
  }

  public handleFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    console.log(event.target.files)
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
              <Button color="primary" onClick={this.handleOnClickUpload}>Envie seu vídeo</Button>
              <Input type="file" name="file" id="file" innerRef={(ref) => this.fileInput = ref} onChange={this.handleFileChange} className="collapse" />
            </Jumbotron>
            <h5 className="mt-4">Lista de vídeos enviados</h5>
            <hr />
            { this.state.loadingVideos && <Progress animated={true} color="info" value="100" /> }
            <Videos videos={this.state.videos} />
          </Container>
        } />
        <Route exact={true} path="/watch/:id" component={Watcher} />
      </div>
    );
  }
}

export default App;
