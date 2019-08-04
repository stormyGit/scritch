import React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link, withRouter } from "react-router-dom";
import uuidv4 from "uuid/v4";

import queryString from "query-string";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import {
  READ_MEDIA_NOTIFICATIONS,
  READ_FURSUIT_NOTIFICATIONS
} from "../../queries/subscriptionMutations";
import { GET_FRONT_MEDIA } from "../../queries/mediaQueries";
import { GET_USERS } from "../../queries/userQueries";

import MediumCard from "./MediumCard";
import MediaFilters from "./MediaFilters";
import EmptyList from "../Global/EmptyList";
import LoadMoreButton from "../Global/LoadMoreButton";
import UserCard from "../Users/UserCard";
import PageTitle from "../Global/PageTitle";
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
