import * as React from "react";
import { Button, Container, Jumbotron } from "reactstrap"
import { Link } from "react-router-dom";

class Home extends React.Component {
  public render() {
    return (
      <Container>
        <Jumbotron className="mt-4">
          <h1>Bem vindo ao Samba-Video-Node</h1>
          <p>Faça o upload de seus videos em qualquer formato para enviar para seus amigos!</p>
          <Link to="/uploader">
            <Button color="primary">Envie seu vídeo</Button>
          </Link>
        </Jumbotron>
        <h5 className="mt-4">Lista de vídeos enviados</h5>
        <hr />
      </Container>
    );
  }
}

export default Home;