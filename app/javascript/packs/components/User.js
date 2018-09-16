import React from 'react';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import queryString from 'query-string';

import CustomAppBar from './CustomAppBar';
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
  userProfile: {
    width: '100%',
  },
});

const GET_MEDIA = gql`
  query User($id: ID!) {
    user(id: $id) {
      name
      media {
        id
        title
        description
        previewKey
        thumbnailKey
        createdAt
        duration
        user {
          id
          slug
          name
        }
      }
    }
  }
`;

class User extends React.Component {
  handleRequestSearch(q) {
    this.props.history.push({
      pathname: '/videos',
      search: queryString.stringify({ q })
    });
  }

  renderResults({ data }) {
    if (data.user.media.length === 0) {
      return (
        <EmptyList
          label={`${data.user.name} doesn't have any videos.`}
        />
      )
    }
    return (
      data.user.media.map((medium) => (
        <Grid item item xs={12} lg={8} key={medium.id} style={{ marginLeft: 'auto', marginRight: 'auto'}}>
          <MediumCard medium={medium} horizontal />
        </Grid>
      ))
    );
  }

  renderUserProfile({ data }) {
    const { classes } = this.props;

    return (
      <GridList cellHeight={430} cols={1} spacing={0} className={classes.userProfile}>
        <GridListTile cols={1}>
           <img src={'https://www.fillmurray.com/640/360'} />
           <GridListTileBar
             title={data.user.name}
           />
         </GridListTile>
      </GridList>
    )
  }

  render() {
    const { classes, match } = this.props;

    return (
      <Query query={GET_MEDIA} variables={{ id: match.params.id }}>
        {({ data, loading, error }) => (
          <React.Fragment>
            <CustomAppBar>
            </CustomAppBar>
            {loading && <GlobalProgress />}
            {
              !loading &&
                <React.Fragment>
                  {this.renderUserProfile({ data })}
                  <Grid container className={classes.root} spacing={8}>
                    {this.renderResults({ data })}
                  </Grid>
                </React.Fragment>
            }
          </React.Fragment>
        )}
      </Query>
    );
  }
}

const ConnectedUser = connect()(User);

export default withStyles(styles)(ConnectedUser);
