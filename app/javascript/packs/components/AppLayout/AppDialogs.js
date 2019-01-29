import React from "react";
import queryString from "query-string";
import { withStyles } from "@material-ui/core/styles";
import withCurrentSession from "../withCurrentSession";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import MultipleMediaDialog from "../MultipleMediaDialog";

import UploadIcon from "@material-ui/icons/CloudUpload";

const styles = theme => ({});

class AppDialogs extends React.Component {
  state = {
    uploadDialog: true
  };

  render() {
    const { classes, currentSession, uploadDialog, signUpDialog } = this.props;

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
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withCurrentSession(AppDialogs));
