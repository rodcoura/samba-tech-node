import * as React from "react";
import { CardColumns, Card, CardBody, CardTitle } from "reactstrap";
import { Video } from "../../model/Video";
import { Link } from "react-router-dom";

class Videos extends React.Component<{ videos: Video[] }> {
  constructor(props: any) {
    super(props)
  }

  render() {
    const { videos } = this.props

    return (
      <CardColumns>
        {
          videos.map(video =>
            <Card key={video.id}>
              <video width="100%">
                <source src={video.url} type="video/mp4" />
              </video>
              <CardBody>
                <CardTitle><Link to={`/watch/${video.id}`}>{video.id} - {video.name}</Link></CardTitle>
              </CardBody>
            </Card>
          )
        }
      </CardColumns>
    )
  }

}

export default Videos