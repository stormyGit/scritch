import React from "react";
import queryString from "query-string";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import withCurrentSession from "../withCurrentSession";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";

const styles = theme => ({});

class TechButton extends React.Component {
  state = {
    uploadDialog: true
  };

  render() {
    const { classes, currentSession } = this.props;

    return (
      <React.Fragment>
        <IconButton title="Tech Issue" color="inherit">
          <FontAwesomeIcon icon={faTools} onClick={this.props.onClick} />
        </IconButton>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withCurrentSession(withWidth()(TechButton)));
