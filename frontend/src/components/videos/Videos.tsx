import * as React from "react";
import { CardColumns, Card, CardBody, CardSubtitle, CardTitle, Badge } from "reactstrap";
import { Video } from "../../model/Video";
import { Link } from "react-router-dom";

import './Videos.css'

class Videos extends React.Component<{ videos: Video[] }> {
  constructor(props: any) {
    super(props)
  }

  stateColor(state: string): string {
    switch(state) {
      case "finished": 
        return "success"
      case "processing":
      case "encoding":
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
                <CardSubtitle><Link to={`/watch/${video.id}`}>{video.id} - {video.name}</Link></CardSubtitle>
              </CardBody>
            </Card>
          )
        }
      </CardColumns>
    )
  }

}

export default Videos