import React, { useState } from "react";

import { Query, Mutation } from "react-apollo";
import {
  READ_MEDIA_NOTIFICATIONS,
  READ_FURSUIT_NOTIFICATIONS
} from "../../queries/subscriptionMutations";
import { GET_EVENT_MEDIA } from "../../queries/mediaQueries";

import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";

import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";

import MediumCard from "./MediumCard";
import Media from "./Media";
import MediaFiltersRework from "./MediaFiltersRework";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

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
  },
  fab: {
    position: "absolute",
    bottom: "3em",
    right: "2em",
    color: "white"
  },
  extendedIcon: {
    marginRight: "1em"
  },
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em"
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  },
  mobile_hide_sm: {
    "@global": {
      "*::-webkit-scrollbar": {
        width: 0
      }
    }
  }
});

function MediaEvent({ classes, width, eventId, editionId }) {
  const [queryArg, setQueryArg] = useState({
    eventId,
    editionId: editionId ? editionId.value : null,
    offset: 0,
    limit: 48
  });
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState(false);
  console.log(eventId, editionId);

  return (
    <Query
      query={GET_EVENT_MEDIA}
      fetchPolicy="network-only"
      variables={queryArg}
    >
      {({ data, loading, error, fetchMore }) => {
        if (loading || error || !data) return null;

        console.log(data);
        const { eventMedia } = data;

        return (
          <React.Fragment>
            <div
              style={{ height: "calc(100vh - 201px)" }}
              className={
                width === "sm" || width == "xs"
                  ? classes.mobile_hide_sm
                  : undefined
              }
            >
              <Media
                media={eventMedia}
                limit={queryArg.limit}
                hasMore={hasMore}
                fetchMore={() =>
                  fetchMore({
                    variables: {
                      offset: eventMedia.length,
                      limit: queryArg.limit
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;

                      if (fetchMoreResult.eventMedia.length === 0) {
                        setHasMore(false);
                      } else {
                        return {
                          ...prev,
                          eventMedia: [
                            ...prev.eventMedia,
                            ...fetchMoreResult.eventMedia
                          ]
                        };
                      }
                    }
                  })
                }
              />
            </div>
          </React.Fragment>
        );
      }}
    </Query>
  );
}

export default withStyles(styles)(withWidth()(MediaEvent));
