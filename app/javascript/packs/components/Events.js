import React from "react";

import { Query } from "react-apollo";
import { LOAD_EVENTS } from "../queries";
import queryString from "query-string";
import withWidth from "@material-ui/core/withWidth";

import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import PageTitle from "./PageTitle";

import EmptyList from "./EmptyList";
import LoadMoreButton from "./LoadMoreButton";
import EventCard from "./EventCard";

import Background from "../photo.jpg";

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

  renderResults({ data, horizontal, onLoadMore, hasMore }) {
    const { classes } = this.props;

    if (data.length === 0) {
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
    if (horizontal) {
      return (
        <React.Fragment>
          <Grid
            item
            item
            xs={12}
            lg={8}
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <Gallery
              images={data.events.map(event => ({
                src: event.picture,
                thumbnail: event.thumbnail,
                thumbnailWidth: event.width / (medium.height / 256.0),
                thumbnailHeight: 256
              }))}
            />
          </Grid>
          {hasMore && <LoadMoreButton onClick={() => onLoadMore()} />}
        </React.Fragment>
      );
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
    const { classes, location, width } = this.props;
    const query = { q: "" }; //queryString.parse(location.search)
    let limit = parseInt(process.env.MEDIA_PAGE_SIZE);
    const criteria = this.state.criteria;

    return (
      <React.Fragment>
        <PageTitle>Events</PageTitle>
        <Query
          query={LOAD_EVENTS}
          variables={{ ...criteria, limit, offset: 0 }}
        >
          {({ data, loading, error, fetchMore }) => (
            <React.Fragment>
              <div className={classes.filters}>
                <EventFilters
                  onChange={value => {
                    this.setState({
                      country: !value.country ? "" : value.country.value,
                      name: value.name
                    });
                  }}
                />
              </div>
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
                    horizontal:
                      query.q &&
                      query.q.length > 0 &&
                      (width === "lg" || width === "xl"),
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
