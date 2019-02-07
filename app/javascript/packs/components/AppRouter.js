import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Medium from "./Medium";
import Fursuit from "./Fursuit";
import Maker from "./Maker";
import Event from "./Event";
import Fursuits from "./Fursuits";
import Announcements from "./PoliciesSupport/Announcements";
import Terms from "./PoliciesSupport/Terms";
import Faq from "./PoliciesSupport/Faq";
import CodeOfConduct from "./PoliciesSupport/CodeOfConduct";
import PrivacyPolicy from "./PoliciesSupport/PrivacyPolicy";
import Makers from "./Makers";
import Events from "./Events";
import LatestPictures from "./LatestPictures";
import TagPage from "./TagPage";
import Trending from "./Trending";
import Subscriptions from "./Subscriptions";
import User from "./User";
import AppLayoutRemake from "./AppLayoutRemake";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route
          render={({ location }) => (
            <React.Fragment>
              <AppLayoutRemake>
                <div style={{ paddingTop: 20 }} />
                <AppHeader />
                <Switch location={location}>
                  <Route exact path="/" component={LatestPictures} />
                  <Route
                    exact
                    path="/announcements"
                    component={Announcements}
                  />
                  <Route exact path="/terms_and_conditions" component={Terms} />
                  <Route exact path="/faq" component={Faq} />
                  <Route
                    exact
                    path="/privacy_policy"
                    component={PrivacyPolicy}
                  />
                  <Route
                    exact
                    path="/code_of_conduct"
                    component={CodeOfConduct}
                  />
                  <Route exact path="/fursuits" component={Fursuits} />
                  <Route exact path="/makers" component={Makers} />
                  <Route exact path="/events" component={Events} />
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
              </AppLayoutRemake>
            </React.Fragment>
          )}
        />
      </BrowserRouter>
    );
  }
}

export default AppRouter;
