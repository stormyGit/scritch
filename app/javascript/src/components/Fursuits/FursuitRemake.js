import React from "react";
import { Query, Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";

import DefaultAvatar from "../Users/DefaultAvatar";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import PageTitle from "../Global/PageTitle";
import FursuitClaimDialog from "./FursuitClaimDialog";
import EditFursuitDialog from "./EditFursuitDialog";
import MediaFursuit from "../Media/MediaFursuit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faStar, faUsers, faTags } from "@fortawesome/free-solid-svg-icons";

import { LOAD_FURSUIT } from "../../queries/fursuitQueries";
import { CREATE_SUBSCRIPTION, DELETE_SUBSCRIPTION } from "../../queries/fursuitMutations";

import withCurrentSession from "../withCurrentSession";
import { Link, withRouter } from "react-router-dom";
import { Avatar } from "@material-ui/core";

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
    padding: theme.spacing(1)
  },
  userInfo: {
    paddingLeft: 0,
    paddingRight: 0
  },
  text: {},

  relatedMedia: {
    marginBottom: theme.spacing(1)
  },
  userLink: {
    color: theme.palette.text.primary,
    textDecoration: "none"
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  socialButton: {
    color: theme.palette.text.primary,
    padding: theme.spacing(1),
    minWidth: 36,
    borderRadius: 18
  },
  tags: {
    marginTop: theme.spacing(3)
  },
  noTags: {
    fontStyle: "italic"
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
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
    marginRight: theme.spacing(1)
  },
  fursuitAvatar: {
    width: "80%",
    borderRadius: "20%"
  },
  fursuitAvatarMobile: {
    width: "100%",
    borderRadius: "20%"
  },
  infoHeader: {
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center"
  },
  detailsHeader: {
    padding: theme.spacing(1),
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
    paddingBottom: theme.spacing(1)
  },
  headerTitlesSpaced: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: theme.spacing(1)
  },
  headerTitlesLeft: {
    display: "flex",
    paddingBottom: theme.spacing(1)
  },
  dataSpacer: {
    marginLeft: theme.spacing(4)
  },
  dataSpacerLarge: {
    marginLeft: theme.spacing(6)
  },
  headerTitlesContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  fursuitTitle: {
    fontWeight: 200
  },
  fursuitTitlePadded: {
    fontWeight: 200,
    paddingLeft: theme.spacing(2)
  },
  actionButtonPadding: {
    paddingLeft: theme.spacing(2)
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
  detailCircler: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.palette.text.primary
  }
});

function getColorCode(color) {
  switch (color) {
    case "Brown":
      return "#81450E";
    case "Blue":
      return "#266BFF";
    case "Orange":
      return "#FF7A00";
    case "Yellow":
      return "#F0FA1C";
    case "Red":
      return "#F02828";
    case "Green":
      return "#2BF028";
    case "Grey":
      return "#9C9C9C";
    case "Pink":
      return "#E765C8";
    case "Black":
      return "#000000";
    case "Purple":
      return "#9F1CFA";
    case "White":
      return "#FFFFFF";
    case "Cyan":
      return "#2BE5DD";
    case "Multi":
      return "#222222";
    case "Rainbow":
      return "#dddddd";
  }
  return "grey";
}

const Padder = () => <div style={{ padding: 16 }} />;
const MicroPadder = () => <div style={{ padding: 8 }} />;

const DetailField = withStyles(styles)(({ data, dataShort, field, classes, mobile }) => {
  if (!data && !dataShort) return null;
  return (
    <Tooltip title={dataShort ? dataShort : data ? data.name : "Unknown"}>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        {dataShort ? (
          <DefaultAvatar
            text={data ? data.name : dataShort ? "" : "?"}
            key="avatar"
            color={getColorCode(dataShort)}
            className={classes.detailCircler}
            size={96}
          />
        ) : (
          <Avatar
            style={{ width: 96, height: 96 }}
            src={data.picture}
            className={classes.detailCircler}
          />
        )}
        <Typography variant="subtitle1">{field}</Typography>
        {mobile && <Typography variant="subtitle1">{dataShort ? dataShort : data.name}</Typography>}
      </div>
    </Tooltip>
  );
});

const FursuitAvatar = withStyles(styles)(({ fursuit, classes, avatarClass }) => {
  return (
    <div className={classes.avatarContainer}>
      <img className={avatarClass} src={fursuit.avatar} />
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

const SubtitleRow = withStyles(styles)(
  withWidth()(({ classes, fursuit, width }) => (
    <React.Fragment>
      <div className={classes.headerTitlesLeft}>
        <Typography variant="subtitle1" className={classes.fursuitTitle}>
          {fursuit.isHybrid &&
            (fursuit.species.length > 0
              ? `Hybrid (${fursuit.species.map(e => e.name).join(", ")})`
              : "Hybrid (Undefined)")}
          {!fursuit.isHybrid && (fursuit.species[0] ? fursuit.species[0].name : "Unknown")}
        </Typography>
        {(width === "xl" || width === "lg") && fursuit.makers && (
          <div className={classes.dataSpacerLarge}>
            {fursuit.makers.length == 0 ? (
              <Typography variant="subtitle1" className={classes.fursuitTitle}>
                Made by <em>Redacted</em>
              </Typography>
            ) : (
              <Typography variant="subtitle1" className={classes.fursuitTitle}>
                Made by{" "}
                <Link to={`/makers/${fursuit.makers[0].slug}`} className={classes.link}>
                  {fursuit.makers[0].name}
                </Link>
                &nbsp;
                {fursuit.creationYear && `in ${fursuit.creationYear}`}
              </Typography>
            )}
          </div>
        )}
        {(width === "xl" || width === "lg") && fursuit.users && fursuit.users.length > 0 && (
          <div className={classes.dataSpacerLarge}>
            <Typography variant="subtitle1" className={classes.fursuitTitle}>
              Owned by{" "}
              {fursuit.users[0].public ? (
                <Link to={`/${fursuit.users[0].slug}`} className={classes.link}>
                  {fursuit.users[0].name}
                </Link>
              ) : (
                <em>Private</em>
              )}
            </Typography>
          </div>
        )}
      </div>
      {width !== "xl" && width !== "lg" && fursuit.makers && (
        <React.Fragment>
          <div>
            <React.Fragment>
              {fursuit.makers.length == 0 ? (
                <Typography variant="subtitle1" className={classes.fursuitTitle}>
                  Made by <em>Redacted</em>
                </Typography>
              ) : (
                <Typography variant="subtitle1" className={classes.fursuitTitle}>
                  Made by{" "}
                  <Link to={`/makers/${fursuit.makers[0].slug}`} className={classes.link}>
                    {fursuit.makers[0].name}&nbsp;
                  </Link>
                  {fursuit.creationYear && `in ${fursuit.creationYear}`}
                </Typography>
              )}
            </React.Fragment>
          </div>
          {fursuit.users && fursuit.users.length > 0 && (
            <div>
              <Typography variant="subtitle1" className={classes.fursuitTitle}>
                Owned by{" "}
                {fursuit.users[0].public ? (
                  <Link to={`/${fursuit.users[0].slug}`} className={classes.link}>
                    {fursuit.users[0].name}
                  </Link>
                ) : (
                  <em>Private</em>
                )}
              </Typography>
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  ))
);

// const FursuitDetail = () => null;

const FursuitDetail = withStyles(styles)(
  withWidth()(({ fursuit, classes, width }) =>
    width === "xl" || width === "lg" ? (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <DetailField field="Build" data={fursuit.fursuitBuild} />
        <DetailField field="Style" data={fursuit.fursuitStyle} />
        <DetailField field="Base" dataShort={fursuit.baseColor} />
        <DetailField field="Eyes" dataShort={fursuit.eyesColor} />
        <DetailField field="Appearance" data={fursuit.fursuitGender} />
        <DetailField field="Padding" data={fursuit.fursuitPadding} />
        <DetailField field="Leg Type" data={fursuit.fursuitLegType} />
      </div>
    ) : (
      <Grid container spacing={2} className={classes.detailsHeader}>
        <Grid item xs={4}>
          <DetailField field="Build" data={fursuit.fursuitBuild} mobile={true} />
        </Grid>
        <Grid item xs={4}>
          <DetailField field="Style" data={fursuit.fursuitStyle} mobile={true} />
        </Grid>
        <Grid item xs={4}>
          <DetailField field="Base" dataShort={fursuit.baseColor} mobile={true} />
        </Grid>
        <Grid item xs={4}>
          <DetailField field="Eyes" dataShort={fursuit.eyesColor} mobile={true} />
        </Grid>
        <Grid item xs={4}>
          <DetailField field="Appearance" data={fursuit.fursuitGender} mobile={true} />
        </Grid>
        <Grid item xs={4}>
          <DetailField field="Padding" data={fursuit.fursuitPadding} mobile={true} />
        </Grid>
        <Grid item xs={4}>
          <DetailField field="Leg Type" data={fursuit.fursuitLegType} mobile={true} />
        </Grid>
      </Grid>
    )
  )
);

const FursuitMedia = React.memo(({ fursuitId }) => <MediaFursuit fursuitId={fursuitId} />);

class Fursuit extends React.Component {
  state = {
    claimDialog: false,
    editFursuitDialog: false,
    fursuitDetail: false
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
              size={"small"}
              variant="outlined"
              className={
                width === "lg" || width === "xl" ? this.props.classes.followButtonSpacer : null
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
              size="small"
              variant="outlined"
              onClick={() => this.setState({ claimDialog: true })}
            >
              Claim fursuit
            </Button>
          )}
        {fursuit.claimed && !fursuit.possessed && (
          <Button color="primary" size="small" variant="outlined" disabled>
            Claim pending
          </Button>
        )}
        {!fursuit.claimed &&
          !fursuit.claimRejected &&
          !fursuit.possessed &&
          fursuit.users.length > 0 && (
            <Button
              color="primary"
              size="small"
              variant="outlined"
              onClick={() => this.setState({ claimDialog: true })}
            >
              Contest Claim
            </Button>
          )}
        {fursuit.possessed && (
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={() => this.setState({ editFursuitDialog: true })}
          >
            Edit fursuit
          </Button>
        )}
      </React.Fragment>
    );
  }

  renderFursuitHeader(fursuit) {
    const { classes, match, currentSession, width } = this.props;

    return (
      <React.Fragment>
        <div className={classes.infoHeader}>
          <Grid container spacing={5} className={classes.centerAlign}>
            <Grid item xs={false} lg={2} />
            <Grid item xs={2} lg={2} className={classes.avatarContainer}>
              <FursuitAvatar fursuit={fursuit} avatarClass={classes.fursuitAvatar} />
            </Grid>
            <Grid item xs={10} lg={6}>
              <div className={classes.headerTitles}>
                <Typography variant="h5" className={classes.fursuitTitle} noWrap>
                  {fursuit.name}
                </Typography>
                <Typography variant="subtitle1" className={classes.fursuitTitlePadded} noWrap>
                  {fursuit.fursuitFinger ? fursuit.fursuitFinger.name : ""}
                </Typography>
                <div className={classes.actionButtonPadding}>
                  {this.renderActionButton(fursuit)}
                </div>
                {!fursuit.claimed && !fursuit.possessed && (
                  <div className={classes.actionButtonPadding}>
                    {this.renderFollowButton(fursuit)}
                  </div>
                )}
                <div className={classes.actionButtonPadding}>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      this.setState({
                        fursuitDetail: !this.state.fursuitDetail
                      })
                    }
                  >
                    <InfoIcon />
                  </IconButton>
                </div>
              </div>
              <Metrics fursuit={fursuit} />
              <SubtitleRow fursuit={fursuit} />
              <div className={classes.headerTitles}>
                <Typography variant="subtitle1" className={classes.fursuitTitle} noWrap>
                  {fursuit.bio}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={false} lg={2} />
          </Grid>
        </div>
        {this.state.fursuitDetail && (
          <React.Fragment>
            {width === "xl" || width === "lg" ? <Padder /> : <MicroPadder />}
            <Grid container spacing={5} className={classes.centerAlign}>
              <Grid item xs={false} lg={2} />
              <Grid item xs={12} lg={8}>
                <FursuitDetail fursuit={fursuit} />
              </Grid>
              <Grid item xs={false} lg={2} />
            </Grid>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }

  renderFursuitHeaderMobile(fursuit) {
    const { classes, match, currentSession, width } = this.props;

    return (
      <React.Fragment>
        <div className={classes.infoHeader}>
          <Grid container spacing={3} className={classes.centerAlign}>
            <Grid item xs={3} className={classes.avatarContainer}>
              <FursuitAvatar fursuit={fursuit} avatarClass={classes.fursuitAvatarMobile} />
            </Grid>
            <Grid item xs={9}>
              <div className={classes.headerTitles}>
                <Typography variant="h5" className={classes.fursuitTitle} noWrap>
                  {fursuit.name}
                </Typography>
                <Typography variant="subtitle1" className={classes.fursuitTitlePadded} noWrap>
                  {fursuit.fursuitFinger ? fursuit.fursuitFinger.name : ""}
                </Typography>
              </div>
              <div>
                {this.renderActionButton(fursuit)}
                <div style={{ padding: 4 }} />
                {!fursuit.claimed && !fursuit.possessed && this.renderFollowButton(fursuit)}
                <IconButton
                  className={classes.actionButtonPadding}
                  color="primary"
                  onClick={() =>
                    this.setState({
                      fursuitDetail: !this.state.fursuitDetail
                    })
                  }
                >
                  <InfoIcon />
                </IconButton>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Metrics fursuit={fursuit} />
              <SubtitleRow fursuit={fursuit} />
              <div className={classes.headerTitles}>
                <Typography variant="subtitle1" className={classes.fursuitTitle} noWrap>
                  {fursuit.bio}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        {this.state.fursuitDetail && (
          <React.Fragment>
            {width === "xl" || width === "lg" ? <Padder /> : <MicroPadder />}
            <Grid container spacing={3} className={classes.centerAlign}>
              <Grid item xs={false} lg={2} />
              <FursuitDetail fursuit={fursuit} />
              <Grid item xs={false} lg={2} />
            </Grid>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }

  render() {
    const { classes, match, currentSession, width } = this.props;

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
              return null; //TODO ERROR
            }

            if (loading || !data) {
              return null; //TODO LOADING
            }

            const fursuit = data ? data.fursuit : null;

            return (
              <React.Fragment>
                <PageTitle>{fursuit ? fursuit.name : null}</PageTitle>
                {width === "sm" || width === "xs"
                  ? this.renderFursuitHeaderMobile(fursuit)
                  : this.renderFursuitHeader(fursuit)}
                {width === "xl" || width === "lg" ? <Padder /> : <MicroPadder />}
                <FursuitMedia fursuitId={match.params.id} />
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
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(withWidth()(withCurrentSession(Fursuit))));
