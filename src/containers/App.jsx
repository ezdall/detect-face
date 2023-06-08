import React from 'react';

//
import Navigation from '../components/navigation.comp';
import Logo from '../components/logo.comp';
import ImageLink from '../components/image-link.comp';
import FaceDetect from '../components/face-detect.comp';

// style
import './App.css';

class App extends React.Component {
  //
  componentDidMount() {}

  render() {
    // console.log(this.props);

    return (
      <div className="App">
        <Navigation />
        <Logo />
        <ImageLink />
        <FaceDetect />
      </div>
    );
  }
}
export default App;
