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
  fursuitTitle: {
    marginBottom: 0,
    fontWeight: 200
  },
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
  link: {
    textDecoration: "none"
  },
  tooltip: {
    fontSize: "2em"
  },
  sideSpace: {
    marginRight: theme.spacing.unit
  }
});

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
              size={width !== "lg" && width !== "xl" ? "small" : "large"}
              fullWidth
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
            const button = (
              <Button
                size={width !== "lg" && width !== "xl" ? "small" : "large"}
                variant="outlined"
                //disabled={!this.props.currentSession.user.sponsor}
                fullWidth
                onClick={() => {
                  createFollow({
                    variables: { input: { fursuitId: fursuit.id } }
                  });
                }}
              >
                Follow
              </Button>
            );

            return button;
            // return this.props.currentSession.user.sponsor ? (
            //   button
            // ) : (
            //   <Tooltip title="You must be a Sponsor to Follow a Fursuit">
            //     <div>{button}</div>
            //   </Tooltip>
            // );
          }}
        </Mutation>
      );
    }
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
                  <Grid container spacing={8}>
                    {!fursuit.claimed &&
                      !fursuit.claimRejected &&
                      !fursuit.possessed &&
                      fursuit.users.length == 0 && (
                        <Grid item xs={12} className={classes.sideSpace}>
                          <Button
                            color="primary"
                            fullWidth
                            size="large"
                            variant="outlined"
                            onClick={() => this.setState({ claimDialog: true })}
                          >
                            Claim fursuit
                          </Button>
                        </Grid>
                      )}
                    {fursuit.claimed && !fursuit.possessed && (
                      <Grid item xs={12} className={classes.sideSpace}>
                        <Button
                          color="primary"
                          size="large"
                          fullWidth
                          variant="outlined"
                          disabled
                        >
                          Claim pending
                        </Button>
                      </Grid>
                    )}
                    {!fursuit.claimed &&
                      !fursuit.claimRejected &&
                      !fursuit.possessed &&
                      fursuit.users.length > 0 && (
                        <Grid item xs={12} className={classes.sideSpace}>
                          <Button
                            color="primary"
                            fullWidth
                            size="large"
                            variant="outlined"
                            onClick={() => this.setState({ claimDialog: true })}
                          >
                            Contest Claim
                          </Button>
                        </Grid>
                      )}
                    {fursuit.possessed && (
                      <Grid item xs={12} className={classes.sideSpace}>
                        <Button
                          color="primary"
                          size="large"
                          fullWidth
                          variant="outlined"
                          onClick={() =>
                            this.setState({ editFursuitDialog: true })
                          }
                        >
                          Edit fursuit
                        </Button>
                      </Grid>
                    )}
                    {!fursuit.claimed && !fursuit.possessed && (
                      <Grid item xs={12} className={classes.sideSpace}>
                        {this.renderFollowButton(fursuit)}
                      </Grid>
                    )}
                  </Grid>
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
                      <React.Fragment>
                        {currentSession && (
                          <div className={classes.metrics}>
                            <Tooltip title="Scritches">
                              <Typography variant="subtitle1">
                                <FontAwesomeIcon icon={faPaw} />{" "}
                                {fursuit.likesCount}
                              </Typography>
                            </Tooltip>
                            <Tooltip title="Favorites">
                              <Typography
                                variant="subtitle1"
                                className={classes.dataSpacer}
                              >
                                <FontAwesomeIcon icon={faStar} />{" "}
                                {fursuit.favesCount}
                              </Typography>
                            </Tooltip>
                            <Tooltip title="Followers">
                              <Typography
                                variant="subtitle1"
                                className={classes.dataSpacer}
                              >
                                <FontAwesomeIcon icon={faUsers} />{" "}
                                {fursuit.followersCount}
                              </Typography>
                            </Tooltip>
                            <Tooltip title="Pictures">
                              <Typography
                                variant="subtitle1"
                                className={classes.dataSpacer}
                              >
                                <FontAwesomeIcon icon={faTags} />{" "}
                                {fursuit.mediaCount}
                              </Typography>
                            </Tooltip>
                          </div>
                        )}
                      </React.Fragment>
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
        <div className={classes.container}>
          <Grid container spacing={8}>
            <Grid item lg={9} xl={10} xs={12}>
              {this.renderFursuitMedia()}
            </Grid>
            <Grid item lg={3} xl={2} xs={12}>
              {this.renderFursuitData()}
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(withCurrentSession(Fursuit)));
