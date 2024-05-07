import React from 'react';
import ReactDOM from 'react-dom';

// style
// import './bootstrap.min.css';
import 'tachyons';
import './index.css';
// comp
import App from './containers/App';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>, 
	document.getElementById('root')
);
