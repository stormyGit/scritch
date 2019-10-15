import React, { useState } from "react";

import { Query } from "react-apollo";
import { GET_FAVED_MEDIA } from "../../queries/mediaQueries";

import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";

import Media from "./Media";
import MediaFiltersRework from "./MediaFiltersRework";
import Fab from "@material-ui/core/Fab";

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

const DEFAULT_FILTERS = {
  sort: "latest",
  eventId: null,
  editionId: null,
  categoryId: null,
  subEventId: null,
  gifs: false,
  fursuits: []
};

function MediaFaved({ classes, width }) {
  const [queryArg, setQueryArg] = useState({
    offset: 0,
    limit: 48
  });
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState(false);

  return (
    <React.Fragment>
      <Query
        query={GET_FAVED_MEDIA}
        fetchPolicy="network-only"
        variables={queryArg}
      >
        {({ data, loading, error, fetchMore }) => {
          if (loading || error || !data) return null;

          const { favedMedia } = data;

          return (
            <React.Fragment>
              <div
                style={{ height: "calc(100vh - 178px)" }}
                className={
                  width === "sm" || width == "xs"
                    ? classes.mobile_hide_sm
                    : undefined
                }
              >
                <Media
                  media={favedMedia}
                  limit={queryArg.limit}
                  hasMore={hasMore}
                  fetchMore={() =>
                    fetchMore({
                      variables: {
                        offset: favedMedia.length,
                        limit: queryArg.limit
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;

                        if (fetchMoreResult.favedMedia.length === 0) {
                          setHasMore(false);
                        } else {
                          return {
                            ...prev,
                            favedMedia: [
                              ...prev.favedMedia,
                              ...fetchMoreResult.favedMedia
                            ]
                          };
                        }
                      }
                    })
                  }
                />
                <Fab
                  color="primary"
                  variant="extended"
                  size="medium"
                  aria-label="filters"
                  className={classes.fab}
                  onClick={() => setFilters(true)}
                >
                  <FontAwesomeIcon
                    icon={faFilter}
                    className={classes.extendedIcon}
                  />
                  Filters
                </Fab>
              </div>
            </React.Fragment>
          );
        }}
      </Query>
      <MediaFiltersRework
        open={filters}
        onChange={value => {
          value.label === "eventId"
            ? setQueryArg({
                ...queryArg,
                [value.label]: value.value,
                editionId: null
              })
            : setQueryArg({ ...queryArg, [value.label]: value.value });
          setHasMore(true);
        }}
        clearFilters={() => {
          setQueryArg({
            ...queryArg,
            ...DEFAULT_FILTERS
          });
          setHasMore(true);
        }}
        onClose={() => setFilters(false)}
      />
    </React.Fragment>
  );
}

export default withStyles(styles)(withWidth()(MediaFaved));
