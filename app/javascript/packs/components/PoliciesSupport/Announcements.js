import React from "react";
import { Query } from "react-apollo";
import {
  GET_ANNOUNCEMENTS,
  READ_ANNOUNCEMENTS,
  GET_SESSION
} from "../../queries";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import PageTitle from "../PageTitle";
import AnnouncementCard from "./AnnouncementCard";

import LoadMoreButton from "../LoadMoreButton";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing.unit * 1,
    paddingRight: 0,
    paddingBottom: theme.spacing.unit * 8
  },
  gridPadder: {
    width: "100%",
    paddingLeft: theme.spacing.unit * 16,
    paddingRight: theme.spacing.unit * 16
  }
});

class Announcements extends React.Component {
  state = {
    hasMore: true
  };

  renderResults({ data, horizontal, onLoadMore, hasMore }) {
    const { classes, width } = this.props;

    return (
      <React.Fragment>
        {data.announcements.map(announcement => (
          <Grid item xs={12} key={announcement.id}>
            <AnnouncementCard announcement={announcement} />
          </Grid>
        ))}
        {hasMore && <LoadMoreButton onClick={() => onLoadMore()} />}
      </React.Fragment>
    );
  }

  render() {
    const { classes, location, width } = this.props;
    let limit = 4;

    return (
      <React.Fragment>
        <PageTitle>Announcements</PageTitle>
        <Query
          query={GET_ANNOUNCEMENTS}
          variables={{
            limit,
            offset: 0
          }}
        >
          {({ data, loading, error, fetchMore }) => (
            <React.Fragment>
              <Grid
                container
                className={
                  width !== "lg" && width !== "xl"
                    ? classes.root
                    : classes.gridPadder
                }
                spacing={8}
                style={{ marginTop: width === "lg" || width === "xl" ? 4 : -4 }}
              >
                {!loading &&
                  !error &&
                  this.renderResults({
                    data,
                    horizontal: false,
                    hasMore:
                      data.announcements.length % limit === 0 &&
                      this.state.hasMore &&
                      data.announcements.length > 0,
                    onLoadMore: () => {
                      fetchMore({
                        variables: {
                          offset: data.announcements.length,
                          limit
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;

                          if (fetchMoreResult.announcements.length === 0) {
                            this.setState({ hasMore: false });
                          } else {
                            return Object.assign({}, prev, {
                              announcements: [
                                ...prev.announcements,
                                ...fetchMoreResult.announcements
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

export default withStyles(styles)(withWidth()(Announcements));
