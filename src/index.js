import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import { Parkbook } from './components/Parkbook'
import "./index.css" 

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Parkbook />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
