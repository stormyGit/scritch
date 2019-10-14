import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import withCurrentSession from "../withCurrentSession";
import withWidth from "@material-ui/core/withWidth";

import FursuitRemake from "../Fursuits/FursuitRemake";
import Fursuits from "../Fursuits/Fursuits";

import MediaAll from "../Media/MediaAll";
import Medium from "../Media/Medium";
import MediumMobile from "../Media/MediumMobile";

import UserRemake from "../Users/UserRemake";

import MakerRemake from "../Makers/MakerRemake";
import Makers from "../Makers/Makers";

import EventRemake from "../Events/EventRemake";
import Events from "../Events/Events";

import Announcements from "../PoliciesSupport/Announcements";
import Terms from "../PoliciesSupport/Terms";
import UserGuide from "../PoliciesSupport/UserGuide";
import Faq from "../PoliciesSupport/Faq";
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

const Padder = () => <div style={{ padding: 16 }} />;
const MicroPadder = () => <div style={{ padding: 8 }} />;

class AppRouter extends React.Component {
  render() {
    const { currentSession, width } = this.props;

    return (
      <BrowserRouter>
        <Route
          render={({ location }) => {
            //const withoutAdds = location.pathname === "/pictures";

            return (
              <React.Fragment>
                <AppLayoutRemake>
                  <AppHeader />
                  {width === "xl" || width === "lg" ? (
                    <Padder />
                  ) : (
                    <MicroPadder />
                  )}
                  <Switch location={location}>
                    <Route exact path="/" component={LatestPictures} />
                    <Route
                      exact
                      path="/announcements"
                      component={Announcements}
                    />
                    <Route exact path="/terms_of_use" component={Terms} />
                    <Route exact path="/user_guide" component={UserGuide} />
                    <Route exact path="/faq" component={Faq} />
                    <Route
                      exact
                      path="/privacy_policy"
                      component={PrivacyPolicy}
                    />
                    <Route
                      exact
                      path="/fursuits"
                      component={
                        currentSession && currentSession.user.suspendedUser
                          ? MustLog
                          : Fursuits
                      }
                    />
                    <Route
                      exact
                      path="/makers"
                      component={
                        currentSession && currentSession.user.suspendedUser
                          ? MustLog
                          : Makers
                      }
                    />
                    <Route
                      exact
                      path="/events"
                      component={
                        currentSession && currentSession.user.suspendedUser
                          ? MustLog
                          : Events
                      }
                    />
                    <Route
                      exact
                      path="/tag"
                      component={
                        currentSession && !currentSession.user.suspendedUser
                          ? TagPage
                          : MustLog
                      }
                    />
                    <Route
                      exact
                      path="/search"
                      component={
                        currentSession && currentSession.user.suspendedUser
                          ? MustLog
                          : SearchPage
                      }
                    />
                    <Route
                      exact
                      path="/subscriptions"
                      component={
                        currentSession && !currentSession.user.suspendedUser
                          ? Subscriptions
                          : MustLog
                      }
                    />
                    <Route
                      exact
                      path="/favorites"
                      component={
                        currentSession && !currentSession.user.suspendedUser
                          ? Favorites
                          : MustLog
                      }
                    />
                    <Route
                      exact
                      path="/pictures"
                      component={
                        currentSession && currentSession.user.suspendedUser
                          ? MustLog
                          : MediaAll
                      }
                    />
                    <Route exact path="/ads" component={AdsLister} />
                    <Route
                      exact
                      path="/pictures/:id"
                      component={
                        currentSession && currentSession.user.suspendedUser
                          ? MustLog
                          : width === "xs" || width === "sm"
                          ? MediumMobile
                          : Medium
                      }
                    />
                    <Route
                      exact
                      path="/fursuits/:id"
                      component={
                        currentSession && currentSession.user.suspendedUser
                          ? MustLog
                          : FursuitRemake
                      }
                    />
                    <Route
                      exact
                      path="/makers/:id"
                      component={
                        currentSession && currentSession.user.suspendedUser
                          ? MustLog
                          : MakerRemake
                      }
                    />
                    <Route
                      exact
                      path="/events/:id"
                      component={
                        currentSession && currentSession.user.suspendedUser
                          ? MustLog
                          : EventRemake
                      }
                    />
                    <Route
                      exact
                      path="/:id"
                      component={
                        currentSession && !currentSession.user.suspendedUser
                          ? UserRemake
                          : MustLog
                      }
                    />
                    <Route
                      exact
                      path="/:id/:tab"
                      component={
                        currentSession && currentSession.user.suspendedUser
                          ? MustLog
                          : UserRemake
                      }
                    />
                  </Switch>
                  {false && <AppFooter />}
                </AppLayoutRemake>
              </React.Fragment>
            );
          }}
        />
      </BrowserRouter>
    );
  }
}

export default withCurrentSession(withWidth()(AppRouter));
