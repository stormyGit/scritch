import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query, Mutation, withApollo } from "react-apollo";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";

import { withStyles } from "@material-ui/core/styles";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import EventMakerRequestDialogContent from "./EventMakerRequestDialogContent";
import GlobalProgress from "../Global/GlobalProgress";
import RequestFursuitDialogContent from "../Fursuits/RequestFursuitDialogContent";
import withCurrentSession from "../withCurrentSession";

import { CREATE_ASSET_REQUEST } from "../../queries/reportMutations";

const styles = theme => ({
  selected: {
    opacity: "50%"
  },
  flexButtons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonPadder: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3
  },
  domain: {
    marginRight: 1,
    paddingBottom: 4,
    fontSize: "1rem",
    color:
      theme.palette.type === "dark"
        ? "rgba(255, 255, 255, 0.5)"
        : "rgba(0, 0, 0, 0.5)"
  }
});

class AssetRequestDialog extends React.Component {
  state = {
    assetType: null,
    assetName: "",
    body: "",
    url: ""
  };

  componentDidMount() {
    if (this.props.currentSession) {
      this.setState({ assetName: "", body: "", url: "" });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      this.setState({ assetName: "", body: "", url: "" });
    }
  }

  render() {
    const { classes, currentSession, user, assetType } = this.props;
    if (!currentSession) {
      return null;
    }

    return (
      <ResponsiveDialog
        open={this.props.open}
        onClose={() => {
          this.props.onClose();
          this.setState({ assetType: null });
        }}
      >
        <GlobalProgress absolute />

        <DialogTitle>{`Request Creation of a New: ${
          this.state.assetType ? this.state.assetType : assetType
        }`}</DialogTitle>
        {assetType == "Asset" && (
          <DialogContent>
            {!this.state.assetType && (
              <React.Fragment>
                <Typography variant="subtitle1">
                  Before clicking one of the buttons below, check that there
                  isn't one already in existence (through the Browse Side Bar
                  Menu). Scritch is always growing and another User may have
                  already requested what you are looking to add, even your own
                  Fursuit!
                </Typography>
                <div style={{ padding: 8 }} />
              </React.Fragment>
            )}
            <div className={classes.flexButtons}>
              <Button
                className={classes.buttonPadder}
                variant="outlined"
                onClick={() => this.setState({ assetType: "Fursuit" })}
              >
                Fursuit
              </Button>
              <Button
                className={classes.buttonPadder}
                variant="outlined"
                onClick={() => this.setState({ assetType: "Maker" })}
              >
                Maker
              </Button>
              <Button
                className={classes.buttonPadder}
                variant="outlined"
                onClick={() => this.setState({ assetType: "Event" })}
              >
                Event
              </Button>
            </div>
          </DialogContent>
        )}
        {(assetType == "Fursuit" || this.state.assetType == "Fursuit") && (
          <RequestFursuitDialogContent
            submitSnack={this.props.submitSnack}
            onClose={this.props.onClose}
          />
        )}
        {(assetType == "Maker" || this.state.assetType == "Maker") && (
          <EventMakerRequestDialogContent
            assetType="Maker"
            assetName="Maker"
            submitSnack={this.props.submitSnack}
            onClose={this.props.onClose}
          />
        )}
        {(assetType == "Event" || this.state.assetType == "Event") && (
          <EventMakerRequestDialogContent
            assetType="Event"
            assetName="Event"
            submitSnack={this.props.submitSnack}
            onClose={this.props.onClose}
          />
        )}
        {!this.state.assetType && assetType == "Asset" && (
          <DialogActions>
            <Button
              onClick={() => {
                this.props.onClose();
                this.setState({ assetType: null });
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        )}
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(
  withApollo(withCurrentSession(AssetRequestDialog))
);
