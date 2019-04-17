import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_ADVERTS, GET_TOOLTIP } from "../../queries/advertQueries";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import withWidth from "@material-ui/core/withWidth";
import withCurrentSession from "../withCurrentSession";
import uuidv4 from "uuid/v4";

import SubscriptionsIcon from "@material-ui/icons/ViewCarousel";
import TagIcon from "@material-ui/icons/AssignmentTurnedIn";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import PicturesIcon from "@material-ui/icons/PhotoLibrary";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ShareIcon from "@material-ui/icons/Share";

const styles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1,
    maxHeight: 125,
    paddingBottom: 10
  },
  grid: {
    textAlign: "center",
    maxHeight: 125
  },
  icon: {
    color: theme.palette.text.primary
  },
  toolTip: {
    height: 125
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
    const { classes, width, currentSession } = this.props;
    var limit = width != "xs" ? 2 : 1;

    if (
      currentSession &&
      (!currentSession.user.showAds && !currentSession.user.showTooltips)
    )
      return null;

    if (
      currentSession &&
      !currentSession.user.showAds &&
      currentSession.user.showTooltips
    )
      return (
        <Query
          query={GET_TOOLTIP}
          variables={{ uuid: uuidv4() }}
          fetchPolicy="network-only"
        >
          {({ loading, error, data }) => {
            if (loading || error) {
              return <div style={{ height: 125, width: 100 }} />;
            }
            if (data && data.tooltip)
              return (
                <div className={classes.root}>
                  <Grid
                    container
                    spacing={8}
                    className={classes.grid}
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={false} lg={4} />
                    <Grid item xs={false} lg={4}>
                      <img
                        src={data.tooltip.file}
                        className={classes.toolTip}
                      />
                    </Grid>
                    <Grid item xs={false} lg={4} />
                  </Grid>
                </div>
              );
          }}
        </Query>
      );

    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={8}
          className={classes.grid}
          justify="center"
          alignItems="center"
        >
          <Query
            query={GET_ADVERTS}
            variables={{ uuid: uuidv4(), limit }}
            fetchPolicy="network-only"
          >
            {({ loading, error, data }) => {
              if (loading || error) {
                return <div style={{ height: 125, width: 100 }} />;
              }
              if (data) {
                if (data.adverts && data.adverts.length == limit)
                  return (
                    <React.Fragment>
                      <Grid item xs={12} sm={6} lg={4}>
                        <a
                          href={`${process.env.SITE_URL}/adverts/${
                            data.adverts[0].id
                          }/go_to`}
                          target="_blank"
                        >
                          <img
                            src={data.adverts[0].file}
                            className={classes.advert}
                          />
                        </a>
                      </Grid>
                      {(width === "xl" || width === "lg") &&
                        (!currentSession ||
                          (currentSession &&
                            currentSession.user.showTooltips)) && (
                          <Grid item xs={false} lg={4}>
                            <Query
                              query={GET_TOOLTIP}
                              variables={{ uuid: uuidv4() }}
                              fetchPolicy="network-only"
                            >
                              {({ loading, error, data }) => {
                                if (loading || error) {
                                  return (
                                    <div style={{ height: 125, width: 100 }} />
                                  );
                                }
                                if (data && data.tooltip)
                                  return (
                                    <img
                                      src={data.tooltip.file}
                                      className={classes.toolTip}
                                    />
                                  );
                              }}
                            </Query>
                          </Grid>
                        )}
                      {(width === "xl" || width === "lg") &&
                        currentSession &&
                        !currentSession.user.showTooltips && (
                          <Grid item xs={false} lg={4} />
                        )}
                      {width !== "xs" && (
                        <Grid item sm={6} lg={4}>
                          <a
                            href={`${process.env.SITE_URL}/adverts/${
                              data.adverts[1].id
                            }/go_to`}
                            target="_blank"
                          >
                            <img
                              src={data.adverts[1].file}
                              className={classes.advert}
                            />
                          </a>
                        </Grid>
                      )}
                    </React.Fragment>
                  );
                else return null;
              } else return null;
            }}
          </Query>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(
  withRouter(withWidth()(withCurrentSession(AppHeader)))
);
