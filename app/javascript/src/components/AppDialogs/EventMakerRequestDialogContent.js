import React from "react";
import { Mutation, withApollo } from "react-apollo";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";

import { withStyles } from "@material-ui/core/styles";
import withCurrentSession from "../withCurrentSession";

import { CREATE_ASSET_REQUEST } from "../../queries/reportMutations";

const styles = theme => ({
  selected: {
    opacity: "50%"
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
    assetName: "",
    body: "",
    url: ""
  };

  componentDidMount() {
    if (this.props.currentSession) {
      this.setState({ assetName: "", body: "", url: "" });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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
      <React.Fragment>
        <DialogContent>
          {assetType === "Maker" && (
            <React.Fragment>
              <Typography variant="subtitle1">
                Please provide the following information:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <ListItemText primary="Country" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <ListItemText primary="Region" />
                </ListItem>
              </List>
            </React.Fragment>
          )}
          {assetType === "Event" && (
            <React.Fragment>
              <Typography variant="subtitle1">
                Please provide the following information:
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon />
                    </ListItemIcon>
                    <ListItemText primary="Start and End Dates (Required)" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon />
                    </ListItemIcon>
                    <ListItemText primary="Country (Required)" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon />
                    </ListItemIcon>
                    <ListItemText primary="Region (Required)" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon />
                    </ListItemIcon>
                    <ListItemText primary="City" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon />
                    </ListItemIcon>
                    <ListItemText primary="Venue" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon />
                    </ListItemIcon>
                    <ListItemText primary="Attendance" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon />
                    </ListItemIcon>
                    <ListItemText primary="Theme" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon />
                    </ListItemIcon>
                    <ListItemText primary="Charity" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon />
                    </ListItemIcon>
                    <ListItemText primary="Guests of Honour" />
                  </ListItem>
                </List>
              </Typography>
            </React.Fragment>
          )}
          <TextField
            label="Name"
            name="name"
            value={this.state.assetName}
            onChange={e => this.setState({ assetName: e.target.value })}
            margin="dense"
            fullWidth
            rows={4}
            rowsMax={12}
          />
          <TextField
            label={`URL to ${this.props.assetType}`}
            name="url"
            value={this.state.url}
            onChange={e => this.setState({ url: e.target.value })}
            margin="dense"
            fullWidth
            rows={4}
            rowsMax={12}
          />
          <TextField
            label="Please tell us more…"
            name="body"
            value={this.state.body}
            onChange={e => this.setState({ body: e.target.value })}
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
              this.setState({ assetName: "", body: "", url: "" });
            }}
          >
            Cancel
          </Button>
          <Mutation mutation={CREATE_ASSET_REQUEST} update={cache => {}}>
            {(createAssetRequest, { data }) => (
              <Button
                disabled={
                  !!this.state.url.match(/^\s*$/) ||
                  !!this.state.assetName.match(/^\s*$/)
                }
                onClick={() => {
                  createAssetRequest({
                    variables: {
                      input: {
                        body: this.state.body,
                        assetName: this.state.assetName,
                        assetType: this.props.assetType,
                        url: `http://${this.state.url}`
                      }
                    }
                  }).then(() => {
                    this.props.onClose();
                    this.props.submitSnack();
                    this.setState({ assetName: "", body: "", url: "" });
                  });
                }}
              >
                Send request
              </Button>
            )}
          </Mutation>
        </DialogActions>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  withApollo(withCurrentSession(AssetRequestDialog))
);
