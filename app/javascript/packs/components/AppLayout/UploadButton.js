import React from "react";
import queryString from "query-string";
import { withStyles } from "@material-ui/core/styles";
import withCurrentSession from "../withCurrentSession";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import UploadIcon from "@material-ui/icons/CloudUpload";

const styles = theme => ({});

class UploadButton extends React.Component {
  state = {
    uploadDialog: true
  };

  render() {
    const { classes, currentSession } = this.props;

    return (
      <React.Fragment>
        {currentSession && (
          <IconButton title="Upload" color="inherit">
            <UploadIcon onClick={this.props.onClick} />
          </IconButton>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withCurrentSession(UploadButton));

// <React.Fragment>
//   {currentSession && (
//     <Button
//       onClick={() => this.setState({ uploadDialog: true })}
//       variant="contained"
//       size="large"
//       color="primary"
//     >
//       Upload
//     </Button>
//   )}
// </React.Fragment>
