import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_ADVERTS, GET_TOOLTIP } from "../../queries/advertQueries";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";
import withCurrentSession from "../withCurrentSession";
import uuidv4 from "uuid/v4";
import AdvertiseDialog from "../AppDialogs/AdvertiseDialog";

const styles = theme => ({
  root: {
    display: "flex",
    padding: theme.spacing(2),
    flexGrow: 1,
    maxHeight: 90
  },
  grid: {
    textAlign: "center",
    maxHeight: 90
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
  },
  placeholderAdvert: {
    cursor: "pointer",
    width: 300,
    height: 90
  }
});

class AppHeader extends React.Component {
  state = {
    advertsDialog: false
  };

  render() {
    const { classes, width, currentSession } = this.props;
    var limit = width === "xs" || width === "sm" ? 1 : width === "md" ? 2 : 3;

    if (currentSession && !currentSession.user.showAds) return null;

    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={1}
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
                      <Grid item xs={12} md={6} lg={4}>
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
                          <a href={data.adverts[0].url} target="_blank">
                            <img
                              src={data.adverts[0].file}
                              className={classes.advert}
                            />
                          </a>
                        )}
                      </Grid>
                      {width !== "xs" && width !== "sm" && (
                        <Grid item md={6} lg={4}>
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
                            <a href={data.adverts[1].url} target="_blank">
                              <img
                                src={data.adverts[1].file}
                                className={classes.advert}
                              />
                            </a>
                          )}
                        </Grid>
                      )}
                      {width !== "xs" && width !== "sm" && width !== "md" && (
                        <Grid item lg={4}>
                          {data.adverts[2].isPlaceholder && (
                            <img
                              src={data.adverts[2].file}
                              className={classes.placeholderAdvert}
                              onClick={() =>
                                this.setState({ advertsDialog: true })
                              }
                            />
                          )}
                          {!data.adverts[2].isPlaceholder && (
                            <a href={data.adverts[2].url} target="_blank">
                              <img
                                src={data.adverts[2].file}
                                className={classes.advert}
                              />
                            </a>
                          )}
                        </Grid>
                      )}
                      {currentSession && (
                        <AdvertiseDialog
                          open={this.state.advertsDialog}
                          onClose={() =>
                            this.setState({ advertsDialog: false })
                          }
                        />
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
