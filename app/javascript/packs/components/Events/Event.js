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
import timeAgo from "../../timeAgo";
import PageTitle from "../Global//PageTitle";
import queryString from "query-string";

import { LOAD_EVENT } from "../../queries/eventQueries";

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
    maxWidth: "40vw",
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
    editionId: []
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

          const allEditions = [];
          if (!loading && !error && event) {
            event.editions.map(edition => {
              allEditions.push(edition.id);
            });
          }

          return (
            !loading &&
            !error &&
            event && (
              <div className={classes.container} key={event.id}>
                <PageTitle>{!loading && event ? event.name : null}</PageTitle>
                <Grid container spacing={8}>
                  <Grid item lg={9} xs={12}>
                    <EventMedia
                      edition={
                        this.state.editionId.length > 0
                          ? this.state.editionId
                          : allEditions
                      }
                    />
                  </Grid>
                  <Grid item lg={3} xs={12}>
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
                            variant="h6"
                            component="h2"
                            color="secondary"
                            className={classes.eventTitle}
                            noWrap
                          >
                            {event.name}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
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
                        <Grid xs={1} item />
                        <Grid xs={10} item>
                          <img
                            src={event.avatar}
                            title={event.name}
                            width="100%"
                            style={{ borderRadius: "5%" }}
                          />
                        </Grid>
                        <Grid xs={1} item />
                      </Grid>
                      <Grid container spacing={8}>
                        <Grid item>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="h2"
                            color="secondary"
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
                                color="primary"
                                className={classes.eventTitle}
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
                          <div style={{ padding: 10 }} />
                        </Grid>
                      </Grid>
                      <Divider />
                      <div style={{ padding: 10 }} />
                      <Card className={classes.card}>
                        <CardActionArea
                          onClick={e => {
                            this.setState({
                              editionId: []
                            });
                          }}
                        >
                          <CardContent>
                            <Typography>Unselect all</Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                      <div style={{ padding: 10 }} />

                      {event.editions
                        .sort((a, b) => (a.name < b.name ? 1 : -1))
                        .map(edition => (
                          <Card
                            id={edition.id}
                            key={edition.id}
                            className={
                              this.state.editionId.includes(edition.id)
                                ? classes.cardIn
                                : classes.cardOut
                            }
                          >
                            <CardActionArea
                              id={edition.id}
                              onClick={e => {
                                var payload = e.target.id;
                                var index = this.state.editionId.indexOf(
                                  payload
                                );
                                index != -1
                                  ? this.setState({
                                      editionId: this.state.editionId.filter(
                                        (_, i) => i !== index
                                      )
                                    })
                                  : this.setState(prevState => ({
                                      editionId: [
                                        ...prevState.editionId,
                                        payload
                                      ]
                                    }));
                              }}
                            >
                              <CardContent id={edition.id}>
                                <Typography id={edition.id}>
                                  {edition.name}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        ))}
                    </div>
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
