import React from 'react';

//
import Navigation from '../components/navigation/navigation.comp';
import Logo from '../components/logo/logo.comp';
import ImageLink from '../components/image-link/image-link.comp';
import FaceDetect from '../components/face-detect.comp';

// style
import 'tachyons';
import './App.css';

class App extends React.Component {
  //
  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <ImageLink />
        {/* <FaceDetect /> */}
      </div>
    );
  }
}
export default App;
