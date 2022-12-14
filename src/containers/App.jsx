import React from 'react';

import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import axios from 'axios';

// comp
import Navigation from '../components/navigation/navigation.comp';
import SignIn from '../components/sign-in/sign-in.comp';
import Register from '../components/register/register.comp';
import Logo from '../components/logo/logo.comp';
import Rank from '../components/rank/rank.comp';
import ImageLink from '../components/image-link/image-link.comp';
import FaceDetect from '../components/face-detect/face-detect.comp';

// utils
import { axiosErrorHandler } from '../axios-error-handler';

// style
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

const calculateFaceLocation = outputs => {
  const boundingBox = outputs[0].data.regions[0].region_info.bounding_box;

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

// initial state
const inititalState = {
  input: '',
  imgUrl: '',
  box: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  route: 'signin',
  user: {
    id: '',
    name: '',
    email: '',
    entries: '',
    joined: ''
  }
};

//
export default class App extends React.Component {
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
      route: 'signin',
      user: {
        id: '',
        name: '',
        email: '',
        entries: '',
        joined: ''
      }
      // https://img.freepik.com/premium-photo/closeup-woman-face-contour-highlight-makeup-sample-professional-contouring-face-white-background_431835-2836.jpg
      // https://i.pinimg.com/originals/ac/e5/b6/ace5b63937f20c73ef9cf163568c82bc.jpg
      // https://i2-prod.mirror.co.uk/incoming/article5428573.ece/ALTERNATES/s615b/archetypal-female-_3249633c.jpg
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitLink = this.onSubmitLink.bind(this);
    this.onRouteChange = this.onRouteChange.bind(this);
    this.loadUser = this.loadUser.bind(this);
    this.onImageError = this.onImageError.bind(this);
    this.onImageLoad = this.onImageLoad.bind(this);
  }

  componentDidMount() {
    // check here for token

    const token = window.sessionStorage.getItem('t-jwt');

    if (token) {
      // login thru token
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/signin`,
          {}, // empty body. im using token to login
          {
            headers: {
              authorization: `Bearer ${token}`
            }
          }
        )
        .then(resp => {
          const { data, status } = resp;
          const { user } = data;

          if (status === 200) {
            this.loadUser(user);
            this.onRouteChange('home');
          }
        })
        .catch(axiosErrorHandler);
    }
  }

  onInputChange(ev) {
    const { value } = ev.target;

    this.setState({ input: value });
  }

  onSubmitLink(ev) {
    ev.preventDefault();

    const { input } = this.state;

    this.setState({
      imgUrl: input,
      // reset box
      box: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    });
  }

  onImageLoad() {
    const { input, user } = this.state;

    return clarifaiApp.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then(resp => {
        const { status, outputs } = resp;

        // code:10000, desc: 'ok'
        if (status.code === 10000) {
          axios
            .patch(`${process.env.REACT_APP_API_URL}/image`, {
              input,
              email: user.email
            })
            .then(resp2 => {
              const { entries } = resp2.data;

              // 2nd-level-obj is not auto-spread
              // in this.setState
              this.setState({
                user: {
                  ...user,
                  entries
                }
              });
            })
            .catch(console.log);
          this.setState({ box: calculateFaceLocation(outputs) });
        }
      })
      .catch(console.error);
  }

  onImageError() {
    this.setState({
      box: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    });
  }

  onRouteChange(route) {
    // reset
    if (route === 'signout') {
      // return, bcoz it changes route
      window.sessionStorage.removeItem('t-jwt');
      this.setState(inititalState);
    }
    this.setState({ route });
  }

  loadUser(data) {
    this.setState({
      user: {
        // eslint-disable-next-line
        id: data._id,
        name: data.name,
        email: data.email,
        entries: data.history.length,
        joined: data.createdAt
      }
    });
  }

  render() {
    const { input, imgUrl, box, route, user } = this.state;

    // console.log(user);

    return (
      <div className="App">
        <Particles className="particles" params={particleOpts} />
        <Navigation route={route} onRouteChange={this.onRouteChange} />
        {// eslint-disable-next-line
        route === 'home' ? (
          <>
            <Rank entries={user.entries} name={user.name} />
            <Logo />
            <ImageLink
              onInputChange={this.onInputChange}
              onSubmitLink={this.onSubmitLink}
              input={input}
            />
            <FaceDetect
              onImageLoad={this.onImageLoad}
              onImageError={this.onImageError}
              imgUrl={imgUrl}
              box={box}
            />
          </>
        ) : route === 'register' ? (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        ) : (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}
