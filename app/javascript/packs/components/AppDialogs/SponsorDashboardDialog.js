import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query, Mutation, withApollo } from "react-apollo";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link, withRouter } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckIcon from "@material-ui/icons/Check";
import dateFormat from "dateformat";
import { withStyles } from "@material-ui/core/styles";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";
import withCurrentSession from "../withCurrentSession";

import { CREATE_CLAIM } from "../../queries/claimMutations";

const styles = theme => ({
  link: {
    textDecoration: "none"
  },
  cancelButton: {
    color: theme.palette.danger.main
  }
});

class SponsorDashboardDialog extends React.Component {
  state = {};

  render() {
    const { classes, currentSession, medium } = this.props;

    if (!currentSession || !currentSession.user.sponsor) {
      return null;
    }

    return (
      <ResponsiveDialog
        open={this.props.open}
        onClose={() => {
          this.props.onClose();
        }}
      >
        <GlobalProgress absolute />

        <DialogTitle>Sponsor Dashboard</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <ListItemText primary="Welcome to the Sponsor's Dashboard" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText
                inset
                primary={`Sponsor since: ${dateFormat(
                  new Date(currentSession.user.sponsor.createdAt),
                  "mmmm dS, yyyy"
                )}`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText
                inset
                primary={`Plan: ${currentSession.user.sponsor.plan
                  .charAt(0)
                  .toUpperCase() + currentSession.user.sponsor.plan.slice(1)}`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText
                inset
                primary={`Status: ${currentSession.user.sponsor.status
                  .charAt(0)
                  .toUpperCase() +
                  currentSession.user.sponsor.status.slice(1)}`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText
                inset
                primary={
                  currentSession.user.sponsor.status == "live" &&
                  currentSession.user.sponsor.plan != "Free Trial"
                    ? `Renews: ${dateFormat(
                        new Date(currentSession.user.sponsor.limit * 1000),
                        "mmmm dS, yyyy"
                      )}`
                    : `Expires ${dateFormat(
                        new Date(currentSession.user.sponsor.limit * 1000),
                        "mmmm dS, yyyy"
                      )}`
                }
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          {currentSession.user.sponsor.status == "live" &&
            currentSession.user.sponsor.plan != "Free Trial" && (
              <a
                href={`${process.env.SITE_URL}/sponsors/cancel`}
                className={classes.link}
              >
                <Button
                  className={classes.cancelButton}
                  onClick={() => {
                    this.props.onClose();
                  }}
                >
                  Cancel Sponsorship
                </Button>
              </a>
            )}
          <Button
            onClick={() => {
              this.props.onClose();
            }}
          >
            Close
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(
  withApollo(withRouter(withCurrentSession(SponsorDashboardDialog)))
);
