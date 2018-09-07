import * as React from "react";
import { Container } from "reactstrap";
import { Video } from "../../model/Video";

class Watcher extends React.Component<{ match: any, video: Video }, { }> {
  constructor(props: any) {
    super(props)

    console.log(props)
  }

  render() {
    return (
      <Container>
        <p>sdadasdadadadadas</p>
      </Container>
    )
  }

}

export default Watcher