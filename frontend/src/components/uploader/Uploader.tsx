import * as React from "react";
import { Button, Container, Form, FormGroup, Label, Input, Row, Col } from "reactstrap"

class Uploader extends React.Component<any, { file: any, name: string, status: string }> {
  form: any

  constructor(props: any) {
    super(props);
    this.state = { file: "", name: "", status: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.form = {
      name: null,
      file: null
    }
  }

  handleChange(event: any) {
  }

  handleSubmit(event: any) {
    event.preventDefault()
  }

  public render() {
    return (
      <Container>
        <h5 className="mt-4">Formulário de envio de video</h5>
        <hr />
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col>
              <FormGroup>
                <Label for="name">Nome</Label>
                <Input type="text" name="name" id="name" innerRef={(field) => this.form.name = field} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="file">Video</Label>
                <Input type="file" name="file" id="file" innerRef={(field) => this.form.file = field}/>
              </FormGroup>
            </Col>
          </Row>
          <Button color="primary" type="submit" >Enviar</Button>
        </Form>
      </Container>
    );
  }
}

export default Uploader;