import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ApolloProvider, withApollo, Query } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import blue from "@material-ui/core/colors/blue";
import deepPurple from "@material-ui/core/colors/deepPurple";
import teal from "@material-ui/core/colors/teal";

import apolloClient from "../apolloClient";
import AppRouter from "./Global/AppRouter";
import themeSelector from "../themeSelector";

import { GET_SESSION, GET_THEME } from "../queries/globalQueries";

const makeTheme = type => {
  const background = type === "dark" ? { paper: "#222", default: "#333" } : {};

  return createMuiTheme({
    typography: {
      useNextVariants: true
    },
    palette: {
      background,
      primary: {
        main: "#3492ca"
      },
      secondary: {
        main: "#DF0174"
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

class App extends React.Component {
  state = {
    loaded: false
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token || token === "null") {
      this.setState({ loaded: true });
    }

    this.props.client
      .query({
        query: GET_SESSION
      })
      .then(({ data }) => {
        if (data.session) {
          themeSelector(data.session.user.theme);
        } else {
          localStorage.getItem("token", null);
        }
        this.setState({ loaded: true });
      });
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <AppRouter />
      </React.Fragment>
    );
  }
}

const ConnectedApp = withApollo(App);

export default class AppBootstrap extends React.Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <Query query={GET_THEME}>
          {({ data, loading, error }) => (
            <MuiThemeProvider theme={makeTheme(data.theme)}>
              <ConnectedApp />
            </MuiThemeProvider>
          )}
        </Query>
      </ApolloProvider>
    );
  }
}
