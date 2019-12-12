import React from "react";
import { Mutation, withApollo } from "react-apollo";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";
import withCurrentSession from "../withCurrentSession";

import { DELETE_FURSUIT_USER } from "../../queries/fursuitMutations";

const styles = theme => ({
  blurb: {
    fontWeight: 200
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none"
  }
});

class UnclaimDialog extends React.Component {
  state = {};

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
        }}
      >
        <GlobalProgress absolute />

        <DialogTitle>Unclaim Fursuit</DialogTitle>
        <DialogContent>
          <Typography variant="h6" className={classes.blurb}>
            Unclaim a Fursuit to reflect physical transfer of ownership.
          </Typography>
          <div style={{ padding: 10 }} />
          <Typography variant="h6" className={classes.blurb}>
            By unclaiming a Fursuit, the Involvement Metrics of this Asset will
            be unlinked from your User Profile.
          </Typography>
          <div style={{ padding: 10 }} />
          <Typography variant="h6" className={classes.blurb}>
            Are you sure you want to unclaim this Fursuit?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.props.onClose();
            }}
          >
            Cancel
          </Button>
          <Mutation mutation={DELETE_FURSUIT_USER} update={cache => {}}>
            {(deleteFursuitUser, { data }) => (
              <Button
                onClick={() => {
                  deleteFursuitUser({
                    variables: {
                      input: {
                        fursuitId: this.props.fursuitId
                      }
                    }
                  }).then(() => {
                    this.props.onClose();
                    location.reload();
                  });
                }}
              >
                Unclaim
              </Button>
            )}
          </Mutation>
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(
  withApollo(withRouter(withCurrentSession(UnclaimDialog)))
);
