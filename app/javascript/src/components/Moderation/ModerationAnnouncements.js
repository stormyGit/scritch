import React, { useState } from "react";
import PageTitle from "../Global/PageTitle";
import queryString from "query-string";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import { FETCH_ANNOUNCEMENTS } from "../../queries/moderationQueries";
import { Query, Mutation } from "react-apollo";
import {
  CREATE_ANNOUNCEMENT,
  UPDATE_ANNOUNCEMENT,
  DELETE_ANNOUNCEMENT
} from "../../queries/moderationMutations";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";
import {
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Paper
} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import AnnouncementCard from "../PoliciesSupport/AnnouncementCard";
import timeAgo from "../../timeAgo";
import dayjs from "dayjs";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing(1),
    paddingRight: 0
  },
  card: {
    width: "100%",
    borderRadius: 0,
    padding: theme.spacing(2)
  },
  content: {
    padding: theme.spacing(4)
  },
  text: {
    fontWeight: 200,
    color: theme.palette.text.primary,
    fontFamily: "Roboto"
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
  pixelImage: {
    width: "100%"
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  flexAround: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  padderTitle: { paddingTop: 8, paddingLeft: 30, paddingRight: 8 },
  dangerButton: {
    color: theme.palette.danger.main
  }
});

const EditAnnouncementDialog = ({ open, onClose, classes, announcement }) => {
  const [body, setBody] = useState(announcement.body);
  const [title, setTitle] = useState(announcement.title);

  return (
    <ResponsiveDialog open={open} size={1250} onClose={onClose}>
      <GlobalProgress absolute />
      <DialogTitle>Edit Announcement</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Title"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              margin="dense"
              fullWidth
            />
            <TextField
              label="Body"
              name="body"
              multiline
              value={body}
              onChange={e => setBody(e.target.value)}
              margin="dense"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" style={{ textAlign: "center" }}>
              Preview
            </Typography>
            <div className={classes.content} className={classes.text}>
              <ReactMarkdown
                renderers={{
                  link: props => <a className={classes.link} {...props} />
                }}
                source={body}
              />
            </div>
          </Grid>
        </Grid>
        <div style={{ padding: 8 }} />
        <DialogActions>
          <Mutation mutation={UPDATE_ANNOUNCEMENT}>
            {(updateAnnouncement, { data }) => (
              <Button
                onClick={() => {
                  updateAnnouncement({
                    variables: {
                      input: {
                        id: announcement.id,
                        title: title,
                        body: body
                      }
                    }
                  }).then(() => location.reload());
                }}
              >
                SAVE CHANGES
              </Button>
            )}
          </Mutation>
        </DialogActions>
      </DialogContent>
    </ResponsiveDialog>
  );
};

const CreateAnnouncementDialog = ({ open, onClose, classes }) => {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");

  return (
    <ResponsiveDialog open={open} size={1250} onClose={onClose}>
      <GlobalProgress absolute />
      <DialogTitle>Create New Announcement</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Title"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              margin="dense"
              fullWidth
            />
            <TextField
              label="Body"
              name="body"
              multiline
              value={body}
              onChange={e => setBody(e.target.value)}
              margin="dense"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" style={{ textAlign: "center" }}>
              Preview
            </Typography>
            <div className={classes.content} className={classes.text}>
              <ReactMarkdown
                renderers={{
                  link: props => <a className={classes.link} {...props} />
                }}
                source={body}
              />
            </div>
          </Grid>
        </Grid>
        <div style={{ padding: 8 }} />
        <DialogActions>
          <Mutation mutation={CREATE_ANNOUNCEMENT}>
            {(createAnnouncement, { data }) => (
              <Button
                onClick={() => {
                  createAnnouncement({
                    variables: {
                      input: {
                        title: title,
                        body: body
                      }
                    }
                  }).then(() => location.reload());
                }}
              >
                Create
              </Button>
            )}
          </Mutation>
        </DialogActions>
      </DialogContent>
    </ResponsiveDialog>
  );
};

const ConfirmDeleteDialog = ({ announcement, classes, onClose, open }) => {
  return (
    <ResponsiveDialog open={open} size={500} onClose={onClose}>
      <GlobalProgress absolute />
      <DialogTitle>Delete Announcement: {announcement.title}</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Are you sure you want to do this?</Typography>
        <Typography variant="h6">This action is irreversible.</Typography>
        <div style={{ padding: 16 }} />
        <Grid container spacing={6}>
          <Grid item xs={6} style={{ textAlign: "center" }}>
            <Mutation mutation={DELETE_ANNOUNCEMENT}>
              {(deleteAnnouncement, { data }) => (
                <Button
                  variant="outlined"
                  className={classes.dangerButton}
                  onClick={() => {
                    deleteAnnouncement({
                      variables: {
                        input: {
                          id: announcement.id
                        }
                      }
                    }).then(() => location.reload());
                  }}
                >
                  Delete
                </Button>
              )}
            </Mutation>
          </Grid>
          <Grid item xs={6} style={{ textAlign: "center" }}>
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </ResponsiveDialog>
  );
};

const Announcement = ({ announcement, classes, width }) => {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);

  return (
    <React.Fragment>
      <Paper className={classes.card} elevation={0}>
        <div className={classes.flexAround}>
          <Button onClick={() => setEditDialog(true)} variant="outlined">
            Edit Announcement
          </Button>
          <Button
            onClick={() => setDeleteDialog(true)}
            className={classes.dangerButton}
            variant="outlined"
          >
            Delete Announcement
          </Button>
        </div>
        <div style={{ padding: 16 }} />
        <Grid container spacing={1}>
          <Grid item xs={12} lg={10} xl={9}>
            <Typography variant="h3">{announcement.title}</Typography>
            <Typography variant="h6">
              {timeAgo.format(dayjs(announcement.createdAt).toDate())}
            </Typography>
          </Grid>
          {width === "xl" && <Grid item xl={1} />}
          {(width === "xl" || width === "lg") && (
            <Grid item lg={2}>
              <img
                style={{ width: "100%" }}
                src={require("images/pixel/Header - Announcements.png")}
              />
            </Grid>
          )}
        </Grid>
        <hr />
        <div className={classes.content} className={classes.text}>
          <ReactMarkdown
            renderers={{
              link: props => <a className={classes.link} {...props} />
            }}
            source={announcement.body}
          />
        </div>{" "}
      </Paper>
      <div style={{ padding: 16 }} />
      <EditAnnouncementDialog
        announcement={announcement}
        classes={classes}
        open={editDialog}
        onClose={() => setEditDialog(false)}
      />
      <ConfirmDeleteDialog
        announcement={announcement}
        classes={classes}
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
      />
    </React.Fragment>
  );
};

const ModerationAnnouncements = ({ classes, width }) => {
  const [newAnnounceDialog, setNewAnnounceDialog] = useState(false);

  return (
    <React.Fragment>
      <PageTitle>{`Scritch Moderation - Announcements`}</PageTitle>
      <Query query={FETCH_ANNOUNCEMENTS}>
        {({ loading, error, data }) => {
          if (loading) return null; //TODO progress
          if (error) return null; //TODO error
          if (!data || !data.moderationAnnouncements) {
            return (
              <Typography variant="h4" gutterBottom className={classes.centeredText}>
                No Announcement Found
              </Typography>
            );
          }

          return (
            <React.Fragment>
              <div style={{ textAlign: "center" }}>
                <Button variant="outlined" onClick={() => setNewAnnounceDialog(true)}>
                  Create New Announcement
                </Button>
              </div>
              <div style={{ padding: 16 }} />
              <Grid container spacing={2}>
                {data.moderationAnnouncements.map(announcement => (
                  <Grid item xs={12} key={announcement.id}>
                    <Announcement announcement={announcement} classes={classes} width={width} />
                  </Grid>
                ))}
              </Grid>
            </React.Fragment>
          );
        }}
      </Query>
      <CreateAnnouncementDialog
        classes={classes}
        open={newAnnounceDialog}
        onClose={() => setNewAnnounceDialog(false)}
      />
    </React.Fragment>
  );
};

export default withStyles(styles)(withWidth()(ModerationAnnouncements));
