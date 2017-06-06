import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import VisualizerPage from './VisualizerPage';
import SpotifyUser from './common/SpotifyUser';

class App extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={VisualizerPage} />
        <Route path='/user/:accessToken/:refreshToken' component={SpotifyUser} />
        <Route path='/error/:errorMessage' />
      </Switch>
    );
  }
}

export default App;
