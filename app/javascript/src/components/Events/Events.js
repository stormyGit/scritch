import React from "react";

import { LOAD_EVENTS } from "../../queries/eventQueries";
import { Query } from "react-apollo";
import queryString from "query-string";
import withWidth from "@material-ui/core/withWidth";
import AssetRequestDialog from "../AppDialogs/AssetRequestDialog";

import { withStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import PageTitle from "../Global/PageTitle";

import EmptyList from "../Global/EmptyList";
import LoadMoreButton from "../Global/LoadMoreButton";
import EventCard from "./EventCard";

import EventFilters from "./EventFilters";
import EventFiltersMobile from "./EventFiltersMobile";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing.unit * 1,
    paddingRight: 0
  },
  filters: {
    padding: theme.spacing.unit * 1,
    textAlign: "center"
  },
  requestButton: {
    top: 0,
    textAlign: "center"
  }
});

class Events extends React.Component {
  state = {
    assetRequestDialog: false,
    hasMore: true,
    snack: false,
    criteria: {
      name: "",
      country: "",
      status: ""
    }
  };

  clearFilters() {
    this.setState({
      name: "",
      country: "",
      status: ""
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
          <Grid item xs={6} sm={4} md={3} lg={2} key={event.id}>
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
            status: this.state.status,
            limit,
            offset: 0
          }}
        >
          {({ data, loading, error, fetchMore }) => (
            <React.Fragment>
              {!searching && (
                <Grid
                  spacing={8}
                  container
                  className={classes.filters}
                  alignItems="center"
                >
                  {(width === "xl" || width === "lg") && (
                    <Grid item lg={2}>
                      <img
                        style={{ width: "80%" }}
                        src={require("images/pixel/Furcon.png")}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} lg={8}>
                    {width === "xs" || width === "sm" ? (
                      <EventFiltersMobile
                        onChange={value => {
                          this.setState({ [value.label]: value.value });
                        }}
                        clearFilters={() => this.clearFilters()}
                      />
                    ) : (
                      <EventFilters
                        onChange={value => {
                          this.setState({ [value.label]: value.value });
                        }}
                        clearFilters={() => this.clearFilters()}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} lg={2}>
                    <Button
                      variant="outlined"
                      className={classes.requestButton}
                      size="large"
                      onClick={() =>
                        this.setState({ assetRequestDialog: true })
                      }
                    >
                      Request a new Event
                    </Button>
                  </Grid>
                </Grid>
              )}
              <Grid
                container
                className={classes.root}
                spacing={24}
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
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.snack}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Event Request Submitted!</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={() => this.setState({ snack: false })}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
        <AssetRequestDialog
          open={this.state.assetRequestDialog}
          keepAssetType="Event"
          onClose={() => this.setState({ assetRequestDialog: false })}
          assetType="Event"
          submitSnack={() => this.setState({ snack: true })}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withWidth()(Events));
