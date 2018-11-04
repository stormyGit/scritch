import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Medium from './Medium';
import LatestVideos from './LatestVideos';
import Trending from './Trending';
import Subscriptions from './Subscriptions';
import User from './User';
import AppLayout from './AppLayout';

class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route
          render={({ location }) => (
            <AppLayout>
              <Switch location={location}>
                <Route exact path='/' component={LatestVideos} />
                <Route exact path='/trending' component={Trending} />
                <Route exact path='/subscriptions' component={Subscriptions} />
                <Route exact path='/videos' component={LatestVideos} />
                <Route exact path='/videos/:id' component={Medium} />
                <Route exact path='/:id' component={User} />
                <Route exact path='/:id/:tab' component={User} />
              </Switch>
            </AppLayout>
          )}
        />
      </BrowserRouter>
    );
  }
}

export default AppRouter;
