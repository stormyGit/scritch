import React from "react";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import PageTitle from "../Global/PageTitle";
import queryString from "query-string";
import Gallery from "react-grid-gallery";
import EmptyList from "../Global/EmptyList";
import LoadMoreButton from "../Global/LoadMoreButton";

import { GET_MEDIA } from "../../queries/mediaQueries";
import { LOAD_FURSUIT } from "../../queries/fursuitQueries";

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
  fursuitTitle: {
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

class Fursuit extends React.Component {
  state = {
    editFursuit: false,
    currentImage: 0
  };

  render() {
    const { classes, match, currentSession } = this.props;
    let limit = parseInt(process.env.USER_MEDIA_PAGE_SIZE);
    const query = queryString.parse(location.search);

    return (
      <Query
        query={LOAD_FURSUIT}
        variables={{
          id: match.params.id.match(/[\w]{8}(-[\w]{4}){3}-[\w]{12}$/)[0]
        }}
      >
        {({ loading, error, data }) => {
          const fursuit = data ? data.fursuit : null;

          return (
            !loading &&
            !error &&
            fursuit && (
              <div className={classes.container} key={fursuit.id}>
                <PageTitle>
                  {!loading && fursuit ? fursuit.name : null}
                </PageTitle>
                <Grid container spacing={8}>
                  <Grid item lg={9} xs={12}>
                    <div className={classes.pictureInfo}>
                      {fursuit.media.length === 0 && (
                        <EmptyList
                          label={`${fursuit.name} doesn't have any pictures.`}
                        />
                      )}
                      {fursuit.media.length > 0 && (
                        <React.Fragment>
                          <Grid container spacing={8}>
                            <Grid item xs={12}>
                              <Gallery
                                customControls={[
                                  <Button
                                    color="secondary"
                                    key="goToImage"
                                    onClick={() =>
                                      this.goToImage(fursuit.media)
                                    }
                                  >
                                    Go to picture
                                  </Button>
                                ]}
                                enableLightbox={true}
                                enableImageSelection={false}
                                backdropClosesModal
                                currentImageWillChange={
                                  this.onCurrentImageChange
                                }
                                images={fursuit.media.map(medium => ({
                                  src: medium.picture,
                                  thumbnail: medium.thumbnail,
                                  thumbnailWidth:
                                    medium.width / (medium.height / 256.0),
                                  thumbnailHeight: 256
                                }))}
                              />
                            </Grid>
                            {fursuit.media.length < fursuit.mediaCount && (
                              <LoadMoreButton
                                onClick={() => {
                                  fetchMore({
                                    variables: {
                                      offset: fursuit.media.length,
                                      limit
                                    },
                                    updateQuery: (
                                      prev,
                                      { fetchMoreResult }
                                    ) => {
                                      if (!fetchMoreResult) return prev;

                                      return Object.assign({}, prev, {
                                        media: [
                                          ...prev.media,
                                          ...fetchMoreResult.media
                                        ]
                                      });
                                    }
                                  });
                                }}
                              />
                            )}
                          </Grid>
                        </React.Fragment>
                      )}
                    </div>
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
                            className={classes.fursuitTitle}
                            noWrap
                          >
                            {fursuit.name}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            className={classes.fursuitTitle}
                            noWrap
                          >
                            {fursuit.creationYear}
                          </Typography>
                        </Grid>

                        <Grid item style={{ flexShrink: 0 }}>
                          <React.Fragment>
                            <SocialButton
                              name="Twitter"
                              url="https://twitter.com/intent/tweet/"
                              params={{
                                text: `${fursuit.name} via @${
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
                                text: fursuit.name,
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
                            src={require("../../stormy.jpg")}
                            title={fursuit.name}
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
                            className={classes.fursuitTitle}
                            noWrap
                          >
                            Made by
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            className={classes.fursuitTitle}
                            noWrap
                          >
                            {fursuit.makers.length > 0
                              ? fursuit.makers[0].name
                              : "Unknown"}
                          </Typography>
                          <div style={{ padding: 10 }} />
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="h2"
                            color="secondary"
                            className={classes.fursuitTitle}
                            noWrap
                          >
                            Species
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            className={classes.fursuitTitle}
                            noWrap={false}
                          >
                            {fursuit.isHybrid
                              ? fursuit.hybridSpecies
                                  .map(e => e.name)
                                  .join(", ")
                              : fursuit.fursuitSpecy.name}
                          </Typography>
                          <div style={{ padding: 10 }} />
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="h2"
                            color="secondary"
                            className={classes.fursuitTitle}
                            noWrap
                          >
                            Style
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            className={classes.fursuitTitle}
                            noWrap
                          >
                            {fursuit.fursuitStyle
                              ? fursuit.fursuitStyle.name
                              : "Unknown"}
                          </Typography>
                          <div style={{ padding: 10 }} />
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="h2"
                            color="secondary"
                            className={classes.fursuitTitle}
                            noWrap
                          >
                            Leg Type
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            className={classes.fursuitTitle}
                            noWrap
                          >
                            {fursuit.fursuitLegType
                              ? fursuit.fursuitLegType.name
                              : "Unknown"}
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

export default withStyles(styles)(withRouter(withCurrentSession(Fursuit)));
