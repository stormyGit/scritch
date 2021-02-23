import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { QueryParamProvider } from "use-query-params"
import { EventListScreen } from "../screens/EventListScreen"
import { FursuitListScreen } from "../screens/FursuitListScreen"
import { FursuitScreen } from "../screens/FursuitScreen"
import { HomeScreen } from "../screens/HomeScreen"
import { MakerListScreen } from "../screens/MakerListScreen"
import { MediaListScreen } from "../screens/MediaListScreen"
import { ScreenBase } from "../screens/ScreenBase"

export const AppRouter = (props) => {
  const { currentSession, width } = props

  return (
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Switch location={location}>
          <ScreenBase>
            <Route exact path="/">
              <HomeScreen />
            </Route>
            <Route exact path="/fursuits">
              <FursuitListScreen />
            </Route>
            <Route
              exact
              path="/fursuits/:fursuitId"
              component={FursuitScreen}
            />
            <Route exact path="/pictures">
              <MediaListScreen />
            </Route>
            <Route exact path="/makers">
              <MakerListScreen />
            </Route>
            <Route exact path="/events">
              <EventListScreen />
            </Route>
          </ScreenBase>
        </Switch>
      </QueryParamProvider>
    </BrowserRouter>
  )
}

export default AppRouter
