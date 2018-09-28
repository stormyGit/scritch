import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import queryString from 'query-string';

import { GET_MEDIA } from '../queries';

import AppLayout from './AppLayout';
import MediumCard from './MediumCard';
import SearchBar from './SearchBar';
import GlobalProgress from './GlobalProgress';
import EmptyList from './EmptyList';

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit * 1,
    paddingRight: 0
  },
});

class Media extends React.Component {
  handleRequestSearch(q) {
    this.props.history.push({
      pathname: '/videos',
      search: queryString.stringify({ q })
    });
  }

  renderResults({ data, horizontal }) {
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
      data.media.map((medium) => (
        <Grid item xs={12} md={6} lg={4} key={medium.id}>
          <MediumCard medium={medium} />
        </Grid>
      ))
    );
  }

  render() {
    const { classes, location } = this.props;
    const query = queryString.parse(location.search)

    return (
      <Query query={GET_MEDIA} variables={{ q: query.q, sort: this.props.sort }}>
        {({ data, loading, error }) => (
          <React.Fragment>
            <AppLayout
              pageTitle={this.props.title}
              appBarChildren={
                <SearchBar
                  cancelOnEscape
                  value={query.q}
                  onRequestSearch={(q) => this.handleRequestSearch(q)}
                />
              }
            >
              <Grid container className={classes.root} spacing={8}>
                {loading && <GlobalProgress />}
                {!loading && this.renderResults({ data, horizontal: (query.q && query.q.length > 0) })}
              </Grid>
            </AppLayout>
          </React.Fragment>
        )}
      </Query>
    );
  }
}

export default withStyles(styles)(Media);
