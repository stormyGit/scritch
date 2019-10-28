import React from "react";
import { Query, Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import IconButton from "@material-ui/core/IconButton";

import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import PageTitle from "../Global/PageTitle";
import MediaUser from "../Media/MediaUser";
import UserCard from "./UserCard";
import EmptyList from "../Global/EmptyList";

import EditIcon from "@material-ui/icons/Edit";
import BlockIcon from "@material-ui/icons/NotInterested";
import OutlinedFlag from "@material-ui/icons/OutlinedFlag";

import withCurrentSession from "../withCurrentSession";
import { withRouter } from "react-router-dom";
import {
  CREATE_FOLLOW,
  DELETE_FOLLOW,
  BLOCK_USER,
  UNBLOCK_USER
} from "../../queries/userMutations";
import { GET_SESSION } from "../../queries/globalQueries";
import {
  GET_USER,
  GET_FOLLOWERS_BY_USER,
  GET_FOLLOWINGS_PROFILES_BY_USER,
  GET_FOLLOWINGS_FURSUITS_BY_USER,
  GET_FOLLOWINGS_MAKERS_BY_USER
} from "../../queries/userQueries";

import EditProfileDialog from "./EditProfileDialog";
import ReportDialog from "../AppDialogs/ReportDialog";
import FursuitUserCard from "../Fursuits/FursuitUserCard";
import FursuitFollowedCard from "./FursuitFollowedCard";
import MakerFollowedCard from "./MakerFollowedCard";

const styles = theme => ({
  container: {
    display: "flex",
    minHeight: "calc(100vh - 56px)"
  },
  UnderReview: {
    height: "40vw",
    position: "relative"
  },
  card: {
    width: "100%",
    borderRadius: 0,
    backgroundColor: theme.palette.background
  },
  pictureInfo: {
    padding: theme.spacing.unit
  },
  userInfo: {
    paddingLeft: 0,
    paddingRight: 0
  },
  text: {},

  relatedMedia: {
    marginBottom: theme.spacing.unit
  },
  userLink: {
    color: theme.palette.text.primary,
    textDecoration: "none"
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  socialButton: {
    color: theme.palette.text.primary,
    padding: theme.spacing.unit,
    minWidth: 36,
    borderRadius: 18
  },
  tags: {
    marginTop: theme.spacing.unit * 3
  },
  noTags: {
    fontStyle: "italic"
  },
  chip: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  media: {
    width: "100%",
    height: "calc(100vh - 56px)",
    objectFit: "cover"
  },
  followButtonSpacer: {
    width: 132
  },
  metrics: {
    display: "flex"
  },

  tooltip: {
    fontSize: "2em"
  },
  sideSpace: {
    marginRight: theme.spacing.unit
  },
  userAvatar: {
    width: "80%",
    borderRadius: "20%"
  },
  userAvatarMobile: {
    width: "100%",
    borderRadius: "20%"
  },
  infoHeader: {
    padding: theme.spacing.unit * 1,
    display: "flex",
    alignItems: "center"
  },
  detailsHeader: {
    padding: theme.spacing.unit * 1,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center"
  },
  avatarContainer: {
    display: "flex",
    textAlign: "center",
    alignItems: "center"
  },
  headerTitles: {
    display: "flex",
    alignItems: "center",
    paddingBottom: theme.spacing.unit * 1
  },
  headerTitlesSpaced: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: theme.spacing.unit * 1
  },
  headerTitlesLeft: {
    display: "flex",
    paddingBottom: theme.spacing.unit * 1
  },
  dataSpacer: {
    marginLeft: theme.spacing.unit * 4
  },
  dataSpacerLarge: {
    marginLeft: theme.spacing.unit * 6
  },
  headerTitlesContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  userTitle: {
    fontWeight: 200
  },
  userWebsite: {
    fontWeight: 200,
    textDecoration: "none",
    cursor: "pointer"
  },
  userTitlePadded: {
    fontWeight: 200,
    paddingLeft: theme.spacing.unit * 2
  },
  userTitlePaddedAdmin: {
    fontWeight: 200,
    paddingLeft: theme.spacing.unit * 2,
    color: theme.palette.danger.main
  },
  actionButtonPadding: {
    paddingLeft: theme.spacing.unit * 2
  },
  infoButton: {
    color: theme.palette.primary.main
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
  centerAlign: {
    alignItems: "center"
  },
  textAligner: {
    textAlign: "center"
  },
  dangerButton: {
    color: theme.palette.danger.main
  },
  tabsCenterer: {
    width: "100%",
    textAlign: "center"
  }
});

const Padder = () => <div style={{ padding: 16 }} />;
const MicroPadder = () => <div style={{ padding: 8 }} />;

const Avatar = withStyles(styles)(({ avatar, classes, avatarClass }) => {
  return (
    <div className={classes.avatarContainer}>
      <img className={avatarClass} src={avatar} />
    </div>
  );
});

const UserMedia = React.memo(({ userId }) => <MediaUser userId={userId} />);

const UserFursuits = React.memo(({ user }) => {
  return (
    <React.Fragment>
      <div style={{ padding: 8 }} />
      <Grid container spacing={16}>
        {user.fursuits.map(fursuit => (
          <Grid item xs={12} lg={6} key={fursuit.id}>
            <FursuitUserCard fursuit={fursuit} user={user} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
});

class User extends React.Component {
  state = {
    editProfileDialog: false,
    reportDialog: false,
    tab: "pictures",
    subTab: "profiles_following"
  };

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
              size={"small"}
              variant="outlined"
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
          {(createFollow, { data }) => {
            return (
              <Button
                size={"small"}
                variant="outlined"
                onClick={() => {
                  createFollow({
                    variables: { input: { followableId: user.id } }
                  });
                }}
              >
                Follow
              </Button>
            );
          }}
        </Mutation>
      );
    }
  }

  renderProfilesFollowing(user) {
    const { width } = this.props;
    let offset = 0;
    let limit = parseInt(process.env.FOLLOWINGS_PAGE_SIZE);

    return (
      <Query
        query={GET_FOLLOWINGS_PROFILES_BY_USER}
        variables={{ userId: user.id, offset, limit }}
      >
        {({ data, loading, error, fetchMore }) => {
          if (loading || error || !data) {
            return null;
          }

          const following = data.followingsProfilesByUser;

          if (following.length === 0) {
            return <EmptyList label={`${user.name} doesn't follow anybody.`} />;
          }

          return (
            <React.Fragment>
              <Grid container spacing={8}>
                {following.map(following => (
                  <Grid item xs={12} lg={4} key={following.id}>
                    <UserCard user={following} />
                  </Grid>
                ))}
                {following.length < user.followingCount && (
                  <LoadMoreButton
                    onClick={() => {
                      fetchMore({
                        variables: {
                          offset: following.length,
                          limit
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;

                          return Object.assign({}, prev, {
                            followingsProfilesByUser: [
                              ...prev.followingsProfilesByUser,
                              ...fetchMoreResult.followingsProfilesByUser
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

  renderFursuitsFollowing(user) {
    const { width } = this.props;
    let offset = 0;
    let limit = parseInt(process.env.FOLLOWINGS_PAGE_SIZE);

    return (
      <Query
        query={GET_FOLLOWINGS_FURSUITS_BY_USER}
        variables={{ userId: user.id, offset, limit }}
      >
        {({ data, loading, error, fetchMore }) => {
          if (loading || error || !data) {
            return null;
          }

          const following = data.followingsFursuitsByUser;

          if (following.length === 0) {
            return (
              <EmptyList label={`${user.name} doesn't follow any Fursuits.`} />
            );
          }

          return (
            <React.Fragment>
              <Grid container spacing={8}>
                {following.map(following => (
                  <Grid item xs={12} lg={4} key={following.id}>
                    <FursuitFollowedCard fursuit={following} />
                  </Grid>
                ))}
                {following.length < user.followingFursuitsCount && (
                  <LoadMoreButton
                    onClick={() => {
                      fetchMore({
                        variables: {
                          offset: following.length,
                          limit
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;

                          return Object.assign({}, prev, {
                            followingsFursuitsByUser: [
                              ...prev.followingsFursuitsByUser,
                              ...fetchMoreResult.followingsFursuitsByUser
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

  renderMakersFollowing(user) {
    const { width } = this.props;
    let offset = 0;
    let limit = parseInt(process.env.FOLLOWINGS_PAGE_SIZE);

    return (
      <Query
        query={GET_FOLLOWINGS_MAKERS_BY_USER}
        variables={{ userId: user.id, offset, limit }}
      >
        {({ data, loading, error, fetchMore }) => {
          if (loading || error || !data) {
            return null;
          }

          const following = data.followingsMakersByUser;

          if (following.length === 0) {
            return (
              <EmptyList label={`${user.name} doesn't follow any Makers.`} />
            );
          }

          return (
            <React.Fragment>
              <Grid container spacing={8}>
                {following.map(following => (
                  <Grid item xs={12} lg={4} key={following.id}>
                    <MakerFollowedCard maker={following} />
                  </Grid>
                ))}
                {following.length < user.followingMakersCount && (
                  <LoadMoreButton
                    onClick={() => {
                      fetchMore({
                        variables: {
                          offset: following.length,
                          limit
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;

                          return Object.assign({}, prev, {
                            followingsMakersByUser: [
                              ...prev.followingsMakersByUser,
                              ...fetchMoreResult.followingsMakersByUser
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

  renderActionButton(user) {
    const { classes, currentSession } = this.props;

    return (
      <React.Fragment>
        {user.id != currentSession.user.id && (
          <React.Fragment>
            {user.blocked ? (
              <Mutation mutation={UNBLOCK_USER}>
                {(unblockUser, { data }) => (
                  <Tooltip title={`Unblock ${user.name}`}>
                    <IconButton
                      variant="outlined"
                      className={classes.dangerButton}
                      size="small"
                      onClick={() => {
                        unblockUser({
                          variables: { input: { userId: user.id } }
                        }).then(() => {
                          location.reload();
                        });
                      }}
                    >
                      <BlockIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Mutation>
            ) : (
              <Mutation mutation={BLOCK_USER}>
                {(blockUser, { data }) => (
                  <Tooltip title={`Block ${user.name}`}>
                    <IconButton
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        blockUser({
                          variables: { input: { userId: user.id } }
                        }).then(() => {
                          document.location.href = "/";
                        });
                      }}
                    >
                      <BlockIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Mutation>
            )}
            <Tooltip title={`Report ${user.name}`}>
              <IconButton
                size="small"
                onClick={() => this.setState({ reportDialog: true })}
              >
                <OutlinedFlag />
              </IconButton>
            </Tooltip>
          </React.Fragment>
        )}
        {user.id == currentSession.user.id && (
          <IconButton
            size="small"
            variant="outlined"
            onClick={() => this.setState({ editProfileDialog: true })}
          >
            <EditIcon />
          </IconButton>
        )}
      </React.Fragment>
    );
  }

  renderUserHeader(user) {
    const { classes, match, currentSession, width } = this.props;

    return (
      <React.Fragment>
        <div className={classes.infoHeader}>
          <Grid container spacing={40} className={classes.centerAlign}>
            <Grid item xs={false} lg={2} />
            <Grid item xs={2} lg={2} className={classes.avatarContainer}>
              <Avatar avatar={user.avatar} avatarClass={classes.userAvatar} />
            </Grid>
            <Grid item xs={10} lg={6}>
              <div className={classes.headerTitles}>
                <Typography variant="h5" className={classes.userTitle} noWrap>
                  {user.name}
                </Typography>
                {user.isModerator && (
                  <Typography
                    variant="subtitle1"
                    className={classes.userTitlePaddedAdmin}
                    noWrap
                  >
                    SCRITCH ADMIN
                  </Typography>
                )}
                {user.sponsor && !user.isModerator && (
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    className={classes.userTitlePadded}
                    noWrap
                  >
                    SCRITCH SPONSOR
                  </Typography>
                )}
                {user.id != currentSession.user.id && (
                  <div className={classes.actionButtonPadding}>
                    {this.renderFollowButton(user)}
                  </div>
                )}
                <div className={classes.actionButtonPadding}>
                  {this.renderActionButton(user)}
                </div>
              </div>
              <div className={classes.headerTitles}>
                {user.website && (
                  <a
                    href={user.website}
                    target="_blank"
                    className={classes.userWebsite}
                  >
                    <Typography variant="subtitle1" color="primary">
                      Website
                    </Typography>
                  </a>
                )}
              </div>
              <div className={classes.headerTitles}>
                <Typography variant="subtitle1" className={classes.userTitle}>
                  {user.bio}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={false} lg={2} />
          </Grid>
        </div>
      </React.Fragment>
    );
  }

  renderUserHeaderMobile(user) {
    const { classes, match, currentSession, width } = this.props;

    return (
      <React.Fragment>
        <div className={classes.infoHeader}>
          <Grid container spacing={24} className={classes.centerAlign}>
            <Grid item xs={3} className={classes.avatarContainer}>
              <Avatar
                avatar={user.avatar}
                avatarClass={classes.userAvatarMobile}
              />
            </Grid>
            <Grid item xs={9}>
              <div className={classes.headerTitles}>
                <Typography variant="h5" className={classes.userTitle} noWrap>
                  {user.name}
                </Typography>
                {user.isModerator && (
                  <Typography
                    variant="subtitle1"
                    className={classes.userTitlePaddedAdmin}
                    noWrap
                  >
                    SCRITCH ADMIN
                  </Typography>
                )}
                {user.sponsor && !user.isModerator && (
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    className={classes.userTitlePadded}
                    noWrap
                  >
                    SCRITCH SPONSOR
                  </Typography>
                )}
              </div>
              <div>
                {user.id != currentSession.user.id &&
                  this.renderFollowButton(user)}
                {this.renderActionButton(user)}
              </div>
              <div className={classes.headerTitles}>
                {user.website && (
                  <a
                    href={user.website}
                    target="_blank"
                    className={classes.userWebsite}
                  >
                    <Typography variant="subtitle1" color="primary">
                      Website
                    </Typography>
                  </a>
                )}
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.headerTitles}>
                <Typography variant="subtitle1" className={classes.userTitle}>
                  {user.bio}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
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
              <EmptyList label={`${user.name} doesn't have any Followers.`} />
            );
          }

          return (
            <React.Fragment>
              <div style={{ padding: 8 }} />
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

  render() {
    const { classes, match, currentSession, width } = this.props;

    return (
      <React.Fragment>
        <Query query={GET_USER} variables={{ id: match.params.id }}>
          {({ data, loading, error }) => {
            if (error) {
              return null; //TODO something went wrong
            }

            if (loading || !data) {
              return null; //TODO circular progress
            }

            const user = data ? data.user : null;

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
                <PageTitle>{user ? user.name : null}</PageTitle>
                {width === "sm" || width === "xs"
                  ? this.renderUserHeaderMobile(user)
                  : this.renderUserHeader(user)}
                {width === "xl" || width === "lg" ? (
                  <Padder />
                ) : (
                  <MicroPadder />
                )}
                <Grid container spacing={0}>
                  <Grid item xs={false} lg={2} />
                  <Grid item xs={12} lg={8}>
                    <Tabs
                      variant="fullWidth"
                      className={classes.tabsCenterer}
                      value={this.state.tab}
                      onChange={(e, value) => this.setState({ tab: value })}
                      textColor="textPrimary"
                    >
                      <Tab
                        value="pictures"
                        icon={"Pictures"}
                        label={user.mediaCount}
                      />
                      <Tab
                        value="fursuits"
                        icon={"Fursuits"}
                        disabled={isPrivate}
                        label={
                          isPrivate
                            ? "Private"
                            : user.fursuits
                            ? user.fursuits.length
                            : 0
                        }
                      />
                      <Tab
                        value="followers"
                        icon={"Followers"}
                        label={user.followersCount}
                      />
                      <Tab value="following" icon={"Following"} label="..." />
                    </Tabs>
                  </Grid>
                  <Grid item xs={false} lg={2} />
                </Grid>
                {this.state.tab === "pictures" && (
                  <UserMedia userId={user.id} />
                )}
                {this.state.tab === "fursuits" && <UserFursuits user={user} />}
                {this.state.tab === "followers" && this.renderFollowers(user)}
                {this.state.tab === "following" && (
                  <React.Fragment>
                    <div style={{ padding: 8 }} />
                    <Grid container spacing={0}>
                      <Grid item xs={false} lg={2} />
                      <Grid item xs={12} lg={8}>
                        <Tabs
                          centered={width === "xl" || width === "lg"}
                          variant={
                            width !== "xl" && width !== "lg" ? "fullWidth" : ""
                          }
                          className={classes.tabsCenterer}
                          value={this.state.subTab}
                          onChange={(e, value) =>
                            this.setState({ subTab: value })
                          }
                          textColor="textPrimary"
                        >
                          <Tab
                            value="profiles_following"
                            icon={"Profiles"}
                            label={user.followingCount}
                          />
                          <Tab
                            value="fursuits_following"
                            icon={"Fursuits"}
                            label={user.followingFursuitsCount}
                          />
                          <Tab
                            value="makers_following"
                            icon={"Makers"}
                            label={user.followingMakersCount}
                          />
                        </Tabs>
                      </Grid>
                      <Grid item xs={false} lg={2} />
                    </Grid>
                    <div style={{ padding: 8 }} />
                    {this.state.subTab === "profiles_following" &&
                      this.renderProfilesFollowing(user)}
                    {this.state.subTab === "fursuits_following" &&
                      this.renderFursuitsFollowing(user)}
                    {this.state.subTab === "makers_following" &&
                      this.renderMakersFollowing(user)}
                  </React.Fragment>
                )}
                <EditProfileDialog
                  user={data.user}
                  open={this.state.editProfileDialog}
                  onClose={() => this.setState({ editProfileDialog: false })}
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
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  withRouter(withWidth()(withCurrentSession(User)))
);
