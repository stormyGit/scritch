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
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckIcon from "@material-ui/icons/Check";

import { withStyles } from "@material-ui/core/styles";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";
import withCurrentSession from "../withCurrentSession";

const styles = theme => ({
  textTitle: {
    fontWeight: 400,
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 2
  },
  text: {
    fontWeight: 200,
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 2
  },
  listPadder: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 2
  },
  link: {
    textDecoration: "none"
  },
  buttonsRoot: {
    textAlign: "center"
  }
});

class SponsorDialog extends React.Component {
  state = {
    description: ""
  };

  componentDidMount() {
    if (this.props.currentSession) {
      this.setState({ description: "" });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      this.setState({ description: "" });
    }
  }

  render() {
    const { classes, currentSession, user } = this.props;

    if (!currentSession) {
      return null;
    }

    return (
      <ResponsiveDialog
        open={this.props.open}
        onClose={() => {
          this.props.onClose();
          this.setState({ description: "" });
        }}
      >
        <GlobalProgress absolute />

        <DialogTitle>Become a Sponsor</DialogTitle>
        <DialogContent>
          {false && (
            <img
              src={require("images/donation.png")}
              style={{ width: "50%", borderRadius: "100%" }}
            />
          )}
          <Typography variant="h6" className={classes.textTitle}>
            We value each and every one that supports the website. So much so,
            that rather than create a fundraising account and have a percentage
            eaten up by another entity, Scritch allows support direct from the
            website in the form of a Sponsorship.
          </Typography>

          <Typography variant="h6" className={classes.text}>
            {`Sponsorships allow for more effort to be devoted to the coding of the website, with future perks also planned to thank those that get behind us early on <3`}
          </Typography>
          <div className={classes.buttonsRoot}>
            <a
              href={`${process.env.SITE_URL}/sponsors/new`}
              target="_blank"
              className={classes.link}
            >
              <Button variant="outlined" color="primary" size="large">
                Become a sponsor
              </Button>
            </a>
            {currentSession.user.usedFreeTrial === false && (
              <React.Fragment>
                <br />
                <br />
                <a
                  href={`${process.env.SITE_URL}/sponsors/free_trial`}
                  className={classes.link}
                >
                  <Button variant="outlined" color="primary" size="large">
                    Start your 14 day Free Trial!
                  </Button>
                </a>
              </React.Fragment>
            )}
          </div>
        </DialogContent>
        <DialogActions>
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
  withApollo(withRouter(withCurrentSession(SponsorDialog)))
);
