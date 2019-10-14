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
import MediaFursuit from "../Media/MediaFursuit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faStar,
  faUsers,
  faTags
} from "@fortawesome/free-solid-svg-icons";

import { LOAD_FURSUIT } from "../../queries/fursuitQueries";
import {
  CREATE_SUBSCRIPTION,
  DELETE_SUBSCRIPTION
} from "../../queries/fursuitMutations";

import EditIcon from "@material-ui/icons/Edit";
import OutlinedFlag from "@material-ui/icons/OutlinedFlag";

import withCurrentSession from "../withCurrentSession";
import { Link, withRouter } from "react-router-dom";
import { GET_USER } from "../../queries/userQueries";
import { UNBLOCK_USER, BLOCK_USER } from "../../queries/userMutations";
import EditProfileDialog from "./EditProfileDialog";
import ReportDialog from "../AppDialogs/ReportDialog";

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

const Metrics = withStyles(styles)(
  withWidth()(({ fursuit, classes, width }) =>
    width !== "lg" && width !== "xl" ? (
      <div className={classes.headerTitlesLeft}>
        <Tooltip title="Scritches">
          <Typography variant="subtitle1">
            <FontAwesomeIcon icon={faPaw} /> {fursuit.likesCount}
          </Typography>
        </Tooltip>
        <Tooltip title="Favorites">
          <Typography variant="subtitle1" className={classes.dataSpacer}>
            <FontAwesomeIcon icon={faStar} /> {fursuit.favesCount}
          </Typography>
        </Tooltip>
        <Tooltip title="Followers">
          <Typography variant="subtitle1" className={classes.dataSpacer}>
            <FontAwesomeIcon icon={faUsers} /> {fursuit.followersCount}
          </Typography>
        </Tooltip>
        <Tooltip title="Pictures">
          <Typography variant="subtitle1" className={classes.dataSpacer}>
            <FontAwesomeIcon icon={faTags} /> {fursuit.mediaCount}
          </Typography>
        </Tooltip>
      </div>
    ) : (
      <div className={classes.headerTitlesLeft}>
        <Tooltip title="Scritches">
          <Typography variant="subtitle1">
            <strong>{fursuit.likesCount}</strong> scritches
          </Typography>
        </Tooltip>
        <Tooltip title="Favorites">
          <Typography variant="subtitle1" className={classes.dataSpacer}>
            <strong>{fursuit.favesCount}</strong> faves
          </Typography>
        </Tooltip>
        <Tooltip title="Followers">
          <Typography variant="subtitle1" className={classes.dataSpacer}>
            <strong>{fursuit.followersCount}</strong> followers
          </Typography>
        </Tooltip>
        <Tooltip title="Pictures">
          <Typography variant="subtitle1" className={classes.dataSpacer}>
            <strong>{fursuit.mediaCount}</strong> media
          </Typography>
        </Tooltip>
      </div>
    )
  )
);

const FursuitMedia = React.memo(({ fursuitId }) => (
  <MediaFursuit fursuitId={fursuitId} />
));

class User extends React.Component {
  state = {
    editProfileDialog: false,
    reportDialog: false,
    tab: "pictures"
  };

  handleTabChange(tab) {
    this.setState({ tab });
    this.props.history.push({
      pathname: `/${this.props.match.params.id}/${tab}`
    });
  }

  renderFollowButton(fursuit) {
    const { width } = this.props;

    return null;
    if (fursuit.followed) {
      return (
        <Mutation
          mutation={DELETE_SUBSCRIPTION}
          update={(cache, { data: { createFollow } }) => {
            cache.writeQuery({
              query: LOAD_FURSUIT,
              variables: { id: fursuit.id },
              data: {
                fursuit: {
                  ...fursuit,
                  followed: false
                }
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
                  variables: { input: { fursuitId: fursuit.id } }
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
          mutation={CREATE_SUBSCRIPTION}
          update={(cache, { data: { createFollow } }) => {
            cache.writeQuery({
              query: LOAD_FURSUIT,
              variables: { id: fursuit.id },
              data: {
                fursuit: {
                  ...fursuit,
                  followed: true
                }
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
                    variables: { input: { fursuitId: fursuit.id } }
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

  renderActionButton(user) {
    const { classes, currentSession } = this.props;

    return (
      <React.Fragment>
        {user.id != currentSession.user.id && (
          <React.Fragment>
            {user.blocked ? (
              <Mutation mutation={UNBLOCK_USER}>
                {(unblockUser, { data }) => (
                  <Button
                    variant="outlined"
                    className={classes.dangerButton}
                    onClick={() => {
                      unblockUser({
                        variables: { input: { userId: user.id } }
                      }).then(() => {
                        location.reload();
                      });
                    }}
                  >
                    {`Unblock ${user.name}`}
                  </Button>
                )}
              </Mutation>
            ) : (
              <Mutation mutation={BLOCK_USER}>
                {(blockUser, { data }) => (
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      blockUser({
                        variables: { input: { userId: user.id } }
                      }).then(() => {
                        document.location.href = "/";
                      });
                    }}
                  >
                    {`Block ${user.name}`}
                  </Button>
                )}
              </Mutation>
            )}
            <Tooltip title={`Report ${user.name}`}>
              <IconButton onClick={() => this.setState({ reportDialog: true })}>
                <OutlinedFlag />
              </IconButton>
            </Tooltip>
          </React.Fragment>
        )}
        {user.id == currentSession.user.id && (
          <IconButton
            color="primary"
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
                    color="danger"
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
              {false && <Metrics fursuit={fursuit} />}
              {false && <SubtitleRow fursuit={fursuit} />}{" "}
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
                    color="danger"
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
                {user.id == currentSession.user.id &&
                  this.renderActionButton(user)}
                <div style={{ padding: 4 }} />
                {user.id != currentSession.user.id &&
                  this.renderFollowButton(user)}
              </div>
            </Grid>
            <Grid item xs={12}>
              {false && <Metrics fursuit={fursuit} />}
              {false && <SubtitleRow fursuit={fursuit} />}
              <div className={classes.headerTitles}>
                <Typography
                  variant="subtitle1"
                  className={classes.userTitle}
                  noWrap
                >
                  {user.bio}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { classes, match, currentSession, width } = this.props;

    return (
      <React.Fragment>
        <Query query={GET_USER} variables={{ id: match.params.id }}>
          {({ data, loading, error }) => {
            if (error) {
              console.log(error);
              return null; //TODO something went wrong
            }

            if (loading || !data) {
              console.log(loading);
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
                      variant={
                        width !== "xl" && width !== "lg" ? "fullWidth" : ""
                      }
                      className={classes.tabsCenterer}
                      value={this.state.tab}
                      onChange={(e, value) => this.setState({ tab: value })}
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
                      <Tab
                        value="following"
                        icon={"Following"}
                        label={user.followingCount}
                      />
                    </Tabs>
                  </Grid>
                  <Grid item xs={false} lg={2} />
                </Grid>

                {this.state.tab === "media" && (
                  <UserMedia userId={match.params.id} />
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
