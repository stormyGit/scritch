import React from "react";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import withCurrentSession from "../withCurrentSession";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import UploadIcon from "@material-ui/icons/CloudUpload";

const styles = theme => ({
  buttonPad: {
    padding: theme.spacing(1)
  }
});

class UploadButton extends React.Component {
  state = {
    uploadDialog: true
  };

  render() {
    const { classes, currentSession } = this.props;

    return (
      <React.Fragment>
        {(this.props.width === "xl" || this.props.width === "lg") &&
          currentSession && (
            <Button
              onClick={this.props.onClick}
              className={classes.buttonPad}
              color="secondary"
            >
              Upload
            </Button>
          )}
        {this.props.width !== "xl" &&
          this.props.width !== "lg" &&
          currentSession && (
            <IconButton
              title="Upload"
              color="secondary"
              onClick={this.props.onClick}
            >
              <UploadIcon />
            </IconButton>
          )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  withCurrentSession(withWidth()(UploadButton))
);
