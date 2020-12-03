import React from "react";
import { withRouter } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import Divider from "@material-ui/core/Divider";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Select from "../Global/Select";

import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import ImageCropper from "../Global/ImageCropper";
import MakerAvatar from "../Makers/MakerAvatar";

import { withStyles } from "@material-ui/core/styles";
import { countriesList } from "../../countriesList";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";

import withCurrentSession from "../withCurrentSession";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { CREATE_EVENT, UPDATE_EVENT } from "../../queries/eventMutations";

const AVATAR_SIZE = 96;

const styles = theme => ({
  bannerMenu: {
    zIndex: 4
  },
  dialogContent: {
    marginTop: theme.spacing(2)
  },
  selectInput: {
    fontFamily: theme.typography.fontFamily
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

class UpdateEventDialog extends React.Component {
  state = {
    id: "",
    name: "",
    status: "",
    avatar: "",
    web: "",
    avatarMenu: true,
  };

  constructor(props) {
    super(props);
    this.avatarUploadInput = React.createRef();
  }

  componentDidMount() {
    this.setInitialValues(this.props.event);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.event !== nextProps.event || this.props.open !== nextProps.open) {
      this.setInitialValues(nextProps.event);
    }
  }

  setInitialValues(event) {
    this.setState({
      name: event.name,
      status: event.status,
      web: event.web,
      avatar: event.avatar,
      id: event.id
    });
  }
  render() {
    const { classes, maker, currentSession } = this.props;

    return (
      <React.Fragment>
        <ResponsiveDialog open={this.props.open} onClose={this.props.onClose}>
          <GlobalProgress absolute />
          <DialogContent className={classes.dialogContent}>
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
                    transformOrigin: placement === "bottom" ? "center top" : "center bottom"
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={() => this.setState({ avatarMenu: false })}>
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
            <MakerAvatar
              avatar={this.state.avatar}
              className={classes.makerAvatar}
              size={AVATAR_SIZE}
            />
            <TextField
              label="Name"
              name="name"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              margin="dense"
              fullWidth
            />
            <div style={{ padding: 5 }} />
            <TextField
              label="Status"
              name="status"
              value={this.state.status}
              onChange={e => this.setState({ status: e.target.value })}
              margin="dense"
              fullWidth
            />
            <div style={{ padding: 5 }} />
            <TextField
              label="Website"
              name="web"
              value={this.state.web}
              onChange={e => this.setState({ web: e.target.value })}
              margin="dense"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Mutation mutation={UPDATE_EVENT}>
              {(updateEvent, { data }) => (
                <Button
                  disabled={!this.state.name || /^\s*$/.test(this.state.name)}
                  onClick={() => {
                    updateEvent({
                      variables: {
                        input: {
                          id: this.state.id,
                          name: this.state.name,
                          avatar: this.state.avatar,
                          web: this.state.web,
                          status: this.state.status
                        }
                      }
                    }).then(() => {
                      this.props.onClose();
                      location.reload();
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

export default withStyles(styles)(withRouter(withCurrentSession(UpdateEventDialog)));
