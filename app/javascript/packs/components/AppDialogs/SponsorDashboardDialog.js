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
import Grid from "@material-ui/core/Grid";
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
  },
  text: {
    fontWeight: 200
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
        size={500}
      >
        <GlobalProgress absolute />

        <DialogTitle>Sponsorship Details</DialogTitle>
        <DialogContent>
          <Typography variant="h6" className={classes.text}>
            <strong>{`Sponsor Since: `}</strong>
            {`${dateFormat(
              new Date(currentSession.user.sponsor.createdAt),
              "mmmm dS, yyyy"
            )}`}
          </Typography>
          <Typography variant="h6" className={classes.text}>
            <strong>{`Plan: `}</strong>
            {`${currentSession.user.sponsor.plan.charAt(0).toUpperCase() +
              currentSession.user.sponsor.plan.slice(1)}`}
          </Typography>
          <Typography variant="h6" className={classes.text}>
            <strong>{`Status: `}</strong>
            {`${currentSession.user.sponsor.status.charAt(0).toUpperCase() +
              currentSession.user.sponsor.status.slice(1)}`}
          </Typography>
          <Typography variant="h6" className={classes.text}>
            {currentSession.user.sponsor.status == "live" &&
            currentSession.user.sponsor.plan != "Free Trial" ? (
              <strong>{`Renews: `}</strong>
            ) : (
              <strong>{`Expires: `}</strong>
            )}
            {`${dateFormat(
              new Date(currentSession.user.sponsor.limit * 1000),
              "mmmm dS, yyyy"
            )}`}
          </Typography>
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
