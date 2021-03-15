import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import { Parkbook } from './Parkbook'

ReactDOM.render(
  <React.StrictMode>
    <Parkbook />
  </React.StrictMode>,
  document.getElementById('root')
);
