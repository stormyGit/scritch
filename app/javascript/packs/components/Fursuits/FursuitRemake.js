import React from "react";
import { Query, Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
import PageTitle from "../Global/PageTitle";
import queryString from "query-string";
import Gallery from "react-grid-gallery";
import EmptyList from "../Global/EmptyList";
import LoadMoreButton from "../Global/LoadMoreButton";
import FursuitClaimDialog from "./FursuitClaimDialog";
import FursuitAvatar from "./FursuitAvatar";
import EditFursuitDialog from "./EditFursuitDialog";
import Media from "../Media/Media";
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

import withCurrentSession from "../withCurrentSession";
import SocialButton from "../Global/SocialButton";
import TwitterIcon from "../../icons/Twitter";
import TelegramIcon from "../../icons/Telegram";
import { Link, withRouter } from "react-router-dom";

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
  dataSpacer: {
    marginLeft: theme.spacing.unit * 2
  },

  tooltip: {
    fontSize: "2em"
  },
  sideSpace: {
    marginRight: theme.spacing.unit
  },
  fursuitAvatar: {
    width: "100%",
    borderRadius: "20%"
  },
  infoHeader: {
    display: "flex"
  },
  avatarContainer: {
    textAlign: "center",
    alignItems: "center"
  },
  headerTitles: {
    display: "flex",
    paddingBottom: theme.spacing.unit * 2
  },
  headerTitlesSpaced: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: theme.spacing.unit * 2
  },
  headerTitlesContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  fursuitTitle: {
    fontWeight: 200
  },
  actionButtonPadding: {
    paddingLeft: theme.spacing.unit * 2
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  }
});

const Avatar = withStyles(styles)(({ fursuit, classes }) => {
  return (
    <div className={classes.avatarContainer}>
      <img className={classes.fursuitAvatar} src={fursuit.avatar} />
    </div>
  );
});

const Metrics = withStyles(styles)(({ fursuit, classes }) => (
  <div className={classes.headerTitlesSpaced}>
    <Tooltip title="Scritches">
      <Typography variant="subtitle1">
        <FontAwesomeIcon icon={faPaw} /> {fursuit.likesCount}
      </Typography>
    </Tooltip>
    <Tooltip title="Favorites">
      <Typography variant="subtitle1">
        <FontAwesomeIcon icon={faStar} /> {fursuit.favesCount}
      </Typography>
    </Tooltip>
    <Tooltip title="Followers">
      <Typography variant="subtitle1">
        <FontAwesomeIcon icon={faUsers} /> {fursuit.followersCount}
      </Typography>
    </Tooltip>
    <Tooltip title="Pictures">
      <Typography variant="subtitle1">
        <FontAwesomeIcon icon={faTags} /> {fursuit.mediaCount}
      </Typography>
    </Tooltip>
  </div>
));

class Fursuit extends React.Component {
  state = {
    claimDialog: false,
    editFursuitDialog: false
  };

  renderFollowButton(fursuit) {
    const { width } = this.props;

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
              size={"medium"}
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
                size={"medium"}
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

  renderActionButton(fursuit) {
    const { classes } = this.props;
    return (
      <React.Fragment>
        {!fursuit.claimed &&
          !fursuit.claimRejected &&
          !fursuit.possessed &&
          fursuit.users.length == 0 && (
            <Button
              color="primary"
              size="medium"
              variant="outlined"
              onClick={() => this.setState({ claimDialog: true })}
            >
              Claim fursuit
            </Button>
          )}
        {fursuit.claimed && !fursuit.possessed && (
          <Button color="primary" size="medium" variant="outlined" disabled>
            Claim pending
          </Button>
        )}
        {!fursuit.claimed &&
          !fursuit.claimRejected &&
          !fursuit.possessed &&
          fursuit.users.length > 0 && (
            <Button
              color="primary"
              size="medium"
              variant="outlined"
              onClick={() => this.setState({ claimDialog: true })}
            >
              Contest Claim
            </Button>
          )}
        {fursuit.possessed && (
          <Button
            color="primary"
            size="medium"
            variant="outlined"
            onClick={() => this.setState({ editFursuitDialog: true })}
          >
            Edit fursuit
          </Button>
        )}
        {!fursuit.claimed &&
          !fursuit.possessed &&
          this.renderFollowButton(fursuit)}
      </React.Fragment>
    );
  }

  renderFursuitHeader(fursuit) {
    const { classes, match, currentSession } = this.props;

    return (
      <div className={classes.infoHeader}>
        <Grid container spacind={48}>
          <Grid item xs={false} lg={1} />
          <Grid item xs={2} lg={2} className={classes.avatarContainer}>
            <Avatar fursuit={fursuit} className={classes.fursuitAvatar} />
          </Grid>
          <Grid item xs={false} lg={1} />
          <Grid item xs={10} lg={7}>
            <div className={classes.headerTitles}>
              <Typography variant="h4" className={classes.fursuitTitle} noWrap>
                {fursuit.name}
              </Typography>
              <div className={classes.actionButtonPadding}>
                {this.renderActionButton(fursuit)}
              </div>
            </div>
            <div className={classes.headerTitlesSpaced}>
              <Typography variant="h5" className={classes.fursuitTitle}>
                {fursuit.isHybrid &&
                  (fursuit.species.length > 0
                    ? `Hybrid (${fursuit.species.map(e => e.name).join(", ")})`
                    : "Hybrid (Undefined)")}
                {!fursuit.isHybrid &&
                  (fursuit.species[0] ? fursuit.species[0].name : "Unknown")}
              </Typography>
              {fursuit.makers && (
                <Typography variant="h5" className={classes.fursuitTitle}>
                  Made by{" "}
                  <Link
                    to={`/makers/${fursuit.makers[0].slug}`}
                    className={classes.link}
                  >
                    {fursuit.makers[0].name}
                  </Link>
                </Typography>
              )}
              <Typography variant="h5" className={classes.fursuitTitle}>
                {fursuit.creationYear}
              </Typography>
            </div>

            <Metrics fursuit={fursuit} />
          </Grid>
          <Grid item xs={false} lg={1} />
        </Grid>
      </div>
    );
  }

  renderFursuitMedia() {
    const { classes, match, currentSession } = this.props;

    return <Media fursuit={true} fursuitId={match.params.id} />;
  }

  renderFursuitData() {
    const { classes, match, currentSession } = this.props;
    let limit = parseInt(process.env.USER_MEDIA_PAGE_SIZE);
    const query = queryString.parse(location.search);

    return (
      <Query
        query={LOAD_FURSUIT}
        variables={{
          id: match.params.id
        }}
      >
        {({ loading, error, data }) => {
          const fursuit = data ? data.fursuit : null;

          return (
            !loading &&
            !error &&
            fursuit && (
              <React.Fragment>
                <PageTitle>
                  {!loading && fursuit ? fursuit.name : null}
                </PageTitle>
                <React.Fragment>
                  <Grid container spacing={8} />
                </React.Fragment>
                <div className={classes.pictureInfo}>
                  <Grid
                    container
                    spacing={8}
                    justify="space-between"
                    wrap="nowrap"
                  >
                    <Grid item>
                      <Typography gutterBottom variant="h5" component="h2">
                        {fursuit.name}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.fursuitTitle}
                        noWrap
                      >
                        {fursuit.creationYear}
                      </Typography>
                      <div style={{ padding: 5 }} />
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        color="primary"
                        className={classes.fursuitTitle}
                        noWrap
                      >
                        Species
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.fursuitTitle}
                        noWrap={false}
                      >
                        {fursuit.isHybrid &&
                          (fursuit.species.length > 0
                            ? `Hybrid (${fursuit.species
                                .map(e => e.name)
                                .join(", ")})`
                            : "Hybrid (Undefined)")}
                        {!fursuit.isHybrid &&
                          (fursuit.species[0]
                            ? fursuit.species[0].name
                            : "Unknown")}
                      </Typography>
                      <div style={{ padding: 5 }} />
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        color="primary"
                        className={classes.fursuitTitle}
                        noWrap
                      >
                        Role
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.fursuitTitle}
                        noWrap
                      >
                        {fursuit.fursuitFinger
                          ? fursuit.fursuitFinger.name
                          : "Unknown"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <div style={{ padding: 5 }} />
                  <Grid
                    container
                    spacing={8}
                    alignItems="center"
                    justify="center"
                  >
                    <Grid xs={1} item />
                    <Grid xs={10} item>
                      <img
                        style={{ width: "100%", borderRadius: "5%" }}
                        src={fursuit.avatar}
                      />
                    </Grid>
                    <Grid xs={1} item />
                  </Grid>
                  <Grid container spacing={8}>
                    <Grid item>
                      <div style={{ padding: 5 }} />
                      <React.Fragment />
                      {fursuit.bio && (
                        <React.Fragment>
                          <div style={{ padding: 5 }} />
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="h2"
                            color="primary"
                            className={classes.fursuitTitle}
                            noWrap
                          >
                            Bio
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            className={classes.fursuitTitle}
                            noWrap={false}
                          >
                            {fursuit.bio}
                          </Typography>
                        </React.Fragment>
                      )}
                      <div style={{ padding: 5 }} />
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        color="primary"
                        className={classes.fursuitTitle}
                        noWrap
                      >
                        Made by
                      </Typography>
                      {fursuit.makers && fursuit.makers.length > 0 && (
                        <Link
                          to={`/makers/${fursuit.makers[0].slug}`}
                          className={classes.link}
                        >
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            color="secondary"
                            noWrap
                          >
                            {fursuit.makers[0].name}
                          </Typography>
                        </Link>
                      )}
                      {fursuit.makers && fursuit.makers.length == 0 && (
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          className={classes.fursuitTitle}
                          noWrap
                        >
                          Redacted
                        </Typography>
                      )}
                      {fursuit.users && fursuit.users.length > 0 && (
                        <React.Fragment>
                          <div style={{ padding: 5 }} />
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="h2"
                            color="primary"
                            className={classes.fursuitTitle}
                            noWrap
                          >
                            Owned by
                          </Typography>
                          {fursuit.users[0].public && (
                            <Link
                              to={`/${fursuit.users[0].slug}`}
                              className={classes.link}
                            >
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                                color="secondary"
                                noWrap
                              >
                                {fursuit.users[0].name}
                              </Typography>
                            </Link>
                          )}
                          {!fursuit.users[0].public && (
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                              className={classes.fursuitTitle}
                              noWrap
                            >
                              Private
                            </Typography>
                          )}
                        </React.Fragment>
                      )}
                      <div style={{ padding: 5 }} />
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        color="primary"
                        className={classes.fursuitTitle}
                        noWrap
                      >
                        Build
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.fursuitTitle}
                        noWrap
                      >
                        {fursuit.fursuitBuild
                          ? fursuit.fursuitBuild.name
                          : "Unknown"}
                      </Typography>
                      <div style={{ padding: 5 }} />
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        color="primary"
                        className={classes.fursuitTitle}
                        noWrap
                      >
                        Style
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.fursuitTitle}
                        noWrap
                      >
                        {fursuit.fursuitStyle
                          ? fursuit.fursuitStyle.name
                          : "Unknown"}
                      </Typography>
                      <div style={{ padding: 5 }} />
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        color="primary"
                        className={classes.fursuitTitle}
                        noWrap
                      >
                        Base Colour
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.fursuitTitle}
                        noWrap
                      >
                        {fursuit.baseColor ? fursuit.baseColor : "Unknown"}
                      </Typography>
                      <div style={{ padding: 5 }} />
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        color="primary"
                        className={classes.fursuitTitle}
                        noWrap
                      >
                        Eye Colour
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.fursuitTitle}
                        noWrap
                      >
                        {fursuit.eyesColor ? fursuit.eyesColor : "Unknown"}
                      </Typography>
                      <div style={{ padding: 5 }} />
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        color="primary"
                        className={classes.fursuitTitle}
                        noWrap
                      >
                        Appearance
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.fursuitTitle}
                        noWrap
                      >
                        {fursuit.fursuitGender
                          ? fursuit.fursuitGender.name
                          : "Unknown"}
                      </Typography>
                      <div style={{ padding: 5 }} />
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        color="primary"
                        className={classes.fursuitTitle}
                        noWrap
                      >
                        Padding
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.fursuitTitle}
                        noWrap
                      >
                        {fursuit.fursuitPadding
                          ? fursuit.fursuitPadding.name
                          : "Unknown"}
                      </Typography>
                      <div style={{ padding: 5 }} />
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        color="primary"
                        className={classes.fursuitTitle}
                        noWrap
                      >
                        Leg Type
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.fursuitTitle}
                        noWrap
                      >
                        {fursuit.fursuitLegType
                          ? fursuit.fursuitLegType.name
                          : "Unknown"}
                      </Typography>

                      <div style={{ padding: 5 }} />
                    </Grid>
                  </Grid>
                  <Divider />
                </div>
                <FursuitClaimDialog
                  fursuit={fursuit.id}
                  open={this.state.claimDialog}
                  onClose={() => this.setState({ claimDialog: false })}
                />
                <EditFursuitDialog
                  fursuit={fursuit}
                  open={this.state.editFursuitDialog}
                  onClose={() => this.setState({ editFursuitDialog: false })}
                />
              </React.Fragment>
            )
          );
        }}
      </Query>
    );
  }

  render() {
    const { classes, match, currentSession } = this.props;

    return (
      <React.Fragment>
        <Query
          query={LOAD_FURSUIT}
          variables={{
            id: match.params.id
          }}
        >
          {({ loading, error, data }) => {
            if (error) {
              console.log(error);
              return null;
            }

            if (loading || !data) {
              console.log(loading);
              return null;
            }

            const fursuit = data ? data.fursuit : null;

            return (
              <React.Fragment>
                <PageTitle>{fursuit ? fursuit.name : null}</PageTitle>
                {this.renderFursuitHeader(fursuit)}
                {this.renderFursuitMedia()}
              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );

    // return (
    //   <React.Fragment>
    //     <div className={classes.container}>
    //       <Grid container spacing={8}>
    //         <Grid item lg={9} xl={10} xs={12}>
    //           {this.renderFursuitMedia()}
    //         </Grid>
    //         <Grid item lg={3} xl={2} xs={12}>
    //           {this.renderFursuitData()}
    //         </Grid>
    //       </Grid>
    //     </div>
    //   </React.Fragment>
    // );
  }
}

export default withStyles(styles)(withRouter(withCurrentSession(Fursuit)));
