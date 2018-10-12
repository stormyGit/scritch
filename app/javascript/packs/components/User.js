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

import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';

import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { Parallax, Background } from 'react-parallax';

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
  },
  userProfileGridListTile: {
    overflow: 'visible',
  },
  userProfileGridListRoot: {
    height: '100% !important',
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
  },
  followButton: {
    width: 132
  },
  placeholderBanner: {
    width: '100%',
  },
  bannerImageWide: {
    top: '-50%'
  },
  menuButton: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    justifyContent: 'center'
  },
  infoText: {
    color: 'white'
  }
});

class User extends React.Component {
  state = {
    tab: 'videos',
    showUnfollow: false,
    editProfileDialog: false,
    bannerHeight: null,
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
    this.setState({ bannerHeight: this.pageRef.current.offsetWidth * 0.33 });
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

            const { followersByUser } = cache.readQuery({ query: GET_FOLLOWERS_BY_USER, variables: { userId: user.id, page: 1, per: 30 } });
            cache.writeQuery({
              query: GET_FOLLOWERS_BY_USER,
              variables: { userId: user.id, page: 1, per: 30 },
              data: { followersByUser: followersByUser.filter((follower) => follower.id != this.props.currentSession.user.id) }
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

            const { followersByUser } = cache.readQuery({ query: GET_FOLLOWERS_BY_USER, variables: { userId: user.id, page: 1, per: 30 } });
            cache.writeQuery({
              query: GET_FOLLOWERS_BY_USER,
              variables: { userId: user.id, page: 1, per: 30 },
              data: { followersByUser: [ this.props.currentSession.user, ...followersByUser] }
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

  renderEditButton(user) {
    const { classes } = this.props;

    return (
      <Button
        variant="contained"
        size="large"
        onClick={() => this.setState({ editProfileDialog: true })}
      >
        Edit profile
      </Button>
    );
  }

  renderEditFab(user) {
    const { classes } = this.props;

    return (
      <Button
        variant="fab"
        className={classes.editFab}
        onClick={() => this.setState({ editProfileDialog: true })}
      >
        <EditIcon />
      </Button>
    );
  }

  renderMedia(user) {
    const { width } = this.props;
    let page = 1;
    let per = 10;

    return (
      <Query query={GET_MEDIA} variables={{ sort: "latest", userId: user.id, page, per }} fetchPolicy="network-only">
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
                  ((data.media.length % per) === 0 && data.media.length / per === page) &&
                    <LoadMoreButton
                      onClick={() => {
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
    let page = 1;
    let per = 30;

    return (
      <Query query={GET_FOLLOWINGS_BY_USER} variables={{ userId: user.id, page, per }}>
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
                  ((data.followingsByUser.length % per) === 0 && data.followingsByUser.length / per === page) &&
                    <LoadMoreButton
                      onClick={() => {
                        page++;

                        fetchMore({
                          variables: {
                            page,
                            per
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
    let page = 1;
    let per = 30;

    return (
      <Query query={GET_FOLLOWERS_BY_USER} variables={{ userId: user.id, page, per }}>
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
                  ((data.followersByUser.length % per) === 0 && data.followersByUser.length / per === page) &&
                    <LoadMoreButton
                      onClick={() => {
                        page++;

                        fetchMore({
                          variables: {
                            page,
                            per
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
    let page = 1;
    let per = 10;

    return (
      <Query query={GET_LIKES_BY_USER} variables={{ userId: user.id, page, per }}>
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
                  ((data.likesByUser.length % per) === 0 && data.likesByUser.length / per === page) &&
                    <LoadMoreButton
                      onClick={() => {
                        page++;

                        fetchMore({
                          variables: {
                            page,
                            per
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

    if (!this.state.bannerHeight) {
      return (null);
    }

    if (banner) {
      return (
        <Parallax
          bgImage={banner}
          strength={300}
          bgClassName={classes.bannerImageWide}
        >
          <div style={{ height: this.state.bannerHeight, width: '100%' }} />
        </Parallax>
      );
    }

    return (
      <BannerPlaceholder
        className={classes.placeholderBanner}
        style={{
          height: this.state.bannerHeight
        }}
        length={180}
        slug={slug}
      />
    );
  }

  renderUserProfile(user) {
    const { classes, currentSession } = this.props;

    return (
      <GridList cols={1} spacing={0} className={classes.userProfile} style={{ height: this.state.bannerHeight }}>
        <GridListTile cols={1} classes={{ tile: classes.userProfileGridListTile, root: classes.userProfileGridListRoot }}>
          {this.renderBanner(user.banner, user.slug)}
           <GridListTileBar
             className={classes.titleBar}
             title={
               <div className={classes.titleBarContainer}>
                <div className={classes.titleBarContainerUserInfo}>
                  <ProfileAvatar avatar={user.avatar} slug={user.slug} className={classes.userAvatar} />
                  <div>
                    <Typography variant="title" className={classes.infoText}>
                      {user.name}
                    </Typography>
                    <Typography variant="body2" noWrap className={classes.infoText}>
                      {user.bio}
                    </Typography>
                    {
                      user.website &&
                        <Typography
                          variant="caption"
                          className={classes.infoText}
                          component={(props) => <a href={user.website} target="_blank" {...props} />}
                        >
                          {user.website.replace(/^https?:\/\//, '')}
                        </Typography>
                    }
                  </div>
                </div>
                <Hidden mdDown>
                  {
                    currentSession && currentSession.user.id === user.id &&
                      <div className={classes.titleBarContainerUserActions}>
                        {this.renderEditButton(user)}
                      </div>
                  }
                  {
                    currentSession && currentSession.user.id !== user.id &&
                      <div className={classes.titleBarContainerUserActions}>
                        {this.renderFollowButton(user)}
                      </div>
                  }
                </Hidden>
                <Hidden lgUp>
                  {
                    currentSession && currentSession.user.id === user.id &&
                      <div className={classes.titleBarContainerUserActions}>
                        {this.renderEditFab(user)}
                      </div>
                  }
                </Hidden>
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
      <div ref={this.pageRef}>
        <Query query={GET_USER} variables={{ id: match.params.id }}>
          {({ data, loading, error }) => (
            <React.Fragment>
              {
                !loading && data.user &&
                  <React.Fragment>
                    <PageTitle>{!loading && data.user ? data.user.name : null}</PageTitle>
                    <div ref={this.headerRef}>
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
                                label={data.user.mediaCount}
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
                  </React.Fragment>
              }
            </React.Fragment>
          )}
        </Query>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(withCurrentSession(withWidth()(User))));
