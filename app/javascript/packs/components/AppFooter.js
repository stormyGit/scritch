import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";
import { Query } from "react-apollo";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";

import SubscriptionsIcon from "@material-ui/icons/ViewCarousel";
import TagIcon from "@material-ui/icons/AssignmentTurnedIn";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import PicturesIcon from "@material-ui/icons/PhotoLibrary";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ShareIcon from "@material-ui/icons/Share";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grid: {
    textAlign: "center"
  },
  icon: {
    color: theme.palette.text.primary
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  }
});

class AppFooter extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={8} className={classes.grid}>
          <Grid item xs={2} />
          <Grid item xs={3}>
            <img src={require("../ad3.gif")} style={{ width: "100%" }} />
          </Grid>
          <Grid item xs={2}>
            <img src={require("../1.png")} style={{ width: "50%" }} />
          </Grid>
          <Grid item xs={3}>
            <img src={require("../ad4.gif")} style={{ width: "100%" }} />
          </Grid>
          <Grid item xs={2} />
        </Grid>

        <div style={{ paddingTop: 30 }} />

        <Grid container spacing={8} className={classes.grid}>
          <Grid item xs={2}>
            {false && <ShareIcon className={classes.icon} />}
          </Grid>
          <Grid item xs={8}>
            <Typography>
              <a
                target="_blank"
                href={"http://www.google.com"}
                className={classes.link}
              >
                Terms & Conditions
              </a>{" "}
              -{" "}
              <a
                target="_blank"
                href={"http://www.google.com"}
                className={classes.link}
              >
                Privacy Policy
              </a>
            </Typography>
            <Typography>
              <a
                target="_blank"
                href={"http://www.google.com"}
                className={classes.link}
              >
                Code of Conduct
              </a>{" "}
              -{" "}
              <a
                target="_blank"
                href={"http://www.google.com"}
                className={classes.link}
              >
                User Guide
              </a>{" "}
              -{" "}
              <a
                target="_blank"
                href={"http://www.google.com"}
                className={classes.link}
              >
                FAQ
              </a>
            </Typography>
            <div style={{ paddingTop: 10 }} />
            <Typography>Copyright Scritch 2018-2019</Typography>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(AppFooter));
