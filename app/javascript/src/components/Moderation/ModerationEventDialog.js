import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import ResponsiveDialog from "../Global//ResponsiveDialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import GlobalProgress from "../Global/GlobalProgress";
import { LOAD_MAKER } from "../../queries/makerQueries";
import { Query, Mutation } from "react-apollo";
// import EditEventDialog from "../Events/EditEventDialog";
import { LOAD_EVENT } from "../../queries/eventQueries";
import Select from "../Global/Select";
import CreateEditionDialog from "./CreateEditionDialog";
import UpdateEditionDialog from "./UpdateEditionDialog";
import { DELETE_EVENT, DELETE_EDITION } from "../../queries/eventMutations";
import MakerAvatar from "../Makers/MakerAvatar";
import UpdateEventDialog from "./UpdateEventDialog";

const styles = theme => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
  text: {
    fontWeight: 200
  },
  selectInput: {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.primary
  },
  dangerButton: {
    color: theme.palette.danger.main
  }
});

const EventDetail = withStyles(styles)(({ edition, event, classes, width, open, onClose }) => (
  <React.Fragment>
    <Typography
      gutterBottom
      variant="h6"
      component="h2"
      color="primary"
      className={classes.eventTitle}
    >
      Location
    </Typography>
    <Typography gutterBottom variant="h5" component="h2" className={classes.eventTitle}>
      {edition.city}
      {", "}
      {edition.country}
    </Typography>
    <Grid container spacing={0}>
      <Grid item xs={6}>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          color="primary"
          className={classes.eventTitle}
        >
          From
        </Typography>
        <Typography gutterBottom variant="h5" component="h2" className={classes.eventTitle}>
          {edition.startDate.split(" ")[0]}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          color="primary"
          className={classes.eventTitle}
        >
          To
        </Typography>
        <Typography gutterBottom variant="h5" component="h2" className={classes.eventTitle}>
          {edition.endDate.split(" ")[0]}
        </Typography>
      </Grid>
    </Grid>

    {edition.venue && (
      <React.Fragment>
        <div style={{ padding: 5 }} />
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          color="primary"
          className={classes.eventTitle}
        >
          Venue
        </Typography>
        <Typography gutterBottom variant="h5" component="h2" className={classes.eventTitle}>
          {edition.venue}
        </Typography>
      </React.Fragment>
    )}
    {edition.theme && (
      <React.Fragment>
        <div style={{ padding: 5 }} />
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          color="primary"
          className={classes.eventTitle}
        >
          Theme
        </Typography>
        <Typography gutterBottom variant="h5" component="h2" className={classes.eventTitle}>
          {edition.theme}
        </Typography>
      </React.Fragment>
    )}
    {edition.attendance && (
      <React.Fragment>
        <div style={{ padding: 5 }} />
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          color="primary"
          className={classes.eventTitle}
        >
          Attendance
        </Typography>
        <Typography gutterBottom variant="h5" component="h2" className={classes.eventTitle}>
          {edition.attendance}
        </Typography>
      </React.Fragment>
    )}
    {edition.guestOfHonours && edition.guestOfHonours.length > 0 && (
      <React.Fragment>
        <div style={{ padding: 5 }} />
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          color="primary"
          className={classes.eventTitle}
        >
          Guests of Honour
        </Typography>
        {edition.guestOfHonours.map(guest => (
          <Typography gutterBottom variant="h5" component="h2" className={classes.eventTitle}>
            {guest}
          </Typography>
        ))}
      </React.Fragment>
    )}
    {edition.charity && (
      <React.Fragment>
        <div style={{ padding: 5 }} />
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          color="primary"
          className={classes.eventTitle}
        >
          Charity
        </Typography>
        <Typography gutterBottom variant="h5" component="h2" className={classes.eventTitle}>
          {edition.charity}
        </Typography>
      </React.Fragment>
    )}
  </React.Fragment>
));

const ModerationEventDialog = ({ classes, width, open, onClose, event }) => {
  const [createEditionDialog, setCreateEditionDialog] = useState(false);
  const [editEventDialog, setEditEventDialog] = useState(false);
  const [editEditionDialog, setEditEditionDialog] = useState(false);
  const [edition, setEdition] = useState(null);

  if (!event) return null;

  return (
    <Query
      query={LOAD_EVENT}
      variables={{
        id: event,
        sort: "alpha",
        isModerator: true
      }}
    >
      {({ loading, error, data }) => {
        if (loading || error || !data || !data.event) return null;
        const event = data.event;
        const editionsOptions = [];
        editionsOptions.push({ label: "All Editions", value: null });
        event.editions
          .sort((a, b) => {
            const _a = parseInt(a.name),
              _b = parseInt(b.name);
            return _b - _a;
          })
          .map(e => {
            editionsOptions.push({ label: e.name, value: e.id });
          });

        return (
          <React.Fragment>
            <ResponsiveDialog open={open} onClose={onClose}>
              <GlobalProgress absolute />
              <DialogTitle>
                <Grid container spacing={1}>
                  <Grid item xs={false} lg={1} />
                  <Grid item xs={12} lg={11}>
                    {event.name}
                  </Grid>
                </Grid>
              </DialogTitle>
              <DialogContent style={{ paddingBottom: 5 }}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <MakerAvatar avatar={event.avatar} className={classes.makerAvatar} size={128} />
                  </Grid>
                  <Grid item xs={6}>
                    <React.Fragment>
                      <div className={classes.headerTitlesLeft}>
                        <Typography variant="subtitle1" className={classes.eventTitle}>
                          {event.country}
                        </Typography>
                        <div className={classes.dataSpacerLarge}>
                          <a href={event.web} target="_blank" className={classes.link}>
                            <Typography variant="subtitle1" className={classes.link}>
                              Website
                            </Typography>
                          </a>
                        </div>
                        <div className={classes.dataSpacerLarge}>
                          <Typography variant="subtitle1" className={classes.eventTitle}>
                            Status: <strong>{event.status}</strong>
                          </Typography>
                        </div>
                      </div>
                    </React.Fragment>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <DialogActions>
                  <Mutation mutation={DELETE_EVENT}>
                    {(deleteEvent, { data }) => (
                      <Button
                        className={classes.dangerButton}
                        onClick={() => {
                          if (confirm("Are you sure"))
                            deleteEvent({
                              variables: {
                                input: {
                                  id: event.id
                                }
                              }
                            }).then(() => {
                              location.reload();
                            });
                        }}
                      >
                        DELETE
                      </Button>
                    )}
                  </Mutation>
                  <Button onClick={() => setCreateEditionDialog(true)} autoFocus>
                    Create Edition
                  </Button>
                  <Button onClick={() => setEditEventDialog(true)} autoFocus>
                    Edit Event
                  </Button>
                </DialogActions>
              </DialogActions>
              <DialogContent style={{ paddingBottom: 5 }}>
                <Select
                  className={classes.selectInput}
                  options={editionsOptions}
                  defaultValue={{ label: "All Editions", value: null }}
                  onChange={edition => {
                    setEdition(edition);
                  }}
                  placeholder="Select Edition..."
                />
                {(!edition || edition.value === null) && (
                  <div style={{ minHeight: 400, padding: 48 }}>
                    <Typography variant="h5">Select an Edition to view data</Typography>
                  </div>
                )}
                <div style={{ padding: 8 }} />
                {edition && edition.value && (
                  <EventDetail
                    open={edition !== null}
                    onClose={() => setEdition(null)}
                    edition={event.editions.find(e => e.id === edition.value)}
                    event={event.name}
                  />
                )}
              </DialogContent>
              {edition && edition.value && (
                <DialogActions>
                  <Mutation mutation={DELETE_EDITION}>
                    {(deleteEdition, { data }) => (
                      <Button
                        className={classes.dangerButton}
                        onClick={() => {
                          if (confirm("Are you sure"))
                            deleteEdition({
                              variables: {
                                input: {
                                  id: edition.value
                                }
                              }
                            }).then(() => {
                              location.reload();
                            });
                        }}
                      >
                        DELETE EDITION
                      </Button>
                    )}
                  </Mutation>
                  <Button onClick={() => setEditEditionDialog(true)} autoFocus>
                    Edit Edition
                  </Button>
                  <Button onClick={onClose} autoFocus>
                    Close
                  </Button>
                </DialogActions>
              )}
            </ResponsiveDialog>
            {editEventDialog && (
              <UpdateEventDialog
                event={event}
                open={editEventDialog}
                onClose={() => setEditEventDialog(false)}
              />
            )}
            {createEditionDialog && (
              <CreateEditionDialog
                event={event.id}
                open={createEditionDialog}
                onClose={() => setCreateEditionDialog(false)}
              />
            )}
            {editEditionDialog && edition && edition.value !== null && (
              <UpdateEditionDialog
                edition={event.editions.find(e => e.id === edition.value)}
                open={editEditionDialog}
                onClose={() => setEditEditionDialog(false)}
              />
            )}
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default withStyles(styles)(withRouter(ModerationEventDialog));
