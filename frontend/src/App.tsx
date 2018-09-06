import * as React from "react";
import { Container, Navbar, NavbarBrand } from "reactstrap";
import { Route } from "react-router-dom";

import Home from "./components/home/Home";
import Uploader from "./components/uploader/Uploader";

class App extends React.Component<{}, { isOpen: boolean }> {
  constructor(props: any) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  public render() {
    return (
      <div>
        <Navbar color="light" light={true} expand="md">
          <Container>
            <NavbarBrand href="/">samba-video-node</NavbarBrand>
          </Container>
        </Navbar>
        
        <Route exact path="/" component={Home} />
        <Route path="/uploader" component={Uploader} />
      </div>
    );
  }
}

export default App;
