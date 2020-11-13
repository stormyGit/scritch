import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
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
import {LandingPageMobile, LandingPageNormal} from "../LandingPage";
import AdsLister from "../AdsLister";
import Favorites from "../Favorites";
import Subscriptions from "../Subscriptions";
import SearchPage from "../SearchPage";

import AppLayout from "./AppLayout";
import AppHeader from "./AppHeader";
import MustLog from "./MustLog";
import MediaTagging from "../Media/MediaTagging";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {MicroPadder, Padder} from "../../util/padder";

function AppRouter(props) {
  const {currentSession, width} = props;
  const isSessionValid = currentSession && !currentSession.user.suspendedUser;
  const isLandscape = useMediaQuery('(orientation:landscape)');

  function LoadLandingPage() {
    if (isLandscape)
      return <LandingPageNormal/>;
    else
      return <LandingPageMobile/>;
  }

  function LoadAnnouncements() {
    return <Announcements/>;
  }

  function LoadSearchPage() {
    return isSessionValid ? <SearchPage/> : <MustLog/>;
  }

  function LoadTerms() {
    return <Terms/>;
  }

  function LoadUserGuide() {
    return <UserGuide/>;
  }

  function LoadFaq() {
    return <Faq/>;
  }

  function LoadPrivacyPolicy() {
    return <PrivacyPolicy/>;
  }

  function LoadFursuits() {
    return isSessionValid ? <Fursuits/> : <MustLog/>;
  }

  function LoadMakers() {
    return isSessionValid ? <Makers/> : <MustLog/>;
  }

  function LoadEvents() {
    return isSessionValid ? <Events/> : <MustLog/>;
  }

  function LoadTagPage() {
    return isSessionValid ? <MediaTagging/> : <MustLog/>;
  }

  function LoadSubscriptions() {
    return isSessionValid ? <Subscriptions/> : <MustLog/>;
  }

  function LoadMediaAll() {
    return isSessionValid ? <MediaAll/> : <MustLog/>;
  }

  function LoadFavorites() {
    return isSessionValid ? <Favorites/> : <MustLog/>;
  }

  function LoadAdsLister() {
    return <AdsLister/>;
  }

  function LoadMediumRemake() {
    return <MediumRemake/>;
  }

  function LoadFursuitRemake() {
    return isSessionValid ? <FursuitRemake/> : <MustLog/>;
  }

  function LoadMakerRemake() {
    return isSessionValid ? <MakerRemake/> : <MustLog/>;
  }

  function LoadEventRemake() {
    return isSessionValid ? <EventRemake/> : <MustLog/>;
  }

  function LoadUserRemake() {
    return isSessionValid ? <UserRemake/> : <MustLog/>;
  }

  return (
    <BrowserRouter>
      <Route
        render={({location}) => {
          if (location.pathname.match(/^\/react_moderation/)) {
            if (currentSession.user.isModerator)
              return (
                <React.Fragment>
                  <ModerationLayout>
                    {width === "xl" || width === "lg" ? <Padder/> : <MicroPadder/>}
                    <Switch location={location}>
                      <Route exact path="/react_moderation" component={ModerationHome}/>
                      <Route exact path="/react_moderation/analytics" component={ModerationAnalytics}/>
                      <Route exact path="/react_moderation/assets" component={ModerationAssets}/>
                      <Route exact path="/react_moderation/claims" component={ModerationClaims}/>
                      <Route exact path="/react_moderation/requests" component={ModerationRequests}/>
                      <Route exact path="/react_moderation/moderators" component={ModerationModerators}/>
                      <Route exact path="/react_moderation/sponsors" component={ModerationSponsors}/>
                      <Route exact path="/react_moderation/reports" component={ModerationReports}/>
                      <Route exact path="/react_moderation/tickets" component={ModerationTickets}/>
                      <Route exact path="/react_moderation/suspended_users" component={ModerationSuspendedUsers}/>
                      <Route exact path="/react_moderation/adverts" component={ModerationAdverts}/>
                      <Route exact path="/react_moderation/announcements" component={ModerationAnnouncements}/>
                    </Switch>
                  </ModerationLayout>
                </React.Fragment>
              );
            else
              return (
                <React.Fragment>
                  <Switch location={location}>
                    <Route exact path="/react_moderation" component={Unauthorized}/>
                  </Switch>
                </React.Fragment>
              );
          }
          return (
            <React.Fragment>
              <AppLayout>
                <AppHeader/>
                {/*{width === "xl" || width === "lg" ? <Padder/> : <MicroPadder/>}*/}
                <Switch location={location}>
                  <Route exact path="/">
                    <LoadLandingPage/>
                  </Route>
                  <Route exact path="/announcements">
                    <LoadAnnouncements/>
                  </Route>
                  <Route path="/search">
                    <LoadSearchPage/>
                  </Route>
                  <Route exact path="/terms_of_use">
                    <LoadTerms/>
                  </Route>
                  <Route exact path="/user_guide">
                    <LoadUserGuide/>
                  </Route>
                  <Route exact path="/faq">
                    <LoadFaq/>
                  </Route>
                  <Route exact path="/privacy_policy">
                    <LoadPrivacyPolicy/>
                  </Route>
                  <Route exact path="/fursuits">
                    <LoadFursuits/>
                  </Route>
                  <Route exact path="/makers">
                    <LoadMakers/>
                  </Route>
                  <Route exact path="/events">
                    <LoadEvents/>
                  </Route>
                  <Route exact path="/tag">
                    <LoadTagPage/>
                  </Route>
                  <Route exact path="/subscriptions">
                    <LoadSubscriptions/>
                  </Route>
                  <Route exact path="/pictures">
                    <LoadMediaAll/>
                  </Route>
                  <Route exact path="/favorites">
                    <LoadFavorites/>
                  </Route>
                  <Route exact path="/ads">
                    <LoadAdsLister/>
                  </Route>
                  <Route exact path="/pictures/:id">
                    <LoadMediumRemake/>
                  </Route>
                  <Route exact path="/fursuits/:id"><LoadFursuitRemake/></Route>
                  <Route exact path="/makers/:id"><LoadMakerRemake/></Route>
                  <Route exact path="/events/:id"><LoadEventRemake/></Route>
                  <Route exact path="/:id"><LoadUserRemake/></Route>
                  <Route exact path="/:id/:tab"><LoadUserRemake/></Route>
                </Switch>
              </AppLayout>
            </React.Fragment>
          );
        }}
      />
    </BrowserRouter>
  )
    ;
}

export default withCurrentSession(withWidth()(AppRouter));
