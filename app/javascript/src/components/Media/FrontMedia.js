import React from "react";
import {Query} from "react-apollo";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link, withRouter} from "react-router-dom";

import queryString from "query-string";
import withWidth from "@material-ui/core/withWidth";

import {GET_FRONT_MEDIA} from "../../queries/mediaQueries";

import MediumCard from "./MediumCard";
import EmptyList from "../Global/EmptyList";
import Lottie from "react-lottie";

const loaderJSON = require("../../loaderJSON.json");

const styles = theme => ({
  root: {
    maxWidth: "80vw"
  },
  filters: {
    padding: theme.spacing(1),
    textAlign: "center",
    alignItems: "center"
  },
  clearSubsButton: {
    textAlign: "center",
    alignItems: "center",
    top: 0
  },
  font: {
    fontWeight: 200,
    cursor: "pointer"
  },
  link: {
    textDecoration: "none",
    textAlign: "center"
  }
});

const Padder = () => <div style={{padding: 8}}/>;

const FrontMedia = ({location, filter, classes, width}) => {
  const renderResults = ({media}) => {
    if (media.length === 0) {
      const query = location.search ? queryString.parse(location.search) : null;

      if (query && query.q) {
        return <EmptyList label={`No results were found for your search term: ${query.q}`}/>;
      } else {
        return <EmptyList label={`No results`}/>;
      }
    }

    return (
      <React.Fragment>
        {media.map(medium => (
          <Grid item xs={6} md={4} lg={2} key={medium.id}>
            <MediumCard medium={medium}/>
          </Grid>
        ))}
      </React.Fragment>
    );
  }
  let limit = 12;
  let typoSize = width === "xs" || width === "sm" ? "h5" : "h4";

  return (
    <React.Fragment>
      <Query
        query={GET_FRONT_MEDIA}
        fetchPolicy="network-only"
        variables={{
          filter,
          limit
        }}
      >
        {({data, loading, error}) => {
          if (loading)
            return (
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: loaderJSON,
                  rendererSettings: {
                    preserveAspectRatio: ""
                  }
                }}
                height={64}
                width={64}
              />
            );
          if (error || !data) return <Typography>Something went wrong :/</Typography>;

          const media = data.frontMedia;
          if (!media) return null;

          return (
            <React.Fragment>
              <Grid container className={classes.root} spacing={1}>
                {renderResults({
                  media
                })}
              </Grid>
            </React.Fragment>
          );
        }}
      </Query>
      <Padder/>
      <Padder/>
      <div style={{width: "100%", textAlign: "center"}}>
        <Link to="/pictures" className={classes.link}>
          <Button variant="outlined" size="large" className={classes.font}>
            Browse more Media
          </Button>
        </Link>
      </div>
    </React.Fragment>
  );
}

export default withStyles(styles)(withWidth()(withRouter(FrontMedia)));
