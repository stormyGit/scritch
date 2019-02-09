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
import timeAgo from "../timeAgo";
import UserAvatar from "./UserAvatar";
import PageTitle from "./PageTitle";
import dayjs from "dayjs";
import queryString from "query-string";
import Gallery from "react-grid-gallery";
import EmptyList from "./EmptyList";
import LoadMoreButton from "./LoadMoreButton";
import FursuitCard from "./FursuitCard";

import { LOAD_MAKER, LOAD_FURSUITS } from "../queries";

import Media from "./Media";
import CommentForm from "./CommentForm";
import FormattedText from "./FormattedText";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import UnderReview from "./UnderReview";
import withCurrentSession from "./withCurrentSession";
import SocialButton from "./SocialButton";
import TwitterIcon from "../icons/Twitter";
import TelegramIcon from "../icons/Telegram";
import countFormat from "../countFormat";
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
  makerTitle: {
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
  }
});

class Maker extends React.Component {
  state = {
    editMaker: false,
    currentImage: 0
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
    const { classes, match, currentSession } = this.props;
    let limit = parseInt(process.env.USER_MEDIA_PAGE_SIZE);
    const query = queryString.parse(location.search);

    return (
      <Query
        query={LOAD_MAKER}
        variables={{
          id: match.params.id.match(/[\w]{8}(-[\w]{4}){3}-[\w]{12}$/)[0]
        }}
      >
        {({ loading, error, data }) => {
          const maker = data ? data.maker : null;

          return (
            !loading &&
            !error &&
            maker && (
              <div className={classes.container} key={maker.id}>
                <PageTitle>{!loading && maker ? maker.name : null}</PageTitle>
                <Grid container spacing={8}>
                  <Grid item lg={9} xs={12}>
                    <div style={{ padding: 5 }} />
                    <Grid container spacing={8}>
                      {data.maker.fursuits.map(fursuit => {
                        return (
                          <Grid item xs={6} md={4} lg={3} key={fursuit.id}>
                            <FursuitCard key={fursuit.id} fursuit={fursuit} />
                          </Grid>
                        );
                      })}
                    </Grid>
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
                            className={classes.makerTitle}
                            noWrap
                          >
                            {maker.name}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            className={classes.makerTitle}
                            noWrap
                          >
                            {maker.country}
                          </Typography>
                        </Grid>

                        <Grid item style={{ flexShrink: 0 }}>
                          <React.Fragment>
                            <SocialButton
                              name="Twitter"
                              url="https://twitter.com/intent/tweet/"
                              params={{
                                text: `${maker.name} via @${
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
                                text: maker.name,
                                url: window.location.href
                              }}
                            >
                              <TelegramIcon fontSize={"inherit"} />
                            </SocialButton>
                          </React.Fragment>
                        </Grid>
                      </Grid>
                      <div style={{ padding: 10 }} />
                      <Grid
                        container
                        spacing={8}
                        alignItems="center"
                        justify="center"
                      >
                        <Grid xs={4} item />
                        <Grid xs={4} item>
                          <img
                            src={require("../stormy.jpg")}
                            title={maker.name}
                            width="100%"
                            style={{ borderRadius: "100%" }}
                          />
                        </Grid>
                        <Grid xs={4} item />
                      </Grid>
                      <Grid container spacing={8}>
                        <Grid item>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="h2"
                            color="secondary"
                            className={classes.makerTitle}
                            noWrap
                          >
                            Website
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            className={classes.makerTitle}
                            noWrap
                          >
                            {maker.web ? maker.web : "Unknown"}
                          </Typography>
                          <div style={{ padding: 10 }} />
                        </Grid>
                      </Grid>
                      <Divider />
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

export default withStyles(styles)(withRouter(withCurrentSession(Maker)));
