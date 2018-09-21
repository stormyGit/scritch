import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider, withApollo } from 'react-apollo';
import ApolloClient from "apollo-boost";
import { HashRouter, Route, Switch } from 'react-router-dom'
import configureStore from '../configureStore.js';
import Layout from './Layout';

import { GET_SESSION } from '../queries';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
const cache = new InMemoryCache();

// persistCache({
//   cache,
//   storage: window.localStorage,
// });


const client = new ApolloClient({
  uri: '/graphql',
  request: (operation) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      }
    });
  },
  cache,
  clientState: {
    defaults: {
      isSignupDialogOpen: false,
      isSignupDialogOpen: false,
    },
    resolvers: {
      Mutation: {
        toggleSignUpDialog: (_, { isSignupDialogOpen }, { cache }) => {
          cache.writeData({ data: { isSignupDialogOpen }});
          return null;
        },
        toggleUploadDialog: (_, { isSignupDialogOpen }, { cache }) => {
          cache.writeData({ data: { isSignupDialogOpen }});
          return null;
        }
      }
    }
}});

let { store, persistor } = configureStore();

const theme = createMuiTheme({
  palette: {
    background: {
      paper: "#222",
      default: "#333"
    },
    type: 'dark'
  },
});

class App extends React.Component {
  state = {
    loaded: false
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.setState({ loaded: true });
    }

    this.props.client.query({ query: GET_SESSION });
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Layout />
      </React.Fragment>
    )
  }
}

const ConnectedApp = withApollo(App);

export default class AppBootstrap extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <MuiThemeProvider theme={theme}>
              <ConnectedApp />
            </MuiThemeProvider>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    );
  }
}
