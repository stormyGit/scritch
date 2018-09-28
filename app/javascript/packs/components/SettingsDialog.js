import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import PageTitle from './PageTitle';
import ResponsiveDialog from './ResponsiveDialog';

import { GET_SESSION, DELETE_SESSION, DELETE_USER, UPDATE_USER, GET_THEME } from '../queries';

const styles = theme => ({
});

class Settings extends React.Component {
  state = {
    accountSuppressionAlertOpen: false,
  }

  render() {
    const { classes, match, width } = this.props;

    return (
      <ResponsiveDialog
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <DialogTitle>{"Settings"}</DialogTitle>
        <DialogContent>
          <Query query={GET_SESSION}>
            {({ loading, error, data: sessionData }) => {
              if (loading || !sessionData.session) {
                return (null);
              }

              return (
                <React.Fragment>
                  <List>
                    <Mutation
                      mutation={UPDATE_USER}
                      update={(cache, { data: { updateUser } }) => {
                        cache.writeQuery({
                          query: GET_SESSION,
                          data: { session: { ...sessionData.session, user: updateUser.user } }
                        });
                        cache.writeQuery({
                          query: GET_THEME,
                          data: { theme: updateUser.user.theme }
                        });
                      }}
                    >
                      {( updateUser, { data }) => (
                        <ListItem
                          button
                          onClick={() => {
                            updateUser({ variables: { input: { id: sessionData.session.user.id, theme: sessionData.session.user.theme === 'light' ? 'dark' : 'light' }}});
                          }}
                        >
                          <ListItemText primary={'Light theme'} />
                          <ListItemSecondaryAction>
                            <Switch
                              onChange={(e, value) => {
                                updateUser({ variables: { input: { id: sessionData.session.user.id, theme: value ? 'light' : 'dark' }}}).then(() => {
                                  this.props.onClose();
                                })
                              }}
                              checked={sessionData.session.user.theme === 'light'}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      )}
                    </Mutation>
                  </List>
                  <List>
                    <Mutation
                      mutation={DELETE_SESSION}
                      update={(cache) => {
                        cache.writeQuery({
                          query: GET_SESSION,
                          data: { session: null }
                        });
                      }}
                    >
                      {( deleteSession, { data }) => (
                        <ListItem
                          button
                          onClick={() => {
                            deleteSession({ variables: { input: { id: sessionData.session.id }}}).then(() => {
                              localStorage.setItem('token', null);
                              this.props.onClose();
                            });
                          }}
                        >
                          <ListItemText primary={`Logout from ${process.env.SITE_NAME}`} />
                        </ListItem>
                      )}
                    </Mutation>
                    <Divider />
                    <ListItem
                      button
                      onClick={() => {
                        this.setState({ accountSuppressionAlertOpen: true });
                      }}
                    >
                      <ListItemText color="danger" primary="Permanently delete your account" />
                    </ListItem>
                  </List>
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
                        }}
                      >
                        {( deleteUser, { data }) => (
                          <Button
                            color="secondary"
                            onClick={() => {
                              deleteUser({ variables: { input: { id: sessionData.session.user.id }}}).then(() => {
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
              );
            }}
          </Query>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>
            Close
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(Settings);
