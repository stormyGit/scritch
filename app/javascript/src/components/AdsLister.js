import React from "react";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import uuidv4 from "uuid/v4";

import queryString from "query-string";
import withWidth from "@material-ui/core/withWidth";

import { GET_ADVERTS } from "../queries/advertQueries";

import EmptyList from "./Global/EmptyList";
import PageTitle from "./Global/PageTitle";

import withCurrentSession from "./withCurrentSession";

import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing(1),
    paddingRight: 0,
    textAlign: "center"
  },
  text: {
    fontWeight: 200,
    padding: theme.spacing(2)
  },
  advert: {
    textAlign: "center",
    alignItems: "center",
    width: "80%"
  }
});

class AdsLister extends React.Component {
  state = {
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
            <a href={advert.url} target="_blank">
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
          <PageTitle>Ads List</PageTitle>
          <Typography variant="h5" className={classes.text}>
            Saw an Advertisment you liked? Here are all Adverts that are Live right now!
          </Typography>
          <Query query={GET_ADVERTS} variables={{ uuid: uuidv4(), limit }}>
            {({ data, loading, error, fetchMore }) => {
              if (loading || error || !data) return null;

              return (
                <React.Fragment>
                  <Grid
                    container
                    className={classes.root}
                    spacing={1}
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
