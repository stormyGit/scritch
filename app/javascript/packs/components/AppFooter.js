import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_ADVERTS } from "../queries";
import uuidv4 from "uuid/v4";
import withWidth from "@material-ui/core/withWidth";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";

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
  },
  toolTip: {
    height: 90
  },
  advert: {
    width: 300,
    height: 90
  }
});

class AppFooter extends React.Component {
  render() {
    const { classes, width } = this.props;
    var limit = width !== "xs" ? 2 : 1;
    console.log(width, limit);

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
                return null;
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
                        >
                          <img
                            src={data.adverts[0].file}
                            className={classes.advert}
                          />
                        </a>
                      </Grid>
                      {(width === "xl" || width === "lg") && (
                        <Grid item xs={false} lg={4}>
                          <img
                            src={require("../pixelTooltip.png")}
                            className={classes.toolTip}
                          />
                        </Grid>
                      )}
                      {width !== "xs" && (
                        <Grid item sm={6} lg={4}>
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
                      )}
                    </React.Fragment>
                  );
                else return null;
              } else return null;
            }}
          </Query>
        </Grid>
        <div style={{ paddingTop: 10 }} />

        <Grid container spacing={8} className={classes.grid}>
          <Grid item xs={2}>
            {false && <ShareIcon className={classes.icon} />}
          </Grid>
          <Grid item xs={8}>
            <Typography>
              <Link to={"/terms_and_conditions"} className={classes.link}>
                Terms & Conditions
              </Link>{" "}
              -{" "}
              <Link to={"/privacy_policy"} className={classes.link}>
                Privacy Policy
              </Link>
            </Typography>
            <Typography>
              <Link to={"/code_of_conduct"} className={classes.link}>
                Code of Conduct
              </Link>{" "}
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

export default withStyles(styles)(withRouter(withWidth()(AppFooter)));
