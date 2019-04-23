import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query, Mutation, withApollo } from "react-apollo";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link, withRouter } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckIcon from "@material-ui/icons/Check";

import { withStyles } from "@material-ui/core/styles";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";
import withCurrentSession from "../withCurrentSession";

import { CREATE_CLAIM } from "../../queries/claimMutations";

const styles = theme => ({
  link: {
    textDecoration: "none"
  }
});

class DownloadDialog extends React.Component {
  state = {};

  render() {
    const { classes, currentSession, medium } = this.props;

    if (!currentSession) {
      return null;
    }

    return (
      <ResponsiveDialog
        open={this.props.open}
        onClose={() => {
          this.props.onClose();
        }}
      >
        <GlobalProgress absolute />

        <DialogTitle>Download Media</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <ListItemText primary="By downloading this Media you agree:" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText
                inset
                primary="Not to reproduce or use the Media for commercial purposes without contacting the creator."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText
                inset
                primary="Not to claim ownership or repost the Media as your own on any platform."
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.props.onClose();
            }}
          >
            Cancel
          </Button>
          <a href={medium.picture} className={classes.link} target="_blank">
            <Button onClick={() => {}}>Download</Button>
          </a>
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(
  withApollo(withRouter(withCurrentSession(DownloadDialog)))
);
