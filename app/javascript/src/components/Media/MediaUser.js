import React, { useState } from "react";

import { Query } from "react-apollo";
import { GET_USER_MEDIA } from "../../queries/mediaQueries";

import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Media from "./Media";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing(1),
    paddingRight: 0
  },
  filters: {
    padding: theme.spacing(1),
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

function MediaUser({ classes, width, userId }) {
  const [queryArg, setQueryArg] = useState({
    userId,
    offset: 0,
    limit: 48
  });
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState(false);

  return (
    <Query
      query={GET_USER_MEDIA}
      fetchPolicy="network-only"
      variables={queryArg}
    >
      {({ data, loading, error, fetchMore }) => {
        if (loading || error || !data) {
          return null; //TODO ERROR LOADING
        }

        const { userMedia } = data;

        return (
          <React.Fragment>
            <div
              style={{ height: "calc(100vh - 128px)" }}
              className={
                width === "sm" || width == "xs"
                  ? classes.mobile_hide_sm
                  : undefined
              }
            >
              <Media
                media={userMedia}
                limit={queryArg.limit}
                hasMore={hasMore}
                fetchMore={() =>
                  fetchMore({
                    variables: {
                      offset: userMedia.length,
                      limit: queryArg.limit
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;

                      if (fetchMoreResult.userMedia.length === 0) {
                        setHasMore(false);
                      } else {
                        return {
                          ...prev,
                          userMedia: [
                            ...prev.userMedia,
                            ...fetchMoreResult.userMedia
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

export default withStyles(styles)(withWidth()(MediaUser));
