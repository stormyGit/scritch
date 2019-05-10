import React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";
import withWidth from "@material-ui/core/withWidth";
import withCurrentSession from "../withCurrentSession";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import ButtonBase from "@material-ui/core/ButtonBase";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Gallery from "react-grid-gallery";
import OutlinedFlag from "@material-ui/icons/OutlinedFlag";

import FavoriteIcon from "@material-ui/icons/Favorite";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import queryString from "query-string";

import {
  CREATE_FOLLOW,
  DELETE_FOLLOW,
  UPDATE_USER,
  BLOCK_USER,
  UNBLOCK_USER
} from "../../queries/userMutations";
import { GET_SESSION } from "../../queries/globalQueries";
import { GET_MEDIA } from "../../queries/mediaQueries";
import { LOAD_FURSUITS } from "../../queries/fursuitQueries";
import {
  GET_USER,
  GET_LIKES_BY_USER,
  GET_FOLLOWERS_BY_USER,
  GET_FOLLOWINGS_BY_USER
} from "../../queries/userQueries";

import MediumCard from "../Media/MediumCard";
import FursuitCard from "../Fursuits/FursuitCard";
import FursuitUserCard from "../Fursuits/FursuitUserCard";
import UserCard from "./UserCard";
import EmptyList from "../Global/EmptyList";
import UserAvatar from "./UserAvatar";
import ProfileAvatar from "./ProfileAvatar";
import PageTitle from "../Global/PageTitle";
import LoadMoreButton from "../Global/LoadMoreButton";
import BannerPlaceholder from "./BannerPlaceholder";
import EditProfileDialog from "./EditProfileDialog";
import ChatDialog from "../AppDialogs/ChatDialog";
import ReportDialog from "../AppDialogs/ReportDialog";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing.unit * 1,
    paddingRight: 0
  },
  tabsContainer: {
    background: theme.palette.background.paper
  },
  userProfile: {
    width: "100%",
    position: "relative",
    overflow: "visible",
    alignItems: "flex-end",
    paddingTop: 90
  },
  userProfileGridListTile: {
    overflow: "visible"
  },
  userProfileGridListRoot: {
    height: "100% !important",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%"
  },
  tabs: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  },
  userAvatar: {
    marginRight: theme.spacing.unit * 2
  },
  titleBar: {
    height: "auto",
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    background: "rgba(0, 0, 0, 0.9)",
    color: "#fff"
  },
  titleBarWrapNoRightMargin: {
    marginRight: theme.spacing.unit
  },
  titleBarContainer: {
    display: "flex",
    justifyContent: "space-between"
  },
  mobileTitleBarContainer: {
    display: "block"
  },
  mobileTitleBarTop: {
    display: "flex",
    justifyContent: "space-between"
  },
  titleBarContainerUserInfo: {
    display: "flex",
    alignItems: "center"
  },
  titleBarContainerUserActions: {
    display: "flex",
    alignItems: "center"
  },
  mobileUserInfos: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    background: theme.palette.type === "dark" ? "#111" : "#fff",
    color: theme.palette.type !== "dark" ? "#111" : "#fff"
  },
  followButtonSpacer: {
    width: 132
  },
  placeholderBanner: {
    width: "100%",
    paddingTop: "20%"
  },
  bannerImageContainer: {
    position: "relative",
    height: "100%",
    width: "100%",
    overflow: "hidden"
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0
  },
  bannerImageWide: {
    width: "100%",
    height: "100%"
  },
  menuButton: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    justifyContent: "center"
  },
  makerLink: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    cursor: "pointer"
  },
  infoText: {}
});

class User extends React.Component {
  state = {
    tab: "pictures",
    showUnfollow: false,
    editProfileDialog: false,
    chatDialog: false,
    moreMenu: false,
    reportDialog: false
  };

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

  componentWillUnmount() {}

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.tab !== nextProps.match.params.tab) {
      this.setState({ tab: nextProps.match.params.tab || "pictures" });
    }
  }

  handleRequestSearch(q) {
    this.props.history.push({
      pathname: "/pictures",
      search: queryString.stringify({ q })
    });
  }

  handleTabChange(tab) {
    this.props.history.push({
      pathname: `/${this.props.match.params.id}/${tab}`
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
              data: {
                user: {
                  ...user,
                  followed: false,
                  followersCount: user.followersCount - 1
                }
              }
            });

            const { session } = cache.readQuery({ query: GET_SESSION });
            cache.writeQuery({
              query: GET_SESSION,
              data: {
                session: {
                  ...session,
                  user: {
                    ...session.user,
                    followingCount: session.user.followingCount - 1
                  }
                }
              }
            });

            const { followersByUser } = cache.readQuery({
              query: GET_FOLLOWERS_BY_USER,
              variables: { userId: user.id }
            });
            cache.writeQuery({
              query: GET_FOLLOWERS_BY_USER,
              variables: { userId: user.id },
              data: {
                followersByUser: followersByUser.filter(
                  follower => follower.id != this.props.currentSession.user.id
                )
              }
            });
          }}
        >
          {(deleteFollow, { data }) => (
            <Button
              variant="contained"
              size={width !== "lg" && width !== "xl" ? "small" : "medium"}
              className={
                width === "lg" || width === "xl"
                  ? this.props.classes.followButtonSpacer
                  : null
              }
              color={this.state.showUnfollow ? "secondary" : "primary"}
              onMouseEnter={() => this.setState({ showUnfollow: true })}
              onMouseLeave={() => this.setState({ showUnfollow: false })}
              onClick={() => {
                deleteFollow({
                  variables: { input: { followableId: user.id } }
                });
              }}
            >
              {this.state.showUnfollow ? "Unfollow" : "Following"}
            </Button>
          )}
        </Mutation>
      );
    } else {
      return (
        <Mutation
          mutation={CREATE_FOLLOW}
          update={(cache, { data: { createFollow } }) => {
            cache.writeQuery({
              query: GET_USER,
              variables: { id: user.id },
              data: {
                user: {
                  ...user,
                  followed: true,
                  followersCount: user.followersCount + 1
                }
              }
            });

            const { session } = cache.readQuery({ query: GET_SESSION });
            cache.writeQuery({
              query: GET_SESSION,
              data: {
                session: {
                  ...session,
                  user: {
                    ...session.user,
                    followingCount: session.user.followingCount + 1
                  }
                }
              }
            });

            const { followersByUser } = cache.readQuery({
              query: GET_FOLLOWERS_BY_USER,
              variables: { userId: user.id }
            });
            cache.writeQuery({
              query: GET_FOLLOWERS_BY_USER,
              variables: { userId: user.id },
              data: {
                followersByUser: [
                  this.props.currentSession.user,
                  ...followersByUser
                ]
              }
            });
          }}
        >
          {(createFollow, { data }) => (
            <Button
              variant="contained"
              size={width !== "lg" && width !== "xl" ? "small" : "medium"}
              onClick={() => {
                createFollow({
                  variables: { input: { followableId: user.id } }
                });
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
        size={width !== "lg" && width !== "xl" ? "small" : "medium"}
        onClick={() => this.setState({ editProfileDialog: true })}
        style={{
          marginRight: 8
        }}
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
        size={width !== "lg" && width !== "xl" ? "small" : "medium"}
        onClick={() => this.setState({ chatDialog: true })}
        style={{
          marginRight: 8
        }}
      >
        Message
      </Button>
    );
  }

  renderMoreUserOptions(user) {
    const { classes, width } = this.props;

    return (
      <React.Fragment>
        <IconButton
          id="moreUserOptionsButton"
          color="secondary"
          onClick={() => this.setState({ moreMenu: true })}
          style={{
            marginLeft: 8
          }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={document.getElementById("moreUserOptionsButton")}
          open={this.state.moreMenu}
          onClose={() => this.setState({ moreMenu: false })}
        >
          {user.blocked ? (
            <Mutation mutation={UNBLOCK_USER}>
              {(unblockUser, { data }) => (
                <MenuItem
                  onClick={() => {
                    unblockUser({
                      variables: { input: { userId: user.id } }
                    }).then(() => {
                      location.reload();
                    });
                  }}
                >
                  {`Unblock ${user.name}`}
                </MenuItem>
              )}
            </Mutation>
          ) : (
            <Mutation mutation={BLOCK_USER}>
              {(blockUser, { data }) => (
                <MenuItem
                  onClick={() => {
                    blockUser({
                      variables: { input: { userId: user.id } }
                    }).then(() => {
                      document.location.href = "/";
                    });
                  }}
                >
                  {`Block ${user.name}`}
                </MenuItem>
              )}
            </Mutation>
          )}
          <MenuItem onClick={() => this.setState({ reportDialog: true })}>
            {`Report ${user.name}`}&nbsp;&nbsp;
            <OutlinedFlag />
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }

  renderMedia(user) {
    const { width } = this.props;
    let offset = 0;
    let limit = parseInt(process.env.USER_MEDIA_PAGE_SIZE);

    return (
      <Query
        query={GET_MEDIA}
        variables={{ sort: "latest", userId: user.id, offset, limit }}
      >
        {({ data, loading, error, fetchMore }) => {
          if (loading || error) {
            return null;
          }

          if (data.media.length === 0) {
            return (
              <EmptyList label={`${user.name} doesn't have any pictures.`} />
            );
          }

          return (
            <React.Fragment>
              <Grid container spacing={8}>
                {data.media.map(medium => (
                  <Grid item xs={6} md={4} lg={3} xl={2} key={medium.id}>
                    <MediumCard medium={medium} />
                  </Grid>
                ))}
                {data.media.length < user.mediaCount && (
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
                )}
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
      <Query
        query={GET_FOLLOWINGS_BY_USER}
        variables={{ userId: user.id, offset, limit }}
      >
        {({ data, loading, error, fetchMore }) => {
          if (loading || error) {
            return null;
          }

          if (data.followingsByUser.length === 0) {
            return <EmptyList label={`${user.name} doesn't follow anybody.`} />;
          }

          return (
            <React.Fragment>
              <Grid container spacing={8}>
                {data.followingsByUser.map(following => (
                  <Grid item xs={12} lg={4} key={following.id}>
                    <UserCard user={following} />
                  </Grid>
                ))}
                {data.followingsByUser.length < user.followingCount && (
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
                            followingsByUser: [
                              ...prev.followingsByUser,
                              ...fetchMoreResult.followingsByUser
                            ]
                          });
                        }
                      });
                    }}
                  />
                )}
              </Grid>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }

  renderFursuits(user) {
    const { width } = this.props;
    let offset = 0;
    let limit = parseInt(process.env.FOLLOWERS_PAGE_SIZE);

    return (
      <React.Fragment>
        <Grid container spacing={8}>
          {user.fursuits.map(fursuit => (
            <Grid item xs={12} key={fursuit.id}>
              <FursuitUserCard fursuit={fursuit} user={user} />
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    );
  }

  renderFollowers(user) {
    const { width } = this.props;
    let offset = 0;
    let limit = parseInt(process.env.FOLLOWERS_PAGE_SIZE);

    return (
      <Query
        query={GET_FOLLOWERS_BY_USER}
        variables={{ userId: user.id, offset, limit }}
      >
        {({ data, loading, error, fetchMore }) => {
          if (loading || error) {
            return null;
          }

          if (data.followersByUser.length === 0) {
            return (
              <EmptyList label={`${user.name} doesn't have any followers.`} />
            );
          }

          return (
            <React.Fragment>
              <Grid container spacing={8}>
                {data.followersByUser.map(follower => (
                  <Grid item xs={12} lg={4} key={follower.id}>
                    <UserCard user={follower} />
                  </Grid>
                ))}
                {data.followersByUser.length < user.followersCount && (
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
                            followersByUser: [
                              ...prev.followersByUser,
                              ...fetchMoreResult.followersByUser
                            ]
                          });
                        }
                      });
                    }}
                  />
                )}
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
      <Query
        query={GET_LIKES_BY_USER}
        variables={{ userId: user.id, offset, limit }}
      >
        {({ data, loading, error, fetchMore }) => {
          if (loading || error) {
            return null;
          }

          if (data.likesByUser.length === 0) {
            return <EmptyList label={`${user.name} doesn't have any likes.`} />;
          }

          return (
            <React.Fragment>
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <Gallery
                    images={data.likesByUser.map(like => ({
                      src: like.medium.thumbnail,
                      thumbnail: like.medium.thumbnail,
                      thumbnailWidth:
                        like.medium.width / (like.medium.height / 256.0),
                      thumbnailHeight: 256
                    }))}
                  />
                </Grid>
                {data.likesByUser.length < user.likesCount && (
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
                            likesByUser: [
                              ...prev.likesByUser,
                              ...fetchMoreResult.likesByUser
                            ]
                          });
                        }
                      });
                    }}
                  />
                )}
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
          <img src={banner} className={classes.bannerImage} />
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
    const { classes, currentSession, width } = this.props;

    return (
      <div>
        {user.makers && user.makers.length > 0 && (
          <Typography
            variant="h6"
            className={classes.infoText}
            color={"inherit"}
          >
            {user.name} (Owner of{" "}
            {user.makers.map((maker, index) => (
              <Link className={classes.makerLink} to={`/makers/${maker.slug}`}>
                {maker.name}
                {index < user.makers.length - 1 ? ", " : ""}
              </Link>
            ))}
            )
          </Typography>
        )}
        {(!user.makers || user.makers.length == 0) && (
          <Typography
            variant="h6"
            className={classes.infoText}
            color={"inherit"}
          >
            {user.name}
          </Typography>
        )}
        <Typography
          variant="body2"
          noWrap={width !== "xs" && width !== "sm"}
          className={classes.infoText}
          color={"inherit"}
        >
          {user.bio}
        </Typography>
        {user.website && (
          <Typography
            variant="caption"
            className={classes.infoText}
            color={"inherit"}
            component={props => (
              <a href={user.website} target="_blank" {...props} />
            )}
          >
            Website
          </Typography>
        )}
      </div>
    );
  }

  renderUserProfile(user) {
    const { classes, currentSession } = this.props;

    return (
      <GridList cols={1} spacing={0} className={classes.userProfile}>
        <GridListTile
          cols={1}
          classes={{
            tile: classes.userProfileGridListTile,
            root: classes.userProfileGridListRoot
          }}
        >
          {false && this.renderBanner(user.banner, user.slug)}
          <Hidden mdDown>
            <GridListTileBar
              className={classes.titleBar}
              classes={{
                titleWrap: classes.titleBarWrapNoRightMargin
              }}
              title={
                <div className={classes.titleBarContainer}>
                  <div className={classes.titleBarContainerUserInfo}>
                    <ProfileAvatar
                      avatar={user.avatar}
                      slug={user.slug}
                      className={classes.userAvatar}
                    />
                    {this.renderUserInfos(user)}
                  </div>
                  {currentSession && currentSession.user.id === user.id && (
                    <div className={classes.titleBarContainerUserActions}>
                      {this.renderEditButton(user)}
                    </div>
                  )}
                  {currentSession && currentSession.user.id !== user.id && (
                    <div className={classes.titleBarContainerUserActions}>
                      {currentSession &&
                        currentSession.user.sponsor &&
                        this.renderFollowButton(user)}
                      {this.renderMoreUserOptions(user)}
                    </div>
                  )}
                </div>
              }
            />
          </Hidden>
          <Hidden lgUp>
            <GridListTileBar
              className={classes.titleBar}
              classes={{
                titleWrap: classes.titleBarWrapNoRightMargin
              }}
              title={
                <div className={classes.mobileTitleBarContainer}>
                  <div className={classes.mobileTitleBarTop}>
                    <ProfileAvatar
                      avatar={user.avatar}
                      slug={user.slug}
                      className={classes.userAvatar}
                    />
                    {currentSession && currentSession.user.id === user.id && (
                      <div className={classes.titleBarContainerUserActions}>
                        {this.renderEditButton(user)}
                      </div>
                    )}
                    {currentSession && currentSession.user.id !== user.id && (
                      <div className={classes.titleBarContainerUserActions}>
                        {user.chatEnabled && this.renderMessageButton(user)}
                        {this.renderFollowButton(user)}
                        {this.renderMoreUserOptions(user)}
                      </div>
                    )}
                  </div>
                </div>
              }
            />
          </Hidden>
        </GridListTile>
      </GridList>
    );
  }

  render() {
    const { classes, match, currentSession, width } = this.props;

    let tabTypoSize =
      width === "xs" || width === "sm" ? "subtitle2" : "subtitle1";
    return (
      <div ref={this.pageRef}>
        <Query query={GET_USER} variables={{ id: match.params.id }}>
          {({ data, loading, error }) => {
            if (error) {
              return null;
            }

            let isPrivate;

            if (
              data.user &&
              (data.user.public ||
                (currentSession && data.user.id === currentSession.user.id))
            ) {
              isPrivate = false;
            } else {
              isPrivate = true;
            }

            return (
              <React.Fragment>
                {!loading && data.user && (
                  <React.Fragment>
                    <PageTitle>
                      {!loading && data.user ? data.user.name : null}
                    </PageTitle>
                    <div ref={this.headerRef}>
                      {this.renderUserProfile(data.user)}
                      <Hidden lgUp>
                        <div className={classes.mobileUserInfos}>
                          {this.renderUserInfos(data.user)}
                        </div>
                      </Hidden>
                      <Paper
                        className={classes.tabsContainer}
                        elevation={0}
                        square
                      >
                        <Grid container spacing={0}>
                          <Grid item xs lg />
                          <Grid item xs={12} lg={8}>
                            <Tabs
                              value={this.state.tab}
                              className={classes.tabs}
                              onChange={(e, value) =>
                                this.handleTabChange(value)
                              }
                              indicatorColor="secondary"
                              textColor="secondary"
                              fullWidth
                            >
                              <Tab
                                value="pictures"
                                label={
                                  <Typography
                                    variant={tabTypoSize}
                                    color={
                                      this.state.tab === "pictures"
                                        ? "secondary"
                                        : "primary"
                                    }
                                  >
                                    {data.user.mediaCount}
                                  </Typography>
                                }
                                icon={
                                  <Typography
                                    variant={tabTypoSize}
                                    color={
                                      this.state.tab === "pictures"
                                        ? "secondary"
                                        : "primary"
                                    }
                                  >
                                    Pictures
                                  </Typography>
                                }
                              />
                              <Tab
                                value="fursuits"
                                disabled={isPrivate}
                                label={
                                  isPrivate ? (
                                    <Typography
                                      variant="subtitle2"
                                      color={
                                        this.state.tab === "fursuits"
                                          ? "secondary"
                                          : "primary"
                                      }
                                    >
                                      Private
                                    </Typography>
                                  ) : (
                                    <Typography
                                      variant={tabTypoSize}
                                      color={
                                        this.state.tab === "fursuits"
                                          ? "secondary"
                                          : "primary"
                                      }
                                    >
                                      {data.user.fursuits
                                        ? data.user.fursuits.length
                                        : 0}
                                    </Typography>
                                  )
                                }
                                icon={
                                  <Typography
                                    variant={tabTypoSize}
                                    color={
                                      this.state.tab === "fursuits"
                                        ? "secondary"
                                        : "primary"
                                    }
                                  >
                                    Fursuits
                                  </Typography>
                                }
                              />
                              {currentSession.user.id == data.user.id && (
                                <Tab
                                  value="following"
                                  disabled={isPrivate}
                                  label={
                                    isPrivate ? (
                                      <Typography
                                        variant="subtitle2"
                                        color={
                                          this.state.tab === "following"
                                            ? "secondary"
                                            : "primary"
                                        }
                                      >
                                        Private
                                      </Typography>
                                    ) : (
                                      <Typography
                                        variant={tabTypoSize}
                                        color={
                                          this.state.tab === "following"
                                            ? "secondary"
                                            : "primary"
                                        }
                                      >
                                        {data.user.followingCount}
                                      </Typography>
                                    )
                                  }
                                  icon={
                                    <Typography
                                      variant={tabTypoSize}
                                      color={
                                        this.state.tab === "following"
                                          ? "secondary"
                                          : "primary"
                                      }
                                    >
                                      Following
                                    </Typography>
                                  }
                                />
                              )}
                              {currentSession.user.id == data.user.id && (
                                <Tab
                                  value="followers"
                                  disabled={isPrivate}
                                  label={
                                    isPrivate ? (
                                      <Typography
                                        variant="subtitle2"
                                        color={
                                          this.state.tab === "followers"
                                            ? "secondary"
                                            : "primary"
                                        }
                                      >
                                        Private
                                      </Typography>
                                    ) : (
                                      <Typography
                                        variant={tabTypoSize}
                                        color={
                                          this.state.tab === "followers"
                                            ? "secondary"
                                            : "primary"
                                        }
                                      >
                                        {data.user.followersCount}
                                      </Typography>
                                    )
                                  }
                                  icon={
                                    <Typography
                                      variant={tabTypoSize}
                                      color={
                                        this.state.tab === "followers"
                                          ? "secondary"
                                          : "primary"
                                      }
                                    >
                                      Followers
                                    </Typography>
                                  }
                                />
                              )}
                            </Tabs>
                          </Grid>
                          <Grid item xs lg />
                        </Grid>
                      </Paper>
                    </div>
                    <Grid
                      container
                      className={classes.root}
                      spacing={8}
                      justify="center"
                    >
                      <Grid
                        item
                        item
                        xs={12}
                        lg={this.state.tab == "fursuits" ? 8 : 10}
                      >
                        {this.state.tab === "pictures" &&
                          this.renderMedia(data.user)}
                        {this.state.tab === "fursuits" &&
                          this.renderFursuits(data.user)}
                        {this.state.tab === "following" &&
                          this.renderFollowing(data.user)}
                        {this.state.tab === "followers" &&
                          this.renderFollowers(data.user)}
                      </Grid>
                    </Grid>
                    <EditProfileDialog
                      user={data.user}
                      open={this.state.editProfileDialog}
                      onClose={() =>
                        this.setState({ editProfileDialog: false })
                      }
                    />
                    <ReportDialog
                      resource="user"
                      resourceId={data.user.id}
                      open={this.state.reportDialog}
                      onClose={() =>
                        this.setState({ reportDialog: false, moreMenu: false })
                      }
                    />
                  </React.Fragment>
                )}
              </React.Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default withStyles(styles)(
  withRouter(withCurrentSession(withWidth()(User)))
);
