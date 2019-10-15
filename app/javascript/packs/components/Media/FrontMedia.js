import React from "react";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";

import queryString from "query-string";
import withWidth from "@material-ui/core/withWidth";

import { GET_FRONT_MEDIA } from "../../queries/mediaQueries";

import MediumCard from "./MediumCard";
import EmptyList from "../Global/EmptyList";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  root: {
    width: "100%"
  },
  filters: {
    padding: theme.spacing.unit * 1,
    textAlign: "center",
    alignItems: "center"
  },
  clearSubsButton: {
    textAlign: "center",
    alignItems: "center",
    top: 0
  }
});

class FrontMedia extends React.Component {
  renderResults({ media }) {
    const { classes, width } = this.props;

    if (media.length === 0) {
      const { location } = this.props;
      const query = location.search ? queryString.parse(location.search) : null;

      if (query && query.q) {
        return (
          <EmptyList
            label={`No results were found for your search term: ${query.q}`}
          />
        );
      } else {
        return <EmptyList label={`No results`} />;
      }
    }

    return (
      <React.Fragment>
        {media.map(medium => (
          <Grid item xs={6} md={4} key={medium.id}>
            <MediumCard medium={medium} />
          </Grid>
        ))}
      </React.Fragment>
    );
  }

  render() {
    const { filter, classes } = this.props;

    let limit = 12;

    return (
      <React.Fragment>
        <Query
          query={GET_FRONT_MEDIA}
          fetchPolicy="network-only"
          variables={{
            filter: this.props.filter,
            limit
          }}
        >
          {({ data, loading, error }) => {
            if (loading) return <CircularProgress />;
            if (error || !data)
              return <Typography>Something went wrong :/</Typography>;

            const media = data.frontMedia;
            if (!media) return null;

            return (
              <React.Fragment>
                <Grid container className={classes.root} spacing={8}>
                  {this.renderResults({
                    media
                  })}
                </Grid>
              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withWidth()(withRouter(FrontMedia)));
