import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CameraIcon from "@material-ui/icons/CameraAlt";
import FlashIcon from "@material-ui/icons/FlashOn";
import TimerIcon from "@material-ui/icons/Timer";
import IsoIcon from "@material-ui/icons/Iso";
import DateIcon from "@material-ui/icons/DateRange";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRulerHorizontal, faEye } from "@fortawesome/free-solid-svg-icons";

import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import DownloadIcon from "@material-ui/icons/SaveAlt";
import EditIcon from "@material-ui/icons/Edit";
import OutlinedFlag from "@material-ui/icons/OutlinedFlag";

import withCurrentSession from "../withCurrentSession";
import { withStyles } from "@material-ui/core/styles";
import { GET_MEDIUM } from "../../queries/mediaQueries";
import { Query, Mutation } from "react-apollo";
import {
  TAG_LOCK_MEDIUM,
  TAG_UNLOCK_MEDIUM
} from "../../queries/mediaMutations";
import countFormat from "../../countFormat";

import ReportDialog from "../AppDialogs/ReportDialog";
import TagReportDialog from "../AppDialogs/TagReportDialog";
import ExifDialog from "../AppDialogs/ExifDialog";
import DownloadDialog from "../AppDialogs/DownloadDialog";
import LikeButton from "./LikeButton";
import FaveButton from "./FaveButton";
import FursuitMiniCard from "../Fursuits/FursuitMiniCard";
import TagDialog from "./TagDialog";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import { withWidth, CardHeader } from "@material-ui/core";
import UserAvatar from "../Users/UserAvatar";
import timeAgo from "../../timeAgo";
import dayjs from "dayjs";
import countContractor from "../../countContractor";

const styles = theme => ({
  dialogTitleRoot: {
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
  dataLink: {
    textDecoration: "none",
    color: theme.palette.secondary.main
  },
  text: {
    fontWeight: 200
  },
  masterGridOnLoad: {
    padding: theme.spacing.unit * 4,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  masterGrid: {
    padding: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em"
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  },
  dataGrid: {
    padding: theme.spacing.unit,
    width: "100%",
    overflowY: "auto",
    height: "fit-content",
    display: "flex"
  },
  flexSection: {
    display: "flex",
    justifyContent: "space-between"
  },
  flexSectionCentered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  flexSectionSpacedCentered: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  mediaH: {
    width: "100%",
    maxHeight: "calc(100vh - 56px)",
    objectFit: "contain"
  },
  mediaHflip: {
    transform: "rotate(180deg)",
    width: "100%",
    maxHeight: "calc(100vh - 56px)",
    objectFit: "contain"
  },
  mediaVleft: {
    transform: "rotate(90deg)",
    width: "calc(100vh - 56px)",
    height: "calc(100vh - 56px)",
    maxHeight: "calc(100vh - 56px)",
    objectFit: "contain",
    margin: "auto",
    display: "block"
  },
  mediaVright: {
    transform: "rotate(-90deg)",
    width: "calc(100vh - 56px)",
    height: "calc(100vh - 56px)",
    maxHeight: "calc(100vh - 56px)",
    objectFit: "contain",
    margin: "auto",
    display: "block"
  },
  copied: {
    color: theme.palette.primary.main
  },
  dataFieldTitle: {
    maxWidth: "40vw",
    fontWeight: 200
  },
  innerDialogCloseButton: {
    position: "absolute",
    right: theme.spacing.unit * 1,
    top: theme.spacing.unit * 1,
    color: theme.palette.grey[500]
  },
  masterGridBackdrop: {
    padding: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black"
  },
  fursuitLink: {
    textDecoration: "none"
  },
  dialogHeight: {
    height: "100%"
  },
  sideHeight: {
    maxHeight: "100%"
  },
  leftIcon: {
    fontSize: 25
  },
  iconGridRoot: {
    alignItems: "center"
  },
  iconGrid: {
    textAlign: "center"
  },
  textGrid: {
    paddingLeft: theme.spacing.unit
  },
  userLink: {
    color: theme.palette.text.primary,
    textDecoration: "none"
  },
  userInfo: {
    paddingLeft: 0,
    paddingRight: 0
  },
  viewsCount: {
    fontWeight: 200
  }
});

const Spacer = () => <div style={{ padding: 8 }} />;

const FatDivider = () => (
  <hr style={{ borderTop: "1px solid", width: "80%", color: "grey" }} />
);

const DataDialog = ({ classes, medium, open, onClose }) => {
  let exif = null;
  if (medium.exif) exif = JSON.parse(medium.exif);

  return (
    <ResponsiveDialog open={open} onClose={onClose} size={600}>
      <DialogTitle className={classes.dialogTitleRoot}>
        <Typography variant="h6">Media Information</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          className={classes.innerDialogCloseButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {medium.photographerSlug && (
          <Grid item>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              color="primary"
            >
              Captured by
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className={classes.dataFieldTitle}
            >
              <Link
                to={`/${medium.photographerSlug}`}
                className={classes.dataLink}
              >
                {" "}
                {medium.photographerSlug}
              </Link>
            </Typography>
          </Grid>
        )}
        <Spacer />
        {medium.photographerString && (
          <Grid item>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              color="primary"
            >
              Captured by
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className={classes.dataFieldTitle}
            >
              {medium.photographerString}
            </Typography>
          </Grid>
        )}
        {medium.edition && (
          <Grid item>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              color="primary"
            >
              Event (Edition)
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className={classes.dataFieldTitle}
            >
              <Link
                to={`/events/${medium.edition.event.slug}?edition_id=${medium.edition.id}&edition_name=${medium.edition.name}`}
                className={classes.dataLink}
              >
                {medium.edition.event.name} ({medium.edition.name})
              </Link>
            </Typography>
          </Grid>
        )}
        <Spacer />
        {medium.subEvent && (
          <Grid item>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              color="primary"
            >
              Sub Event
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className={classes.dataFieldTitle}
            >
              {medium.subEvent.name}
            </Typography>
          </Grid>
        )}
        <Spacer />
        {medium.category && (
          <Grid item>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              color="primary"
            >
              Category
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className={classes.dataFieldTitle}
            >
              {medium.category.name}
            </Typography>
          </Grid>
        )}
        <Spacer />
        {exif &&
          Object.keys(exif).length !== 0 &&
          exif.DateTimeOriginal &&
          exif.Model && (
            <React.Fragment>
              <FatDivider />
              <List>
                <ListItem>
                  <Grid container spacing={1} className={classes.iconGridRoot}>
                    <Grid item xs={2} className={classes.iconGrid}>
                      <ListItemIcon>
                        <DateIcon className={classes.leftIcon} />
                      </ListItemIcon>
                    </Grid>
                    <Grid item xs={10}>
                      <ListItemText
                        className={classes.textGrid}
                        primary={`Captured: ${exif.DateTimeOriginal}`}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={1} className={classes.iconGridRoot}>
                    <Grid item xs={2} className={classes.iconGrid}>
                      <ListItemIcon>
                        <CameraIcon className={classes.leftIcon} />
                      </ListItemIcon>
                    </Grid>
                    <Grid item xs={10}>
                      <ListItemText
                        className={classes.textGrid}
                        primary={`Camera: ${exif.Model}`}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                {exif.FNumber && (
                  <ListItem>
                    <Grid
                      container
                      spacing={1}
                      className={classes.iconGridRoot}
                    >
                      <Grid item xs={2} className={classes.iconGrid}>
                        <ListItemIcon>
                          <Typography className={classes.leftIcon}>
                            ʄ
                          </Typography>
                        </ListItemIcon>
                      </Grid>
                      <Grid item xs={10}>
                        <ListItemText
                          className={classes.textGrid}
                          primary={`F-Stop: f/${String(
                            parseFloat(exif.FNumber.split("/")[0]) /
                              parseFloat(exif.FNumber.split("/")[1])
                          )}`}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                )}
                {exif.ExposureTime && (
                  <ListItem>
                    <Grid
                      container
                      spacing={1}
                      className={classes.iconGridRoot}
                    >
                      <Grid item xs={2} className={classes.iconGrid}>
                        <ListItemIcon>
                          <TimerIcon className={classes.leftIcon} />
                        </ListItemIcon>
                      </Grid>
                      <Grid item xs={10}>
                        <ListItemText
                          className={classes.textGrid}
                          primary={`Exposure Time: ${exif.ExposureTime}`}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                )}
                {exif.FocalLength && (
                  <ListItem>
                    <Grid
                      container
                      spacing={1}
                      className={classes.iconGridRoot}
                    >
                      <Grid item xs={2} className={classes.iconGrid}>
                        <ListItemIcon>
                          <FontAwesomeIcon
                            icon={faRulerHorizontal}
                            className={classes.leftIcon}
                          />
                        </ListItemIcon>
                      </Grid>
                      <Grid item xs={10}>
                        <ListItemText
                          className={classes.textGrid}
                          primary={`Focal Length: ${
                            exif.FocalLength.split("/")[0]
                          }.0mm`}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                )}
                {exif.ISOSpeedRatings && (
                  <ListItem>
                    <Grid
                      container
                      spacing={1}
                      className={classes.iconGridRoot}
                    >
                      <Grid item xs={2} className={classes.iconGrid}>
                        <ListItemIcon>
                          <IsoIcon className={classes.leftIcon} />
                        </ListItemIcon>
                      </Grid>
                      <Grid item xs={10}>
                        <ListItemText
                          className={classes.textGrid}
                          primary={`ISO: ${exif.ISOSpeedRatings}`}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                )}
                {exif.Flash && (
                  <ListItem>
                    <Grid
                      container
                      spacing={1}
                      className={classes.iconGridRoot}
                    >
                      <Grid item xs={2} className={classes.iconGrid}>
                        <ListItemIcon>
                          <FlashIcon className={classes.leftIcon} />
                        </ListItemIcon>
                      </Grid>
                      <Grid item xs={10}>
                        <ListItemText
                          className={classes.textGrid}
                          primary={`Flash: ${
                            parseInt(exif.Flash) % 2 == 0
                              ? "Did not fire"
                              : "Fired"
                          }`}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                )}
              </List>
            </React.Fragment>
          )}
      </DialogContent>
    </ResponsiveDialog>
  );
};

const DataSection = ({ classes, medium }) => {
  const [dataOpen, setDataOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);

  return (
    <React.Fragment>
      <DataDialog
        classes={classes}
        medium={medium}
        open={dataOpen}
        onClose={() => setDataOpen(false)}
      />
      <DownloadDialog
        open={downloadOpen}
        onClose={() => setDownloadOpen(false)}
        medium={medium}
      />
      <Grid item xs={12} className={classes.flexSectionSpacedCentered}>
        <div>
          <LikeButton medium={medium} />
          <FaveButton medium={medium} />
        </div>
        <div>
          <Tooltip title="Display Media Information">
            <IconButton onClick={() => setDataOpen(true)} color="secondary">
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div>
          <Tooltip title="Download Media">
            <IconButton onClick={() => setDownloadOpen(true)} color="secondary">
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Grid>
      <Grid
        item
        xs={12}
        className={classes.flexSectionSpacedCentered}
        style={{ paddingLeft: "5%", paddingRight: "5%" }}
      >
        <div>
          <CardHeader
            className={classes.userInfo}
            avatar={
              <Link to={`/${medium.user.slug}`} className={classes.userLink}>
                <UserAvatar user={medium.user} size={48} />
              </Link>
            }
            title={
              <Typography variant="subtitle1">
                <Link to={`/${medium.user.slug}`} className={classes.userLink}>
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
        </div>
        <div>
          <Tooltip title={`${countFormat(medium.viewsCount, "view", "views")}`}>
            <Typography variant="h6" className={classes.viewsCount}>
              <FontAwesomeIcon icon={faEye} />
              &nbsp;&nbsp;
              {countContractor(medium.viewsCount)}
            </Typography>
          </Tooltip>
        </div>
      </Grid>
    </React.Fragment>
  );
};

const MediumActionButton = ({ currentSession, classes, medium }) => {
  const [tagDialogOpen, setTagDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <React.Fragment>
      <Mutation
        mutation={TAG_UNLOCK_MEDIUM}
        onCompleted={() => {
          setEditDialogOpen(false);
        }}
        onError={() => {
          setEditDialogOpen(false);
        }}
      >
        {(tagUnlockMedium, { data, error }) => (
          <TagDialog
            editMedium
            open={editDialogOpen}
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
        onCompleted={() => {
          setTagDialogOpen(false);
        }}
        onError={() => {
          setTagDialogOpen(false);
        }}
      >
        {(tagUnlockMedium, { data, error }) => (
          <TagDialog
            open={tagDialogOpen}
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
      <Grid item xs={12} className={classes.flexSection}>
        {currentSession && medium.completion != 100 && (
          <Mutation
            mutation={TAG_LOCK_MEDIUM}
            update={cache => {}}
            onCompleted={() => {
              medium.user.id === currentSession.user.id ||
              currentSession.user.moderator
                ? setEditDialogOpen(true)
                : setTagDialogOpen(true);
            }}
            onError={() => {
              medium.user.id === currentSession.user.id ||
              currentSession.user.moderator
                ? setEditDialogOpen(true)
                : setTagDialogOpen(true);
            }}
          >
            {(tagLockMedium, { data }) => (
              <Grid container spacing={1} justify="center" alignItems="center">
                <Grid item lg={12} xs={12}>
                  <Tooltip title="Tag Fursuits" placement="top">
                    <img
                      src={require("images/addTags.png")}
                      style={{
                        cursor: "pointer",
                        width: "100%"
                      }}
                      onClick={() => {
                        tagLockMedium({
                          variables: {
                            input: {
                              id: medium.id
                            }
                          }
                        });
                      }}
                    />
                  </Tooltip>
                </Grid>
                <Grid item lg={12} xs={12} className={classes.content}>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    className={classes.fursuitText}
                    noWrap
                  >
                    Tag Fursuits
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Mutation>
        )}
      </Grid>
    </React.Fragment>
  );
};

const TagSection = ({ currentSession, classes, medium }) => {
  const [tagReportOpen, setTagReportOpen] = useState(false);

  return (
    <React.Fragment>
      <TagReportDialog
        open={tagReportOpen}
        onClose={() => setTagReportOpen(false)}
        medium={medium}
      />
      <Grid item xs={12} className={classes.flexSectionSpacedCentered}>
        <div>
          <Typography gutterBottom variant="h6" component="h2">
            {"Fursuits"}
          </Typography>
        </div>
        {medium.fursuits.length != 0 && (
          <div>
            <div className={classes.tagReportButton}>
              <Button variant="outlined" onClick={() => setTagReportOpen(true)}>
                Report Wrong Tags
              </Button>
            </div>
          </div>
        )}
      </Grid>
      <Grid item xs={12} className={classes.flexSection}>
        <Grid container spacing={1} className={classes.flexSectionCentered}>
          {medium.fursuits.length != 0 &&
            medium.fursuits.map(fursuit => (
              <Grid item xs={4} sm={3} lg={4} key={fursuit.id}>
                <Link
                  to={`/fursuits/${fursuit.slug}`}
                  className={classes.fursuitLink}
                >
                  <FursuitMiniCard onClick={() => {}} fursuit={fursuit} />
                </Link>
              </Grid>
            ))}
          <Grid item xs={4} sm={3} lg={4}>
            <MediumActionButton
              currentSession={currentSession}
              classes={classes}
              medium={medium}
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const CommentSection = ({ currentSession, classes, medium }) => {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        {currentSession && (
          <React.Fragment>
            <Typography gutterBottom variant="h6" component="h3">
              {countFormat(medium.commentsCount, "comment", "comments")}
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
      </Grid>
    </React.Fragment>
  );
};

class MediumDialog extends React.Component {
  state = {
    copied: false,
    reportDialog: false,
    editMedium: false,
    downloadDialog: false,
    tagReportDialog: false
  };

  render() {
    const {
      classes,
      width,
      open,
      onClose,
      mediumId,
      currentSession,
      match
    } = this.props;

    return (
      <Query query={GET_MEDIUM} variables={{ id: match.params.id }}>
        {({ error, loading, data }) => {
          if (error || loading) {
            return (
              <Grid container spacing={3}>
                <Grid item xs={12} lg={9} className={classes.masterGridOnLoad}>
                  <CircularProgress />
                </Grid>
                <Grid item xs={12} lg={3} className={classes.masterGridOnLoad}>
                  <CircularProgress />
                </Grid>
              </Grid>
            );
          }
          const medium = data ? data.medium : null;

          if (!medium) {
            return (
              <Grid container spacing={1}>
                <Grid item xs={12} className={classes.masterGridOnLoad}>
                  <Typography variant="h6">Something went wrong :(</Typography>
                </Grid>
              </Grid>
            );
          }

          var orientation;
          if (medium) {
            if (medium.exif && JSON.parse(medium.exif).Orientation === "6")
              orientation = classes.mediaVleft;
            else if (medium.exif && JSON.parse(medium.exif).Orientation === "8")
              orientation = classes.mediaVright;
            else if (medium.exif && JSON.parse(medium.exif).Orientation === "3")
              orientation = classes.mediaHflip;
            else orientation = classes.mediaH;
          } else orientation = classes.mediaH;

          return (
            <React.Fragment>
              <Grid container spacing={0}>
                <Grid
                  item
                  xs={12}
                  lg={9}
                  className={classes.masterGridBackdrop}
                >
                  {medium.resized.substr(
                    medium.resized.lastIndexOf(".") + 1
                  ) === "mp4" && (
                    <video
                      loop="loop"
                      autoplay="autoplay"
                      onContextMenu={e => {
                        e.preventDefault();
                      }}
                      className={orientation}
                      src={medium.resized}
                    />
                  )}
                  {medium.resized.substr(
                    medium.resized.lastIndexOf(".") + 1
                  ) !== "mp4" && (
                    <img
                      onClick={() => {}}
                      onContextMenu={e => {
                        e.preventDefault();
                      }}
                      className={orientation}
                      src={`${medium.resized}`}
                      title={medium.title}
                    />
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={3}
                  className={classes.dataGrid}
                  style={{
                    maxHeight:
                      width === "xl" || width === "lg"
                        ? "calc(100vh - 56px)"
                        : "100%"
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.flexSection}>
                      {true && (
                        <CopyToClipboard
                          text={`${process.env.SITE_URL}/pictures/${medium.id}`}
                          onCopy={() => {
                            this.setState({ copied: true });
                            setTimeout(() => {
                              this.setState({ copied: false });
                            }, 3000);
                          }}
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            className={
                              this.state.copied ? classes.copied : null
                            }
                          >
                            {this.state.copied
                              ? "Copied to Clipboard"
                              : "Get Link"}
                          </Button>
                        </CopyToClipboard>
                      )}
                      {currentSession && (
                        <Tooltip title="Report Media">
                          <IconButton
                            onClick={() =>
                              this.setState({ reportDialog: true })
                            }
                          >
                            <OutlinedFlag />
                          </IconButton>
                        </Tooltip>
                      )}
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
                              <IconButton
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
                                <EditIcon />
                              </IconButton>
                            )}
                          </Mutation>
                        )}
                      <IconButton onClick={onClose} autoFocus>
                        <CloseIcon />
                      </IconButton>
                    </Grid>
                    <DataSection classes={classes} medium={medium} />
                    <FatDivider />
                    <TagSection
                      currentSession={currentSession}
                      classes={classes}
                      medium={medium}
                    />
                    <FatDivider />
                    <CommentSection
                      currentSession={currentSession}
                      classes={classes}
                      medium={medium}
                    />
                  </Grid>
                </Grid>
              </Grid>
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
              <Mutation
                mutation={TAG_UNLOCK_MEDIUM}
                onCompleted={() => {
                  this.setState({ editMedium: false });
                }}
                onError={() => {
                  this.setState({ editMedium: false });
                }}
              >
                {(tagUnlockMedium, { data, error }) => (
                  <TagDialog
                    editMedium
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
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(
  withRouter(withCurrentSession(withWidth()(MediumDialog)))
);
