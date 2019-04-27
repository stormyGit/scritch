import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_ADVERTS, GET_TOOLTIP } from "../../queries/advertQueries";
import uuidv4 from "uuid/v4";
import withWidth from "@material-ui/core/withWidth";
import withCurrentSession from "../withCurrentSession";
import AdvertiseDialog from "../AppDialogs/AdvertiseDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTelegram } from "@fortawesome/free-brands-svg-icons";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grid: {
    textAlign: "center",
    alignItems: "center"
  },
  icon: {
    color: theme.palette.text.primary
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
  toolTip: {
    height: 125
  },
  advert: {
    width: 300,
    height: 90
  },
  placeholderAdvert: {
    cursor: "pointer",
    width: 300,
    height: 90
  },
  socialLeft: {
    alignItems: "center",
    textAlign: "right"
  },
  socialRight: {
    alignItems: "center",
    textAlign: "left"
  }
});

class AppFooter extends React.Component {
  state = {
    advertsDialog: false
  };
  render() {
    const { classes, width, currentSession } = this.props;
    var limit = width !== "xs" ? 2 : 1;
    var adRibbon;

    console.log(width);

    if (
      currentSession &&
      (!currentSession.user.showAds && !currentSession.user.showTooltips)
    )
      adRibbon = null;

    if (
      currentSession &&
      !currentSession.user.showAds &&
      currentSession.user.showTooltips
    )
      adRibbon = (
        <React.Fragment>
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
          <div style={{ paddingTop: 10 }} />
        </React.Fragment>
      );

    return (
      <React.Fragment>
        <div className={classes.root}>
          {adRibbon}
          {(!currentSession ||
            (currentSession && currentSession.user.showAds)) && (
            <React.Fragment>
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
                      return null;
                    }
                    if (data) {
                      if (data.adverts && data.adverts.length == limit)
                        return (
                          <React.Fragment>
                            <Grid item xs={12} sm={6} lg={4}>
                              {data.adverts[0].isPlaceholder && (
                                <img
                                  src={data.adverts[0].file}
                                  className={classes.placeholderAdvert}
                                  onClick={() =>
                                    this.setState({ advertsDialog: true })
                                  }
                                />
                              )}
                              {!data.adverts[0].isPlaceholder && (
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
                              )}
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
                                          <div
                                            style={{ height: 125, width: 100 }}
                                          />
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
                                {data.adverts[1].isPlaceholder && (
                                  <img
                                    src={data.adverts[1].file}
                                    className={classes.placeholderAdvert}
                                    onClick={() =>
                                      this.setState({ advertsDialog: true })
                                    }
                                  />
                                )}
                                {!data.adverts[1].isPlaceholder && (
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
                                )}
                              </Grid>
                            )}
                          </React.Fragment>
                        );
                      else return null;
                    } else return null;
                  }}
                </Query>
              </Grid>
              <div style={{ paddingTop: 10 }} />
            </React.Fragment>
          )}
          <Grid container spacing={8} className={classes.grid}>
            <Grid item xs={4} className={classes.socialLeft}>
              <a
                href="https://twitter.com/PixelScritch"
                target="_blank"
                className={classes.link}
              >
                <Typography variant="h4" color="primary">
                  <Tooltip title="Follow us on Twitter!">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Tooltip>
                </Typography>
              </a>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                <Link to={"/terms_of_use"} className={classes.link}>
                  Terms & Conditions
                </Link>{" "}
                -{" "}
                <Link to={"/privacy_policy"} className={classes.link}>
                  Privacy Policy
                </Link>
              </Typography>
              <Typography>
                <Link to={"/api_policy"} className={classes.link}>
                  API Policy
                </Link>{" "}
                -{" "}
                <Link to={"/user_guide"} className={classes.link}>
                  User Guide
                </Link>{" "}
                -{" "}
                <Link to={"/faq"} className={classes.link}>
                  FAQ
                </Link>
              </Typography>
              <div style={{ paddingTop: 10 }} />
              <Typography>
                Copyright Scritch 2018-2019 | Scritch(v
                {process.env.SITE_VERSION})
              </Typography>
            </Grid>
            <Grid item xs={4} className={classes.socialRight}>
              <a
                href="https://t.me/ScritchNews"
                target="_blank"
                className={classes.link}
              >
                <Typography variant="h4" color="primary">
                  <Tooltip title="Get the latest News on Telegram!">
                    <FontAwesomeIcon icon={faTelegram} />
                  </Tooltip>
                </Typography>
              </a>
            </Grid>
          </Grid>
        </div>
        {currentSession && (
          <AdvertiseDialog
            open={this.state.advertsDialog}
            onClose={() => this.setState({ advertsDialog: false })}
          />
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  withRouter(withWidth()(withCurrentSession(AppFooter)))
);
