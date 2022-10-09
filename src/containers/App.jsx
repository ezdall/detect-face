import React from 'react';

import Particles from 'react-particles-js';
//
import Navigation from '../components/navigation/navigation.comp';
import Logo from '../components/logo/logo.comp';
import ImageLink from '../components/image-link/image-link.comp';
import FaceDetect from '../components/face-detect.comp';

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
  //
  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOpts} />
        <Navigation />
        <Logo />
        <ImageLink />
        {/* <FaceDetect /> */}
      </div>
    );
  }
}
export default App;
