import React from "react";
import { withApollo } from "react-apollo";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";
import withCurrentSession from "../withCurrentSession";

const styles = theme => ({
  text: {
    fontWeight: 200,
    paddingLeft: theme.spacing.unit * 6,
    paddingRight: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit,
    paddingTop: theme.spacing.unit
  },
  buttonPadder: {
    paddingTop: theme.spacing.unit * 2
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

  UNSAFE_componentWillReceiveProps(nextProps) {
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

        <DialogTitle>Pixel's Tip Jar</DialogTitle>
        <DialogContent>
          <div className={classes.root}>
            <img
              src={require("images/pixel/Header - Tipping Jar.png")}
              style={{ width: "50%" }}
            />
            <Typography variant="h5" className={classes.text}>
              If you like the website, support new features by throwing a Tip
              Pixel's way!
            </Typography>
            <Typography variant="h5" className={classes.text}>
              We really appreciate your support in making Scritch the best it
              can be for everyone.
            </Typography>
            <div className={classes.buttonPadder}>
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
