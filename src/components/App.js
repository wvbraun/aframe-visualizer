import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import VisualizerPage from './VisualizerPage';

class App extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={VisualizerPage} />
      </Switch>
    );
  }
}

export default App;
