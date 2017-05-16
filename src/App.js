import React, { Component } from 'react';
import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import Visualizer from './Visualizer';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render () {
    return (
      <Visualizer />
    );
  }
}

export default App;
