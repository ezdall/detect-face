import React from 'react';
import ReactDOM from 'react-dom';

import ErrorBoundary from './components/error-boundary.comp';
// style
import 'tachyons';
import './index.css';
// comp
import App from './containers/App';

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('root')
);
