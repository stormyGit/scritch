import React, {useState} from "react";
import {withStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router-dom";
import {Query} from "react-apollo";
import {GET_ADVERTS} from "../../queries/advertQueries";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";
import withCurrentSession from "../withCurrentSession";
import uuidv4 from "uuid/v4";
import AdvertiseDialog from "../AppDialogs/AdvertiseDialog";
import ButtonBase from "@material-ui/core/ButtonBase";

const styles = theme => ({
  appHeader: {
    display: "flex",
    flexGrow: 1,
    maxHeight: 90,
    marginTop: "1rem",
    marginBottom: "1rem"
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

const AppHeader = ({classes, width, currentSession, isFrontPage}) => {
  const [advertsDialog, setAdvertsDialog] = useState(false);
  const limit = width === "xs" || width === "sm" ? 1 : width === "md" ? 2 : 3;

  if ((currentSession && !currentSession.user.showAds) || isFrontPage) return null;

  return (
    <div className={classes.appHeader}>
      <Grid
        container
        spacing={1}
        className={classes.grid}
        justify="center"
        alignItems="center"
      >
        <Query
          query={GET_ADVERTS}
          variables={{uuid: uuidv4(), limit}}
          fetchPolicy="network-only"
        >
          {({loading, error, data}) => {
            if (loading || error) {
              return <div id="noAd" style={{height: 125, width: 100}}/>;
            }
            if (data) {
              return (
                <React.Fragment>
                  {data.adverts.map((advert, index) => {
                    let adImg;
                    if (advert.isPlaceholder) {
                      adImg = <img
                        src={advert.file}
                        className={classes.placeholderAdvert}
                        onClick={() =>
                          setAdvertsDialog(true)
                        }
                      />;
                    } else {
                      adImg = <a href={advert.url} target="_blank">
                        <img
                          src={advert.file}
                          className={classes.advert}
                        />
                      </a>
                    }
                    // if (index === 2)
                    //   return <Grid item lg={4}>{adImg}</Grid>;
                    // else if (index === 1)
                    //   return <Grid item md={6} lg={4}>{adImg}</Grid>;
                    // else
                    return <Grid item xs={12} md={6} lg={4}>{adImg}</Grid>;
                  })}
                  {currentSession && (
                    <AdvertiseDialog
                      open={advertsDialog}
                      onClose={() =>
                        setAdvertsDialog(false)
                      }
                    />
                  )}
                </React.Fragment>
              );
            } else return null;
          }}
        </Query>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(
  withRouter(withWidth()(withCurrentSession(AppHeader)))
);
