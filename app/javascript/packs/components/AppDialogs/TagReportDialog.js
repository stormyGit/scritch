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
import Grid from "@material-ui/core/Grid";

import { withStyles } from "@material-ui/core/styles";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";
import FursuitMiniCard from "../Fursuits/FursuitMiniCard";
import withCurrentSession from "../withCurrentSession";

import { CREATE_TAG_REPORT } from "../../queries/reportMutations";

const styles = theme => ({
  selected: {
    opacity: "50%"
  }
});

class TagReportDialog extends React.Component {
  state = {
    description: "",
    fursuitMediumIds: []
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
    const { classes, currentSession, user, medium } = this.props;
    if (!currentSession) {
      return null;
    }

    return (
      <ResponsiveDialog open={this.props.open} onClose={this.props.onClose}>
        <GlobalProgress absolute />

        <DialogTitle>{`Report wrong Tags`}</DialogTitle>
        <DialogContent>
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
          {medium.fursuits.length > 0 && (
            <React.Fragment>
              <div style={{ padding: 8 }} />
              <Grid container spacing={8}>
                {medium.fursuits.map(fursuit => (
                  <Grid item lg={2} xs={2} key={fursuit.id}>
                    <FursuitMiniCard
                      dark={this.state.fursuitMediumIds.includes(fursuit.id)}
                      fursuit={fursuit}
                      onClick={
                        !this.state.fursuitMediumIds.includes(fursuit.id)
                          ? payload => {
                              this.setState(prevState => ({
                                fursuitMediumIds: [
                                  ...prevState.fursuitMediumIds,
                                  payload.id
                                ]
                              }));
                            }
                          : payload => {
                              let index = this.state.fursuitMediumIds.indexOf(
                                payload.id
                              );
                              this.setState({
                                fursuitMediumIds: this.state.fursuitMediumIds.filter(
                                  (_, i) => i !== index
                                )
                              });
                            }
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </React.Fragment>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.props.onClose();
              this.setState({ description: "", fursuitMediumIds: [] });
            }}
          >
            Cancel
          </Button>
          <Mutation mutation={CREATE_TAG_REPORT} update={cache => {}}>
            {(createTagReport, { data }) => (
              <Button
                disabled={
                  !!this.state.description.match(/^\s*$/) &&
                  this.state.fursuitMediumIds.length == 0
                }
                onClick={() => {
                  createTagReport({
                    variables: {
                      input: {
                        description: this.state.description,
                        mediumId: this.props.medium.id,
                        fursuitMediumIds: this.state.fursuitMediumIds
                      }
                    }
                  }).then(() => {
                    this.props.onClose();
                    this.setState({ description: "", fursuitMediumIds: [] });
                  });
                }}
              >
                Send report
              </Button>
            )}
          </Mutation>
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(
  withApollo(withCurrentSession(TagReportDialog))
);
