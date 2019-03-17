import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Gallery from "react-grid-gallery";

import queryString from "query-string";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";

import { GET_ADVERTS } from "../queries/advertQueries";

import EmptyList from "./Global/EmptyList";
import LoadMoreButton from "./Global/LoadMoreButton";
import UserCard from "./Users/UserCard";

import withCurrentSession from "./withCurrentSession";

import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckIcon from "@material-ui/icons/Check";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import ResponsiveDialog from "./Global/ResponsiveDialog";

import TagDialog from "./TagDialog";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing.unit * 1,
    paddingRight: 0,
    textAlign: "center"
  },
  text: {
    fontWeight: 200,
    padding: theme.spacing.unit * 2
  }
});

class AdsLister extends React.Component {
  state = {
    tutoDialog: !this.props.currentSession.user.tagTutorial,
    tagDialog: false,
    hasMore: true
  };

  renderResults({ adverts }) {
    const { classes } = this.props;

    if (adverts.length === 0) return <EmptyList label={`No results`} />;

    return (
      <React.Fragment>
        {adverts.map(advert => (
          <Grid item xs={12} md={6} lg={4} key={advert.id}>
            <a
              href={`${process.env.SITE_URL}/adverts/${advert.id}/go_to`}
              target="_blank"
            >
              <img src={advert.file} className={classes.advert} />
            </a>
          </Grid>
        ))}
      </React.Fragment>
    );
  }

  render() {
    const { classes, currentSession, location, width } = this.props;
    const query = queryString.parse(location.search);
    let limit = 1000;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <Typography variant="h4" className={classes.text}>
            Saw an ad you liked? Here are all the live ads on Scritch!
          </Typography>
          <Query query={GET_ADVERTS} variables={{ limit }}>
            {({ data, loading, error, fetchMore }) => {
              if (error) console.log(error);
              if (loading || error || !data) return null;

              console.log(data);
              return (
                <React.Fragment>
                  <Grid
                    container
                    className={classes.root}
                    spacing={8}
                    style={{
                      marginTop: width === "lg" || width === "xl" ? 4 : -4
                    }}
                  >
                    {!loading &&
                      !error &&
                      this.renderResults({
                        adverts: data.adverts
                      })}
                  </Grid>
                </React.Fragment>
              );
            }}
          </Query>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withWidth()(withCurrentSession(AdsLister)));
