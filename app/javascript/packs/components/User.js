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

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { Parallax, Background } from 'react-parallax';

import { withRouter } from 'react-router-dom'

import queryString from 'query-string';

import { GET_USER, CREATE_FOLLOW, DELETE_FOLLOW, UPDATE_USER, GET_SESSION, GET_MEDIA, GET_LIKES_BY_USER } from '../queries';

import MediumCard from './MediumCard';
import EmptyList from './EmptyList';
import UserAvatar from './UserAvatar';
import ProfileAvatar from './ProfileAvatar';
import PageTitle from './PageTitle';
import LoadMoreButton from './LoadMoreButton';
import BannerPlaceholder from './BannerPlaceholder';
import withCurrentSession from './withCurrentSession';

const BANNER_HEIGHT = '33vw';

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
    height: BANNER_HEIGHT,
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
  userColumn: {
    minWidth: 200
  },
  followButton: {
    width: 132
  },
  bannerMenu: {
    zIndex: 2,
  },
  editBannerButton: {
    width: '100%',
    height: `calc(${BANNER_HEIGHT} - ${theme.spacing.unit * 10}px)`,
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
  bannerImageWide: {
    top: '-50%'
  },
  editBannerIcon: {
    display: 'block',
    fontSize: '4em',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing.unit,
    color: "white"
  },
  bioField: {
    marginLeft: theme.spacing.unit * 2,
  },
  menuButton: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    justifyContent: 'center'
  },
  uploadInput: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    margin: 0,
    padding: 0,
    opacity: 0
  },
  cancelEditButton: {
    marginRight: theme.spacing.unit,
    color: "white"
  },
  infoText: {
    color: 'white'
  }
});

class User extends React.Component {
  state = {
    tab: 'videos',
    showUnfollow: false,
    edit: false,
    name: '',
    bio: '',
    banner: null,
    avatar: null,
    bannerMenu: false,
    avatarMenu: false,
  }

  constructor(props) {
    super(props);
    this.bannerUploadInput = React.createRef();
    this.avatarUploadInput = React.createRef();
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

  renderEditButton(user) {
    const { classes } = this.props;

    if (this.state.edit) {
      return (
        <React.Fragment>
          <Button
            variant="outlined"
            size="large"
            className={classes.cancelEditButton}
            onClick={() => {
              this.setState({
                edit: false,
                banner: null,
                name: '',
                bio: ''
              })
            }}
          >
            Cancel
          </Button>
          <Mutation
            mutation={UPDATE_USER}
            update={(cache, { data: { updateUser } }) => {
              const { session } = cache.readQuery({ query: GET_SESSION });
              cache.writeQuery({
                query: GET_SESSION,
                data: { session: { ...session, user: updateUser.user } }
              });
            }}
          >
            {( updateUser, { data }) => (
              <Button
                variant="contained"
                size="large"
                color={"primary"}
                onClick={() => {
                  updateUser({
                    variables: {
                      input: {
                        id: user.id,
                        name: this.state.name,
                        bio: this.state.bio,
                        banner: this.state.banner,
                        avatar: this.state.avatar,
                        removeBanner: this.state.removeBanner,
                        removeAvatar: this.state.removeAvatar,
                      }
                    }
                  }).then(() => {
                    this.setState({ edit: false });
                  })
                }}
              >
                Save
              </Button>
            )}
          </Mutation>
        </React.Fragment>
      );
    } else {
      return (
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            this.setState({
              edit: true,
              name: user.name,
              bio: user.bio || '',
              banner: user.banner,
              avatar: user.avatar,
              removeAvatar: false,
              removeBanner: false,
            })
          }}
        >
          Edit profile
        </Button>
      );
    }
  }

  renderEditFab(user) {
    const { classes } = this.props;

    if (this.state.edit) {
      return (
        <Mutation
          mutation={UPDATE_USER}
          update={(cache, { data: { updateUser } }) => {
            const { session } = cache.readQuery({ query: GET_SESSION });
            cache.writeQuery({
              query: GET_SESSION,
              data: { session: { ...session, user: updateUser.user } }
            });
          }}
        >
          {( updateUser, { data }) => (
            <Button
              variant="fab"
              className={classes.editFab}
              onClick={() => {
                updateUser({
                  variables: {
                    input: {
                      id: user.id,
                      name: this.state.name,
                      bio: this.state.bio,
                      banner: this.state.banner,
                      avatar: this.state.avatar,
                      removeBanner: this.state.removeBanner,
                      removeAvatar: this.state.removeAvatar,
                    }
                  }
                }).then(() => {
                  this.setState({ edit: false });
                })
              }}
            >
              <CheckIcon />
            </Button>
          )}
        </Mutation>
      );
    }
    return (
      <Button
        variant="fab"
        className={classes.editFab}
        onClick={() => {
          this.setState({
            edit: true,
            name: user.name,
            bio: user.bio || '',
            banner: user.banner,
            avatar: user.avatar,
            removeAvatar: false,
            removeBanner: false,
          })
        }}
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
      <Query query={GET_MEDIA} variables={{ sort: "latest", userId: user.id, page, per }}>
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

    if (banner) {
      return (
        <Parallax
          bgImage={banner}
          strength={300}
          bgClassName={classes.bannerImageWide}
        >
          <div style={{ height: BANNER_HEIGHT, width: '100%' }} />
        </Parallax>
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

  renderUserProfile(user) {
    const { classes, currentSession } = this.props;

    return (
      <GridList cols={1} spacing={0} className={classes.userProfile}>
        <GridListTile cols={1} classes={{ tile: classes.userProfileGridListTile, root: classes.userProfileGridListRoot }}>
          {
            this.state.edit &&
              <React.Fragment>
                <Button
                  className={classes.editBannerButton}
                  onClick={() => this.setState({ bannerMenu: true })}
                >
                  <div id="uploadBannerButton" className={classes.infoText}>
                    <InsertPhotoIcon className={classes.editBannerIcon} />
                    Change banner
                  </div>
                </Button>
                <Popper open={this.state.bannerMenu} anchorEl={document.getElementById("uploadBannerButton")} transition disablePortal className={classes.bannerMenu}>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      id="menu-list-grow"
                      style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={() => this.setState({ bannerMenu: false })}>
                          <MenuList disablePadding>
                            <MenuItem
                              className={classes.menuButton}
                              onClick={() => {
                                this.bannerUploadInput.current.click();
                                this.setState({ bannerMenu: false })
                              }}
                            >
                              Upload picture
                            </MenuItem>
                            <MenuItem
                              className={classes.menuButton}
                              onClick={() => {
                                this.setState({ banner: null, removeBanner: true, bannerMenu: false });
                              }}
                            >
                              Remove
                            </MenuItem>
                            <Divider />
                            <MenuItem
                              className={classes.menuButton}
                              onClick={() => this.setState({ bannerMenu: false })}
                            >
                              Cancel
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
                <input
                  className={classes.uploadInput}
                  ref={this.bannerUploadInput}
                  type="file"
                  onChange={(e) => {
                    var reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onload = () => {
                      this.setState({ banner: reader.result, removeBanner: false });
                    };
                  }}
                />
              </React.Fragment>
          }
          {
            this.state.edit ? this.renderBanner(this.state.banner, user.slug) : this.renderBanner(user.banner, user.slug)
          }
           <GridListTileBar
             className={classes.titleBar}
             title={
               <div className={classes.titleBarContainer}>
                <div className={classes.titleBarContainerUserInfo}>
                    {
                      this.state.edit &&
                        <React.Fragment>
                          <Button
                            className={classes.editAvatarButton}
                            onClick={() => this.setState({ avatarMenu: true })}
                          >
                            <div id="uploadAvatarButton">
                              <InsertPhotoIcon />
                            </div>
                          </Button>
                          <Popper open={this.state.avatarMenu} anchorEl={document.getElementById("uploadAvatarButton")} transition disablePortal className={classes.bannerMenu}>
                            {({ TransitionProps, placement }) => (
                              <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                              >
                                <Paper>
                                  <ClickAwayListener onClickAway={() => this.setState({ avatarMenu: false })}>
                                    <MenuList disablePadding>
                                      <MenuItem
                                        className={classes.menuButton}
                                        onClick={() => {
                                          this.avatarUploadInput.current.click();
                                          this.setState({ avatarMenu: false })
                                        }}
                                      >
                                        Upload picture
                                      </MenuItem>
                                      <MenuItem
                                        className={classes.menuButton}
                                        onClick={() => {
                                          this.setState({ avatar: null, removeAvatar: true, avatarMenu: false });
                                        }}
                                      >
                                        Remove
                                      </MenuItem>
                                      <Divider />
                                      <MenuItem
                                        className={classes.menuButton}
                                        onClick={() => this.setState({ avatarMenu: false })}
                                      >
                                        Cancel
                                      </MenuItem>
                                    </MenuList>
                                  </ClickAwayListener>
                                </Paper>
                              </Grow>
                            )}
                          </Popper>
                          <input
                            className={classes.uploadInput}
                            ref={this.avatarUploadInput}
                            type="file"
                            onChange={(e) => {
                              var reader = new FileReader();
                              reader.readAsDataURL(e.target.files[0]);
                              reader.onload = () => {
                                this.setState({ avatar: reader.result, removeAvatar: false });
                              };
                            }}
                          />
                        </React.Fragment>
                    }
                   {
                     this.state.edit ?
                       <ProfileAvatar avatar={this.state.avatar} slug={user.slug} className={classes.userAvatar} /> :
                       <ProfileAvatar avatar={user.avatar} slug={user.slug} className={classes.userAvatar} />
                   }
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
                        <Typography variant="title" className={classes.infoText}>
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
                        <Typography variant="body2" noWrap className={classes.infoText}>
                         {user.bio}
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
      <Query query={GET_USER} variables={{ id: match.params.id }}>
        {({ data, loading, error }) => (
          <React.Fragment>
            {
              !loading && data.user &&
                <React.Fragment>
                  <PageTitle>{!loading && data.user ? data.user.name : null}</PageTitle>
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
                  <Grid container className={classes.root} spacing={8} justify="center">
                    <Grid item item xs={12} lg={8}>
                      {this.state.tab === 'videos' && this.renderMedia(data.user)}
                      {this.state.tab === 'following' && this.renderFollowing(data.user)}
                      {this.state.tab === 'followers' && this.renderFollowers(data.user)}
                      {this.state.tab === 'likes' && this.renderLikes(data.user)}
                    </Grid>
                  </Grid>
                </React.Fragment>
            }
          </React.Fragment>
        )}
      </Query>
    );
  }
}

export default withStyles(styles)(withRouter(withCurrentSession(withWidth()(User))));
