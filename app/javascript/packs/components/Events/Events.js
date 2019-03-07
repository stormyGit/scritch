import React from "react";

import { LOAD_EVENTS } from "../../queries/eventQueries";
import { Query } from "react-apollo";
import queryString from "query-string";
import withWidth from "@material-ui/core/withWidth";

import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PageTitle from "../Global/PageTitle";

import EmptyList from "../Global/EmptyList";
import LoadMoreButton from "../Global/LoadMoreButton";
import EventCard from "./EventCard";

import { Link, withRouter } from "react-router-dom";

import EventFilters from "./EventFilters";

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

class Events extends React.Component {
  state = {
    hasMore: true,
    criteria: {
      name: "",
      country: ""
    }
  };

  clearFilters() {
    this.setState({
      name: "",
      country: ""
    });
  }

  renderResults({ data, onLoadMore, hasMore }) {
    const { classes } = this.props;

    if (data.events.length === 0) {
      const { location } = this.props;
      const query = queryString.parse(location.search);

      if (query.q) {
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
        {data.events.map(event => (
          <Grid item xs={4} md={3} lg={2} key={event.id}>
            <EventCard event={event} EventId={event.id} />
          </Grid>
        ))}
        {hasMore && <LoadMoreButton onClick={() => onLoadMore()} />}
      </React.Fragment>
    );
  }

  render() {
    const { classes, location, width, searching } = this.props;
    const query = searching ? queryString.parse(location.search) : null;
    let limit = query ? 12 : parseInt(process.env.MEDIA_PAGE_SIZE);
    const criteria = this.state.criteria;

    return (
      <React.Fragment>
        {!searching && <PageTitle>Events</PageTitle>}
        <Query
          query={LOAD_EVENTS}
          variables={{
            name: searching ? query.q : this.state.name,
            country: this.state.country,
            limit,
            offset: 0
          }}
        >
          {({ data, loading, error, fetchMore }) => (
            <React.Fragment>
              {!searching && (
                <div className={classes.filters}>
                  <EventFilters
                    onChange={value => {
                      this.setState({ [value.label]: value.value });
                    }}
                    clearFilters={() => this.clearFilters()}
                  />
                </div>
              )}
              <Grid
                container
                className={classes.root}
                spacing={8}
                style={{ marginTop: width === "lg" || width === "xl" ? 4 : -4 }}
              >
                {!loading &&
                  !error &&
                  this.renderResults({
                    data,
                    hasMore:
                      data.events.length % limit === 0 &&
                      this.state.hasMore &&
                      data.events.length > 0,
                    onLoadMore: () => {
                      fetchMore({
                        variables: {
                          offset: data.events.length,
                          limit
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;

                          if (fetchMoreResult.events.length === 0) {
                            this.setState({ hasMore: false });
                          } else {
                            return Object.assign({}, prev, {
                              events: [
                                ...prev.events,
                                ...fetchMoreResult.events
                              ]
                            });
                          }
                        }
                      });
                    }
                  })}
              </Grid>
            </React.Fragment>
          )}
        </Query>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withWidth()(Events));