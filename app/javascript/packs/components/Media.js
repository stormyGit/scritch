import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import queryString from 'query-string';
import withWidth from '@material-ui/core/withWidth';
import Button from '@material-ui/core/Button';

import { GET_MEDIA, GET_USERS } from '../queries';

import AppLayout from './AppLayout';
import MediumCard from './MediumCard';
import EmptyList from './EmptyList';
import LoadMoreButton from './LoadMoreButton';
import UserCard from './UserCard';

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit * 1,
    paddingRight: 0
  }
});

class Media extends React.Component {
  state = {
    hasMore: true
  }

  renderResults({ media, users, horizontal, onLoadMore, hasMore }) {
    const { classes } = this.props;

    if (media.length === 0 && users.length === 0) {
      const { location } = this.props;
      const query = queryString.parse(location.search)

      if (query.q) {
        return (
          <EmptyList
            label={`No results were found for your search term: ${query.q}`}
          />
        )
      } else {
        return (
          <EmptyList
            label={`No results`}
          />
        )
      }
    }
    if (horizontal) {
      return (
        <React.Fragment>
          {
            users.length > 0 &&
              <Grid item item xs={12} lg={8} style={{ marginLeft: 'auto', marginRight: 'auto'}}>
                <Grid container spacing={8}>
                  {
                    users.map((user) => (
                      <Grid item item xs={12} lg={users.length === 1 ? 12 : 6} key={user.id}>
                        <UserCard user={user} />
                      </Grid>
                    ))
                  }
                </Grid>
              </Grid>
          }
          {
            media.map((medium) => (
              <Grid item item xs={12} lg={8} key={medium.id} style={{ marginLeft: 'auto', marginRight: 'auto'}}>
                <MediumCard medium={medium} horizontal />
              </Grid>
            ))
          }
          {hasMore && <LoadMoreButton onClick={() => onLoadMore()} />}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {
          users.length > 0 &&
            <Grid item item xs={12} lg={8} style={{ marginLeft: 'auto', marginRight: 'auto'}}>
              <Grid container spacing={8}>
                {
                  users.map((user) => (
                    <Grid item item xs={12} lg={users.length === 1 ? 12 : 6} key={user.id}>
                      <UserCard user={user} />
                    </Grid>
                  ))
                }
              </Grid>
            </Grid>
        }
        {
          media.map((medium) => (
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
    let limit = parseInt(process.env.MEDIA_PAGE_SIZE);

    return (
      <Query query={GET_MEDIA} variables={{ q: query.q, sort: this.props.sort, offset: 0, limit }} fetchPolicy="network-only">
        {({ data: { media, users }, loading, error, fetchMore }) => (
          <React.Fragment>
            <Grid container lol={console.log(users)} className={classes.root} spacing={8} style={{ marginTop: (width === 'lg' || width ===  'xl') ? 4 : -4 }}>
              {
                  !loading && !error &&
                    this.renderResults({
                      users,
                      media,
                      horizontal: (query.q && query.q.length > 0 && (width === 'lg' || width === 'xl')),
                      hasMore: ((media.length % limit) === 0 && this.state.hasMore && media.length > 0),
                      onLoadMore: () => {
                        fetchMore({
                          variables: {
                            offset: media.length,
                            limit
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;

                            if (fetchMoreResult.media.length === 0) {
                              this.setState({ hasMore: false })
                            } else {
                              return Object.assign({}, prev, {
                                media: [...prev.media, ...fetchMoreResult.media]
                              });
                            }
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
