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
import Typography from "@material-ui/core/Typography";
import { Link, withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";
import withCurrentSession from "../withCurrentSession";

import { DELETE_MEDIUM } from "../../queries/mediaMutations";

const styles = theme => ({
  blurb: {
    fontWeight: 200
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none"
  },
  deleteButton: {
    color: theme.palette.danger.main
  }
});

class DeleteMediumDialog extends React.Component {
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
    const { classes, currentSession, mediumId } = this.props;

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

        <DialogTitle>Delete Media</DialogTitle>
        <DialogContent>
          <Typography variant="h6" className={classes.blurb}>
            Are you sure you want to permanently delete this Media from Scritch?
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
          <Mutation mutation={DELETE_MEDIUM}>
            {(deleteMedium, { data }) => (
              <Button
                className={classes.deleteButton}
                onClick={() => {
                  deleteMedium({
                    variables: {
                      input: {
                        id: mediumId
                      }
                    }
                  }).then(() => {
                    this.props.onClose();
                    this.props.history.push("/").then(() => location.reload);
                  });
                }}
              >
                Delete Media
              </Button>
            )}
          </Mutation>
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(
  withApollo(withRouter(withCurrentSession(DeleteMediumDialog)))
);
