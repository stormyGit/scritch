import React from "react";
import {withRouter} from "react-router-dom";
import {Mutation} from "react-apollo";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import withCurrentSession from "../withCurrentSession";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";

import {withStyles} from "@material-ui/core/styles";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";
import ImageCropper from "../Global/ImageCropper";
import FursuitAvatar from "./FursuitAvatar";
import FursuitEditFields from "./FursuitEditFields";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {DELETE_FURSUIT, UPDATE_FURSUIT} from "../../queries/fursuitMutations";
import {LOAD_FURSUIT} from "../../queries/fursuitQueries";

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

class EditFursuitDialog extends React.Component {
  state = {
    name: "",
    slug: "",
    bio: "",
    creationYear: 0,
    avatar: null,
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
    avatarMenu: false,
    visible: false
  };

  constructor(props) {
    super(props);
    this.bannerUploadInput = React.createRef();
    this.avatarUploadInput = React.createRef();
    this.bannerRef = React.createRef();
  }

  componentDidMount() {
    this.setInitialValues(this.props.fursuit);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.fursuit !== nextProps.fursuit || this.props.open !== nextProps.open) {
      this.setInitialValues(nextProps.fursuit);
    }
  }

  setInitialValues(fursuit) {
    this.setState({
      id: fursuit.id,
      name: fursuit.name || "",
      bio: fursuit.bio || "",
      slug: fursuit.slug || "",
      visible: fursuit.visible || true,
      creationYear: fursuit.creationYear,
      avatar: fursuit.avatar,
      fursuitLegType: fursuit.fursuitLegType && fursuit.fursuitLegType.id,
      fursuitStyle: fursuit.fursuitStyle && fursuit.fursuitStyle.id,
      speciesIds:
        fursuit.species && fursuit.species.length > 0 ? fursuit.species.map(e => e.id) : [],
      hybridSearch: fursuit.isHybrid,
      fursuitBuild: fursuit.fursuitBuild && fursuit.fursuitBuild.id,
      fursuitPadding: fursuit.fursuitPadding && fursuit.fursuitPadding.id,
      fursuitFinger: fursuit.fursuitFinger && fursuit.fursuitFinger.id,
      fursuitGender: fursuit.fursuitGender && fursuit.fursuitGender.id,
      baseColor: fursuit.baseColor,
      eyesColor: fursuit.eyesColor,
      maker: fursuit.makers.length > 0 ? [fursuit.makers[0].id] : null
    });
  }

  renderAvatar() {
    const { fursuit, classes } = this.props;

    return (
      <React.Fragment>
        <Button
          className={classes.editAvatarButton}
          onClick={() => this.avatarUploadInput.current.click()}
        >
          <div id="uploadAvatarButton">
            <InsertPhotoIcon />
          </div>
        </Button>
        <input
          accept="image/png,image/x-png,image/jpeg"
          className={classes.uploadInput}
          ref={this.avatarUploadInput}
          type="file"
          onChange={e => {
            this.setState({ avatarToEdit: e.target.files[0] });
          }}
        />
        <FursuitAvatar
          avatar={this.state.avatar}
          className={classes.fursuitAvatar}
          size={AVATAR_SIZE}
        />
      </React.Fragment>
    );
  }

  render() {
    const { classes, fursuit, currentSession } = this.props;

    return (
      <React.Fragment>
        <ResponsiveDialog open={this.props.open} onClose={this.props.onClose}>
          <GlobalProgress absolute />
          <Grid container justify="center" className={classes.avatarContainer}>
            <Grid item>{this.renderAvatar()}</Grid>
          </Grid>
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
                      {`https://${process.env.DOMAIN}/`}
                    </InputAdornment>
                  )
                }}
              />
            )}
            {currentSession && currentSession.user.isModerator && (
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
            {currentSession && currentSession.user.isModerator && (
              <Mutation mutation={DELETE_FURSUIT}>
                {(deleteFursuit, { data }) => (
                  <Button
                    className={classes.dangerButton}
                    onClick={() => {
                      if (confirm("Are you sure"))
                        deleteFursuit({
                          variables: {
                            input: {
                              id: fursuit.id
                            }
                          }
                        }).then(() => {
                          location.reload();
                        });
                    }}
                  >
                    DELETE
                  </Button>
                )}
              </Mutation>
            )}
            <Mutation
              mutation={UPDATE_FURSUIT}
              update={(cache, { data: { updateFursuit } }) => {
                cache.writeQuery({
                  query: LOAD_FURSUIT,
                  variables: { id: fursuit.id },
                  data: { fursuit: { fursuit, ...updateFursuit.fursuit } }
                });
              }}
            >
              {(updateFursuit, { data }) => (
                <Button
                  disabled={!this.state.name || /^\s*$/.test(this.state.name)}
                  onClick={() => {
                    updateFursuit({
                      variables: {
                        input: {
                          id: fursuit.id,
                          name: this.state.name,
                          bio: this.state.bio,
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
                            : null,
                          ...(this.state.avatar !== fursuit.avatar
                            ? { avatar: this.state.avatar }
                            : {})
                        }
                      }
                    }).then(() => {
                      this.props.onClose();
                    });
                  }}
                >
                  Save
                </Button>
              )}
            </Mutation>
            <Button onClick={this.props.onClose}>Cancel</Button>
          </DialogActions>
        </ResponsiveDialog>
        {this.state.avatarToEdit && (
          <ImageCropper
            image={this.state.avatarToEdit}
            width={300}
            height={300}
            borderRadius={30}
            onClose={() => {
              this.setState({ avatarToEdit: null });
            }}
            onSubmit={canvas => {
              this.setState({
                avatar: canvas.toDataURL(),
                removeAvatar: false
              });
            }}
          />
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(withCurrentSession(EditFursuitDialog)));
