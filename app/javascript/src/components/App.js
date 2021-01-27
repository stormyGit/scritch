import React, {useEffect, useState} from "react";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {ApolloProvider, Query, withApollo} from "react-apollo";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";

import apolloClient from "../apolloClient";
import AppRouter from "./Global/AppRouter";
import themeSelector from "../themeSelector";
import DateFnsUtils from "@date-io/date-fns";

import {GET_SESSION, GET_THEME} from "../queries/globalQueries";
import {NavigationContextProvider} from "../context/NavigationContext";
import {DialogContextProvider} from "../context/DialogContext";

const makeTheme = type => {
  const background = type === "dark" ? {paper: "#222", default: "#333"} : {};

  return createMuiTheme({
    typography: {
      useNextVariants: true
    },
    palette: {
      background,
      primary: {
        main: "#0c8cff"
      },
      secondary: {
        main: "#fe94d0"
      },
      danger: {
        main: "#ff6666"
      },
      type: type
    },
    overrides: {
      MuiTooltip: {
        tooltip: {
          fontSize: "1em"
        }
      }
    }
  });
};

function App(props) {
  let [loaded, setLoaded] = useState(false);
  useEffect(() => componentDidMount())

  function componentDidMount() {
    const token = localStorage["token"];
    if (!token || token === "null") {
      setLoaded(true);
    }

    props.client
      .query({
        query: GET_SESSION
      })
      .then(({data}) => {
        if (data.session) {
          themeSelector(data.session.user.theme);
        } else {
          localStorage["token"] = null;
        }
        setLoaded(true);
      });
  }

  if (!loaded) {
    return null;
  }

  return (
    <React.Fragment>
      <CssBaseline/>
      <AppRouter/>
    </React.Fragment>
  );
}

const ConnectedApp = withApollo(App);

export default function AppBootstrap() {
  return (
    <ApolloProvider client={apolloClient}>
      <Query query={GET_THEME}>
        {({data, loading, error}) => (
          <NavigationContextProvider>
            <DialogContextProvider>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <MuiThemeProvider theme={makeTheme(data.theme)}>
                  <ConnectedApp/>
                </MuiThemeProvider>
              </MuiPickersUtilsProvider>
            </DialogContextProvider>
          </NavigationContextProvider>
        )}
      </Query>
    </ApolloProvider>
  );
}
