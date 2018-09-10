import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import {
  TextField
} from 'redux-form-material-ui'

import { hideSignUpDialog } from '../actions/signUpDialog';

class SignUpDialog extends React.Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Join Murrtube</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <Field
            component={TextField}
            name="email"
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
          />
          <Field
            component={TextField}
            name="password"
            margin="dense"
            label="Password"
            type="password"
            fullWidth
          />
          <Field
            component={TextField}
            name="password_confirmation"
            margin="dense"
            label="Password confirmation"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose}>
            Cancel
          </Button>
          <Button onClick={() => this.props.handleSubmit()}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!, $password_confirmation: String!) {
    createUser(email: $email, password: $password, password_confirmation: $password_confirmation) {
      id
    }
  }
`;

const Connected = connect(
  ({ signUpDialog }) => ({ open: signUpDialog }),
  (dispatch) => ({
    handleClose: () => dispatch(hideSignUpDialog())
  })
)(SignUpDialog);
const Form = reduxForm({ form: 'SignUpDialog' })(Connected);
const FormWithMutation = () => (
  <Mutation mutation={CREATE_USER}>
    {( createUser, { data }) => (<Form onSubmit={(variables) => createUser({ variables })} />)}
  </Mutation>
)
export default FormWithMutation;
