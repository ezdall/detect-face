import React from 'react';

import Particles from 'react-particles-js';
//
import Navigation from '../components/navigation/navigation.comp';
import Logo from '../components/logo/logo.comp';
import ImageLink from '../components/image-link/image-link.comp';
// import FaceDetect from '../components/face-detect.comp';

// style
import 'tachyons';
import './App.css';

const particleOpts = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitLink = this.onSubmitLink.bind(this);
  }
  //
  // componentDidMount() {}

  onInputChange(ev) {
    const { value } = ev.target;

    // console.log(ev.type);
    this.setState({ input: value });
  }

  onSubmitLink(ev) {
    // const { input } = this.state;

    console.log(ev.type);
    // this.setState({ imgLink: input });
  }

  render() {
    const { input } = this.state;

    return (
      <div className="App">
        <Particles className="particles" params={particleOpts} />
        <Navigation />
        <Logo />
        <ImageLink
          onInputChange={this.onInputChange}
          onSubmitLink={this.onSubmitLink}
          input={input}
        />
        {/* <FaceDetect /> */}
      </div>
    );
  }
}
export default App;
