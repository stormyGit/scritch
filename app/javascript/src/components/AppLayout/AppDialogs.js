import React from "react";
import { withStyles } from "@material-ui/core/styles";
import withCurrentSession from "../withCurrentSession";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import MultipleMediaDialog from "../Media/MultipleMediaDialog";
import ChatDialog from "../AppDialogs/ChatDialog";
import ActivitiesDialog from "../AppDialogs/ActivitiesDialog";
import SettingsDialog from "../AppDialogs/SettingsDialog";
import AdvertiseDialog from "../AppDialogs/AdvertiseDialog";
import SignUpDialog from "../AppDialogs/SignUpDialog";
import TechDialog from "../AppDialogs/TechDialog";
import SpeciesDialog from "../AppDialogs/SpeciesDialog";
import GlobalSearchDialog from "../AppDialogs/GlobalSearchDialog";

const styles = theme => ({
  close: {
    padding: theme.spacing(0.5)
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
      speciesDialog,
      activitiesDialog,
      advertiseDialog,
      chatDialog,
      searchDialog
    } = this.props;

    return (
      <React.Fragment>
        {!currentSession && (
          <SignUpDialog open={signUpDialog} onClose={() => this.props.closeSignUpDialog()} />
        )}
        {currentSession && (
          <MultipleMediaDialog
            open={uploadDialog}
            onClose={() => this.props.closeUploadDialog()}
            uploadEnabled
          />
        )}
        {currentSession && (
          <ChatDialog open={chatDialog} onClose={() => this.props.closeChatDialog()} />
        )}
        {currentSession && (
          <ActivitiesDialog
            open={activitiesDialog}
            onClose={() => this.props.closeActivitiesDialog()}
          />
        )}
        {currentSession && (
          <SettingsDialog open={settingsDialog} onClose={() => this.props.closeSettingsDialog()} />
        )}
        {currentSession && (
          <AdvertiseDialog
            open={advertiseDialog}
            onClose={() => this.props.closeAdvertiseDialog()}
          />
        )}
        {currentSession && (
          <SpeciesDialog open={speciesDialog} onClose={() => this.props.closeSpeciesDialog()} />
        )}
        <TechDialog
          open={techDialog}
          onClose={() => this.props.closeTechDialog()}
          submitSnack={() => this.setState({ snack: true })}
        />
        <GlobalSearchDialog open={searchDialog} onClose={() => this.props.closeSearchDialog()} />
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
