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
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';

import FavoriteIcon from '@material-ui/icons/Favorite';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { Parallax, Background } from 'react-parallax';

import { withRouter } from 'react-router-dom'

import queryString from 'query-string';
import randomColor from 'randomcolor';

import { GET_USER, CREATE_FOLLOW, DELETE_FOLLOW, UPDATE_USER, GET_SESSION } from '../queries';

import CustomAppBar from './CustomAppBar';
import MediumCard from './MediumCard';
import SearchBar from './SearchBar';
import GlobalProgress from './GlobalProgress';
import EmptyList from './EmptyList';
import UserAvatar from './UserAvatar';
import ProfileAvatar from './ProfileAvatar';

const BANNER_HEIGHT = 430;
const STRIPES_LENGTH = 180;

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
  },
  editBannerButton: {
    width: '100%',
    height: BANNER_HEIGHT - theme.spacing.unit * 10,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1,
    borderRadius: 0,
  },
  editAvatarButton: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1,
    height: 64,
    borderRadius: 32
  },
  placeholderBanner: {
    width: '100%',
    height: BANNER_HEIGHT,
  },
  editBannerIcon: {
    display: 'block',
    fontSize: '4em',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing.unit
  },
  bioField: {
    marginLeft: theme.spacing.unit * 2,
  }
});

class User extends React.Component {
  state = {
    tab: 'videos',
    showUnfollow: false,
    edit: false,
    name: '',
    bio: ''
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

  renderEditButton(user, onSubmit) {
    if (this.state.edit) {
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
              color={"primary"}
              onClick={() => {
                onSubmit();
                this.setState({ edit: false })
              }}
            >
              Save
            </Button>
          )}
        </Mutation>
      );
    } else {
      return (
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            this.setState({ edit: true, name: user.name, bio: user.bio || '' })
          }}
        >
          Edit profile
        </Button>
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

  renderFollowing(user) {
    return (
      <EmptyList
        label={`${user.name} doesn't follow anybody.`}
      />
    )
  }

  renderFollowers(user) {
    return (
      <EmptyList
        label={`${user.name} doesn't have any followers.`}
      />
    )
  }

  renderLikes(user) {
    return (
      <EmptyList
        label={`${user.name} doesn't have any likes.`}
      />
    )
  }

  renderUserProfile(user) {
    const { classes } = this.props;
    const userColorPrimary = randomColor({ luminosity: 'dark', seed: user.slug });
    const userColorSecondary = randomColor({ luminosity: 'light', seed: user.slug });

    return (
      <Mutation
        mutation={UPDATE_USER}
        update={(cache, { data: { updateUser } }) => {
          cache.writeQuery({
            query: GET_SESSION,
            data: { session: { ...sessionData.session, user: updateUser.user } }
          });
        }}
      >
        {( updateUser, { data }) => (
          <GridList cellHeight={430} cols={1} spacing={0} className={classes.userProfile}>
            <GridListTile cols={1}>
              {
                this.state.edit &&
                  <Button
                    className={classes.editBannerButton}
                    onClick={() => {
                      console.log("LOL")
                    }}
                  >
                    <div>
                      <InsertPhotoIcon className={classes.editBannerIcon} />
                      Change banner
                    </div>
                  </Button>
              }
              {
                user.banner ?
                  <Parallax
                    bgImage={user.banner}
                    strength={300}
                  >
                    <div style={{ height: BANNER_HEIGHT, width: '100%' }} />
                  </Parallax> :
                  <div
                    className={classes.placeholderBanner}
                    style={{
                      background: `repeating-linear-gradient(45deg, ${userColorPrimary}, ${userColorPrimary} ${STRIPES_LENGTH}px, ${userColorSecondary} ${STRIPES_LENGTH}px, ${userColorSecondary} ${STRIPES_LENGTH * 2}px)`
                    }}
                  />
              }
               <GridListTileBar
                 className={classes.titleBar}
                 title={
                   <div className={classes.titleBarContainer}>
                    <div className={classes.titleBarContainerUserInfo}>
                        {
                          this.state.edit &&
                            <Button
                              className={classes.editAvatarButton}
                              onClick={() => {
                                console.log("LOL")
                              }}
                            >
                              <div>
                                <InsertPhotoIcon />
                              </div>
                            </Button>
                        }
                       <ProfileAvatar user={user} className={classes.userAvatar} />
                       <div>
                        {
                          this.state.edit ?
                            <TextField
                              label="Name"
                              name="name"
                              value={this.state.name}
                              onChange={(e) => this.setState({ name: e.target.value })}
                              margin="dense"
                            /> :
                            <Typography variant="title">
                             {user.name}
                            </Typography>
                        }
                        {
                          this.state.edit ?
                            <TextField
                              label="Bio"
                              name="bio"
                              value={this.state.bio}
                              onChange={(e) => this.setState({ bio: e.target.value })}
                              margin="dense"
                              className={classes.bioField}
                              fullWidth
                            /> :
                            <Typography variant="body2">
                             {user.bio}
                           </Typography>
                        }
                      </div>
                    </div>
                    <div className={classes.titleBarContainerUserActions}>
                      {
                        user.canUpdate ?
                          this.renderEditButton(user, () => {
                            updateUser({
                              variables: {
                                input: {
                                  id: user.id,
                                  name: this.state.name,
                                  bio: this.state.bio
                                }
                              }
                            });
                          }) :
                          this.renderFollowButton(user)
                      }
                    </div>
                  </div>
                 }
               />
             </GridListTile>
          </GridList>
        )}
      </Mutation>
    )
  }

  render() {
    const { classes, match } = this.props;

    return (
      <Query query={GET_USER} variables={{ id: match.params.id }}>
        {({ data, loading, error }) => (
          <React.Fragment>
            <CustomAppBar pageTitle={!loading && data.user ? data.user.name : null}>
              <SearchBar
                cancelOnEscape
                onRequestSearch={(q) => this.handleRequestSearch(q)}
              />
            </CustomAppBar>
            <React.Fragment>
              {loading && <GlobalProgress />}
              {
                !loading && data.user &&
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
                      {this.state.tab === 'following' && this.renderFollowing(data.user)}
                      {this.state.tab === 'followers' && this.renderFollowers(data.user)}
                      {this.state.tab === 'likes' && this.renderLikes(data.user)}
                      </Grid>
                      <Grid item xs lg>
                      </Grid>
                    </Grid>
                  </React.Fragment>
              }
            </React.Fragment>
          </React.Fragment>
        )}
      </Query>
    );
  }
}

const ConnectedUser = connect()(User);

export default withStyles(styles)(withRouter(ConnectedUser));
