import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_ADVERTS } from "../queries";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";

import Logo from "./Logo";

import SubscriptionsIcon from "@material-ui/icons/ViewCarousel";
import TagIcon from "@material-ui/icons/AssignmentTurnedIn";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import PicturesIcon from "@material-ui/icons/PhotoLibrary";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ShareIcon from "@material-ui/icons/Share";

import logo from "../../../assets/images/logo.png";

const styles = theme => ({
  root: {
    display: "flex",
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

class AppHeader extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={8}
          className={classes.grid}
          justify="center"
          alignItems="center"
        >
          <Grid item xs={1} />
          <Grid item xs={1}>
            <Link to="/" className={classes.rootLink}>
              <img src={logo} style={{ width: "100%" }} />
            </Link>
          </Grid>
          <Grid item xs={1} />
          <Query query={GET_ADVERTS} fetchPolicy="network-only">
            {({ loading, error, data }) => {
              if (loading || error) return null;
              if (data) {
                console.log(data);
                return (
                  data.adverts &&
                  data.adverts.length == 2 && (
                    <React.Fragment>
                      <Grid item xs={3}>
                        <img
                          src={data.adverts[0].file}
                          style={{ width: "80%" }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={data.adverts[1].file}
                          style={{ width: "80%" }}
                        />
                      </Grid>
                    </React.Fragment>
                  )
                );
              }
            }}
          </Query>
          <Grid item xs={1} />
          <Grid item xs={1}>
            <img src={require("../1.png")} style={{ width: "100%" }} />
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(AppHeader));
