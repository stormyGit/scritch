import React from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import withCurrentSession from "../withCurrentSession";

import { withStyles } from "@material-ui/core/styles";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";
import FursuitEditFields from "../Fursuits/FursuitEditFields";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { CREATE_FURSUIT } from "../../queries/fursuitMutations";
import { LOAD_FURSUIT } from "../../queries/fursuitQueries";
import { REJECT_FURSUIT_REQUEST } from "../../queries/moderationMutations";

const AVATAR_SIZE = 96;

const styles = theme => ({
  bannerMenu: {
    zIndex: 4
  },
  dialogContent: {
    marginTop: theme.spacing(2)
  },
  editBannerButton: {
    width: "100%",
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 1,
    borderRadius: 0,
    height: "100%",
    top: 0,
    left: 0
  },
  bannerContainer: {
    width: "100%",
    paddingTop: "20%",
    position: "relative"
  },
  editAvatarButton: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 1,
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    color: "white"
  },
  menuButton: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    justifyContent: "center"
  },
  bannerIllustration: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0
  },
  uploadInput: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    margin: 0,
    padding: 0,
    opacity: 0,
    width: 1,
    height: 1
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0
  },
  avatarContainer: {
    marginTop: theme.spacing(3)
  },
  editBannerIcon: {
    display: "block",
    fontSize: "4em",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(1),
    color: "white"
  },
  infoText: {
    color: "white"
  },
  domain: {
    marginRight: 1,
    paddingBottom: 4,
    fontSize: "1rem",
    color: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"
  },
  dangerButton: {
    color: theme.palette.danger.main
  }
});

class FursuitRequestDialog extends React.Component {
  state = {
    name: "",
    slug: "",
    bio: "",
    creationYear: 0,
    fursuitLegType: null,
    fursuitStyle: null,
    fursuitGender: null,
    speciesIds: null,
    hybridSearch: false,
    fursuitBuild: null,
    fursuitPadding: null,
    fursuitFinger: null,
    fursuitColor: null,
    fursuitEyes: null,
    maker: null,
    visible: false
  };

  componentDidMount() {
    this.setInitialValues(this.props.request);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.request !== nextProps.request || this.props.open !== nextProps.open) {
      this.setInitialValues(nextProps.request);
    }
  }

  setInitialValues(request) {
    this.setState({
      name: request.name || "",
      bio: request.bio || "",
      slug: request.slug || "",
      visible: request.visible || true,
      creationYear: request.creationYear,
      fursuitLegType: request.fursuitLegType && request.fursuitLegType.id,
      fursuitStyle: request.fursuitStyle && request.fursuitStyle.id,
      speciesIds:
        request.species && request.species.length > 0 ? request.species.map(e => e.id) : [],
      hybridSearch: request.isHybrid,
      fursuitBuild: request.fursuitBuild && request.fursuitBuild.id,
      fursuitPadding: request.fursuitPadding && request.fursuitPadding.id,
      fursuitFinger: request.fursuitFinger && request.fursuitFinger.id,
      fursuitGender: request.fursuitGender && request.fursuitGender.id,
      baseColor: request.baseColor,
      eyesColor: request.eyesColor,
      maker: request.makers.length > 0 ? [request.makers[0].id] : null
    });
  }

  render() {
    const { classes, request, currentSession } = this.props;

    console.log(request);
    var fursuit = request;
    return (
      <React.Fragment>
        <ResponsiveDialog open={this.props.open} onClose={this.props.onClose}>
          <GlobalProgress absolute />
          <DialogContent className={classes.dialogContent}>
            <TextField
              label="Name"
              name="name"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              margin="dense"
              fullWidth
            />
            <TextField
              label={`Bio (characters: ${this.state.bio.length}/280)`}
              name="bio"
              value={this.state.bio}
              onChange={e => {
                e.target.value.length <= 280 && this.setState({ bio: e.target.value });
              }}
              margin="dense"
              fullWidth
            />
            <div style={{ padding: 8 }} />
            {false && (
              <TextField
                label="URL"
                name="slug"
                value={this.state.slug}
                onChange={e => this.setState({ slug: e.target.value })}
                margin="dense"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className={classes.domain} disableTypography>
                      {`https://${process.env.DOMAIN}/fursuits/`}
                    </InputAdornment>
                  )
                }}
              />
            )}
            {currentSession.user.isModerator && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.visible}
                    onChange={e => this.setState({ visible: e.target.checked })}
                  />
                }
                label="Visible?"
              />
            )}
            <div style={{ padding: 8 }} />
            <TextField
              label="Creation year"
              name="creationYear"
              value={this.state.creationYear}
              onChange={e => this.setState({ creationYear: e.target.value })}
              margin="dense"
              fullWidth
            />
            <FursuitEditFields
              fursuit={fursuit}
              onChange={value => {
                this.setState({
                  [value.label]: value.value
                });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Mutation mutation={CREATE_FURSUIT}>
              {(createFursuit, { data }) => (
                <Button
                  disabled={!this.state.name || /^\s*$/.test(this.state.name)}
                  onClick={() => {
                    createFursuit({
                      variables: {
                        input: {
                          requestId: request.id,
                          name: this.state.name,
                          slug: this.state.slug,
                          visible: this.state.visible,
                          fursuitFingerId: this.state.fursuitFinger,
                          fursuitBuildId: this.state.fursuitBuild,
                          fursuitGenderId: this.state.fursuitGender,
                          fursuitPaddingId: this.state.fursuitPadding,
                          fursuitStyleId: this.state.fursuitStyle,
                          speciesIds: this.state.speciesIds
                            ? this.state.speciesIds.map(e => (e.value ? e.value : e))
                            : null,
                          fursuitLegTypeId: this.state.fursuitLegType,
                          baseColor: this.state.baseColor,
                          eyesColor: this.state.eyesColor,
                          isHybrid: this.state.hybridSearch ? this.state.hybridSearch : false,
                          makerIds: this.state.maker,
                          creationYear: this.state.creationYear
                            ? parseInt(this.state.creationYear)
                            : null
                        }
                      }
                    }).then(updated => {
                      this.props.onClose();
                      location.reload();
                    });
                  }}
                >
                  Accept Request
                </Button>
              )}
            </Mutation>
            <Mutation mutation={REJECT_FURSUIT_REQUEST}>
              {(rejectFursuitRequest, { data }) => (
                <Button
                  onClick={() => {
                    rejectFursuitRequest({
                      variables: {
                        input: {
                          id: request.id
                        }
                      }
                    }).then(updated => {
                      this.props.onClose();
                      location.reload();
                    });
                  }}
                >
                  Reject Request
                </Button>
              )}
            </Mutation>
            <Button onClick={this.props.onClose}>Cancel</Button>
          </DialogActions>
        </ResponsiveDialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(withCurrentSession(FursuitRequestDialog)));
