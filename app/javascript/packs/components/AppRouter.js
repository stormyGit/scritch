import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Medium from "./Medium";
import Fursuit from "./Fursuit";
import Maker from "./Maker";
import Event from "./Event";
import LatestPictures from "./LatestPictures";
import TagPage from "./TagPage";
import Trending from "./Trending";
import Subscriptions from "./Subscriptions";
import User from "./User";
import AppLayout from "./AppLayout";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route
          render={({ location }) => (
            <React.Fragment>
              <AppLayout>
                <div style={{ paddingTop: 10 }} />
                <AppHeader />
                <Switch location={location}>
                  <Route exact path="/" component={LatestPictures} />
                  <Route exact path="/databases" component={Trending} />
                  <Route exact path="/tag" component={TagPage} />
                  <Route
                    exact
                    path="/subscriptions"
                    component={Subscriptions}
                  />
                  <Route exact path="/pictures" component={LatestPictures} />
                  <Route exact path="/pictures/:id" component={Medium} />
                  <Route exact path="/fursuits/:id" component={Fursuit} />
                  <Route exact path="/makers/:id" component={Maker} />
                  <Route exact path="/events/:id" component={Event} />
                  <Route exact path="/:id" component={User} />
                  <Route exact path="/:id/:tab" component={User} />
                </Switch>
                <div style={{ paddingTop: 50 }} />
                <AppFooter />
              </AppLayout>
            </React.Fragment>
          )}
        />
      </BrowserRouter>
    );
  }
}

export default AppRouter;
