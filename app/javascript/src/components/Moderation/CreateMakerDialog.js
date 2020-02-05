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

import { withStyles } from "@material-ui/core/styles";
import { countriesList } from "../../countriesList";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";

import { UPDATE_MAKER, DELETE_MAKER, CREATE_MAKER } from "../../queries/makerMutations";
import withCurrentSession from "../withCurrentSession";
import { FormControlLabel, Checkbox } from "@material-ui/core";

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
    color: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"
  },
  dangerButton: {
    color: theme.palette.danger.main
  }
});

class CreateMakerDialog extends React.Component {
  state = {
    name: "",
    bio: "",
    country: "",
    region: "",
    web: "",
    visible: true
  };

  render() {
    const { classes, maker, currentSession } = this.props;

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
            <div style={{ padding: 5 }} />
            <TextField
              label={`Info (characters: ${this.state.bio.length}/280)`}
              name="bio"
              value={this.state.bio}
              onChange={e => {
                e.target.value.length <= 280 && this.setState({ bio: e.target.value });
              }}
              margin="dense"
              fullWidth
            />
            <div style={{ padding: 5 }} />
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
          </DialogContent>
          <DialogActions>
            <Mutation mutation={CREATE_MAKER}>
              {(updateMaker, { data }) => (
                <Button
                  disabled={!this.state.name || /^\s*$/.test(this.state.name)}
                  onClick={() => {
                    updateMaker({
                      variables: {
                        input: {
                          visible: this.state.visible,
                          name: this.state.name,
                          bio: this.state.bio,
                          country: this.state.country.value,
                          region: this.state.region,
                          web: this.state.web
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
            <Button onClick={this.props.onClose}>Cancel</Button>
          </DialogActions>
        </ResponsiveDialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(withCurrentSession(CreateMakerDialog)));
