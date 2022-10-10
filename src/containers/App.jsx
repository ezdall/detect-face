import React from 'react';

import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
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

// clarifai
const clarifaiApp = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFAI_KEY
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      imgSrc:
        'https://img.freepik.com/premium-photo/closeup-woman-face-contour-highlight-makeup-sample-professional-contouring-face-white-background_431835-2836.jpg'
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
    ev.preventDefault();

    const { input, imgSrc } = this.state;

    console.log(ev.type);
    // this.setState({ imgLink: input });

    clarifaiApp.models
      .predict(
        // .predict('53e1df302c079b3db8a0a36033ed2d15', this.state.input)
        // 'a403429f2ddf4b49b307e318f00e528b',
        // Clarifai.FACE_DETECTION_MODEL, - multiple
        Clarifai.FACE_DETECT_MODEL,
        imgSrc
      )
      .then(resp => {
        console.log(resp);
      })
      .catch(console.error);
  }

  render() {
    const { input, imgSrc } = this.state;

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
        <FaceDetect imgSrc={imgSrc} />
      </div>
    );
  }
}
export default App;
