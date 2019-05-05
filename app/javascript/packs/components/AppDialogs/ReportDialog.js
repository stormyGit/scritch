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
import withWidth from "@material-ui/core/withWidth";
import Grid from "@material-ui/core/Grid";

import { withStyles } from "@material-ui/core/styles";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";
import withCurrentSession from "../withCurrentSession";

import {
  CREATE_REPORT,
  CREATE_MEDIUM_REPORT,
  CREATE_COMMENT_REPORT
} from "../../queries/reportMutations";

const styles = theme => ({
  pixelImage: {
    width: "100%"
  }
});

class ReportDialog extends React.Component {
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
    const { classes, currentSession, user, width } = this.props;
    var resourceName;
    if (this.props.resource == "medium") resourceName = "Picture";
    if (this.props.resource == "comment") resourceName = "Comment";
    if (this.props.resource == "user") resourceName = "User";
    if (!currentSession) {
      return null;
    }

    return (
      <ResponsiveDialog open={this.props.open} onClose={this.props.onClose}>
        <GlobalProgress absolute />

        <DialogTitle>{`Report ${resourceName}`}</DialogTitle>

        <DialogContent>
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} lg={9}>
              <TextField
                label="Please tell us more…"
                name="description"
                value={this.state.description}
                onChange={e => this.setState({ description: e.target.value })}
                margin="dense"
                fullWidth
                multiline
                rows={4}
                rowsMax={12}
              />
            </Grid>
            {(width === "xl" || width === "lg") && (
              <Grid item lg={3}>
                <img
                  className={classes.pixelImage}
                  src={require("images/pixel/Header - Report Pop-up.png")}
                />
              </Grid>
            )}
          </Grid>
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
          {this.props.resource == "user" && (
            <Mutation mutation={CREATE_REPORT} update={cache => {}}>
              {(createReport, { data }) => (
                <Button
                  disabled={!!this.state.description.match(/^\s*$/)}
                  onClick={() => {
                    createReport({
                      variables: {
                        input: {
                          description: this.state.description,
                          userId: this.props.resourceId
                        }
                      }
                    }).then(() => {
                      this.props.onClose();
                      this.setState({ description: "" });
                    });
                  }}
                >
                  Send report
                </Button>
              )}
            </Mutation>
          )}
          {this.props.resource == "comment" && (
            <Mutation mutation={CREATE_COMMENT_REPORT} update={cache => {}}>
              {(createCommentReport, { data }) => (
                <Button
                  disabled={!!this.state.description.match(/^\s*$/)}
                  onClick={() => {
                    createCommentReport({
                      variables: {
                        input: {
                          description: this.state.description,
                          commentId: this.props.resourceId
                        }
                      }
                    }).then(() => {
                      this.props.onClose();
                      this.setState({ description: "" });
                    });
                  }}
                >
                  Send report
                </Button>
              )}
            </Mutation>
          )}
          {this.props.resource == "medium" && (
            <Mutation mutation={CREATE_MEDIUM_REPORT} update={cache => {}}>
              {(createMediumReport, { data }) => (
                <Button
                  disabled={!!this.state.description.match(/^\s*$/)}
                  onClick={() => {
                    createMediumReport({
                      variables: {
                        input: {
                          description: this.state.description,
                          mediumId: this.props.resourceId
                        }
                      }
                    }).then(() => {
                      this.props.onClose();
                      this.setState({ description: "" });
                    });
                  }}
                >
                  Send report
                </Button>
              )}
            </Mutation>
          )}
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(
  withApollo(withCurrentSession(withWidth()(ReportDialog)))
);
