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

import { CREATE_MAKER_CLAIM } from "../../queries/claimMutations";

const styles = theme => ({});

class MakerClaimDialog extends React.Component {
  state = {};

  render() {
    const { classes, currentSession, maker } = this.props;

    console.log(maker);
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
        <DialogTitle>Claim this Maker</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText
                inset
                primary="Claiming this Maker will allow you to edit its Data Fields."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText
                inset
                primary="On submission, your claim will be reviewed by our Moderator team."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText
                inset
                primary="Claiming a Maker when you are not the owner of the studio will result in repercussions."
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
          <Mutation mutation={CREATE_MAKER_CLAIM} update={cache => {}}>
            {(createMakerClaim, { data }) => (
              <Button
                onClick={() => {
                  createMakerClaim({
                    variables: {
                      input: {
                        makerId: this.props.maker
                      }
                    }
                  }).then(() => {
                    this.props.onClose();
                    location.reload();
                  });
                }}
              >
                Send claim
              </Button>
            )}
          </Mutation>
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(
  withApollo(withRouter(withCurrentSession(MakerClaimDialog)))
);
