import React from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import withCurrentSession from "../withCurrentSession";

import { withStyles } from "@material-ui/core/styles";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";
import FursuitEditFields from "../Fursuits/FursuitEditFields";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { LOAD_MAKER } from "../../queries/makerQueries";
import { REJECT_MAKER_REQUEST } from "../../queries/moderationMutations";
import { CREATE_MAKER } from "../../queries/makerMutations";
import { countriesList } from "../../countriesList";
import Select from "../Global/Select";
import { Paper } from "@material-ui/core";

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
  },
  dialogContent: {
    marginTop: theme.spacing(2)
  },
  paperQuote: {
    padding: theme.spacing(3),
    overflowX: "auto"
  }
});

class MakerRequestDialog extends React.Component {
  state = {
    name: "",
    web: "",
    country: "",
    region: "",
    visible: true
  };

  render() {
    const { classes, request, currentSession } = this.props;

    return (
      <React.Fragment>
        <ResponsiveDialog open={this.props.open} onClose={this.props.onClose}>
          <GlobalProgress absolute />
          <DialogContent className={classes.dialogContent}>
            <Paper className={classes.paperQuote} evelation={1}>
              <Typography variant="subtitle1">{request.body}</Typography>
            </Paper>
            <TextField
              label="Name"
              name="name"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              margin="dense"
              fullWidth
            />
            <div style={{ padding: 5 }} />
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
              {(createMaker, { data }) => (
                <Button
                  disabled={!this.state.name || /^\s*$/.test(this.state.name)}
                  onClick={() => {
                    createMaker({
                      variables: {
                        input: {
                          requestId: request.id,
                          name: this.state.name,
                          visible: this.state.visible,
                          web: this.state.web,
                          country: this.state.country.value,
                          region: this.state.region
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
            <Mutation mutation={REJECT_MAKER_REQUEST}>
              {(rejectMakerRequest, { data }) => (
                <Button
                  onClick={() => {
                    rejectMakerRequest({
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

export default withStyles(styles)(withRouter(withCurrentSession(MakerRequestDialog)));
