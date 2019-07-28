import React from "react";
import { Query, Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
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
import {
  TAG_LOCK_MEDIUM,
  TAG_UNLOCK_MEDIUM
} from "../../queries/mediaMutations";

import RelatedMediumCard from "./RelatedMediumCard";
import CommentForm from "./CommentForm";
import LikeButton from "./LikeButton";
import FaveButton from "./FaveButton";
import Comments from "./Comments";
import EditMediumDialogMobile from "./EditMediumDialogMobile";
import MediumDataDialog from "./MediumDataDialog";
import TagDialogMobile from "../TagDialogMobile";
import ReportDialog from "../AppDialogs/ReportDialog";
import TagReportDialog from "../AppDialogs/TagReportDialog";
import ExifDialog from "../AppDialogs/ExifDialog";
import DownloadDialog from "../AppDialogs/DownloadDialog";
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
    marginTop: theme.spacing.unit * 1
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
    paddingTop: 0,
    textAlign: "center"
  },
  dataFieldTitle: {
    maxWidth: "40vw",
    marginBottom: 0,
    fontWeight: 200
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
  gridSpacer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  padder: {
    padding: theme.spacing.unit * 0.5
  },
  buttonPadder: {
    marginRight: theme.spacing.unit
  },
  topContainer: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  topSubContainer: {
    paddingTop: theme.spacing.unit * 0.5,
    paddingBottom: theme.spacing.unit * 0.5,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

var scroll = Scroll.animateScroll;

class Medium extends React.Component {
  state = {
    menuAnchor: null,
    mediumDataDialog: false,
    exifDialog: false,
    downloadDialog: false,
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

          if (loading || error) {
            return null;
          }
          return (
            medium && (
              <React.Fragment>
                <div style={{ paddingTop: 10 }} />
                <Card className={classes.card} elevation={0}>
                  <Grid
                    container
                    className={classes.topContainer}
                    spacing={0}
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item xs={12}>
                      <CardHeader
                        className={classes.userInfo}
                        avatar={
                          <Link
                            to={`/${medium.user.slug}`}
                            className={classes.userLink}
                          >
                            <UserAvatar user={medium.user} size={64} />
                          </Link>
                        }
                        title={
                          <Typography variant="subtitle1">
                            <Link
                              to={`/${medium.user.slug}`}
                              className={classes.userLink}
                            >
                              {medium.user.name}
                            </Link>
                          </Typography>
                        }
                        subheader={
                          medium.createdAt
                            ? timeAgo.format(dayjs(medium.createdAt).toDate())
                            : "Under review"
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <div className={classes.topRow}>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            this.setState({ mediumDataDialog: true });
                          }}
                        >
                          Info
                        </Button>
                        {currentSession &&
                          (medium.user.id === currentSession.user.id ||
                            currentSession.user.moderator) && (
                            <Mutation
                              mutation={TAG_LOCK_MEDIUM}
                              update={cache => {}}
                              onCompleted={() => {
                                this.setState({ editMedium: true });
                              }}
                              onError={() => {
                                this.setState({ editMedium: true });
                              }}
                            >
                              {(tagLockMedium, { data }) => (
                                <Button
                                  variant="outlined"
                                  onClick={() => {
                                    tagLockMedium({
                                      variables: {
                                        input: {
                                          id: medium.id
                                        }
                                      }
                                    });
                                  }}
                                >
                                  Edit picture
                                </Button>
                              )}
                            </Mutation>
                          )}
                        {currentSession &&
                          medium.user.id !== currentSession.user.id &&
                          medium.completion != 100 && (
                            <Mutation
                              mutation={TAG_LOCK_MEDIUM}
                              update={cache => {}}
                              onCompleted={() => {
                                this.setState({ tagMedium: true });
                              }}
                              onError={() => {
                                this.setState({ tagMedium: true });
                              }}
                            >
                              {(tagLockMedium, { data }) => (
                                <Button
                                  variant="outlined"
                                  onClick={() => {
                                    tagLockMedium({
                                      variables: {
                                        input: {
                                          id: medium.id
                                        }
                                      }
                                    });
                                  }}
                                >
                                  Tag Picture
                                </Button>
                              )}
                            </Mutation>
                          )}
                        <Tooltip title="Report Media">
                          <IconButton
                            onClick={() =>
                              this.setState({ reportDialog: true })
                            }
                          >
                            <OutlinedFlag />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </Grid>
                  </Grid>
                </Card>
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
                          src={`${medium.resized}`}
                          title={medium.title}
                        />
                      </Grid>
                      <Grid item lg={1} xs={12} />
                    </Grid>
                    <Grid container spacing={8}>
                      <Grid item lg={9} xs={12}>
                        <CardContent>
                          {currentSession && (
                            <div className={classes.pictureInfo}>
                              <Grid container spacing={8}>
                                <Grid item xs={12}>
                                  <div className={classes.topRow}>
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
                                    <Button
                                      onClick={() =>
                                        this.setState({ downloadDialog: true })
                                      }
                                      variant="outlined"
                                      className={classes.buttonPadder}
                                    >
                                      Download
                                    </Button>
                                    {medium.exif &&
                                      Object.keys(JSON.parse(medium.exif))
                                        .length !== 0 &&
                                      JSON.parse(medium.exif)
                                        .DateTimeOriginal &&
                                      JSON.parse(medium.exif).Model && (
                                        <Button
                                          onClick={() =>
                                            this.setState({ exifDialog: true })
                                          }
                                          variant="outlined"
                                          className={classes.buttonPadder}
                                        >
                                          EXIF
                                        </Button>
                                      )}
                                  </div>
                                </Grid>
                                <Grid item xs={7}>
                                  <LikeButton medium={medium} />
                                </Grid>
                                <FaveButton medium={medium} />
                              </Grid>
                            </div>
                          )}
                          {medium.fursuits.length != 0 && (
                            <div>
                              <div className={classes.padder} />
                              <Divider />
                              <div className={classes.padder} />
                              <div className={classes.padder} />
                              <Grid
                                container
                                spacing={8}
                                className={classes.gridSpacer}
                              >
                                <Grid item xs={12}>
                                  <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="h2"
                                    color="primary"
                                  >
                                    {"Fursuits Tagged"}
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  style={{ textAlign: "center" }}
                                >
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
                                </Grid>
                              </Grid>
                            </div>
                          )}
                          <div className={classes.tags}>
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
                          <Divider />
                        </CardContent>
                        {currentSession && (
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
                                    {
                                      "You must be connected to write a comment."
                                    }
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
                        )}
                        {!currentSession && (
                          <div style={{ textAlign: "center" }}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="h3"
                            >
                              Log In to view Media information and Comments
                            </Typography>
                          </div>
                        )}
                      </Grid>
                      <Grid item lg={3} xs={12}>
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
                  <Mutation
                    mutation={TAG_UNLOCK_MEDIUM}
                    update={cache => {}}
                    onCompleted={() => {
                      this.setState({ editMedium: false });
                    }}
                    onError={() => {
                      this.setState({ editMedium: false });
                      location.reload();
                    }}
                  >
                    {(tagUnlockMedium, { data, error }) => (
                      <EditMediumDialogMobile
                        open={this.state.editMedium}
                        onClose={() => {
                          tagUnlockMedium({
                            variables: {
                              input: {
                                id: medium.id
                              }
                            }
                          });
                        }}
                        mediumId={medium.id}
                      />
                    )}
                  </Mutation>
                  <Mutation
                    mutation={TAG_UNLOCK_MEDIUM}
                    update={cache => {}}
                    onCompleted={() => {
                      this.setState({
                        tagMedium: false
                      });
                    }}
                    onError={() => {
                      this.setState({
                        tagMedium: false
                      });
                      location.reload();
                    }}
                  >
                    {(tagUnlockMedium, { data, error }) => (
                      <TagDialogMobile
                        open={this.state.tagMedium}
                        onClose={() => {
                          tagUnlockMedium({
                            variables: {
                              input: {
                                id: medium.id
                              }
                            }
                          });
                        }}
                        mediumId={medium.id}
                        noReload={true}
                      />
                    )}
                  </Mutation>
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
                  <DownloadDialog
                    open={this.state.downloadDialog}
                    onClose={() => this.setState({ downloadDialog: false })}
                    medium={medium}
                  />
                  <MediumDataDialog
                    open={this.state.mediumDataDialog}
                    onClose={() => this.setState({ mediumDataDialog: false })}
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
