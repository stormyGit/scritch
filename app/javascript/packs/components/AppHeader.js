import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_ADVERTS } from "../queries";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import withWidth from "@material-ui/core/withWidth";
import uuidv4 from "uuid/v4";

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
    flexGrow: 1,
    maxHeight: 100
  },
  grid: {
    textAlign: "center",
    maxHeight: 100
  },
  icon: {
    color: theme.palette.text.primary
  },
  toolTip: {
    height: 90
  },
  advert: {
    width: 300,
    height: 90
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  }
});

class AppHeader extends React.Component {
  render() {
    const { classes, width } = this.props;
    console.log("RENDERING APP HEADER");

    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={8}
          className={classes.grid}
          justify="center"
          alignItems="center"
        >
          {(width == "xl" || width == "lg") && (
            <React.Fragment>
              <Grid item xs={false} lg={1} />
              <Grid item xs={false} lg={1}>
                <Link to="/" className={classes.rootLink}>
                  <img src={logo} className={classes.toolTip} />
                </Link>
              </Grid>
              <Grid item xs={false} lg={1} />
            </React.Fragment>
          )}
          <Query
            query={GET_ADVERTS}
            variables={{ uuid: uuidv4() }}
            fetchPolicy="network-only"
          >
            {({ loading, error, data }) => {
              if (loading || error) {
                console.log(error);
                return null;
              }
              if (data) {
                console.log(data);
                if (data.adverts && data.adverts.length == 2)
                  return (
                    <React.Fragment>
                      <Grid item xs={6} lg={3}>
                        <a
                          href={`${process.env.SITE_URL}/adverts/${
                            data.adverts[0].id
                          }/go_to`}
                        >
                          <img
                            src={data.adverts[0].file}
                            className={classes.advert}
                          />
                        </a>
                      </Grid>
                      <Grid item xs={6} lg={3}>
                        <a
                          href={`${process.env.SITE_URL}/adverts/${
                            data.adverts[1].id
                          }/go_to`}
                        >
                          <img
                            src={data.adverts[1].file}
                            className={classes.advert}
                          />
                        </a>
                      </Grid>
                    </React.Fragment>
                  );
                else return null;
              } else return null;
            }}
          </Query>
          {(width == "xl" || width == "lg") && (
            <React.Fragment>
              <Grid item xs={false} lg={1} />
              <Grid item xs={false} lg={1}>
                <img src={require("../1.png")} className={classes.toolTip} />
              </Grid>
              <Grid item xs={false} lg={1} />
            </React.Fragment>
          )}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(withWidth()(AppHeader)));
