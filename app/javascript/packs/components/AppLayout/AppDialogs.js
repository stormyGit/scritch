import React from "react";
import queryString from "query-string";
import { withStyles } from "@material-ui/core/styles";
import withCurrentSession from "../withCurrentSession";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import MultipleMediaDialog from "../MultipleMediaDialog";
import ActivitiesDialog from "../ActivitiesDialog";
import SettingsDialog from "../SettingsDialog";
import SignUpDialog from "../SignUpDialog";

import UploadIcon from "@material-ui/icons/CloudUpload";

const styles = theme => ({});

class AppDialogs extends React.Component {
  state = {
    uploadDialog: true
  };

  render() {
    const {
      classes,
      currentSession,
      uploadDialog,
      signUpDialog,
      settingsDialog,
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
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withCurrentSession(AppDialogs));
