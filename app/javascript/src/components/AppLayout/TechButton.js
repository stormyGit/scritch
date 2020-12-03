import React from "react";
import {withStyles} from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import withCurrentSession from "../withCurrentSession";
import IconButton from "@material-ui/core/IconButton";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTools} from "@fortawesome/free-solid-svg-icons";

const styles = () => ({});

class TechButton extends React.Component {
  state = {
    uploadDialog: true
  };

  render() {
    const { classes, currentSession } = this.props;

    return (
      <React.Fragment>
        <IconButton title="Tech Issue" color="inherit" onClick={this.props.onClick}>
          <FontAwesomeIcon icon={faTools} />
        </IconButton>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withCurrentSession(withWidth()(TechButton)));
