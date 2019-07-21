import React from "react";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Select from "react-select";
import timeAgo from "../../timeAgo";
import PageTitle from "../Global//PageTitle";
import queryString from "query-string";

import { LOAD_EVENT, LOAD_EDITION } from "../../queries/eventQueries";

import EventMedia from "./EventMedia";
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
  selectInput: {
    fontFamily: theme.typography.fontFamily
  },
  UnderReview: {
    height: "40vw",
    position: "relative"
  },
  card: {
    width: "100%",
    borderRadius: 0
  },
  cardIn: {
    width: "100%",
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main
  },
  cardOut: {
    width: "100%",
    borderRadius: 0
  },
  pictureInfo: {
    padding: theme.spacing.unit
  },
  userInfo: {
    paddingLeft: 0,
    paddingRight: 0
  },
  text: {},
  eventTitle: {
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
  link: {
    textDecoration: "none"
  }
});

class Event extends React.Component {
  state = {
    editEvent: false,
    editionId: null
  };
  constructor(props) {
    super(props);

    this.onCurrentImageChange = this.onCurrentImageChange.bind(this);
    this.goToImage = this.goToImage.bind(this);
  }
  renderCommentsCount(count) {
    if (count === 0) {
      return `No comments`;
    }
    if (count === 1) {
      return `One comment`;
    }
    return `${count} comments`;
  }

  onCurrentImageChange(index) {
    this.setState({ currentImage: index });
  }

  goToImage(media) {
    this.props.history.push(`/pictures/${media[this.state.currentImage].id}`);
  }

  render() {
    const { classes, match, currentSession, event } = this.props;
    let limit = parseInt(process.env.USER_MEDIA_PAGE_SIZE);
    const query = queryString.parse(location.search);

    return (
      <Query
        query={LOAD_EVENT}
        variables={{
          id: match.params.id
        }}
      >
        {({ loading, error, data }) => {
          const event = data ? data.event : null;

          var editionsOptions = [];
          editionsOptions.push({ label: "All", value: null });
          if (!loading && !error && event)
            event.editions
              .sort((a, b) => (a.name < b.name ? 1 : -1))
              .map(e => {
                editionsOptions.push({ label: e.name, value: e.id });
              });

          return (
            !loading &&
            !error &&
            event && (
              <div className={classes.container} key={event.id}>
                <PageTitle>{!loading && event ? event.name : null}</PageTitle>
                <Grid container spacing={8}>
                  <Grid item xs={12}>
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
                            noWrap
                          >
                            {event.name}{" "}
                            {!this.state.edition
                              ? "(All Editions)"
                              : `(${this.state.edition.label})`}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            color="primary"
                            className={classes.eventTitle}
                            noWrap
                          >
                            {event.country}
                          </Typography>
                        </Grid>
                      </Grid>
                      <div style={{ padding: 10 }} />
                      <Grid
                        container
                        spacing={8}
                        alignItems="center"
                        justify="center"
                      >
                        <Grid xs={3} item />
                        <Grid xs={6} item>
                          <img
                            src={event.avatar}
                            title={event.name}
                            width="100%"
                            style={{ borderRadius: "5%" }}
                          />
                        </Grid>
                        <Grid xs={3} item />
                      </Grid>
                      <Grid container spacing={8}>
                        <Grid item>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="h2"
                            color="primary"
                            className={classes.eventTitle}
                          >
                            Website
                          </Typography>
                          {event.web && (
                            <a
                              className={classes.link}
                              target="_blank"
                              href={event.web}
                            >
                              <Button
                                variant="outlined"
                                component="h2"
                                color="secondary"
                              >
                                Open in a new tab
                              </Button>
                            </a>
                          )}
                          {!event.web && (
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                              className={classes.eventTitle}
                            >
                              Unknown
                            </Typography>
                          )}
                          {event.status && (
                            <React.Fragment>
                              <div style={{ padding: 5 }} />
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="h2"
                                color="primary"
                                className={classes.eventTitle}
                                noWrap
                              >
                                Status
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                                className={classes.eventTitle}
                                noWrap={false}
                              >
                                {event.status}
                              </Typography>
                            </React.Fragment>
                          )}
                        </Grid>
                      </Grid>
                      <div style={{ padding: 10 }} />
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        color="primary"
                        className={classes.eventTitle}
                      >
                        Edition
                      </Typography>
                      <Select
                        className={classes.selectInput}
                        options={editionsOptions}
                        defaultValue={{ label: "All", value: null }}
                        onChange={edition => {
                          this.setState({ edition: edition });
                        }}
                        placeholder="Select Edition..."
                      />
                      {this.state.edition && this.state.edition.value && (
                        <Query
                          query={LOAD_EDITION}
                          variables={{
                            id: this.state.edition.value
                          }}
                        >
                          {({ loading, error, data }) => {
                            const edition = data ? data.edition : null;

                            if (error || loading || !edition) return null;
                            return (
                              <React.Fragment>
                                <div style={{ padding: 5 }} />
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
                                <div style={{ padding: 5 }} />
                              </React.Fragment>
                            );
                          }}
                        </Query>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <EventMedia
                      event={event.id}
                      edition={
                        this.state.edition ? this.state.edition.value : null
                      }
                    />
                  </Grid>
                </Grid>
              </div>
            )
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(withRouter(withCurrentSession(Event)));
