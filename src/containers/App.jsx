import React from 'react';

import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
//
import Navigation from '../components/navigation/navigation.comp';
import SignIn from '../components/sign-in/sign-in.comp';
import Logo from '../components/logo/logo.comp';
import ImageLink from '../components/image-link/image-link.comp';
import FaceDetect from '../components/face-detect/face-detect.comp';

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

const calculateFaceLocation = data => {
  const boundingBox = data.outputs[0].data.regions[0].region_info.bounding_box;

  const left = Number(boundingBox.left_col) * 100;
  const right = 100 - Number(boundingBox.right_col) * 100;
  const bottom = 100 - Number(boundingBox.bottom_row) * 100;
  const top = Number(boundingBox.top_row) * 100;

  return {
    top,
    bottom,
    left,
    right
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      imgUrl: '',
      box: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      route: 'signin'

      // https://img.freepik.com/premium-photo/closeup-woman-face-contour-highlight-makeup-sample-professional-contouring-face-white-background_431835-2836.jpg
      // https://i.pinimg.com/originals/ac/e5/b6/ace5b63937f20c73ef9cf163568c82bc.jpg
      // https://i2-prod.mirror.co.uk/incoming/article5428573.ece/ALTERNATES/s615b/archetypal-female-_3249633c.jpg
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitLink = this.onSubmitLink.bind(this);
    this.onRouteChange = this.onRouteChange.bind(this);
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

    const { input } = this.state;

    this.setState({ imgUrl: input });

    clarifaiApp.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then(resp => this.setState({ box: calculateFaceLocation(resp) }))
      .catch(console.error);
  }

  onRouteChange(route) {
    this.setState({ route });
  }

  render() {
    const { input, imgUrl, box, route } = this.state;

    console.log(route);
    return (
      <div className="App">
        <Particles className="particles" params={particleOpts} />
        <Navigation route={route} onRouteChange={this.onRouteChange} />

        {route === 'signin' ? (
          <SignIn onRouteChange={this.onRouteChange} />
        ) : (
          <>
            <Logo />
            <ImageLink
              onInputChange={this.onInputChange}
              onSubmitLink={this.onSubmitLink}
              input={input}
            />
            <FaceDetect imgUrl={imgUrl} box={box} />
          </>
        )}
      </div>
    );
  }
}
export default App;
