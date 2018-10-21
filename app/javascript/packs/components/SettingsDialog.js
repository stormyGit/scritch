import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query, Mutation, withApollo } from 'react-apollo';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
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

import { GET_SESSION, DELETE_USER, UPDATE_USER, GET_THEME, DELETE_SESSION } from '../queries';

const styles = theme => ({
});

class Settings extends React.Component {
  state = {
    accountSuppressionAlertOpen: false,
  }

  componentDidMount() {
    if (this.props.currentSession) {
      this.setInitialValues(this.props.currentSession.user);
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.currentSession !== nextProps.currentSession || this.props.open !== nextProps.open) && nextProps.currentSession) {
      this.setInitialValues(nextProps.currentSession.user);
    }
  }

  setInitialValues(user) {
    this.setState({
      slug: user.slug,
    });
  }

  // <TextField
  //   label="Username"
  //   value={this.state.slug}
  //   onChange={(e) => this.setState({ slug: e.target.value })}
  //   margin="dense"
  //   fullWidth
  // />


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
        <DialogTitle>{"Settings and security"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={0}>
            <Grid item>
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
                )}
              </Mutation>
            </Grid>
          </Grid>
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
                  update={(cache) => {
                    cache.writeQuery({
                      query: GET_SESSION,
                      data: { session: null }
                    });
                    themeSelector();
                  }}
                >
                  {( deleteUser, { data }) => (
                    <Button
                      color="secondary"
                      onClick={() => {
                        deleteUser({ variables: { input: { id: currentSession.user.id }}}).then(() => {
                          localStorage.setItem('token', null);
                          this.props.history.push({
                            pathname: '/',
                          });
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
        </DialogContent>
        <DialogActions>
          <Grid container spacing={0} justify="space-between">
            <Grid item>
              <Button
                color={"secondary"}
                onClick={() => {
                  this.setState({ accountSuppressionAlertOpen: true });
                }}
                >
                  Delete your account
              </Button>
              <Mutation
                mutation={DELETE_SESSION}
                update={(cache) => {
                  cache.writeQuery({
                    query: GET_SESSION,
                    data: { session: null }
                  });
                  themeSelector();
                }}
              >
                {( deleteSession, { data }) => (
                  <Button
                    onClick={() => {
                      deleteSession({ variables: { input: { id: currentSession.id }}})
                        .then(() => {
                          localStorage.setItem('token', null);
                          this.props.onClose();
                        });
                    }}
                  >
                    Logout
                  </Button>
                )}
              </Mutation>
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
    withCurrentSession(Settings)
  )
);
