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

import { withStyles } from "@material-ui/core/styles";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";
import withCurrentSession from "../withCurrentSession";

const styles = theme => ({
  text: {
    fontWeight: 200,
    padding: theme.spacing.unit * 4
  },
  link: {
    textDecoration: "none"
  },
  root: {
    textAlign: "center"
  }
});

class TipsDialog extends React.Component {
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

        <DialogTitle>Scritch Tip Jar</DialogTitle>
        <DialogContent>
          <div className={classes.root}>
            <img
              src={require("images/donation.png")}
              style={{ width: "50%", borderRadius: "100%" }}
            />
            <Typography variant="h4" className={classes.text}>
              You want to donate? That's so sweet! Here's a link!
            </Typography>
            <a
              href={process.env.PAYPAL_URL}
              target="_blank"
              className={classes.link}
            >
              <Button variant="outlined" color="primary" size="large">
                Donate with PayPal
              </Button>
            </a>
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
  withApollo(withRouter(withCurrentSession(TipsDialog)))
);
