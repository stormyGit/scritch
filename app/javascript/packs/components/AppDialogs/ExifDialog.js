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
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckIcon from "@material-ui/icons/Check";

import { withStyles } from "@material-ui/core/styles";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";
import withCurrentSession from "../withCurrentSession";

const styles = theme => ({
  text: {
    fontWeight: 200,
    padding: theme.spacing.unit * 4
  },
  link: {
    textDecoration: "none"
  },
  root: {
    textAlign: "center"
  }
});

class ExifDialog extends React.Component {
  state = {};

  render() {
    const { classes, medium } = this.props;

    if (!medium.exif || Object.keys(JSON.parse(medium.exif)).length === 0)
      return null;
    var exif = JSON.parse(medium.exif);

    return (
      <ResponsiveDialog
        open={this.props.open}
        onClose={() => {
          this.props.onClose();
        }}
      >
        <GlobalProgress absolute />

        <DialogTitle>{`EXIF Data for picture #${
          medium.id.split("-")[0]
        }`}</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText inset primary={`Camera: ${exif.Model}`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText inset primary={`Aperture: `} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText
                inset
                primary={`Focal Length: ${exif.FocalLength.split("/")[0]}.0mm`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText inset primary={`ISO: ${exif.ISOSpeedRatings}`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText inset primary={`Flash: `} />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.props.onClose();
            }}
          >
            Close
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(
  withApollo(withRouter(withCurrentSession(ExifDialog)))
);
