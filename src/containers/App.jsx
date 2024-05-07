import React from 'react';

import Particles from 'react-particles-js';
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

/* eslint-disable camelcase, no-underscore-dangle  */

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

const calculateFaceLocation = data => {
  // const boundingBox = outputs[0].data.regions[0].region_info.bounding_box;
  // const left = Number(boundingBox.left_col) * 100;
  // const right = 100 - Number(boundingBox.right_col) * 100;
  // const bottom = 100 - Number(boundingBox.bottom_row) * 100;
  // const top = Number(boundingBox.top_row) * 100;

  const { regions } = data;

  const mapRegions = regions.map(r => {
    const {
      left_col,
      right_col,
      bottom_row,
      top_row
    } = r.region_info.bounding_box;

    return {
      id: r.id,
      top: +top_row * 100,
      bottom: 100 - +bottom_row * 100,
      left: +left_col * 100,
      right: 100 - +right_col * 100
    };
  });

  // return arr[{},{},{}]
  return mapRegions;
};

// initial state
const inititalState = {
  input: '',
  imgUrl: '',
  box: {},
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
      boxes: [],
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
      // reset box,
      boxes: [],
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

    // todo []  add space remover for input 'url', in <input>

    return axios
      .post(`${process.env.REACT_APP_API_URL}/image-url`, { input })
      .then(resp => {
        const { status, data } = resp.data;

        // code:10000, desc: 'ok'
        if (status.code === 10000) {
          // add to history
          axios
            .patch(`${process.env.REACT_APP_API_URL}/image`, {
              input,
              email: user.email
            })
            .then(resp2 => {
              const { entries } = resp2.data;

              // 2nd-level-obj is not auto-spread
              // in this.setState, do manual ...spread
              this.setState({
                user: {
                  ...user,
                  entries
                }
              });
            })
            .catch(error => console.log(error));

          this.setState({ boxes: calculateFaceLocation(data) });
        }
      })
      .catch(err => console.error(err));
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
      window?.sessionStorage?.removeItem('t-jwt');
      this.setState(inititalState);
    }
    this.setState({ route });
  }

  loadUser(data) {
    this.setState({
      user: {
        id: data._id,
        name: data.name,
        email: data.email,
        entries: data.history.length,
        joined: data.createdAt
      }
    });
  }

  render() {
    const { input, imgUrl, box, boxes, route, user } = this.state;

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
              boxes={boxes}
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
