import React from "react";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import CommentIcon from "@material-ui/icons/Comment";
import { Link } from "react-router-dom";
import timeAgo from "../../timeAgo";
import UserAvatar from "../Users/UserAvatar";
import PageTitle from "../Global/PageTitle";
import FursuitMiniCard from "../Fursuits/FursuitMiniCard";
import dayjs from "dayjs";
import queryString from "query-string";
import * as Scroll from "react-scroll";

import { GET_MEDIUM } from "../../queries/mediaQueries";

import RelatedMediumCard from "./RelatedMediumCard";
import CommentForm from "./CommentForm";
import LikeButton from "./LikeButton";
import FaveButton from "./FaveButton";
import Comments from "./Comments";
import EditMediumDialog from "./EditMediumDialog";
import TagDialog from "../TagDialog";
import ReportDialog from "../AppDialogs/ReportDialog";
import TagReportDialog from "../AppDialogs/TagReportDialog";
import ExifDialog from "../AppDialogs/ExifDialog";
import withCurrentSession from "../withCurrentSession";
import SocialButton from "../Global/SocialButton";
import TwitterIcon from "../../icons/Twitter";
import TelegramIcon from "../../icons/Telegram";
import countFormat from "../../countFormat";
import IconButton from "@material-ui/core/IconButton";
import withWidth from "@material-ui/core/withWidth";
import OutlinedFlag from "@material-ui/icons/OutlinedFlag";

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
    paddingBottom: theme.spacing.unit
  },
  userInfo: {
    paddingLeft: 0,
    paddingRight: 0
  },
  text: {},
  mediumTitle: {
    maxWidth: "40vw",
    marginBottom: 0
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
  mediaH: {
    width: "100%",
    maxHeight: "calc(100vh - 56px)",
    objectFit: "contain"
  },
  mediaV: {
    transform: "rotate(90deg)",
    width: "calc(100vh - 56px)",
    height: "calc(100vh - 56px)",
    maxHeight: "calc(100vh - 56px)",
    objectFit: "contain",
    margin: "auto",
    display: "block"
  },
  gridContainer: {
    maxHeight: "calc(100vh - 56px)",
    backgroundColor: "black"
  },
  fursuitLink: {
    textDecoration: "none"
  },
  tagReportButton: {
    padding: theme.spacing.unit,
    paddingTop: 0
  }
});

var scroll = Scroll.animateScroll;

class Medium extends React.Component {
  state = {
    menuAnchor: null,
    exifDialog: false,
    editMedium: false,
    showMenuButton: false,
    tagMedium: false,
    reportDialog: false,
    tagReportDialog: false
  };

  renderCommentsCount(count) {
    if (count === 0) {
      return `No comments`;
    }
    if (count === 1) {
      return `One comment`;
    }
    return `${count} comments`;
  }

  scrollTo() {
    scroll.scrollTo(122);
  }

  render() {
    const { classes, match, currentSession, width } = this.props;

    return (
      <Query
        query={GET_MEDIUM}
        variables={{
          id: match.params.id
        }}
      >
        {({ loading, error, data }) => {
          const medium = data ? data.medium : null;

          return (
            !loading &&
            !error &&
            medium && (
              <React.Fragment>
                <div style={{ paddingTop: 10 }} />
                <div className={classes.container} key={medium.id}>
                  <PageTitle>
                    {!loading && medium
                      ? `Picture #${
                          medium.id.split("-")[medium.id.split("-").length - 5]
                        }`
                      : null}
                  </PageTitle>
                  <Card className={classes.card} elevation={0}>
                    <Grid container className={classes.gridContainer}>
                      <Grid item lg={1} xs={12} />
                      <Grid item lg={10} xs={12}>
                        <img
                          onClick={this.scrollTo}
                          onContextMenu={e => {
                            e.preventDefault();
                          }}
                          className={
                            medium.exif &&
                            JSON.parse(medium.exif).Orientation === "6"
                              ? classes.mediaV
                              : classes.mediaH
                          }
                          src={`${medium.picture}`}
                          title={medium.title}
                        />
                      </Grid>
                      <Grid item lg={1} xs={12} />
                    </Grid>
                    <Grid container spacing={8}>
                      <Grid item lg={8} xs={12}>
                        <CardContent>
                          <div className={classes.pictureInfo}>
                            <Grid
                              container
                              spacing={8}
                              justify="space-between"
                              wrap="nowrap"
                            >
                              <Grid item>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="h2"
                                  className={classes.mediumTitle}
                                  noWrap
                                >
                                  {`Picture #${
                                    medium.id.split("-")[
                                      medium.id.split("-").length - 5
                                    ]
                                  }`}
                                </Typography>
                              </Grid>
                              <Grid item style={{ flexShrink: 0 }}>
                                {medium.visibility === "public" && (
                                  <React.Fragment>
                                    <SocialButton
                                      name="Twitter"
                                      url="https://twitter.com/intent/tweet/"
                                      params={{
                                        text: `${medium.title} via @${
                                          process.env.TWITTER_ACCOUNT
                                        }`,
                                        url: window.location.href
                                      }}
                                      className={classes.socialButton}
                                    >
                                      <TwitterIcon fontSize={"inherit"} />
                                    </SocialButton>
                                    <SocialButton
                                      name="Telegram"
                                      className={classes.socialButton}
                                      url="https://telegram.me/share/url"
                                      params={{
                                        text: medium.title,
                                        url: window.location.href
                                      }}
                                    >
                                      <TelegramIcon fontSize={"inherit"} />
                                    </SocialButton>
                                  </React.Fragment>
                                )}
                                <LikeButton medium={medium} />
                                {currentSession.user.sponsor && (
                                  <FaveButton medium={medium} />
                                )}
                              </Grid>
                            </Grid>
                            <Grid container spacing={8} justify="space-between">
                              <Grid item>
                                <Typography
                                  gutterBottom
                                  variant="subtitle1"
                                  noWrap
                                >
                                  {countFormat(
                                    medium.viewsCount,
                                    "view",
                                    "views"
                                  )}
                                </Typography>
                              </Grid>
                            </Grid>
                          </div>
                          <Divider />
                          <Grid
                            container
                            spacing={0}
                            justify="space-between"
                            alignItems="center"
                          >
                            <Grid item>
                              <CardHeader
                                className={classes.userInfo}
                                avatar={
                                  <Link
                                    to={`/${medium.user.slug}`}
                                    className={classes.userLink}
                                  >
                                    <UserAvatar user={medium.user} />
                                  </Link>
                                }
                                title={
                                  <Link
                                    to={`/${medium.user.slug}`}
                                    className={classes.userLink}
                                  >
                                    {medium.user.name}
                                  </Link>
                                }
                                subheader={
                                  medium.createdAt
                                    ? timeAgo.format(
                                        dayjs(medium.createdAt).toDate()
                                      )
                                    : "Under review"
                                }
                              />
                            </Grid>
                            <Grid item style={{ flexShrink: 0 }}>
                              {medium.exif &&
                                Object.keys(JSON.parse(medium.exif)).length !==
                                  0 && (
                                  <Button
                                    onClick={() =>
                                      this.setState({ exifDialog: true })
                                    }
                                    variant="outlined"
                                  >
                                    EXIF Data
                                  </Button>
                                )}
                            </Grid>
                            <Grid item style={{ flexShrink: 0 }}>
                              {currentSession &&
                                (medium.user.id === currentSession.user.id ||
                                  currentSession.user.moderator) && (
                                  <Button
                                    onClick={() =>
                                      this.setState({ editMedium: true })
                                    }
                                    variant="outlined"
                                  >
                                    Edit picture
                                  </Button>
                                )}
                              {currentSession &&
                                medium.user.id !== currentSession.user.id &&
                                medium.completion != 100 && (
                                  <Button
                                    onClick={() =>
                                      this.setState({ tagMedium: true })
                                    }
                                    variant="outlined"
                                  >
                                    Tag Picture
                                  </Button>
                                )}
                              <IconButton
                                onClick={() =>
                                  this.setState({ reportDialog: true })
                                }
                                color="secondary"
                              >
                                <OutlinedFlag />
                              </IconButton>
                            </Grid>
                          </Grid>
                          <div className={classes.tags}>
                            {medium.edition && (
                              <Typography
                                gutterBottom
                                variant="subtitle1"
                                noWrap
                              >
                                {medium.edition.event.name}{" "}
                                {medium.edition.name}
                              </Typography>
                            )}
                            {medium.subEvent && (
                              <Typography
                                gutterBottom
                                variant="subtitle1"
                                noWrap
                              >
                                {medium.subEvent}
                              </Typography>
                            )}
                            {medium.fursuits.length != 0 && (
                              <React.Fragment>
                                <Typography
                                  gutterBottom
                                  variant="subtitle1"
                                  noWrap
                                >
                                  {"Fursuits"}
                                </Typography>
                                <div className={classes.tagReportButton}>
                                  <Button
                                    variant="outlined"
                                    onClick={() =>
                                      this.setState({ tagReportDialog: true })
                                    }
                                  >
                                    Report Wrong Tags
                                  </Button>
                                </div>
                              </React.Fragment>
                            )}
                            <Grid container spacing={8}>
                              {medium.fursuits.length != 0 &&
                                medium.fursuits.map(fursuit => (
                                  <Grid item lg={2} xs={2} key={fursuit.id}>
                                    <Link
                                      to={`/fursuits/${fursuit.slug}`}
                                      className={classes.fursuitLink}
                                    >
                                      <FursuitMiniCard
                                        onClick={() => {}}
                                        fursuit={fursuit}
                                      />
                                    </Link>
                                  </Grid>
                                ))}
                            </Grid>
                          </div>
                        </CardContent>
                        <CardContent>
                          {medium.commentsDisabled ? (
                            <Typography gutterBottom variant="caption">
                              {"Comments are disabled for this video."}
                            </Typography>
                          ) : (
                            <React.Fragment>
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="h3"
                              >
                                {countFormat(
                                  medium.commentsCount,
                                  "comment",
                                  "comments"
                                )}
                              </Typography>
                              {currentSession ? (
                                <CommentForm medium={medium} />
                              ) : (
                                <Typography gutterBottom variant="caption">
                                  {"You must be connected to write a comment."}
                                </Typography>
                              )}
                              <Comments
                                medium={medium}
                                parent={null}
                                commentsCount={medium.commentsCount}
                              />
                            </React.Fragment>
                          )}
                        </CardContent>
                      </Grid>
                      <Grid item lg={4} xs={12}>
                        <CardContent>
                          {medium.relatedMedia.map(medium => (
                            <div
                              className={classes.relatedMedia}
                              key={medium.id}
                            >
                              <RelatedMediumCard medium={medium} horizontal />
                            </div>
                          ))}
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                  <EditMediumDialog
                    open={this.state.editMedium}
                    onClose={() => this.setState({ editMedium: false })}
                    medium={medium}
                  />
                  <TagDialog
                    open={this.state.tagMedium}
                    onClose={() => this.setState({ tagMedium: false })}
                    mediumId={medium.id}
                    noReload={true}
                  />
                  <ReportDialog
                    open={this.state.reportDialog}
                    onClose={() => this.setState({ reportDialog: false })}
                    resource="medium"
                    resourceId={medium.id}
                  />
                  <TagReportDialog
                    open={this.state.tagReportDialog}
                    onClose={() => this.setState({ tagReportDialog: false })}
                    medium={medium}
                  />
                  <ExifDialog
                    open={this.state.exifDialog}
                    onClose={() => this.setState({ exifDialog: false })}
                    medium={medium}
                  />
                </div>
              </React.Fragment>
            )
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(withCurrentSession(withWidth()(Medium)));
