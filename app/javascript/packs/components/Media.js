import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import queryString from 'query-string';
import withWidth from '@material-ui/core/withWidth';
import Button from '@material-ui/core/Button';

import { GET_MEDIA } from '../queries';

import AppLayout from './AppLayout';
import MediumCard from './MediumCard';
import EmptyList from './EmptyList';
import LoadMoreButton from './LoadMoreButton';

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit * 1,
    paddingRight: 0
  }
});

class Media extends React.Component {
  renderResults({ data, horizontal, onLoadMore, hasMore }) {
    const { classes } = this.props;

    if (data.media.length === 0) {
      const { location } = this.props;
      const query = queryString.parse(location.search)

      return (
        <EmptyList
          label={`No results were found for your search term: ${query.q}`}
        />
      )
    }
    if (horizontal) {
      return (
        data.media.map((medium) => (
          <Grid item item xs={12} lg={8} key={medium.id} style={{ marginLeft: 'auto', marginRight: 'auto'}}>
            <MediumCard medium={medium} horizontal />
          </Grid>
        ))
      );
    }

    return (
      <React.Fragment>
        {
          data.media.map((medium) => (
            <Grid item xs={12} md={6} lg={4} key={medium.id}>
              <MediumCard medium={medium} />
            </Grid>
          ))
        }
        {hasMore && <LoadMoreButton onClick={() => onLoadMore()} />}
      </React.Fragment>
    );
  }

  render() {
    const { classes, location, width } = this.props;
    const query = queryString.parse(location.search)
    let page = 1;
    let per = 30;

    return (
      <Query query={GET_MEDIA} variables={{ q: query.q, sort: this.props.sort, page, per }}>
        {({ data, loading, error, fetchMore }) => (
          <React.Fragment>
            <Grid container className={classes.root} spacing={8}>
              {
                  !loading && !error &&
                    this.renderResults({
                      data,
                      horizontal: (query.q && query.q.length > 0 && width === 'lg' || width === 'xl'),
                      hasMore: ((data.media.length % per) === 0 && data.media.length / per === page),
                      onLoadMore: () => {
                        page++;

                        fetchMore({
                          variables: {
                            page,
                            per
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;

                            return Object.assign({}, prev, {
                              media: [...prev.media, ...fetchMoreResult.media]
                            });
                          }
                        });
                      }
                    })
              }
            </Grid>
          </React.Fragment>
        )}
      </Query>
    );
  }
}

export default withStyles(styles)(withWidth()(Media));
