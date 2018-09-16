import React from 'react';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CustomAppBar from './CustomAppBar';
import MediumCard from './MediumCard';
import SearchBar from './SearchBar';

import { setMediaCriteria } from '../actions/mediaCriteria';

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit * 1,
    paddingRight: 0
  },
  title: {
    marginBottom: theme.spacing.unit * 1,
    fontSize: '0.8em'
  },
  settingsPaper: {
    width: '100%',
  }
});

const GET_MEDIA = gql`
  query Media($q: String) {
    media(q: $q) {
      id
      title
      description
      previewKey
      thumbnailKey
      user {
        id
        name
      }
    }
  }
`;

class Media extends React.Component {
  handleRequestSearch(q) {
    this.props.setMediaCriteria({ q });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CustomAppBar>
          <SearchBar cancelOnEscape onRequestSearch={(q) => this.handleRequestSearch(q)} />
        </CustomAppBar>
        <Grid container alignItems="center" justify="space-around" className={classes.root} spacing={8}>
          <Query query={GET_MEDIA} variables={{ q: this.props.mediaCriteria.q }}>
            {({ data, loading, error }) => {
              if (loading) {
                return (null);
              }
              if (error) {
                return (null);
              }

              if (this.props.mediaCriteria.q) {
                return (
                  data.media.map((medium) => (
                    <Grid item item xs={12} lg={8} key={medium.id}>
                      <MediumCard medium={medium} />
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
            }}
          </Query>
        </Grid>
      </React.Fragment>
    );
  }
}

const ConnectedMedia = connect(
  ({ mediaCriteria }) => ({ mediaCriteria }),
  (dispatch) => ({
    setMediaCriteria: (payload) => dispatch(setMediaCriteria(payload))
  })
)(Media);

export default withStyles(styles)(ConnectedMedia);
