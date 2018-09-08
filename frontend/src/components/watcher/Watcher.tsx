import * as React from "react";
import { Container, Progress } from "reactstrap";
import { WatcherComponentProps, WatcherComponentState } from "../../interfaces/WatcherComponent";

class Watcher extends React.Component<WatcherComponentProps, WatcherComponentState> {
  constructor(props: any) {
    super(props)

    this.state = {
      video: undefined,
      loadingVideo: false,
      exists: true
    }
  }

  async componentDidMount() {
    const { vds, match } = this.props

    try {
      this.setState({ loadingVideo: true })
      let video = await vds.getVideoUrl(match.params.id)
      if (!video.error)
        this.setState({ video: video, loadingVideo: false, exists: true })
      else
        this.setState({ exists: false })
    } catch (e) {
      this.setState({ loadingVideo: false, exists: false })
    }
  }

  render() {
    if (this.state.exists)
      return (
        <Container className="mt-4">
          {this.state.loadingVideo && <Progress animated={true} color="info" value="100" />}
          {
            this.state.video &&
            <video width="100%" controls={true} autoPlay={true}>
              <source src={this.state.video.url} type="video/mp4" />
            </video>
          }
        </Container>
      )
    return (
      <Container className="mt-4">
        <p>O vídeo solicitado não existe!</p>
      </Container>
    )
  }
}

export default Watcher