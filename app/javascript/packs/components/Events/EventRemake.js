import React from "react";
import { Query, Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Select from "react-select";

import DefaultAvatar from "../Users/DefaultAvatar";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
import PageTitle from "../Global/PageTitle";
import queryString from "query-string";
import EmptyList from "../Global/EmptyList";
import LoadMoreButton from "../Global/LoadMoreButton";
import MediaEvent from "../Media/MediaEvent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faStar,
  faUsers,
  faTags
} from "@fortawesome/free-solid-svg-icons";

import { LOAD_EVENT, LOAD_EDITION } from "../../queries/eventQueries";

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
  }
});

const Padder = () => <div style={{ padding: 16 }} />;
const MicroPadder = () => <div style={{ padding: 8 }} />;

const DetailField = ({ data, dataShort, field }) => {
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
        <DefaultAvatar
          text={data ? data.name : dataShort ? "" : "?"}
          key="avatar"
          color={dataShort ? dataShort.toLowerCase() : "#0c8cff"}
        />
        <Typography variant="subtitle1">{field}</Typography>
      </div>
    </Tooltip>
  );
};

const Avatar = withStyles(styles)(({ event, classes, avatarClass }) => {
  return (
    <div className={classes.avatarContainer}>
      <img className={avatarClass} src={event.avatar} />
    </div>
  );
});

const SubtitleRow = withStyles(styles)(
  withWidth()(({ classes, event, width, edition }) => (
    <React.Fragment>
      <div className={classes.headerTitlesLeft}>
        <Typography variant="subtitle1" className={classes.eventTitle}>
          {edition ? `${edition.city}, ${edition.country}` : event.country}
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
  ))
);

const EventDetail = withStyles(styles)(
  withWidth()(({ event, classes, width }) =>
    width === "xl" || width === "lg" ? (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <DetailField field="Build" data={event.eventBuild} />
        <DetailField field="Style" data={event.eventStyle} />
        <DetailField field="Base" dataShort={event.baseColor} />
        <DetailField field="Eyes" dataShort={event.eyesColor} />
        <DetailField field="Appearance" data={event.eventGender} />
        <DetailField field="Padding" data={event.eventPadding} />
        <DetailField field="Leg Type" data={event.eventLegType} />
      </div>
    ) : (
      <Grid container spacing={16} className={classes.detailsHeader}>
        <Grid item xs={4}>
          <DetailField field="Build" data={event.eventBuild} />
        </Grid>
        <Grid item xs={4}>
          <DetailField field="Style" data={event.eventStyle} />
        </Grid>
        <Grid item xs={4}>
          <DetailField field="Base" dataShort={event.baseColor} />
        </Grid>
        <Grid item xs={4}>
          <DetailField field="Eyes" dataShort={event.eyesColor} />
        </Grid>
        <Grid item xs={4}>
          <DetailField field="Appearance" data={event.eventGender} />
        </Grid>
        <Grid item xs={4}>
          <DetailField field="Padding" data={event.eventPadding} />
        </Grid>
        <Grid item xs={4}>
          <DetailField field="Leg Type" data={event.eventLegType} />
        </Grid>
      </Grid>
    )
  )
);

class Event extends React.Component {
  state = {
    claimDialog: false,
    editEventDialog: false,
    eventDetail: false
  };

  renderEventHeader(event, edition, editionsOptions) {
    const { classes, match, currentSession, width } = this.props;

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
                  {event.name}{" "}
                  {!this.state.edition
                    ? "(All Editions)"
                    : `(${this.state.edition.label})`}
                </Typography>
                <Typography
                  variant="subtitle1"
                  className={classes.eventTitlePadded}
                  noWrap
                >
                  {event.eventFinger ? event.eventFinger.name : ""}
                </Typography>
                <div className={classes.actionButtonPadding}>
                  <Select
                    className={classes.selectInput}
                    options={editionsOptions}
                    defaultValue={{ label: "All", value: null }}
                    onChange={edition => {
                      this.setState({ edition: edition });
                    }}
                    placeholder="Select Edition..."
                  />
                </div>
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
              </div>
              <SubtitleRow event={event} edition={edition} />
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
        {this.state.eventDetail && (
          <React.Fragment>
            {width === "xl" || width === "lg" ? <Padder /> : <MicroPadder />}
            <Grid container spacing={40} className={classes.centerAlign}>
              <Grid item xs={false} lg={2} />
              <Grid item xs={12} lg={8}>
                <EventDetail event={event} />
              </Grid>
              <Grid item xs={false} lg={2} />
            </Grid>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }

  renderEventHeaderMobile(event, edition, editionsOptions) {
    const { classes, match, currentSession, width } = this.props;

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
            </Grid>
            <Grid item xs={12}>
              <SubtitleRow event={event} edition={edition} />
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
        {this.state.eventDetail && (
          <React.Fragment>
            {width === "xl" || width === "lg" ? <Padder /> : <MicroPadder />}
            <Grid container spacing={24} className={classes.centerAlign}>
              <Grid item xs={false} lg={2} />
              <EventDetail event={event} />
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
          query={LOAD_EVENT}
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

            const { event } = data;

            if (!event) return null;

            var editionsOptions = [];
            editionsOptions.push({ label: "All", value: null });
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
                <Query
                  query={LOAD_EDITION}
                  variables={{
                    id: this.state.edition ? this.state.edition.value : null
                  }}
                >
                  {({ loading, error, data }) => {
                    const edition = data ? data.edition : null;

                    return (
                      <React.Fragment>
                        <PageTitle>{event ? event.name : null}</PageTitle>
                        {width === "sm" || width === "xs"
                          ? this.renderEventHeaderMobile(
                              event,
                              edition,
                              editionsOptions
                            )
                          : this.renderEventHeader(
                              event,
                              edition,
                              editionsOptions
                            )}
                        {width === "xl" || width === "lg" ? (
                          <Padder />
                        ) : (
                          <MicroPadder />
                        )}
                        {console.log(this.state.edition)}
                        <MediaEvent
                          eventId={event.id}
                          editionId={edition ? edition.id : null}
                        />
                      </React.Fragment>
                    );
                  }}
                </Query>
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
