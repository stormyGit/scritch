import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { hideSignInDialog } from '../actions/signInDialog';

class SignInDialog extends React.Component {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Sign in to Murrtube</DialogTitle>
          <DialogContent>
            <DialogContentText>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              margin="dense"
              id="name"
              label="Password"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose}>
              Cancel
            </Button>
            <Button onClick={this.props.handleClose}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(
  ({ signInDialog }) => ({ open: signInDialog }),
  (dispatch) => ({
    handleClose: () => dispatch(hideSignInDialog())
  })
)(SignInDialog);
