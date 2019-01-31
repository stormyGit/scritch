import React from "react";
import queryString from "query-string";
import { withStyles } from "@material-ui/core/styles";
import withCurrentSession from "../withCurrentSession";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import MultipleMediaDialog from "../MultipleMediaDialog";
import ActivitiesDialog from "../ActivitiesDialog";
import SettingsDialog from "../SettingsDialog";
import SignUpDialog from "../SignUpDialog";
import TechDialog from "../TechDialog";

import UploadIcon from "@material-ui/icons/CloudUpload";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

class AppDialogs extends React.Component {
  state = {
    snack: false
  };
  handleClose() {
    this.setState({ snack: false });
  }

  render() {
    const {
      classes,
      currentSession,
      uploadDialog,
      signUpDialog,
      settingsDialog,
      techDialog,
      activitiesDialog
    } = this.props;

    return (
      <React.Fragment>
        {!currentSession && (
          <SignUpDialog
            open={signUpDialog}
            onClose={() => this.props.closeSignUpDialog()}
          />
        )}
        {currentSession && (
          <MultipleMediaDialog
            open={uploadDialog}
            onClose={() => this.props.closeUploadDialog()}
            uploadEnabled
          />
        )}
        {currentSession && (
          <ActivitiesDialog
            open={activitiesDialog}
            onClose={() => this.props.closeActivitiesDialog()}
          />
        )}
        {currentSession && (
          <SettingsDialog
            open={settingsDialog}
            onClose={() => this.props.closeSettingsDialog()}
          />
        )}
        <TechDialog
          open={techDialog}
          onClose={() => this.props.closeTechDialog()}
          submitSnack={() => this.setState({ snack: true })}
        />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.snack}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Report submitted!</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={() => this.handleClose()}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withCurrentSession(AppDialogs));
