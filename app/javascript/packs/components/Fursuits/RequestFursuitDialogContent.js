import React from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import withCurrentSession from "../withCurrentSession";

import { withStyles } from "@material-ui/core/styles";
import FursuitEditFields from "./FursuitEditFields";

import { CREATE_FURSUIT_REQUEST } from "../../queries/fursuitMutations";

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

class RequestFursuitDialog extends React.Component {
  state = {
    name: "",
    url: "",
    notes: "",
    creationYear: null,
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
    maker: null
  };

  isFormNotOk() {
    if (
      !this.state.name ||
      /^\s*$/.test(this.state.name) ||
      !this.state.fursuitFinger ||
      !this.state.fursuitBuild ||
      !this.state.fursuitGender ||
      !this.state.fursuitPadding ||
      !this.state.fursuitStyle ||
      this.state.speciesIds.length == 0 ||
      !this.state.fursuitLegType ||
      !this.state.baseColor ||
      !this.state.eyesColor ||
      !this.state.maker ||
      this.state.maker.length == 0 ||
      !this.state.creationYear
    )
      return true;
    return false;
  }

  render() {
    const { classes, currentSession } = this.props;

    return (
      <React.Fragment>
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
            label="Creation year"
            name="creationYear"
            value={this.state.creationYear}
            onChange={e => this.setState({ creationYear: e.target.value })}
            margin="dense"
            fullWidth
          />
          <FursuitEditFields
            inRequest={true}
            onChange={value => {
              this.setState({
                [value.label]: value.value
              });
            }}
            changeRequestState={() => this.props.goToMaker()}
          />
          <TextField
            label="Additional Information (Optional)"
            name="notes"
            value={this.state.notes}
            onChange={e => this.setState({ notes: e.target.value })}
            margin="dense"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Cancel</Button>
          <Mutation mutation={CREATE_FURSUIT_REQUEST}>
            {(createFursuitRequest, { data }) => {
              const notOk = this.isFormNotOk();
              const button = (
                <div>
                  <Button
                    disabled={notOk}
                    onClick={() => {
                      createFursuitRequest({
                        variables: {
                          input: {
                            userId: currentSession.user.id,
                            name: this.state.name,
                            url: this.state.url,
                            notes: this.state.notes,
                            fursuitFingerId: this.state.fursuitFinger,
                            fursuitBuildId: this.state.fursuitBuild,
                            fursuitGenderId: this.state.fursuitGender,
                            fursuitPaddingId: this.state.fursuitPadding,
                            fursuitStyleId: this.state.fursuitStyle,
                            speciesIds: this.state.speciesIds
                              ? this.state.speciesIds.map(e =>
                                  e.value ? e.value : e
                                )
                              : null,
                            fursuitLegTypeId: this.state.fursuitLegType,
                            baseColor: this.state.baseColor,
                            eyesColor: this.state.eyesColor,
                            isHybrid: this.state.hybridSearch
                              ? this.state.hybridSearch
                              : false,
                            makerIds: [this.state.maker],
                            creationYear: this.state.creationYear
                              ? parseInt(this.state.creationYear)
                              : null
                          }
                        }
                      }).then(updated => {
                        this.props.onClose();
                        this.props.submitSnack();
                      });
                    }}
                  >
                    Send
                  </Button>
                </div>
              );

              return (
                <React.Fragment>
                  {notOk && (
                    <Tooltip title="Check Completion of Required Fields">
                      {button}
                    </Tooltip>
                  )}
                  {!notOk && button}
                </React.Fragment>
              );
            }}
          </Mutation>
        </DialogActions>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  withRouter(withCurrentSession(RequestFursuitDialog))
);
