import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CustomAppBar from './CustomAppBar';
import MediumCard from './MediumCard';
import SearchBar from './SearchBar';

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
  {
    media {
      id
      title
      description
      user {
        id
        name
      }
    }
  }
`;

class Media extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CustomAppBar>
          <SearchBar />
        </CustomAppBar>
        <Grid container alignItems="flex-start" justify="space-around" className={classes.root} spacing={8}>
          <Query query={GET_MEDIA}>
            {({ data, loading, error }) => {
              if (loading) {
                return (null);
              }
              if (error) {
                return (null);
              }

              return (
                data.media.map((medium) => (
                  <Grid container item xs={12} md={6} lg={4} key={medium.id}>
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

export default withStyles(styles)(Media);
