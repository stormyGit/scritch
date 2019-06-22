import React from "react";
import { Query, Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import PageTitle from "../Global/PageTitle";
import queryString from "query-string";
import FursuitCard from "../Fursuits/FursuitCard";
import FursuitModal from "../Fursuits/FursuitModal";
import EditMakerDialog from "./EditMakerDialog";
import MakerClaimDialog from "./MakerClaimDialog";

import { LOAD_FURSUITS } from "../../queries/fursuitQueries";
import { LOAD_MAKER } from "../../queries/makerQueries";
import {
  CREATE_MAKER_SUBSCRIPTION,
  DELETE_MAKER_SUBSCRIPTION
} from "../../queries/makerMutations";

import withCurrentSession from "../withCurrentSession";
import SocialButton from "../Global/SocialButton";
import TwitterIcon from "../../icons/Twitter";
import TelegramIcon from "../../icons/Telegram";
import { Link, withRouter } from "react-router-dom";

const styles = theme => ({
  container: {
    display: "flex",
    minHeight: "calc(100vh - 56px)",
    padding: theme.spacing.unit
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
  },
  sideSpace: {
    marginRight: theme.spacing.unit
  },
  sortButton: {
    textAlign: "center"
  },
  buttonPadding: {
    margin: theme.spacing.unit
  }
});

class Maker extends React.Component {
  state = {
    editMaker: false,
    fursuit: null,
    openFursuit: false,
    claimDialog: false,
    sort: "alpha"
  };
  constructor(props) {
    super(props);
  }

  renderFollowButton(maker) {
    const { width } = this.props;

    if (maker.followed) {
      return (
        <Mutation
          mutation={DELETE_MAKER_SUBSCRIPTION}
          update={(cache, { data: { createFollow } }) => {
            cache.writeQuery({
              query: LOAD_MAKER,
              variables: { id: maker.id },
              data: {
                maker: {
                  ...maker,
                  followed: false
                }
              }
            });
          }}
        >
          {(deleteFollow, { data }) => (
            <Button
              size={width !== "lg" && width !== "xl" ? "small" : "large"}
              className={
                width === "lg" || width === "xl"
                  ? this.props.classes.followButtonSpacer
                  : null
              }
              fullWidth
              variant="outlined"
              color={this.state.showUnfollow ? "secondary" : "primary"}
              onMouseEnter={() => this.setState({ showUnfollow: true })}
              onMouseLeave={() => this.setState({ showUnfollow: false })}
              onClick={() => {
                deleteFollow({
                  variables: { input: { makerId: maker.id } }
                });
              }}
            >
              {this.state.showUnfollow ? "Unfollow" : "Following"}
            </Button>
          )}
        </Mutation>
      );
    } else {
      return (
        <Mutation
          mutation={CREATE_MAKER_SUBSCRIPTION}
          update={(cache, { data: { createFollow } }) => {
            cache.writeQuery({
              query: LOAD_MAKER,
              variables: { id: maker.id },
              data: {
                maker: {
                  ...maker,
                  followed: true
                }
              }
            });
          }}
        >
          {(createFollow, { data }) => {
            const button = (
              <Button
                size={width !== "lg" && width !== "xl" ? "small" : "large"}
                disabled={!this.props.currentSession.user.sponsor}
                fullWidth
                variant="outlined"
                onClick={() => {
                  createFollow({
                    variables: { input: { makerId: maker.id } }
                  });
                }}
              >
                Follow
              </Button>
            );

            return this.props.currentSession.user.sponsor ? (
              button
            ) : (
              <Tooltip title="You must be a Sponsor to Follow a Maker">
                <div>{button}</div>
              </Tooltip>
            );
          }}
        </Mutation>
      );
    }
  }

  render() {
    const { classes, match, currentSession } = this.props;
    let limit = parseInt(process.env.USER_MEDIA_PAGE_SIZE);
    const query = queryString.parse(location.search);

    return (
      <React.Fragment>
        {this.state.openFursuit && this.state.fursuit && (
          <React.Fragment>
            <FursuitModal
              open={this.state.openFursuit}
              onClose={() =>
                this.setState({ openFursuit: false, fursuit: null })
              }
              fursuit={this.state.fursuit}
            />
          </React.Fragment>
        )}
        <Query
          query={LOAD_MAKER}
          variables={{
            id: match.params.id,
            sort: this.state.sort
          }}
        >
          {({ loading, error, data }) => {
            const maker = data ? data.maker : null;

            maker && console.log(maker);

            console.log(this.state);
            return (
              !loading &&
              !error &&
              maker && (
                <div className={classes.container} key={maker.id}>
                  <PageTitle>{!loading && maker ? maker.name : null}</PageTitle>
                  <Grid container spacing={8}>
                    <Grid item lg={9} xs={12}>
                      {false && (
                        <div className={classes.sortButton}>
                          <Button
                            variant={
                              this.state.sort == "alpha"
                                ? "contained"
                                : "outlined"
                            }
                            className={classes.buttonPadding}
                            onClick={() => {
                              this.setState({ sort: "alpha" });
                            }}
                          >
                            Sort A-Z
                          </Button>
                          <Button
                            variant={
                              this.state.sort == "latest"
                                ? "contained"
                                : "outlined"
                            }
                            className={classes.buttonPadding}
                            onClick={() => {
                              this.setState({ sort: "latest" });
                            }}
                          >
                            Show most recent first
                          </Button>
                        </div>
                      )}
                      <div style={{ padding: 8 }} />
                      <Grid container spacing={8}>
                        {data.maker.fursuits.map(fursuit => {
                          return (
                            <Grid item xs={6} md={4} lg={2} key={fursuit.id}>
                              <FursuitCard
                                openFursuit={fursuit => {
                                  this.setState({
                                    openFursuit: true,
                                    fursuit: fursuit
                                  });
                                }}
                                key={fursuit.id}
                                fursuit={fursuit}
                              />
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Grid>
                    <Grid item lg={3} xs={12}>
                      {maker.name != "~Owner Made" && (
                        <React.Fragment>
                          <Grid container spacing={8}>
                            {!maker.claimed &&
                              !maker.claimRejected &&
                              !maker.possessed &&
                              !maker.user && (
                                <Grid
                                  item
                                  xs={12}
                                  className={classes.sideSpace}
                                >
                                  <Button
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    variant="outlined"
                                    onClick={() =>
                                      this.setState({ claimDialog: true })
                                    }
                                  >
                                    Claim maker
                                  </Button>
                                </Grid>
                              )}
                            {maker.claimed && !maker.possessed && (
                              <Grid item xs={12} className={classes.sideSpace}>
                                <Button
                                  color="primary"
                                  fullWidth
                                  size="large"
                                  variant="outlined"
                                  disabled
                                >
                                  Claim pending
                                </Button>
                              </Grid>
                            )}
                            {!maker.claimed &&
                              !maker.claimRejected &&
                              !maker.possessed &&
                              maker.user && (
                                <Grid
                                  item
                                  xs={12}
                                  className={classes.sideSpace}
                                >
                                  <Button
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    variant="outlined"
                                    onClick={() =>
                                      this.setState({ claimDialog: true })
                                    }
                                  >
                                    Contest Claim
                                  </Button>
                                </Grid>
                              )}
                            {maker.possessed && (
                              <Grid item xs={12} className={classes.sideSpace}>
                                <Button
                                  color="primary"
                                  fullWidth
                                  size="large"
                                  variant="outlined"
                                  onClick={() =>
                                    this.setState({ editMaker: true })
                                  }
                                >
                                  Edit maker
                                </Button>
                              </Grid>
                            )}
                            {!maker.claimed && !maker.possessed && (
                              <Grid item xs={12} className={classes.sideSpace}>
                                {this.renderFollowButton(maker)}
                              </Grid>
                            )}
                          </Grid>
                        </React.Fragment>
                      )}
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
                            >
                              {maker.name}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                              color="primary"
                              className={classes.makerTitle}
                            >
                              {maker.country}
                              {maker.region && `, ${maker.region}`}
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
                              src={maker.avatar}
                              title={maker.name}
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
                              color="primary"
                              className={classes.makerTitle}
                            >
                              Website
                            </Typography>
                            {maker.web && (
                              <a
                                className={classes.link}
                                target="_blank"
                                href={maker.web}
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
                            {!maker.web && (
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                                className={classes.makerTitle}
                              >
                                Unknown
                              </Typography>
                            )}
                            <div style={{ padding: 10 }} />
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="h2"
                              color="primary"
                              className={classes.makerTitle}
                            >
                              Fursuits
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                              className={classes.makerTitle}
                            >
                              {maker.fursuitsNumber}
                            </Typography>
                            <div style={{ padding: 10 }} />
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="h2"
                              color="primary"
                              className={classes.makerTitle}
                            >
                              Commission Status
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                              className={classes.makerTitle}
                            >
                              {maker.commissionStatus.name}
                            </Typography>
                            <div style={{ padding: 10 }} />
                          </Grid>
                        </Grid>
                        <Divider />
                      </div>
                    </Grid>
                  </Grid>
                  <MakerClaimDialog
                    maker={maker.id}
                    open={this.state.claimDialog}
                    onClose={() => this.setState({ claimDialog: false })}
                  />
                  <EditMakerDialog
                    maker={maker}
                    open={this.state.editMaker}
                    onClose={() => this.setState({ editMaker: false })}
                  />
                </div>
              )
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(withCurrentSession(Maker)));
