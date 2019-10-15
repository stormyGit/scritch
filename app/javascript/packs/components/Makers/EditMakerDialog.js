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
import Select from "react-select";

import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";

import { withStyles } from "@material-ui/core/styles";
import { countriesList } from "../../countriesList";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";
import ImageCropper from "../Global/ImageCropper";
import MakerAvatar from "./MakerAvatar";

import { UPDATE_MAKER } from "../../queries/makerMutations";
import { LOAD_COMMISSION_STATUSES } from "../../queries/makerQueries";

const AVATAR_SIZE = 96;

const styles = theme => ({
  bannerMenu: {
    zIndex: 4
  },
  dialogContent: {
    marginTop: theme.spacing.unit * 2
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

class EditMakerDialog extends React.Component {
  state = {
    name: "",
    bio: "",
    country: "",
    commissionStatus: null,
    region: "",
    web: "",
    avatarMenu: false
  };

  constructor(props) {
    super(props);
    this.avatarUploadInput = React.createRef();
  }

  componentDidMount() {
    this.setInitialValues(this.props.maker);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.maker !== nextProps.maker ||
      this.props.open !== nextProps.open
    ) {
      this.setInitialValues(nextProps.maker);
    }
  }

  setInitialValues(maker) {
    this.setState({
      id: maker.id,
      name: maker.name || "",
      bio: maker.bio || "",
      country: maker.country && { value: maker.country, label: maker.country },
      commissionStatus: maker.commissionStatus && {
        value: maker.commissionStatus.id,
        label: maker.commissionStatus.name
      },
      region: maker.region,
      avatar: maker.avatar,
      web: maker.web
    });
  }

  renderAvatar() {
    const { maker, classes } = this.props;

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
      </React.Fragment>
    );
  }

  render() {
    const { classes, maker } = this.props;

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
            <div style={{ padding: 5 }} />
            <TextField
              label={`Info (characters: ${this.state.bio.length}/280)`}
              name="bio"
              value={this.state.bio}
              onChange={e => {
                e.target.value.length <= 280 &&
                  this.setState({ bio: e.target.value });
              }}
              margin="dense"
              fullWidth
            />
            <div style={{ padding: 5 }} />
            <Select
              fullWidth
              placeholder="Country"
              isClearable
              isSearchable
              value={this.state.country}
              onChange={country => {
                this.setState({ country: country });
              }}
              options={countriesList}
              className={classes.selectInput}
            />
            <div style={{ padding: 5 }} />
            <TextField
              label="Region"
              name="region"
              value={this.state.region}
              onChange={e => this.setState({ region: e.target.value })}
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
            <div style={{ padding: 5 }} />
            <Typography variant="subtitle1">Commission Status</Typography>
            <Query query={LOAD_COMMISSION_STATUSES}>
              {({ data, loading, error }) => {
                if (error || !data || !data.commissionStatuses) {
                  return null;
                }
                if (loading) {
                  return (
                    <Grid item xs={4}>
                      <CircularProgress />
                    </Grid>
                  );
                }
                const commissionsList = [];
                data.commissionStatuses.map(
                  e => e && commissionsList.push({ value: e.id, label: e.name })
                );
                if (commissionsList.length == 0) {
                  return null;
                }
                return (
                  <Select
                    fullWidth
                    placeholder="Commission Status"
                    isClearable
                    isSearchable
                    value={this.state.commissionStatus}
                    onChange={commissionStatus => {
                      this.setState({ commissionStatus: commissionStatus });
                    }}
                    options={commissionsList}
                    className={classes.selectInput}
                  />
                );
              }}
            </Query>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose}>Cancel</Button>
            <Mutation mutation={UPDATE_MAKER}>
              {(updateMaker, { data }) => (
                <Button
                  disabled={!this.state.name || /^\s*$/.test(this.state.name)}
                  onClick={() => {
                    updateMaker({
                      variables: {
                        input: {
                          id: maker.id,
                          name: this.state.name,
                          bio: this.state.bio,
                          country: this.state.country.value,
                          commissionStatusId:
                            this.state.commissionStatus &&
                            this.state.commissionStatus.value,
                          region: this.state.region,
                          web: this.state.web,
                          ...(this.state.avatar !== maker.avatar
                            ? { avatar: this.state.avatar }
                            : {})
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

export default withStyles(styles)(withRouter(EditMakerDialog));
