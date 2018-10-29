import React from 'react';
import gql from 'graphql-tag';
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
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import withWidth from '@material-ui/core/withWidth';

import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

import { withRouter } from 'react-router-dom'

import queryString from 'query-string';

import { GET_USER, CREATE_FOLLOW, DELETE_FOLLOW, UPDATE_USER, GET_SESSION, GET_MEDIA, GET_LIKES_BY_USER, GET_FOLLOWERS_BY_USER, GET_FOLLOWINGS_BY_USER } from '../queries';

import MediumCard from './MediumCard';
import UserCard from './UserCard';
import EmptyList from './EmptyList';
import UserAvatar from './UserAvatar';
import ProfileAvatar from './ProfileAvatar';
import PageTitle from './PageTitle';
import LoadMoreButton from './LoadMoreButton';
import BannerPlaceholder from './BannerPlaceholder';
import EditProfileDialog from './EditProfileDialog';
import ChatDialog from './ChatDialog';
import withCurrentSession from './withCurrentSession';

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
    overflow: 'visible',
    alignItems: 'flex-end',
    paddingTop: '33%',
  },
  userProfileGridListTile: {
    overflow: 'visible',
  },
  userProfileGridListRoot: {
    height: '100% !important',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
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
    background: 'rgba(0, 0, 0, 0.9)',
    color: '#fff'
  },
  titleBarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  mobileTitleBarContainer: {
    display: 'block',
  },
  mobileTitleBarTop: {
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
  },
  mobileUserInfos: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    background: theme.palette.type === 'dark' ? "#111" : '#fff',
    color: theme.palette.type !== 'dark' ? "#111" : '#fff',
  },
  followButtonSpacer: {
    width: 132,
  },
  placeholderBanner: {
    width: '100%',
    paddingTop: '33%',
  },
  bannerImageContainer: {
    position: 'relative',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
  },
  bannerImageWide: {
    width: '100%',
    height: '100%',
  },
  menuButton: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    justifyContent: 'center'
  },
});

class User extends React.Component {
  state = {
    tab: 'videos',
    showUnfollow: false,
    editProfileDialog: false,
    chatDialog: false,
  }

  constructor(props) {
    super(props);
    this.headerRef = React.createRef();
    this.pageRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.match.params.tab) {
      this.setState({ tab: this.props.match.params.tab });
    }
  }

  componentWillUnmount() {
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
    const { width } = this.props;

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

            const { session } = cache.readQuery({ query: GET_SESSION });
            cache.writeQuery({
              query: GET_SESSION,
              data: { session: { ...session, user: { ...session.user, followingCount: (session.user.followingCount - 1)} } }
            });

            const { followersByUser } = cache.readQuery({ query: GET_FOLLOWERS_BY_USER, variables: { userId: user.id } });
            cache.writeQuery({
              query: GET_FOLLOWERS_BY_USER,
              variables: { userId: user.id },
              data: { followersByUser: followersByUser.filter((follower) => follower.id != this.props.currentSession.user.id) }
            });
          }}
        >
          {( deleteFollow, { data }) => (
            <Button
              variant="contained"
              size={width !== 'lg' && width !== 'xl' ? 'small' : 'medium'}
              className={(width === 'lg' || width === 'xl') ? this.props.classes.followButtonSpacer : null}
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

            const { session } = cache.readQuery({ query: GET_SESSION });
            cache.writeQuery({
              query: GET_SESSION,
              data: { session: { ...session, user: { ...session.user, followingCount: (session.user.followingCount + 1)} } }
            });

            const { followersByUser } = cache.readQuery({ query: GET_FOLLOWERS_BY_USER, variables: { userId: user.id } });
            cache.writeQuery({
              query: GET_FOLLOWERS_BY_USER,
              variables: { userId: user.id },
              data: { followersByUser: [ this.props.currentSession.user, ...followersByUser] }
            });
          }}
        >
          {( createFollow, { data }) => (
            <Button
              variant="contained"
              size={width !== 'lg' && width !== 'xl' ? 'small' : 'medium'}
              className={(width === 'lg' || width === 'xl') ? this.props.classes.followButtonSpacer : null}
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

  renderEditButton(user) {
    const { classes, width } = this.props;

    return (
      <Button
        variant="contained"
        size={width !== 'lg' && width !== 'xl' ? 'small' : 'medium'}
        onClick={() => this.setState({ editProfileDialog: true })}
      >
        Edit profile
      </Button>
    );
  }

  renderMessageButton(user) {
    const { classes, width } = this.props;

    return (
      <Button
        variant="contained"
        size={width !== 'lg' && width !== 'xl' ? 'small' : 'medium'}
        onClick={() => this.setState({ chatDialog: true })}
        style={{
          marginRight: 8
        }}
      >
        Message
      </Button>
    );
  }

  renderMedia(user) {
    const { width } = this.props;
    let offset = 0;
    let limit = parseInt(process.env.USER_MEDIA_PAGE_SIZE);

    return (
      <Query query={GET_MEDIA} variables={{ sort: "latest", userId: user.id, offset, limit }} fetchPolicy="network-only">
        {({ data, loading, error, fetchMore }) => {
          if (loading || error) {
            return (null);
          }

          if (data.media.length === 0) {
            return (
              <EmptyList
                label={`${user.name} doesn't have any videos.`}
              />
            )
          }

          return (
            <React.Fragment>
              <Grid container spacing={8}>
                {
                  data.media.map((medium) => (
                    <Grid item xs={12} key={medium.id}>
                      <MediumCard medium={medium} horizontal={width === 'lg' || width === 'xl'} />
                    </Grid>
                  ))
                }
                {
                  data.media.length < user.mediaCount &&
                    <LoadMoreButton
                      onClick={() => {
                        fetchMore({
                          variables: {
                            offset: data.media.length,
                            limit
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;

                            return Object.assign({}, prev, {
                              media: [...prev.media, ...fetchMoreResult.media]
                            });
                          }
                        });
                      }}
                    />
                }
              </Grid>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }

  renderFollowing(user) {
    const { width } = this.props;
    let offset = 0;
    let limit = parseInt(process.env.FOLLOWINGS_PAGE_SIZE);

    return (
      <Query query={GET_FOLLOWINGS_BY_USER} variables={{ userId: user.id, offset, limit }}>
        {({ data, loading, error, fetchMore }) => {
          if (loading || error) {
            return (null);
          }

          if (data.followingsByUser.length === 0) {
            return (
              <EmptyList
                label={`${user.name} doesn't follow anybody.`}
              />
            )
          }

          return (
            <React.Fragment>
              <Grid container spacing={8}>
                {
                  data.followingsByUser.map((following) => (
                    <Grid item xs={12} key={following.id}>
                      <UserCard user={following} />
                    </Grid>
                  ))
                }
                {
                  data.followingsByUser.length < user.followingCount &&
                    <LoadMoreButton
                      onClick={() => {
                        fetchMore({
                          variables: {
                            offset: data.followingsByUser.length,
                            limit
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;

                            return Object.assign({}, prev, {
                              followingsByUser: [...prev.followingsByUser, ...fetchMoreResult.followingsByUser]
                            });
                          }
                        });
                      }}
                    />
                }
              </Grid>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }

  renderFollowers(user) {
    const { width } = this.props;
    let offset = 0;
    let limit = parseInt(process.env.FOLLOWERS_PAGE_SIZE);

    return (
      <Query query={GET_FOLLOWERS_BY_USER} variables={{ userId: user.id, offset, limit }}>
        {({ data, loading, error, fetchMore }) => {
          if (loading || error) {
            return (null);
          }

          if (data.followersByUser.length === 0) {
            return (
              <EmptyList
                label={`${user.name} doesn't have any followers.`}
              />
            )
          }

          return (
            <React.Fragment>
              <Grid container spacing={8}>
                {
                  data.followersByUser.map((follower) => (
                    <Grid item xs={12} key={follower.id}>
                      <UserCard user={follower} />
                    </Grid>
                  ))
                }
                {
                  data.followersByUser.length < user.followersCount &&
                    <LoadMoreButton
                      onClick={() => {
                        fetchMore({
                          variables: {
                            offset: data.followersByUser,
                            limit
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;

                            return Object.assign({}, prev, {
                              followersByUser: [...prev.followersByUser, ...fetchMoreResult.followersByUser]
                            });
                          }
                        });
                      }}
                    />
                }
              </Grid>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }

  renderLikes(user) {
    const { width } = this.props;
    let offset = 0;
    let limit = parseInt(process.env.LIKES_PAGE_SIZE);

    return (
      <Query query={GET_LIKES_BY_USER} variables={{ userId: user.id, offset, limit }}>
        {({ data, loading, error, fetchMore }) => {
          if (loading || error) {
            return (null);
          }

          if (data.likesByUser.length === 0) {
            return (
              <EmptyList
                label={`${user.name} doesn't have any likes.`}
              />
            )
          }

          return (
            <React.Fragment>
              <Grid container spacing={8}>
                {
                  data.likesByUser.map((like) => (
                    <Grid item xs={12} key={like.id}>
                      <MediumCard medium={like.medium} horizontal={width === 'lg' || width === 'xl'} />
                    </Grid>
                  ))
                }
                {
                  data.likesByUser.length < user.likesCount &&
                    <LoadMoreButton
                      onClick={() => {
                        fetchMore({
                          variables: {
                            offset: data.likesByUser,
                            limit
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;

                            return Object.assign({}, prev, {
                              likesByUser: [...prev.likesByUser, ...fetchMoreResult.likesByUser]
                            });
                          }
                        });
                      }}
                    />
                }
              </Grid>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }

  renderBanner(banner, slug) {
    const { classes, width } = this.props;

    if (banner) {
      return (
        <div className={classes.bannerImageContainer}>
          <img
            src={banner}
            className={classes.bannerImage}
          />
        </div>
      );
    }

    return (
      <BannerPlaceholder
        className={classes.placeholderBanner}
        length={180}
        slug={slug}
      />
    );
  }

  renderUserInfos(user) {
    const { classes, currentSession } = this.props;

    return (
      <div>
        <Typography variant="h6" className={classes.infoText} color={"inherit"}>
          {user.name}
        </Typography>
        <Typography variant="body2" noWrap className={classes.infoText} color={"inherit"}>
          {user.bio}
        </Typography>
        {
          user.website &&
            <Typography
              variant="caption"
              className={classes.infoText}
              color={"inherit"}
              component={(props) => <a href={user.website} target="_blank" {...props} />}
            >
              {user.website.replace(/^https?:\/\//, '')}
            </Typography>
        }
      </div>
    )
  }

  renderUserProfile(user) {
    const { classes, currentSession } = this.props;

    return (
      <GridList cols={1} spacing={0} className={classes.userProfile}>
        <GridListTile cols={1} classes={{ tile: classes.userProfileGridListTile, root: classes.userProfileGridListRoot }}>
          {this.renderBanner(user.banner, user.slug)}
          <Hidden mdDown>
             <GridListTileBar
               className={classes.titleBar}
               title={
                 <div className={classes.titleBarContainer}>
                  <div className={classes.titleBarContainerUserInfo}>
                    <ProfileAvatar avatar={user.avatar} slug={user.slug} className={classes.userAvatar} />
                    {this.renderUserInfos(user)}
                  </div>
                  {
                    currentSession && currentSession.user.id === user.id &&
                      <div className={classes.titleBarContainerUserActions}>
                        {this.renderEditButton(user)}
                      </div>
                  }
                  {
                    currentSession && currentSession.user.id !== user.id &&
                      <div className={classes.titleBarContainerUserActions}>
                        {false && this.renderMessageButton(user)}
                        {this.renderFollowButton(user)}
                      </div>
                  }
                </div>
               }
             />
            </Hidden>
            <Hidden lgUp>
              <GridListTileBar
                className={classes.titleBar}
                title={
                   <div className={classes.mobileTitleBarContainer}>
                     <div className={classes.mobileTitleBarTop}>
                       <ProfileAvatar avatar={user.avatar} slug={user.slug} className={classes.userAvatar} />
                       {
                         currentSession && currentSession.user.id === user.id &&
                           <div className={classes.titleBarContainerUserActions}>
                             {this.renderEditButton(user)}
                           </div>
                       }
                       {
                         currentSession && currentSession.user.id !== user.id &&
                           <div className={classes.titleBarContainerUserActions}>
                             {this.renderMessageButton(user)}
                             {this.renderFollowButton(user)}
                           </div>
                       }
                    </div>
                 </div>
                }
              />
            </Hidden>
         </GridListTile>
      </GridList>
    )
  }

  render() {
    const { classes, match, currentSession } = this.props;

    return (
      <div ref={this.pageRef}>
        <Query query={GET_USER} variables={{ id: match.params.id }}>
          {({ data, loading, error }) => {
            if (error) {
              return (null);
            }

            let isPrivate;

            if (data.user && (data.user.public || (currentSession && data.user.id === currentSession.user.id))) {
              isPrivate = false;
            } else {
              isPrivate = true;
            }
            const Private = () => (
              <Typography variant="caption" noWrap color={"inherit"} style={{ fontSize: "0.8em" }}>
                Private
              </Typography>
            )

            return (
              <React.Fragment>
                {
                  !loading && data.user &&
                    <React.Fragment>
                      <PageTitle>{!loading && data.user ? data.user.name : null}</PageTitle>
                      <div ref={this.headerRef}>
                        {this.renderUserProfile(data.user)}
                        <Hidden lgUp>
                          <div className={classes.mobileUserInfos}>
                            {this.renderUserInfos(data.user)}
                          </div>
                        </Hidden>
                        <Paper className={classes.tabsContainer} elevation={0} square>
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
                                  label={data.user.mediaCount}
                                  icon="Videos"
                                />
                                <Tab
                                  value="following"
                                  disabled={isPrivate}
                                  label={isPrivate ? <Private /> : data.user.followingCount}
                                  icon="Following"
                                />
                                <Tab
                                  value="followers"
                                  disabled={isPrivate}
                                  label={isPrivate ? <Private /> : data.user.followersCount}
                                  icon="Followers"
                                />
                                <Tab
                                  value="likes"
                                  disabled={isPrivate}
                                  label={isPrivate ? <Private /> : data.user.likesCount}
                                  icon="Likes"
                                />
                              </Tabs>
                            </Grid>
                            <Grid item xs lg>
                            </Grid>
                          </Grid>
                        </Paper>
                      </div>
                      <Grid container className={classes.root} spacing={8} justify="center">
                        <Grid item item xs={12} lg={8}>
                          {this.state.tab === 'videos' && this.renderMedia(data.user)}
                          {this.state.tab === 'following' && this.renderFollowing(data.user)}
                          {this.state.tab === 'followers' && this.renderFollowers(data.user)}
                          {this.state.tab === 'likes' && this.renderLikes(data.user)}
                        </Grid>
                      </Grid>
                      <EditProfileDialog
                        user={data.user}
                        open={this.state.editProfileDialog}
                        onClose={() => this.setState({ editProfileDialog: false })}
                      />
                      <ChatDialog
                        user={data.user}
                        open={this.state.chatDialog}
                        onClose={() => this.setState({ chatDialog: false })}
                      />
                    </React.Fragment>
                }
              </React.Fragment>
            )
          }}
        </Query>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(withCurrentSession(withWidth()(User))));
