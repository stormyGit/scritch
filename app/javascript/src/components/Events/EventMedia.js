import React from "react";
import {Query} from "react-apollo";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import withWidth from "@material-ui/core/withWidth";

import {GET_MEDIA} from "../../queries/mediaQueries";

import MediumCard from "../Media/MediumCard";
import EmptyList from "../Global/EmptyList";
import LoadMoreButton from "../Global/LoadMoreButton";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing(1),
    paddingRight: 0
  }
});

class EventMedia extends React.Component {
  state = {
    hasMore: true,
    currentImage: 0
  };

  renderResults({ media, horizontal, onLoadMore, hasMore }) {
    const { classes } = this.props;

    if (media.length === 0) {
      return <EmptyList label={`No results`} />;
    }

    return (
      <React.Fragment>
        {media.map(medium => (
          <Grid item xs={6} md={4} lg={3} key={medium.id}>
            <MediumCard medium={medium} />
          </Grid>
        ))}
        {hasMore && <LoadMoreButton onClick={() => onLoadMore()} />}
      </React.Fragment>
    );
  }

  render() {
    const { classes, location, width, edition, event } = this.props;
    let limit = parseInt(process.env.MEDIA_PAGE_SIZE);

    return (
      <Query
        query={GET_MEDIA}
        variables={{
          sort: this.props.sort,
          editionId: edition,
          eventId: event,
          offset: 0,
          limit
        }}
      >
        {({ data: { media }, loading, error, fetchMore }) => {
          if (error || loading || !media) return null;
          return (
            <React.Fragment>
              <Grid
                container
                className={classes.root}
                spacing={1}
                style={{ marginTop: width === "lg" || width === "xl" ? 4 : -4 }}
              >
                {!loading &&
                  !error &&
                  this.renderResults({
                    media,
                    horizontal: false,
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
                              media: [...prev.media, ...fetchMoreResult.media]
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
    );
  }
}

export default withStyles(styles)(withWidth()(EventMedia));
