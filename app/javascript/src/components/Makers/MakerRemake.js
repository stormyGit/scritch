import React from "react";
import { Query, Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import FursuitCard from "../Fursuits/FursuitCard";
import DefaultAvatar from "../Users/DefaultAvatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tooltip from "@material-ui/core/Tooltip";
import PageTitle from "../Global/PageTitle";
import MakerClaimDialog from "./MakerClaimDialog";
import EditMakerDialog from "./EditMakerDialog";

import { LOAD_MAKER, LOAD_MAKER_DATE } from "../../queries/makerQueries";
import { CREATE_MAKER_SUBSCRIPTION, DELETE_MAKER_SUBSCRIPTION } from "../../queries/makerMutations";

import withCurrentSession from "../withCurrentSession";
import { withRouter, Link } from "react-router-dom";

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
    padding: theme.spacing(1)
  },
  userInfo: {
    paddingLeft: 0,
    paddingRight: 0
  },
  text: {},

  relatedMedia: {
    marginBottom: theme.spacing(1)
  },
  userLink: {
    color: theme.palette.text.primary,
    textDecoration: "none"
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  socialButton: {
    color: theme.palette.text.primary,
    padding: theme.spacing(1),
    minWidth: 36,
    borderRadius: 18
  },
  tags: {
    marginTop: theme.spacing(3)
  },
  noTags: {
    fontStyle: "italic"
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
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
    marginRight: theme.spacing(1)
  },
  makerAvatar: {
    width: "80%",
    borderRadius: "20%"
  },
  makerAvatarMobile: {
    width: "100%",
    borderRadius: "20%"
  },
  infoHeader: {
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center"
  },
  detailsHeader: {
    padding: theme.spacing(1),
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
    paddingBottom: theme.spacing(1)
  },
  headerTitlesSpaced: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: theme.spacing(1)
  },
  headerTitlesLeft: {
    display: "flex",
    paddingBottom: theme.spacing(1)
  },
  dataSpacer: {
    marginLeft: theme.spacing(4)
  },
  dataSpacerLarge: {
    marginLeft: theme.spacing(6)
  },
  headerTitlesContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  makerTitle: {
    fontWeight: 200
  },
  makerTitlePadded: {
    fontWeight: 200,
    paddingLeft: theme.spacing(2)
  },
  actionButtonPadding: {
    paddingLeft: theme.spacing(2)
  },
  claimButtonPadder: {
    paddingRight: theme.spacing(2)
  },
  infoButton: {
    color: theme.palette.primary.main
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
  iconLink: {
    textDecoration: "none",
    color: theme.palette.primary.main
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

const Avatar = withStyles(styles)(({ maker, classes, avatarClass }) => {
  return (
    <div className={classes.avatarContainer}>
      <img className={avatarClass} src={maker.avatar} />
    </div>
  );
});

const Metrics = withStyles(styles)(
  withWidth()(({ maker, classes, width }) => (
    <div className={classes.headerTitlesLeft}>
      <Typography variant="subtitle1">
        <strong>{maker.fursuitsNumber}</strong> fursuits
      </Typography>
    </div>
  ))
);

const SubtitleRow = withStyles(styles)(
  withWidth()(({ classes, maker, width }) => (
    <React.Fragment>
      <div className={classes.headerTitlesLeft}>
        <Typography variant="subtitle1" className={classes.makerTitle}>
          {maker.country}
          {maker.region ? `, ${maker.region}` : ""}
        </Typography>
        {(width === "xl" || width === "lg") && maker.web && (
          <div className={classes.dataSpacerLarge}>
            <Typography variant="subtitle1" className={classes.makerTitle}>
              <a href={maker.web} target="_blank" className={classes.link}>
                Website
              </a>
            </Typography>
          </div>
        )}
        {(width === "xl" || width === "lg") && (
          <div className={classes.dataSpacerLarge}>
            <Typography variant="subtitle1" className={classes.makerTitle}>
              Status: <strong>{maker.commissionStatus.name}</strong>
            </Typography>
          </div>
        )}
      </div>
      {width !== "xl" && width !== "lg" && (
        <React.Fragment>
          <div>
            <Typography variant="subtitle1" className={classes.makerTitle}>
              <a href={maker.web} target="_blank" className={classes.link}>
                Website
              </a>
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1" className={classes.makerTitle}>
              Status: <strong>{maker.commissionStatus.name}</strong>
            </Typography>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  ))
);

class Maker extends React.Component {
  state = {
    claimDialog: false,
    editMakerDialog: false,
    openFursuit: false,
    fursuit: null,
    makerDetail: false,
    sort: "alpha"
  };

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
              size={"small"}
              variant="outlined"
              className={
                width === "lg" || width === "xl" ? this.props.classes.followButtonSpacer : null
              }
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
            return (
              <Button
                size={"small"}
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
          }}
        </Mutation>
      );
    }
  }

  renderActionButton(maker) {
    const { classes } = this.props;
    return (
      <React.Fragment>
        {!maker.claimed &&
          !maker.claimRejected &&
          !maker.possessed &&
          (!maker.users || maker.users.length == 0) && (
            <Button
              color="primary"
              size="small"
              variant="outlined"
              onClick={() => this.setState({ claimDialog: true })}
            >
              Claim maker
            </Button>
          )}
        {maker.claimed && !maker.possessed && (
          <Button color="primary" size="small" variant="outlined" disabled>
            Claim pending
          </Button>
        )}
        {!maker.claimed &&
          !maker.claimRejected &&
          !maker.possessed &&
          maker.users &&
          maker.users.length > 0 && (
            <Button
              color="primary"
              size="small"
              variant="outlined"
              onClick={() => this.setState({ claimDialog: true })}
            >
              Contest Claim
            </Button>
          )}
        {maker.possessed && (
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={() => this.setState({ editMakerDialog: true })}
          >
            Edit maker
          </Button>
        )}
      </React.Fragment>
    );
  }

  renderSortButton(maker) {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.sort === "latest"}
              onChange={() =>
                this.state.sort === "alpha"
                  ? this.setState({ sort: "latest" })
                  : this.setState({ sort: "alpha" })
              }
              color="primary"
            />
          }
          label={this.state.sort === "latest" ? "Sort by Date" : "Sort A-Z"}
          labelPlacement="end"
        />
      </React.Fragment>
    );
  }

  renderMakerHeader(maker) {
    const { classes, match, currentSession, width } = this.props;

    return (
      <React.Fragment>
        <div className={classes.infoHeader}>
          <Grid container spacing={5} className={classes.centerAlign}>
            <Grid item xs={false} lg={2} />
            <Grid item xs={2} lg={2} className={classes.avatarContainer}>
              <Avatar maker={maker} avatarClass={classes.makerAvatar} />
            </Grid>
            <Grid item xs={10} lg={6}>
              <div className={classes.headerTitles}>
                <Typography variant="h5" className={classes.makerTitle} noWrap>
                  {maker.name}
                </Typography>
                <div className={classes.actionButtonPadding}>{this.renderActionButton(maker)}</div>
                <div className={classes.actionButtonPadding}>
                  {!maker.claimed && !maker.possessed && this.renderFollowButton(maker)}
                </div>
                <div className={classes.actionButtonPadding}>{this.renderSortButton(maker)}</div>
              </div>
              <Metrics maker={maker} />
              <SubtitleRow maker={maker} />
              <div className={classes.headerTitles}>
                <Typography variant="subtitle1" className={classes.makerTitle} noWrap>
                  {maker.bio}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={false} lg={2} />
          </Grid>
        </div>
      </React.Fragment>
    );
  }

  renderMakerHeaderMobile(maker) {
    const { classes, match, currentSession, width } = this.props;

    return (
      <React.Fragment>
        <div className={classes.infoHeader}>
          <Grid container spacing={3} className={classes.centerAlign}>
            <Grid item xs={3} className={classes.avatarContainer}>
              <Avatar maker={maker} avatarClass={classes.makerAvatarMobile} />
            </Grid>
            <Grid item xs={9}>
              <div className={classes.headerTitles}>
                <Typography variant="h5" className={classes.makerTitle} noWrap>
                  {maker.name}
                </Typography>
              </div>
              <div>
                {this.renderActionButton(maker)}
                <div style={{ padding: 4 }} />
                {!maker.claimed && !maker.possessed && this.renderFollowButton(maker)}
                <div style={{ padding: 4 }} />
                {this.renderSortButton(maker)}
              </div>
            </Grid>
            <Grid item xs={12}>
              <Metrics maker={maker} />
              <SubtitleRow maker={maker} />
              <div className={classes.headerTitles}>
                <Typography variant="subtitle1" className={classes.makerTitle} noWrap>
                  {maker.bio}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }

  renderMakerFursuits(maker) {
    const { classes, match, currentSession } = this.props;

    if (
      (!maker.fursuits || (maker.fursuits && maker.fursuits.length === 0)) &&
      (!maker.fursuitsByDate || (maker.fursuitsByDate && maker.fursuitsByDate.length === 0))
    )
      return (
        <div style={{ width: "100%", textAlign: "center", padding: 24 }}>
          <Typography variant="h6" style={{ fontWeight: 200 }}>
            No Fursuit
          </Typography>
        </div>
      );

    return (
      <React.Fragment>
        {this.state.sort === "alpha" &&
          maker.fursuits.map(fursuit => {
            return (
              <Grid item xs={6} md={4} lg={2} key={fursuit.id}>
                <Link to={`/fursuits/${fursuit.slug}`} className={classes.iconLink}>
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
                </Link>
              </Grid>
            );
          })}
        {this.state.sort === "latest" &&
          maker.fursuitsByDate.map(fursuit => {
            return (
              <Grid item xs={6} md={4} lg={2} key={fursuit.id}>
                <Link to={`/fursuits/${fursuit.slug}`} className={classes.iconLink}>
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
                </Link>
              </Grid>
            );
          })}
      </React.Fragment>
    );
  }

  render() {
    const { classes, match, currentSession, width } = this.props;

    return (
      <React.Fragment>
        <Query
          query={this.state.sort == "alpha" ? LOAD_MAKER : LOAD_MAKER_DATE}
          variables={{
            id: match.params.id,
            sort: this.state.sort
          }}
        >
          {({ loading, error, data }) => {
            if (error) {
              return null; //TODO ERROR
            }

            if (loading || !data) {
              return null; //TODO LOADING
            }

            const maker = data ? data.maker : null;

            console.log(maker);
            return (
              <React.Fragment>
                <PageTitle>{maker ? maker.name : null}</PageTitle>
                {width === "sm" || width === "xs"
                  ? this.renderMakerHeaderMobile(maker)
                  : this.renderMakerHeader(maker)}
                {width === "xl" || width === "lg" ? <Padder /> : <MicroPadder />}
                <Grid container spacing={1} style={{ padding: 4 }}>
                  {this.renderMakerFursuits(maker)}
                </Grid>
                <MakerClaimDialog
                  maker={maker.id}
                  open={this.state.claimDialog}
                  onClose={() => this.setState({ claimDialog: false })}
                />
                <EditMakerDialog
                  maker={maker}
                  open={this.state.editMakerDialog}
                  onClose={() => this.setState({ editMakerDialog: false })}
                />
              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(withWidth()(withCurrentSession(Maker))));
