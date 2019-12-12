import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import withCurrentSession from "../withCurrentSession";
import withWidth from "@material-ui/core/withWidth";

import FursuitRemake from "../Fursuits/FursuitRemake";
import Fursuits from "../Fursuits/Fursuits";

import MediaAll from "../Media/MediaAll";
import MediumRemake from "../Media/MediumRemake";

import UserRemake from "../Users/UserRemake";

import MakerRemake from "../Makers/MakerRemake";
import Makers from "../Makers/Makers";

import EventRemake from "../Events/EventRemake";
import Events from "../Events/Events";

import Unauthorized from "../Global/Unauthorized";
import ModerationLayout from "../Global/ModerationLayout";

import ModerationHome from "../Moderation/ModerationHome";
import ModerationClaims from "../Moderation/ModerationClaims";
import ModerationAssets from "../Moderation/ModerationAssets";
import ModerationAnalytics from "../Moderation/ModerationAnalytics";
import ModerationReports from "../Moderation/ModerationReports";
import ModerationRequests from "../Moderation/ModerationRequests";
import ModerationTickets from "../Moderation/ModerationTickets";
import ModerationSponsors from "../Moderation/ModerationSponsors";
import ModerationModerators from "../Moderation/ModerationModerators";
import ModerationAdverts from "../Moderation/ModerationAdverts";
import ModerationSuspendedUsers from "../Moderation/ModerationSuspendedUsers";
import ModerationAnnouncements from "../Moderation/ModerationAnnouncements";

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
            if (location.pathname.match(/^\/react_moderation/)) {
              if (currentSession.user.isModerator)
                return (
                  <React.Fragment>
                    <ModerationLayout>
                      {width === "xl" || width === "lg" ? (
                        <Padder />
                      ) : (
                        <MicroPadder />
                      )}
                      <Switch location={location}>
                        <Route
                          exact
                          path="/react_moderation"
                          component={ModerationHome}
                        />
                        <Route
                          exact
                          path="/react_moderation/analytics"
                          component={ModerationAnalytics}
                        />
                        <Route
                          exact
                          path="/react_moderation/assets"
                          component={ModerationAssets}
                        />
                        <Route
                          exact
                          path="/react_moderation/claims"
                          component={ModerationClaims}
                        />
                        <Route
                          exact
                          path="/react_moderation/requests"
                          component={ModerationRequests}
                        />
                        <Route
                          exact
                          path="/react_moderation/moderators"
                          component={ModerationModerators}
                        />
                        <Route
                          exact
                          path="/react_moderation/sponsors"
                          component={ModerationSponsors}
                        />
                        <Route
                          exact
                          path="/react_moderation/reports"
                          component={ModerationReports}
                        />
                        <Route
                          exact
                          path="/react_moderation/tickets"
                          component={ModerationTickets}
                        />
                        <Route
                          exact
                          path="/react_moderation/suspended_users"
                          component={ModerationSuspendedUsers}
                        />
                        <Route
                          exact
                          path="/react_moderation/adverts"
                          component={ModerationAdverts}
                        />
                        <Route
                          exact
                          path="/react_moderation/announcements"
                          component={ModerationAnnouncements}
                        />
                      </Switch>
                    </ModerationLayout>
                  </React.Fragment>
                );
              else
                return (
                  <React.Fragment>
                    <Switch location={location}>
                      <Route
                        exact
                        path="/react_moderation"
                        component={Unauthorized}
                      />
                    </Switch>
                  </React.Fragment>
                );
            }
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
                      component={MediumRemake}
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
                        currentSession && currentSession.user.suspendedUser
                          ? MustLog
                          : UserRemake
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
