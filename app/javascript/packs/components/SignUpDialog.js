import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { TextField } from 'redux-form-material-ui'

import { hideSignUpDialog } from '../actions/signUpDialog';

import Logo from './Logo';

const styles = theme => ({
  brand: {
    textAlign: 'center'
  }
})

class SignUpDialog extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
      >
        <DialogTitle className={classes.brand}>
          <Logo />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <Field
            component={TextField}
            name="username"
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
          />
          <Field
            component={TextField}
            name="email"
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
)(withStyles(styles)(SignUpDialog));
const Form = reduxForm({ form: 'SignUpDialog' })(Connected);
const FormWithMutation = () => (
  <Mutation mutation={CREATE_USER}>
    {( createUser, { data }) => (<Form onSubmit={(variables) => createUser({ variables })} />)}
  </Mutation>
)
export default FormWithMutation;
