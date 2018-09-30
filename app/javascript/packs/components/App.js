import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider, withApollo, Query } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';

import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';
import store from '../store.js';
import apolloClient from '../apolloClient';
import AppRouter from './AppRouter';

import { GET_SESSION, GET_THEME } from '../queries';


const makeTheme = (type) => {
  const background = type === 'dark' ? { paper: '#222', default: '#333' } : {};

  return (
    createMuiTheme({
      palette: {
        background,
        type: type
      },
    })
  );
}

class App extends React.Component {
  state = {
    loaded: false
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token || token === 'null') {
      this.setState({ loaded: true });
    }

    this.props.client.query({
      query: GET_SESSION,
    }).then(({ data }) => {
      if (data.session) {
        this.setState({ loaded: true });
        this.props.client.writeData({ data: { theme: data.session.user.theme }});
      }
    });
  }

  render() {
    if (!this.state.loaded) {
      return (null);
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <AppRouter />
      </React.Fragment>
    )
  }
}

const ConnectedApp = withApollo(App);

export default class AppBootstrap extends React.Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <Query query={GET_THEME}>
          {({ data, loading, error }) => (
            <Provider store={store}>
              <MuiThemeProvider theme={makeTheme(data.theme)}>
                <ConnectedApp />
              </MuiThemeProvider>
            </Provider>
          )}
        </Query>
      </ApolloProvider>
    );
  }
}
