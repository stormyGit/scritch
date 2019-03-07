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
import FursuitClaimDialog from "./FursuitClaimDialog";
import EditFursuitDialog from "./EditFursuitDialog";
import Media from "../Media/Media";

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
    currentImage: 0,
    claimDialog: false,
    editFursuitDialog: false
  };

  renderFursuitMedia() {
    const { classes, match, currentSession } = this.props;
    console.log(match.params.id.match(/[\w]{8}(-[\w]{4}){3}-[\w]{12}$/)[0]);
    return (
      <Media
        fursuit={true}
        fursuitId={match.params.id.match(/[\w]{8}(-[\w]{4}){3}-[\w]{12}$/)[0]}
      />
    );
  }

  renderFursuitData() {
    const { classes, match, currentSession } = this.props;
    let limit = parseInt(process.env.USER_MEDIA_PAGE_SIZE);
    const query = queryString.parse(location.search);

    var image;

    return (
      <Query
        query={LOAD_FURSUIT}
        variables={{
          id: match.params.id.match(/[\w]{8}(-[\w]{4}){3}-[\w]{12}$/)[0]
        }}
      >
        {({ loading, error, data }) => {
          const fursuit = data ? data.fursuit : null;

          if (fursuit) {
            if (fursuit.isHybrid) image = require("images/species/Hybrid.png");
            else
              try {
                image = require(`images/species/${
                  fursuit.fursuitSpecy.name
                }.png`);
              } catch (ex) {
                image = require("images/species/Missingno (No Avatar Graphic Found).png");
              }
          }
          return (
            !loading &&
            !error &&
            fursuit && (
              <React.Fragment>
                <PageTitle>
                  {!loading && fursuit ? fursuit.name : null}
                </PageTitle>
                <React.Fragment>
                  {!fursuit.claimed && !fursuit.possessed && !fursuit.users && (
                    <Grid
                      container
                      spacing={8}
                      justify="space-between"
                      wrap="nowrap"
                    >
                      <Grid item>
                        <Button
                          color="primary"
                          onClick={() => this.setState({ claimDialog: true })}
                        >
                          Claim fursuit
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                  {!fursuit.claimed && !fursuit.possessed && fursuit.users && (
                    <Grid
                      container
                      spacing={8}
                      justify="space-between"
                      wrap="nowrap"
                    >
                      <Grid item>
                        <Button
                          color="primary"
                          onClick={() => this.setState({ claimDialog: true })}
                        >
                          Contest Claim
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                  {fursuit.possessed && (
                    <Grid
                      container
                      spacing={8}
                      justify="space-between"
                      wrap="nowrap"
                    >
                      <Grid item>
                        <Button
                          color="primary"
                          onClick={() =>
                            this.setState({ editFursuitDialog: true })
                          }
                        >
                          Edit fursuit
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </React.Fragment>
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
                        src={image}
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
                          ? fursuit.hybridSpecies.map(e => e.name).join(", ")
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
                <FursuitClaimDialog
                  fursuit={fursuit.id}
                  open={this.state.claimDialog}
                  onClose={() => this.setState({ claimDialog: false })}
                />
                <EditFursuitDialog
                  fursuit={fursuit}
                  open={this.state.editFursuitDialog}
                  onClose={() => this.setState({ editFursuitDialog: false })}
                />
              </React.Fragment>
            )
          );
        }}
      </Query>
    );
  }

  render() {
    const { classes, match, currentSession } = this.props;
    return (
      <React.Fragment>
        <div className={classes.container}>
          <Grid container spacing={8}>
            <Grid item lg={10} xs={12}>
              {this.renderFursuitMedia()}
            </Grid>
            <Grid item lg={2} xs={12}>
              {this.renderFursuitData()}
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(withCurrentSession(Fursuit)));
