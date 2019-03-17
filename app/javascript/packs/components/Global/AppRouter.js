import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import withCurrentSession from "../withCurrentSession";

import Fursuit from "../Fursuits/Fursuit";
import Fursuits from "../Fursuits/Fursuits";

import Media from "../Media/Media";
import Medium from "../Media/Medium";

import User from "../Users/User";

import Maker from "../Makers/Maker";
import Makers from "../Makers/Makers";

import Event from "../Events/Event";
import Events from "../Events/Events";

import Announcements from "../PoliciesSupport/Announcements";
import Terms from "../PoliciesSupport/Terms";
import Faq from "../PoliciesSupport/Faq";
import CodeOfConduct from "../PoliciesSupport/CodeOfConduct";
import PrivacyPolicy from "../PoliciesSupport/PrivacyPolicy";

import TagPage from "../TagPage";
import LatestPictures from "../LatestPictures";
import AdsLister from "../AdsLister";
import Favorites from "../Favorites";
import Subscriptions from "../Subscriptions";
import SearchPage from "../SearchPage";

import AppLayoutRemake from "./AppLayoutRemake";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";
import MustLog from "./MustLog";

class AppRouter extends React.Component {
  render() {
    const { currentSession } = this.props;
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
                  <Route
                    exact
                    path="/fursuits"
                    component={currentSession ? Fursuits : MustLog}
                  />
                  <Route
                    exact
                    path="/makers"
                    component={currentSession ? Makers : MustLog}
                  />
                  <Route
                    exact
                    path="/events"
                    component={currentSession ? Events : MustLog}
                  />
                  <Route
                    exact
                    path="/tag"
                    component={currentSession ? TagPage : MustLog}
                  />
                  <Route
                    exact
                    path="/search"
                    component={currentSession ? SearchPage : MustLog}
                  />
                  <Route
                    exact
                    path="/subscriptions"
                    component={currentSession ? Subscriptions : MustLog}
                  />
                  <Route
                    exact
                    path="/favorites"
                    component={
                      currentSession && currentSession.user.sponsor
                        ? Favorites
                        : MustLog
                    }
                  />
                  <Route
                    exact
                    path="/pictures"
                    component={currentSession ? Media : MustLog}
                  />
                  <Route
                    exact
                    path="/ads"
                    component={currentSession ? AdsLister : MustLog}
                  />
                  <Route
                    exact
                    path="/pictures/:id"
                    component={currentSession ? Medium : MustLog}
                  />
                  <Route
                    exact
                    path="/fursuits/:id"
                    component={currentSession ? Fursuit : MustLog}
                  />
                  <Route
                    exact
                    path="/makers/:id"
                    component={currentSession ? Maker : MustLog}
                  />
                  <Route
                    exact
                    path="/events/:id"
                    component={currentSession ? Event : MustLog}
                  />
                  <Route
                    exact
                    path="/:id"
                    component={currentSession ? User : MustLog}
                  />
                  <Route
                    exact
                    path="/:id/:tab"
                    component={currentSession ? User : MustLog}
                  />
                </Switch>
                <div style={{ paddingTop: 20 }} />
                <AppFooter />
              </AppLayoutRemake>
            </React.Fragment>
          )}
        />
      </BrowserRouter>
    );
  }
}

export default withCurrentSession(AppRouter);
