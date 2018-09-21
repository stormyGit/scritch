import React from 'react';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { Query, Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withRouter } from 'react-router-dom'

import queryString from 'query-string';

import { GET_USER, CREATE_FOLLOW, DELETE_FOLLOW } from '../queries';

import CustomAppBar from './CustomAppBar';
import MediumCard from './MediumCard';
import SearchBar from './SearchBar';
import GlobalProgress from './GlobalProgress';
import EmptyList from './EmptyList';
import UserAvatar from './UserAvatar';
import ProfileAvatar from './ProfileAvatar';

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit * 1,
    paddingRight: 0
  },
  tabsContainer: {
    background: theme.palette.background.paper
  },
  userProfile: {
    width: '100%',
    position: 'relative',
    overflow: 'visible'
  },
  tabs: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  userAvatar: {
    marginRight: theme.spacing.unit * 2,
  },
  titleBar: {
    height: 'auto',
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
  },
  titleBarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  titleBarContainerUserInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  titleBarContainerUserActions: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing.unit * 2,
  },
  userColumn: {
    minWidth: 200
  },
  followButton: {
    width: 132
  }
});

class User extends React.Component {
  state = {
    tab: 'videos',
    showUnfollow: false
  }

  componentDidMount() {
    if (this.props.match.params.tab) {
      this.setState({ tab: this.props.match.params.tab });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.tab !== nextProps.match.params.tab) {
      this.setState({ tab: nextProps.match.params.tab || 'videos' });
    }
  }

  handleRequestSearch(q) {
    this.props.history.push({
      pathname: '/videos',
      search: queryString.stringify({ q })
    });
  }

  handleTabChange(tab) {
    this.props.history.push({
      pathname: `/${this.props.match.params.id}/${tab}`,
    });
  }

  renderFollowButton(user) {
    console.log("LOL", user);
    if (user.followed) {
      return (
        <Mutation
          mutation={DELETE_FOLLOW}
          update={(cache, { data: { deleteFollow } }) => {
            cache.writeQuery({
              query: GET_USER,
              variables: { id: user.id },
              data: { user: { ...user, followed: false, followersCount: (user.followersCount - 1) } }
            });
          }}
        >
          {( deleteFollow, { data }) => (
            <Button
              variant="contained"
              size="large"
              className={this.props.classes.followButton}
              color={this.state.showUnfollow ? 'secondary' : 'primary'}
              onMouseEnter={() => this.setState({ showUnfollow: true })}
              onMouseLeave={() => this.setState({ showUnfollow: false })}
              onClick={() => {
                deleteFollow({ variables: { input: { followableId: user.id }}})
              }}
            >
              {this.state.showUnfollow ? 'Unfollow' : 'Following'}
            </Button>
          )}
        </Mutation>
      )
    } else {
      return (
        <Mutation
          mutation={CREATE_FOLLOW}
          update={(cache, { data: { createFollow } }) => {
            cache.writeQuery({
              query: GET_USER,
              variables: { id: user.id },
              data: { user: { ...user, followed: true, followersCount: (user.followersCount + 1) } }
            });
          }}
        >
          {( createFollow, { data }) => (
            <Button
              variant="contained"
              size="large"
              className={this.props.classes.followButton}
              onClick={() => {
                createFollow({ variables: { input: { followableId: user.id }}})
              }}
            >
              Follow
            </Button>
          )}
        </Mutation>
      );
    }
  }

  renderVideos(user) {
    if (user.publishedMedia.length === 0) {
      return (
        <EmptyList
          label={`${user.name} doesn't have any videos.`}
        />
      )
    }
    return (
      <Grid container spacing={8}>
        {
          user.publishedMedia.map((medium) => (
            <Grid item xs={12} key={medium.id}>
              <MediumCard medium={medium} horizontal />
            </Grid>
          ))
        }
      </Grid>
    );
  }

  renderUserProfile(user) {
    const { classes } = this.props;

    return (
      <GridList cellHeight={430} cols={1} spacing={0} className={classes.userProfile}>
        <GridListTile cols={1}>
           <img src={user.banner || 'https://www.fillmurray.com/640/360'} />
           <GridListTileBar
             className={classes.titleBar}
             title={
               <div className={classes.titleBarContainer}>
                <div className={classes.titleBarContainerUserInfo}>
                   <ProfileAvatar user={user} className={classes.userAvatar} />
                   <div>
                     <Typography variant="title">
                      {user.name}
                    </Typography>
                    <Typography variant="body2">
                     {user.bio}
                   </Typography>
                  </div>
                </div>
                <div className={classes.titleBarContainerUserActions}>
                  {this.renderFollowButton(user)}
                </div>
              </div>
             }
           />
         </GridListTile>
      </GridList>
    )
  }

  render() {
    const { classes, match } = this.props;

    return (
      <React.Fragment>
        <CustomAppBar>
          <SearchBar
            cancelOnEscape
            onRequestSearch={(q) => this.handleRequestSearch(q)}
          />
        </CustomAppBar>
        <Query query={GET_USER} variables={{ id: match.params.id }}>
          {({ data, loading, error }) => (
            <React.Fragment>
              {loading && <GlobalProgress />}
              {
                !loading &&
                  <React.Fragment>
                    {this.renderUserProfile(data.user)}
                    <Paper className={classes.tabsContainer} elevation={0}>
                      <Grid container spacing={0}>
                        <Grid item xs lg>
                        </Grid>
                        <Grid item xs={12} lg={8}>
                          <Tabs
                            value={this.state.tab}
                            className={classes.tabs}
                            onChange={(e, value) => this.handleTabChange(value)}
                            indicatorColor="secondary"
                            textColor="secondary"
                            fullWidth
                          >
                            <Tab
                              value="videos"
                              label={data.user.publishedMedia.length}
                              icon="Videos"
                            />
                            <Tab
                              value="following"
                              label={data.user.followingCount}
                              icon="Following"
                            />
                            <Tab
                              value="followers"
                              label={data.user.followersCount}
                              icon="Followers"
                            />
                            <Tab
                              value="likes"
                              label={data.user.likesCount}
                              icon="Likes"
                            />
                          </Tabs>
                        </Grid>
                        <Grid item xs lg>
                        </Grid>
                      </Grid>
                    </Paper>
                    <Grid container className={classes.root} spacing={8}>
                      <Grid item xs lg>
                      </Grid>
                      <Grid item item xs={12} lg={8}>
                        {this.state.tab === 'videos' && this.renderVideos(data.user)}
                      </Grid>
                      <Grid item xs lg>
                      </Grid>
                    </Grid>
                  </React.Fragment>
              }
            </React.Fragment>
          )}
        </Query>
      </React.Fragment>
    );
  }
}

const ConnectedUser = connect()(User);

export default withStyles(styles)(withRouter(ConnectedUser));
