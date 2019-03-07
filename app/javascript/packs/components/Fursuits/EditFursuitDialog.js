import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";

import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";

import { withStyles } from "@material-ui/core/styles";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";
import ImageCropper from "../Global/ImageCropper";
import FursuitAvatar from "./FursuitAvatar";

import { UPDATE_FURSUIT } from "../../queries/fursuitMutations";

const AVATAR_SIZE = 96;

const styles = theme => ({
  bannerMenu: {
    zIndex: 4
  },
  dialogContent: {
    marginTop: theme.spacing.unit * 2
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
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
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
    marginTop: theme.spacing.unit * 3
  },
  editBannerIcon: {
    display: "block",
    fontSize: "4em",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing.unit,
    color: "white"
  },
  infoText: {
    color: "white"
  },
  domain: {
    marginRight: 1,
    paddingBottom: 4,
    fontSize: "1rem",
    color:
      theme.palette.type === "dark"
        ? "rgba(255, 255, 255, 0.5)"
        : "rgba(0, 0, 0, 0.5)"
  }
});

class EditFursuitDialog extends React.Component {
  state = {
    name: "",
    slug: "",
    bio: "",
    website: "",
    banner: null,
    avatar: null,
    bannerMenu: false,
    avatarMenu: false,
    bannerToEdit: null,
    avatarToEdit: null
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

  componentWillReceiveProps(nextProps) {
    if (
      this.props.fursuit !== nextProps.fursuit ||
      this.props.open !== nextProps.open
    ) {
      this.setInitialValues(nextProps.fursuit);
    }
  }

  setInitialValues(fursuit) {
    this.setState({
      id: fursuit.id,
      name: fursuit.name || "",
      creationYear: "",
      avatar: fursuit.avatar
    });
  }

  renderAvatar() {
    const { fursuit, classes } = this.props;

    return (
      <React.Fragment>
        <Button
          className={classes.editAvatarButton}
          onClick={() => this.setState({ avatarMenu: true })}
        >
          <div id="uploadAvatarButton">
            <InsertPhotoIcon />
          </div>
        </Button>
        <Popper
          open={this.state.avatarMenu}
          anchorEl={document.getElementById("uploadAvatarButton")}
          transition
          disablePortal
          className={classes.bannerMenu}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener
                  onClickAway={() => this.setState({ avatarMenu: false })}
                >
                  <MenuList disablePadding>
                    <MenuItem
                      className={classes.menuButton}
                      onClick={() => {
                        this.avatarUploadInput.current.click();
                        this.setState({ avatarMenu: false });
                      }}
                    >
                      Upload picture
                    </MenuItem>
                    <MenuItem
                      className={classes.menuButton}
                      onClick={() => {
                        this.setState({
                          avatar: null,
                          removeAvatar: true,
                          avatarMenu: false
                        });
                      }}
                    >
                      Remove
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      className={classes.menuButton}
                      onClick={() => this.setState({ avatarMenu: false })}
                    >
                      Cancel
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
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
          specy={fursuit.isHybrid ? "Hybrid" : fursuit.fursuitSpecy.name}
          className={classes.fursuitAvatar}
          size={AVATAR_SIZE}
        />
      </React.Fragment>
    );
  }

  render() {
    const { classes, fursuit } = this.props;
    console.log(fursuit);

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
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose}>Cancel</Button>
            <Mutation mutation={UPDATE_FURSUIT}>
              {(updateFursuit, { data }) => (
                <Button
                  disabled={!this.state.name || /^\s*$/.test(this.state.name)}
                  onClick={() => {
                    updateFursuit({
                      variables: {
                        input: {
                          id: fursuit.id,
                          name: this.state.name,
                          creationYear: this.state.creationYear,
                          ...(this.state.avatar !== fursuit.avatar
                            ? { avatar: this.state.avatar }
                            : {}),
                          removeAvatar: this.state.removeAvatar
                        }
                      }
                    }).then(updated => {
                      this.props.onClose();
                      location.reload();
                    });
                  }}
                >
                  Save
                </Button>
              )}
            </Mutation>
          </DialogActions>
        </ResponsiveDialog>
        {this.state.avatarToEdit && (
          <ImageCropper
            image={this.state.avatarToEdit}
            width={300}
            height={300}
            borderRadius={150}
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

export default withStyles(styles)(withRouter(EditFursuitDialog));
