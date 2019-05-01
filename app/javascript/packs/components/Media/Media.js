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
import { GET_MEDIA } from "../../queries/mediaQueries";
import { GET_USERS } from "../../queries/userQueries";

import MediumCard from "./MediumCard";
import MediaFilters from "./MediaFilters";
import MediaFiltersMobile from "./MediaFiltersMobile";
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

class Media extends React.Component {
  state = {
    uuid: null,
    fursuits: [],
    user: null,
    event: null,
    edition: null,
    category: null,
    subEvent: null,
    sort: this.props.sort ? this.props.sort : "latest",
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

  renderMediaFiltersWithSubsClear() {
    const { classes, width } = this.props;
    let mutation;
    if (this.props.filter == "subscriptions_users")
      mutation = READ_MEDIA_NOTIFICATIONS;
    else if (this.props.filter == "subscriptions_fursuits")
      mutation = READ_FURSUIT_NOTIFICATIONS;

    return (
      <Grid spacing={8} container className={classes.filters}>
        <Grid item xs={false} md={2} />
        <Grid item xs={12} md={8}>
          {width === "xs" || width == "sm" ? (
            <MediaFiltersMobile
              onChange={value => {
                this.setState({ [value.label]: value.value });
              }}
              clearFilters={() => this.clearFilters()}
            />
          ) : (
            <MediaFilters
              onChange={value => {
                this.setState({ [value.label]: value.value });
              }}
              clearFilters={() => this.clearFilters()}
            />
          )}
        </Grid>
        <Grid item xs={12} md={2}>
          <Mutation
            mutation={mutation}
            onCompleted={() => this.setState({ uuid: uuidv4() })}
          >
            {(readSubs, { data }) => (
              <Tooltip title="Clears Subs">
                <Button
                  size="large"
                  variant="outlined"
                  className={classes.clearSubsButton}
                  onClick={() => {
                    readSubs({ variables: { input: {} } });
                  }}
                >
                  Clear
                </Button>
              </Tooltip>
            )}
          </Mutation>
        </Grid>
      </Grid>
    );
  }

  renderMediaFilters() {
    const { classes, width } = this.props;

    return (
      <div className={classes.filters}>
        {width === "xs" || width == "sm" ? (
          <MediaFiltersMobile
            onChange={value => {
              this.setState({ [value.label]: value.value });
            }}
            clearFilters={() => this.clearFilters()}
          />
        ) : (
          <MediaFilters
            onChange={value => {
              this.setState({ [value.label]: value.value });
            }}
            clearFilters={() => this.clearFilters()}
          />
        )}
      </div>
    );
  }

  renderResults({ media, horizontal, onLoadMore, hasMore }) {
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
          <Grid item xs={6} sm={4} md={3} xl={2} key={medium.id}>
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
      fursuitId,
      withSubsClear
    } = this.props;
    const query = searching ? queryString.parse(location.search) : null;
    let limit = query
      ? 12
      : this.props.limit
      ? this.props.limit
      : parseInt(process.env.MEDIA_PAGE_SIZE);

    return (
      <React.Fragment>
        {!fursuit && !withSubsClear && !searching && !faves && !home && (
          <PageTitle>Pictures</PageTitle>
        )}
        {!fursuit &&
          !searching &&
          !home &&
          withSubsClear &&
          this.renderMediaFiltersWithSubsClear()}
        {!fursuit &&
          !searching &&
          !home &&
          !withSubsClear &&
          this.renderMediaFilters()}
        <Query
          query={GET_MEDIA}
          fetchPolicy="network-only"
          variables={{
            faves: faves ? faves : false,
            filter: this.props.filter,
            sort: this.state.sort,
            eventId: this.state.event ? this.state.event.value : null,
            editionId: this.state.edition ? this.state.edition.value : null,
            categoryId: this.state.category ? this.state.category.value : null,
            subEventId: this.state.subEvent ? this.state.subEvent.value : null,
            fursuitId: this.props.fursuitId,
            fursuits: this.state.fursuits
              ? this.state.fursuits.map(e => e.id)
              : null,
            offset: 0,
            uuid: this.state.uuid,
            limit
          }}
        >
          {({ data, loading, error, fetchMore, refetch }) => {
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
