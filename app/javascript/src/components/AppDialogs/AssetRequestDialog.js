import React from "react";
import { withApollo } from "react-apollo";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import EventMakerRequestDialogContent from "./EventMakerRequestDialogContent";
import GlobalProgress from "../Global/GlobalProgress";
import RequestFursuitDialogContent from "../Fursuits/RequestFursuitDialogContent";
import withCurrentSession from "../withCurrentSession";

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
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  domain: {
    marginRight: 1,
    paddingBottom: 4,
    fontSize: "1rem",
    color: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"
  }
});

class AssetRequestDialog extends React.Component {
  state = {
    assetType: null,
    assetName: "",
    body: "",
    url: "",
    fromFursuitToMaker: false
  };

  componentDidMount() {
    if (this.props.currentSession) {
      this.setState({ assetType: this.props.assetType, body: "", url: "" });
    }
  }

  render() {
    const { classes, currentSession, assetType } = this.props;
    if (!currentSession) {
      return null;
    }

    return (
      <ResponsiveDialog
        open={this.props.open}
        onClose={() => {
          this.props.onClose();
          this.setState({ assetType: this.props.keepAssetType });
        }}
      >
        <GlobalProgress absolute />

        <DialogTitle>{`Request Creation of a New ${
          this.state.assetType ? this.state.assetType : assetType
        }`}</DialogTitle>
        {assetType == "Asset" && (
          <DialogContent>
            {(!this.state.assetType || this.state.assetType === "Asset") && (
              <React.Fragment>
                <Typography variant="subtitle1">
                  Before clicking one of the buttons below, check that there isn't one already in
                  existence (through the Browse Side Bar Menu). Scritch is always growing and
                  another User may have already requested what you are looking to add, even your own
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
        {this.state.assetType == "Fursuit" && (
          <RequestFursuitDialogContent
            submitSnack={this.props.submitSnack}
            onClose={this.props.onClose}
            goToMaker={() => {
              this.setState({ assetType: "Maker", fromFursuitToMaker: true });
            }}
          />
        )}
        {this.state.assetType == "Maker" && (
          <EventMakerRequestDialogContent
            assetType="Maker"
            assetName="Maker"
            submitSnack={this.props.submitSnack}
            onClose={() => {
              if (this.state.fromFursuitToMaker)
                this.setState({
                  fromFursuitToMaker: false,
                  assetType: this.props.keepAssetType
                });
              this.props.onClose();
            }}
          />
        )}
        {this.state.assetType == "Event" && (
          <EventMakerRequestDialogContent
            assetType="Event"
            assetName="Event"
            submitSnack={this.props.submitSnack}
            onClose={this.props.onClose}
          />
        )}
        {(!this.state.assetType || this.state.assetType === "Asset") && (
          <DialogActions>
            <Button
              onClick={() => {
                this.props.onClose();
                this.setState({
                  fromFursuitToMaker: false,
                  assetType: this.props.keepAssetType
                });
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

export default withStyles(styles)(withApollo(withCurrentSession(AssetRequestDialog)));
