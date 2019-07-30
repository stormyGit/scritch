import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query, Mutation, withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";

import Divider from "@material-ui/core/Divider";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { withStyles } from "@material-ui/core/styles";
import PageTitle from "../Global/PageTitle";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import themeSelector from "../../themeSelector";
import GlobalProgress from "../Global/GlobalProgress";
import withCurrentSession from "../withCurrentSession";

import { DELETE_USER, UPDATE_USER } from "../../queries/userMutations";
import { GET_BLOCKED_USERS } from "../../queries/userQueries";
import {
  GET_SESSION,
  GET_THEME,
  DELETE_SESSION
} from "../../queries/globalQueries";

const styles = theme => ({
  dangerButton: {
    color: theme.palette.danger.main
  }
});

class Settings extends React.Component {
  state = {
    accountSuppressionAlertOpen: false
  };

  render() {
    const { classes, match, width, currentSession } = this.props;

    if (!currentSession) {
      return null;
    }

    return (
      <ResponsiveDialog open={this.props.open} onClose={this.props.onClose}>
        <GlobalProgress absolute />
        <DialogTitle>{"Settings and Security"}</DialogTitle>
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
            {(updateUser, { data }) => (
              <React.Fragment>
                <Grid container spacing={0}>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={currentSession.user.public}
                          onChange={(e, value) => {
                            updateUser({
                              variables: {
                                input: {
                                  id: currentSession.user.id,
                                  public: !currentSession.user.public
                                }
                              }
                            });
                          }}
                          color="primary"
                        />
                      }
                      label="Allow Users to see the Fursuit(s) I own"
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
                  data: {
                    session: { ...currentSession, user: updateUser.user }
                  }
                });
                themeSelector(updateUser.user.theme);
              }}
            >
              {(updateUser, { data }) => (
                <Grid container spacing={0}>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={currentSession.user.theme === "light"}
                          onChange={(e, value) => {
                            updateUser({
                              variables: {
                                input: {
                                  id: currentSession.user.id,
                                  theme: value ? "light" : "dark"
                                }
                              }
                            });
                          }}
                          color="primary"
                        />
                      }
                      label="Use Light Theme"
                    />
                  </Grid>
                </Grid>
              )}
            </Mutation>
            {currentSession && (
              <Mutation
                mutation={UPDATE_USER}
                update={(cache, { data: { updateUser } }) => {
                  cache.writeQuery({
                    query: GET_SESSION,
                    data: {
                      session: { ...currentSession, user: updateUser.user }
                    }
                  });
                }}
              >
                {(updateUser, { data }) => (
                  <Grid container spacing={0}>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={currentSession.user.showAds}
                            onChange={(e, value) => {
                              updateUser({
                                variables: {
                                  input: {
                                    id: currentSession.user.id,
                                    showAds: value
                                  }
                                }
                              });
                            }}
                            color="primary"
                          />
                        }
                        label="Show Advertisements"
                      />
                    </Grid>
                  </Grid>
                )}
              </Mutation>
            )}
            {currentSession && (
              <Mutation
                mutation={UPDATE_USER}
                update={(cache, { data: { updateUser } }) => {
                  cache.writeQuery({
                    query: GET_SESSION,
                    data: {
                      session: { ...currentSession, user: updateUser.user }
                    }
                  });
                }}
              >
                {(updateUser, { data }) => (
                  <Grid container spacing={0}>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={currentSession.user.showTooltips}
                            onChange={(e, value) => {
                              updateUser({
                                variables: {
                                  input: {
                                    id: currentSession.user.id,
                                    showTooltips: value
                                  }
                                }
                              });
                            }}
                            color="primary"
                          />
                        }
                        label="Show Tooltips"
                      />
                    </Grid>
                  </Grid>
                )}
              </Mutation>
            )}
            <Dialog
              open={this.state.accountSuppressionAlertOpen}
              onClose={() =>
                this.setState({ accountSuppressionAlertOpen: false })
              }
            >
              <DialogTitle>
                {"Are you sure you want to delete your account?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  All your data will be permanently deleted, this operation
                  cannot be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() =>
                    this.setState({ accountSuppressionAlertOpen: false })
                  }
                  autoFocus
                >
                  Cancel
                </Button>
                <Mutation mutation={DELETE_USER}>
                  {(deleteUser, { data }) => (
                    <Button
                      className={classes.dangerButton}
                      onClick={() => {
                        deleteUser({
                          variables: { input: { id: currentSession.user.id } }
                        }).then(() => {
                          localStorage.setItem("token", null);
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
                return null;
              }

              return (
                <React.Fragment>
                  <Divider />
                  <List
                    subheader={
                      <ListSubheader component="div">
                        Blocked users
                      </ListSubheader>
                    }
                  >
                    {data.blockedUsers.map(user => (
                      <ListItem
                        key={user.id}
                        button
                        onClick={() => {
                          this.props.history.push({
                            pathname: `/${user.slug}`
                          });
                          this.props.onClose();
                        }}
                      >
                        <ListItemText primary={user.name} />
                      </ListItem>
                    ))}
                  </List>
                </React.Fragment>
              );
            }}
          </Query>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={0} justify="space-between">
            <Grid item>
              <Mutation mutation={DELETE_SESSION}>
                {(deleteSession, { data }) => (
                  <Button
                    onClick={() => {
                      deleteSession({
                        variables: { input: { id: currentSession.id } }
                      }).then(() => {
                        localStorage.setItem("token", null);
                        location.reload();
                      });
                    }}
                  >
                    Logout
                  </Button>
                )}
              </Mutation>
              <Button
                className={classes.dangerButton}
                onClick={() => {
                  this.setState({ accountSuppressionAlertOpen: true });
                }}
              >
                Delete your account
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={this.props.onClose}>Close</Button>
            </Grid>
          </Grid>
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(
  withApollo(withCurrentSession(withRouter(Settings)))
);
