import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link, withRouter } from "react-router-dom";

import queryString from "query-string";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";

import { GET_MEDIA } from "../../queries/mediaQueries";
import { GET_USERS } from "../../queries/userQueries";

import MediumCard from "./MediumCard";
import MediaFilters from "./MediaFilters";
import EmptyList from "../Global/EmptyList";
import LoadMoreButton from "../Global/LoadMoreButton";
import UserCard from "../Users/UserCard";
import PageTitle from "../Global/PageTitle";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing.unit * 1,
    paddingRight: 0
  },
  filters: {
    padding: theme.spacing.unit * 1
  }
});

class Media extends React.Component {
  state = {
    fursuits: [],
    user: null,
    event: null,
    edition: null,
    category: null,
    subEvent: null,
    sort: "latest",
    hasMore: true
  };

  clearFilters() {
    this.setState({
      fursuits: [],
      user: null,
      event: null,
      edition: null,
      category: null,
      subEvent: null,
      sort: "latest"
    });
  }

  renderMediaFilters() {
    const { classes } = this.props;

    return (
      <div className={classes.filters}>
        <MediaFilters
          onChange={value => {
            console.log(value);
            this.setState({ [value.label]: value.value });
          }}
          clearFilters={() => this.clearFilters()}
        />
      </div>
    );
  }

  renderResults({ media, horizontal, onLoadMore, hasMore }) {
    const { classes } = this.props;

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
          <Grid item xs={12} sm={6} md={3} xl={2} key={medium.id}>
            <MediumCard medium={medium} />
          </Grid>
        ))}
        {hasMore && <LoadMoreButton onClick={() => onLoadMore()} />}
      </React.Fragment>
    );
  }

  render() {
    const {
      classes,
      location,
      home,
      width,
      searching,
      fursuit,
      faves,
      fursuitId
    } = this.props;
    const query = searching ? queryString.parse(location.search) : null;
    let limit = query
      ? 12
      : this.props.limit
      ? this.props.limit
      : parseInt(process.env.MEDIA_PAGE_SIZE);

    return (
      <React.Fragment>
        {!fursuit && !searching && !faves && !home && (
          <PageTitle>Pictures</PageTitle>
        )}
        {!fursuit && !searching && !home && this.renderMediaFilters()}
        <Query
          query={GET_MEDIA}
          variables={{
            faves: faves ? faves : false,
            sort: this.props.sort ? this.props.sort : this.state.sort,
            eventId: this.state.event ? this.state.event.value : null,
            editionId: this.state.edition ? this.state.edition.value : null,
            categoryId: this.state.category ? this.state.category.value : null,
            subEventId: this.state.subEvent ? this.state.subEvent.value : null,
            fursuitId: this.props.fursuitId,
            fursuits: this.state.fursuits
              ? this.state.fursuits.map(e => e.id)
              : null,
            offset: 0,
            limit
          }}
        >
          {({ data, loading, error, fetchMore }) => {
            if (!data) return null;

            const { media } = data;
            if (!media) return null;
            else
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
                        media,
                        hasMore:
                          media.length % limit === 0 &&
                          this.state.hasMore &&
                          media.length > 0,
                        onLoadMore: () => {
                          fetchMore({
                            variables: {
                              offset: media.length,
                              limit
                            },
                            updateQuery: (prev, { fetchMoreResult }) => {
                              if (!fetchMoreResult) return prev;

                              if (fetchMoreResult.media.length === 0) {
                                this.setState({ hasMore: false });
                              } else {
                                return Object.assign({}, prev, {
                                  media: [
                                    ...prev.media,
                                    ...fetchMoreResult.media
                                  ]
                                });
                              }
                            }
                          });
                        }
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

export default withStyles(styles)(withWidth()(withRouter(Media)));
