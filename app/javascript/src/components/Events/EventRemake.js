import React from "react";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Select from "react-select";
import Media from "../Media/Media";

import ResponsiveDialog from "../Global/ResponsiveDialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import InfoIcon from "@material-ui/icons/InfoOutlined";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PageTitle from "../Global/PageTitle";

import { LOAD_EVENT } from "../../queries/eventQueries";
import { GET_EVENT_MEDIA } from "../../queries/mediaQueries";

import withCurrentSession from "../withCurrentSession";
import { withRouter } from "react-router-dom";

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
  selectInput: {
    fontFamily: theme.typography.fontFamily
  },
  eventAvatar: {
    width: "80%",
    borderRadius: "20%"
  },
  eventAvatarMobile: {
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
  eventTitle: {
    fontWeight: 200
  },
  eventTitlePadded: {
    fontWeight: 200,
    paddingLeft: theme.spacing.unit * 2
  },
  actionButtonPadding: {
    paddingLeft: theme.spacing.unit * 2
  },
  actionButtonPaddingSelect: {
    paddingLeft: theme.spacing.unit * 2,
    width: 300
  },
  infoButton: {
    color: theme.palette.primary.main
  },
  link: {
    textDecoration: "none"
  },
  linkTypo: {
    color: theme.palette.primary.main,
    fontWeight: 200
  },
  centerAlign: {
    alignItems: "center"
  },
  textAligner: {
    textAlign: "center"
  },
  extendedIcon: {
    marginRight: "1em"
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
  mobile_hide_sm: {
    "@global": {
      "*::-webkit-scrollbar": {
        width: 0
      }
    }
  }
});

const Padder = () => <div style={{ padding: 16 }} />;
const MicroPadder = () => <div style={{ padding: 8 }} />;

const Avatar = withStyles(styles)(({ event, classes, avatarClass }) => {
  return (
    <div className={classes.avatarContainer}>
      <img className={avatarClass} src={event.avatar} />
    </div>
  );
});

const SubtitleRow = withStyles(styles)(
  withWidth()(({ classes, event, width, selectedEdition }) => {
    return (
      <React.Fragment>
        <div className={classes.headerTitlesLeft}>
          <Typography variant="subtitle1" className={classes.eventTitle}>
            {selectedEdition
              ? `${selectedEdition.city}, ${selectedEdition.country}`
              : event.country}
          </Typography>
          {(width === "xl" || width === "lg") && event.web && (
            <div className={classes.dataSpacerLarge}>
              <a href={event.web} target="_blank" className={classes.link}>
                <Typography variant="subtitle1" className={classes.linkTypo}>
                  Website
                </Typography>
              </a>
            </div>
          )}
          {(width === "xl" || width === "lg") && (
            <div className={classes.dataSpacerLarge}>
              <Typography variant="subtitle1" className={classes.eventTitle}>
                Status: <strong>{event.status}</strong>
              </Typography>
            </div>
          )}
        </div>
        {width !== "xl" && width !== "lg" && event.web && (
          <React.Fragment>
            <div>
              <a href={event.web} target="_blank" className={classes.link}>
                <Typography variant="subtitle1" className={classes.linkTypo}>
                  Website
                </Typography>
              </a>
            </div>
            <div className={classes.dataSpacerLarge}>
              <Typography variant="subtitle1" className={classes.eventTitle}>
                Status: <strong>{event.status}</strong>
              </Typography>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  })
);

const EventDetail = withStyles(styles)(
  withWidth()(({ edition, event, classes, width, open, onClose }) => (
    <ResponsiveDialog size={500} open={open} onClose={onClose}>
      <DialogTitle>
        {event} {edition.name}
      </DialogTitle>
      <DialogContent>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          color="primary"
          className={classes.eventTitle}
        >
          Location
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={classes.eventTitle}
        >
          {edition.city}
          {", "}
          {edition.country}
        </Typography>
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
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.eventTitle}
            >
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
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.eventTitle}
            >
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
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.eventTitle}
            >
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
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.eventTitle}
              >
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
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.eventTitle}
            >
              {edition.charity}
            </Typography>
          </React.Fragment>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </ResponsiveDialog>
  ))
);

class Event extends React.Component {
  state = {
    claimDialog: false,
    editEventDialog: false,
    eventDetail: false,
    hasMore: true,
    queryArg: {
      event: null,
      editionId: null,
      offset: 0,
      limit: 48
    }
  };

  renderEventHeader(event, editionsOptions) {
    const { classes, match, currentSession, width } = this.props;

    var selectedEdition = null;
    if (this.state.edition && this.state.edition.value) {
      selectedEdition = event.editions.find(
        e => e.id === this.state.edition.value
      );
    }

    return (
      <React.Fragment>
        <div className={classes.infoHeader}>
          <Grid container spacing={40} className={classes.centerAlign}>
            <Grid item xs={false} lg={2} />
            <Grid item xs={2} lg={2} className={classes.avatarContainer}>
              <Avatar event={event} avatarClass={classes.eventAvatar} />
            </Grid>
            <Grid item xs={10} lg={6}>
              <div className={classes.headerTitles}>
                <Typography variant="h5" className={classes.eventTitle} noWrap>
                  {event.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  className={classes.eventTitlePadded}
                  noWrap
                >
                  {event.eventFinger ? event.eventFinger.name : ""}
                </Typography>
                <div className={classes.actionButtonPaddingSelect}>
                  <Select
                    className={classes.selectInput}
                    options={editionsOptions}
                    defaultValue={{ label: "All Editions", value: null }}
                    onChange={edition => {
                      this.setState({ edition: edition });
                    }}
                    placeholder="Select Edition..."
                  />
                </div>
                {this.state.edition && this.state.edition.value && (
                  <div className={classes.actionButtonPadding}>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        this.setState({
                          eventDetail: !this.state.eventDetail
                        })
                      }
                    >
                      <InfoIcon />
                    </IconButton>
                  </div>
                )}
              </div>
              <SubtitleRow event={event} selectedEdition={selectedEdition} />
              <div className={classes.headerTitles}>
                <Typography
                  variant="subtitle1"
                  className={classes.eventTitle}
                  noWrap
                >
                  {event.bio}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={false} lg={2} />
          </Grid>
        </div>
      </React.Fragment>
    );
  }

  renderEventHeaderMobile(event, editionsOptions) {
    const { classes, match, currentSession, width } = this.props;

    var selectedEdition = null;
    if (this.state.edition && this.state.edition.value) {
      selectedEdition = event.editions.find(
        e => e.id === this.state.edition.value
      );
    }

    return (
      <React.Fragment>
        <div className={classes.infoHeader}>
          <Grid container spacing={24} className={classes.centerAlign}>
            <Grid item xs={3} className={classes.avatarContainer}>
              <Avatar event={event} avatarClass={classes.eventAvatarMobile} />
            </Grid>
            <Grid item xs={9}>
              <div className={classes.headerTitles}>
                <Typography variant="h5" className={classes.eventTitle} noWrap>
                  {event.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  className={classes.eventTitlePadded}
                  noWrap
                >
                  {event.eventFinger ? event.eventFinger.name : ""}
                </Typography>
              </div>
              {this.state.edition && this.state.edition.value && (
                <div>
                  <IconButton
                    className={classes.actionButtonPadding}
                    color="primary"
                    onClick={() =>
                      this.setState({
                        eventDetail: !this.state.eventDetail
                      })
                    }
                  >
                    <InfoIcon />
                  </IconButton>
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              <SubtitleRow event={event} selectedEdition={selectedEdition} />
              <div className={classes.headerTitles}>
                <Typography
                  variant="subtitle1"
                  className={classes.eventTitle}
                  noWrap
                >
                  {event.bio}
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
        <Query
          query={LOAD_EVENT}
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

            const { event } = data;

            if (!event) return null;

            var editionsOptions = [];
            editionsOptions.push({ label: "All Editions", value: null });
            if (!loading && !error && event)
              event.editions
                .sort((a, b) => {
                  var _a = parseInt(a.name),
                    _b = parseInt(b.name);
                  return _b - _a;
                })
                .map(e => {
                  editionsOptions.push({ label: e.name, value: e.id });
                });

            return (
              <React.Fragment>
                <PageTitle>{event ? event.name : null}</PageTitle>
                {width === "sm" || width === "xs"
                  ? this.renderEventHeaderMobile(event, editionsOptions)
                  : this.renderEventHeader(event, editionsOptions)}
                {width === "xl" || width === "lg" ? (
                  <Padder />
                ) : (
                  <MicroPadder />
                )}
                <Query
                  query={GET_EVENT_MEDIA}
                  fetchPolicy="network-only"
                  variables={{ ...this.state.queryArg, eventId: event.id }}
                >
                  {({ data, loading, error, fetchMore }) => {
                    if (loading || error || !data) return null;

                    var eventMedia = [];
                    if (!data.eventMedia) {
                      eventMedia = [];
                    } else if (this.state.edition && this.state.edition.value) {
                      eventMedia = data.eventMedia.filter(
                        e => e.editionId == this.state.edition.value
                      );
                    } else {
                      eventMedia = data.eventMedia;
                    }

                    return (
                      <React.Fragment>
                        <div
                          style={{ height: "calc(100vh - 56px)" }}
                          className={
                            width === "sm" || width == "xs"
                              ? classes.mobile_hide_sm
                              : undefined
                          }
                        >
                          <Media
                            media={eventMedia}
                            limit={this.state.queryArg.limit}
                            hasMore={this.state.hasMore}
                            fetchMore={() =>
                              fetchMore({
                                variables: {
                                  offset: eventMedia.length,
                                  limit: this.state.queryArg.limit
                                },
                                updateQuery: (prev, { fetchMoreResult }) => {
                                  if (!fetchMoreResult) return prev;

                                  if (fetchMoreResult.eventMedia.length === 0) {
                                    this.setState({ hasMore: false });
                                  } else {
                                    return {
                                      ...prev,
                                      eventMedia: [
                                        ...prev.eventMedia,
                                        ...fetchMoreResult.eventMedia
                                      ]
                                    };
                                  }
                                }
                              })
                            }
                          />
                        </div>
                      </React.Fragment>
                    );
                  }}
                </Query>
                {this.state.edition && this.state.edition.value && (
                  <EventDetail
                    open={this.state.eventDetail}
                    onClose={() => this.setState({ eventDetail: false })}
                    edition={event.editions.find(
                      e => e.id == this.state.edition.value
                    )}
                    event={event.name}
                  />
                )}
              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  withRouter(withWidth()(withCurrentSession(Event)))
);
