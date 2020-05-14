import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Movies from './components/movies';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

ReactDOM.render(
  <Movies />,
  document.getElementById('root')
);
serviceWorker.unregister();
