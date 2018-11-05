import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query, Mutation, withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom'

import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';
import PageTitle from './PageTitle';
import ResponsiveDialog from './ResponsiveDialog';
import themeSelector from '../themeSelector';
import GlobalProgress from './GlobalProgress';
import withCurrentSession from './withCurrentSession';

import { GET_SESSION, DELETE_USER, UPDATE_USER, GET_THEME, DELETE_SESSION, GET_BLOCKED_USERS } from '../queries';

const styles = theme => ({
});

class Settings extends React.Component {
  state = {
    accountSuppressionAlertOpen: false,
  }

  render() {
    const { classes, match, width, currentSession } = this.props;

    if (!currentSession) {
      return (null);
    }

    return (
      <ResponsiveDialog
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <GlobalProgress absolute />
        <DialogTitle>{"Account and security"}</DialogTitle>
        <DialogContent>
          <Mutation
            mutation={UPDATE_USER}
            update={(cache, { data: { updateUser } }) => {
              cache.writeQuery({
                query: GET_SESSION,
                data: { session: { ...currentSession, user: updateUser.user } }
              });
            }}
          >
            {( updateUser, { data }) => (
              <React.Fragment>
                <Grid container spacing={0}>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={currentSession.user.public}
                          onChange={(e, value) => {
                            updateUser({ variables: { input: { id: currentSession.user.id, public: !currentSession.user.public }}});
                          }}
                          color="primary"
                        />
                      }
                      label="Show my likes, subscriptions and followers"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={0}>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={currentSession.user.chatEnabled}
                          onChange={(e, value) => {
                            updateUser({ variables: { input: { id: currentSession.user.id, chatEnabled: !currentSession.user.chatEnabled }}});
                          }}
                          color="primary"
                        />
                      }
                      label="Accept direct messages"
                    />
                  </Grid>
                </Grid>
              </React.Fragment>
            )}
          </Mutation>
          <React.Fragment>
            <Mutation
              mutation={UPDATE_USER}
              update={(cache, { data: { updateUser } }) => {
                cache.writeQuery({
                  query: GET_SESSION,
                  data: { session: { ...currentSession, user: updateUser.user } }
                });
                themeSelector(updateUser.user.theme);
              }}
            >
              {( updateUser, { data }) => (
                <Grid container spacing={0}>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={currentSession.user.theme === 'light'}
                          onChange={(e, value) => {
                            updateUser({ variables: { input: { id: currentSession.user.id, theme: value ? 'light' : 'dark' }}});
                          }}
                          color="primary"
                        />
                      }
                      label="Use light theme"
                    />
                  </Grid>
                </Grid>
              )}
            </Mutation>
            <Dialog
              open={this.state.accountSuppressionAlertOpen}
              onClose={() => this.setState({ accountSuppressionAlertOpen: false })}
            >
              <DialogTitle>{"Are you sure you want to delete your account?"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  All your data will be permanently deleted, this operation cannot be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => this.setState({ accountSuppressionAlertOpen: false })} autoFocus>
                  Cancel
                </Button>
                <Mutation
                  mutation={DELETE_USER}
                >
                  {( deleteUser, { data }) => (
                    <Button
                      color="secondary"
                      onClick={() => {
                        deleteUser({ variables: { input: { id: currentSession.user.id }}}).then(() => {
                          localStorage.setItem('token', null);
                          location.reload();
                        });
                      }}
                    >
                      Confirm
                    </Button>
                  )}
                </Mutation>
              </DialogActions>
            </Dialog>
          </React.Fragment>
          <Query query={GET_BLOCKED_USERS}>
            {({ data, loading, error, fetchMore }) => {
              if (loading || error || data.blockedUsers.length === 0) {
                return (null);
              }

              return (
                <React.Fragment>
                  <Divider />
                  <List
                    subheader={<ListSubheader component="div">Blocked users</ListSubheader>}
                  >
                    {
                      data.blockedUsers.map((user) => (
                        <ListItem
                          key={user.id}
                          button
                          onClick={() => {
                            this.props.history.push({
                              pathname: `/${user.slug}`
                            })
                            this.props.onClose();
                          }}
                        >
                          <ListItemText primary={user.name} />
                        </ListItem>
                      ))
                    }
                  </List>
                </React.Fragment>
              );
            }}
          </Query>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={0} justify="space-between">
            <Grid item>
              <Mutation
                mutation={DELETE_SESSION}
              >
                {( deleteSession, { data }) => (
                  <Button
                    onClick={() => {
                      deleteSession({ variables: { input: { id: currentSession.id }}})
                        .then(() => {
                          localStorage.setItem('token', null);
                          location.reload();
                        });
                    }}
                  >
                    Logout
                  </Button>
                )}
              </Mutation>
              <Button
                color={"secondary"}
                onClick={() => {
                  this.setState({ accountSuppressionAlertOpen: true });
                }}
                >
                  Delete your account
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={this.props.onClose}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(
  withApollo(
    withCurrentSession(
      withRouter(Settings)
    )
  )
);
