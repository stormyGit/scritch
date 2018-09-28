import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'

import Medium from './Medium';
import LatestVideos from './LatestVideos';
import Trending from './Trending';
import Subscriptions from './Subscriptions';
import User from './User';
import Settings from './Settings';

class AppRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path='/' component={LatestVideos} />
          <Route exact path='/trending' component={Trending} />
          <Route exact path='/subscriptions' component={Subscriptions} />
          <Route exact path='/settings' component={Settings} />
          <Route exact path='/videos' component={LatestVideos} />
          <Route exact path='/videos/:id' component={Medium} />
          <Route exact path='/:id' component={User} />
          <Route exact path='/:id/:tab' component={User} />
        </Switch>
      </HashRouter>
    );
  }
}

export default AppRouter;
