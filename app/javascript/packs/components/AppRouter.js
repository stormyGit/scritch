import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Medium from './Medium';
import Fursuit from './Fursuit';
import Maker from './Maker';
import LatestPictures from './LatestPictures';
import TagPage from './TagPage';
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
                <Route exact path='/' component={LatestPictures} />
                <Route exact path='/databases' component={Trending} />
                <Route exact path='/tag' component={TagPage} />
                <Route exact path='/subscriptions' component={Subscriptions} />
                <Route exact path='/pictures' component={LatestPictures} />
                <Route exact path='/pictures/:id' component={Medium} />
                <Route exact path='/fursuits/:id' component={Fursuit} />
                <Route exact path='/makers/:id' component={Maker} />
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
