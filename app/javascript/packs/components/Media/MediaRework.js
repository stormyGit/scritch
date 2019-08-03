import React, { useState } from 'react';

import { Query, Mutation } from 'react-apollo';
import {
  READ_MEDIA_NOTIFICATIONS,
  READ_FURSUIT_NOTIFICATIONS
} from '../../queries/subscriptionMutations';
import { GET_MEDIA } from '../../queries/mediaQueries';

import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';

import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';

import MediaCardRework from './MediaCardRework';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit * 1,
    paddingRight: 0
  },
  filters: {
    padding: theme.spacing.unit * 1,
    textAlign: 'center',
    alignItems: 'center'
  },
  clearSubsButton: {
    textAlign: 'center',
    alignItems: 'center',
    top: 0
  },
  fab: {
    position: 'absolute',
    bottom: '3em',
    right: '2em',
    color: 'white'
  },
  extendedIcon: {
    marginRight: '1em'
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  },
  mobile_hide_sm: {
    '@global': {
      '*::-webkit-scrollbar': {
        width: 0
      }
    }
  }
});

const DEFAULT_FILTERS = {
  fursuits: [],
  user: null,
  event: null,
  edition: null,
  category: null,
  gifs: false,
  subEvent: null,
  sort: 'latest'
};

// Sketchy..
const GetColumnNumber = width => {
  switch (width) {
    case 'xs':
      return 2;
    case 'sm':
      return 3;
    case 'md':
      return 4;
    case 'lg':
      return 6;
    case 'xl':
      return 6;
  }
};

const MediumRow = withStyles(styles)(
  React.memo(({ data, index, classes, style }) => {
    const { itemsPerRow, media } = data;

    const items = [];
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, media.length);

    for (let i = fromIndex; i < toIndex; i++) {
      items.push(
        <Grid item xs={6} sm={4} md={3} lg={2} key={media[i].id}>
          <MediaCardRework medium={media[i]} />
        </Grid>
      );
    }

    return (
      <Grid
        container
        className={classes.root}
        spacing={8}
        style={{ ...style, paddingTop: 4 }}
      >
        {items}
      </Grid>
    );
  })
);

function MediaRework({ classes, width, fursuitId }) {
  // Unused
  // const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [queryArg, setQueryArg] = useState({ limit: 48, hasMore: true });

  return (
    <Query
      query={GET_MEDIA}
      fetchPolicy="network-only"
      variables={{
        faves: false,
        filter: null,
        sort: 'latest',
        eventId: null,
        editionId: null,
        categoryId: null,
        subEventId: null,
        gifs: false,
        fursuitId: fursuitId,
        fursuits: null,
        offset: 0,
        uuid: null,
        limit: queryArg.limit
      }}
    >
      {({ data, loading, error, fetchMore }) => {
        if (loading || error || !data) return null;

        const { media } = data;
        const isItemLoaded = index =>
          !queryArg.hasMore || index < media.length / GetColumnNumber(width);

        return (
          <div
            style={{ height: 'calc(100vh - 56px)' }}
            className={
              width === 'sm' || width == 'xs'
                ? classes.mobile_hide_sm
                : undefined
            }
          >
            <AutoSizer>
              {({ width: gridWidth, height }) => {
                const itemsPerRow = GetColumnNumber(width);
                const rowCount = Math.ceil(media.length / itemsPerRow) || 1;

                return (
                  <InfiniteLoader
                    isItemLoaded={isItemLoaded}
                    itemCount={media.length + queryArg.limit}
                    loadMoreItems={() => {
                      // There is no more item to load, return directly
                      if (!queryArg.hasMore) return;

                      fetchMore({
                        variables: {
                          offset: media.length,
                          limit: queryArg.limit
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;

                          if (fetchMoreResult.media.length === 0) {
                            setQueryArg({ ...queryArg, hasMore: false });
                          } else {
                            return {
                              ...prev,
                              media: [...prev.media, ...fetchMoreResult.media]
                            };
                          }
                        }
                      });
                    }}
                  >
                    {({ onItemsRendered, ref }) => (
                      <List
                        onItemsRendered={onItemsRendered}
                        ref={ref}
                        height={height}
                        itemCount={rowCount}
                        itemData={{ itemsPerRow: itemsPerRow, media }}
                        itemSize={(gridWidth - 16) / itemsPerRow}
                        width={gridWidth}
                      >
                        {MediumRow}
                      </List>
                    )}
                  </InfiniteLoader>
                );
              }}
            </AutoSizer>
            <Fab
              color="primary"
              variant="extended"
              size="medium"
              aria-label="filters"
              className={classes.fab}
            >
              <FontAwesomeIcon
                icon={faFilter}
                className={classes.extendedIcon}
              />
              Filters
            </Fab>
          </div>
        );
      }}
    </Query>
  );
}

export default withStyles(styles)(withWidth()(MediaRework));
