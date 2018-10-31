import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query, Mutation, withApollo } from 'react-apollo';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';
import ResponsiveDialog from './ResponsiveDialog';
import GlobalProgress from './GlobalProgress';
import withCurrentSession from './withCurrentSession';

import { CREATE_REPORT } from '../queries';

const styles = theme => ({
});

class Settings extends React.Component {
  state = {
    description: ''
  }

  componentDidMount() {
    if (this.props.currentSession) {
      this.setState({ description: '' });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      this.setState({ description: '' });
    }
  }

  render() {
    const { classes, currentSession, user } = this.props;

    if (!currentSession) {
      return (null);
    }

    return (
      <ResponsiveDialog
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <GlobalProgress absolute />
        <DialogTitle>{`Report ${user.name}`}</DialogTitle>
        <DialogContent>
          <TextField
            label="Please tell use more…"
            name="description"
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
            margin="dense"
            fullWidth
            multiline
            rows={4}
            rowsMax={12}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.onClose}
          >
            Cancel
          </Button>
          <Mutation
            mutation={CREATE_REPORT}
            update={(cache) => {
            }}
          >
            {( createReport, { data }) => (
              <Button
                disabled={!!this.state.description.match(/^\s*$/)}
                onClick={() => {
                  createReport({ variables: { input: { description: this.state.description, userId: user.id }}})
                    .then(() => {
                      this.props.onClose();
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
  withApollo(
    withCurrentSession(Settings)
  )
);
