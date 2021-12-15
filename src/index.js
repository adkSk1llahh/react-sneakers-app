import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import "macro-css";
import {BrowserRouter as Router, Switch } from 'react-router-dom';


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

