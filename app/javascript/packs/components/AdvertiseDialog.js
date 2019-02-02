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
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import { Link, withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import ResponsiveDialog from "./ResponsiveDialog";
import GlobalProgress from "./GlobalProgress";
import withCurrentSession from "./withCurrentSession";

import {} from "../queries";

const styles = theme => ({
  content: {
    fontWeight: 200
  }
});

class AdvertiseDialog extends React.Component {
  state = {
    description: ""
  };

  componentDidMount() {
    if (this.props.currentSession) {
      this.setState({ description: "" });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      this.setState({ description: "" });
    }
  }

  render() {
    const { classes, currentSession, user } = this.props;

    if (!currentSession) {
      return null;
    }

    return (
      <ResponsiveDialog
        open={this.props.open}
        onClose={() => {
          this.props.onClose();
          this.setState({ description: "" });
        }}
      >
        <GlobalProgress absolute />

        <DialogTitle>Advertise with Scritch!</DialogTitle>
        <DialogContent>
          <Typography
            gutterBottom
            variant="h6"
            component="h4"
            className={classes.content}
          >
            You want a bunch of furries to see what you have to offer? Put up an
            ad on Scritch!
            <br />
            <br />
            We offer 4 advertisement slots, visible on every page. 2 at the top,
            2 at the bottom.
            <br />
            <br />
            Following are the requirements for the ad file. If you have a 300x90
            ad on FA going on, you should already be set to go without changing
            the file!
          </Typography>
          <br />
          <br />
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText
                inset
                primary="300x90 image ratio (smaller may not look smooth, bigger is fine up to 900x270)"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText
                inset
                primary="Image type should be JPEG, PNG, or GIF"
              />
            </ListItem>
          </List>

          <TextField
            label="stuff"
            name="description"
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
            margin="dense"
            fullWidth
            multiline
            rows={4}
            rowsMax={12}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.props.onClose();
              this.setState({ description: "" });
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(
  withApollo(withRouter(withCurrentSession(AdvertiseDialog)))
);
