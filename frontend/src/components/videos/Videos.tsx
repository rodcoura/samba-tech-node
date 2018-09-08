import * as React from "react";
import { Link } from "react-router-dom";
import { CardColumns, Card, CardBody, CardSubtitle, CardTitle, Badge } from "reactstrap";
import { VideoComponentProps } from "../../interfaces/VideoComponent";
import { VIDEO_STATUS_FINISHED, VIDEO_STATUS_PROCESSING, VIDEO_STATUS_ENCODING } from "../../consts/VideoStatus";

import './Videos.css'

class Videos extends React.Component<VideoComponentProps> {
  constructor(props: any) {
    super(props)
  }

  update() {
    this.forceUpdate()
  }

  stateColor(state: string): string {
    switch (state) {
      case VIDEO_STATUS_FINISHED:
        return "success"
      case VIDEO_STATUS_PROCESSING:
      case VIDEO_STATUS_ENCODING:
        return "info"
      default:
        return "error"
    }
  }

  render() {
    const { videos } = this.props

    return (
      <CardColumns>
        {
          videos.map(video =>
            <Card key={video.id}>
              <video width="100%" className="video-max-h">
                <source src={video.url} type="video/mp4" />
              </video>
              <CardBody>
                <CardTitle>
                  {video.status !== "finished" && <Badge color={this.stateColor(video.status)}>{video.status}</Badge>}
                </CardTitle>
                <CardSubtitle>
                  <Link to={`/watch/${video.id}`}>{video.id} - {video.name}</Link>
                </CardSubtitle>
              </CardBody>
            </Card>
          )
        }
      </CardColumns>
    )
  }
}

export default Videos