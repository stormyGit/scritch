import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { withStyles } from '@material-ui/core/styles';
import gql from "graphql-tag";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Mutation } from "react-apollo";
import { TextField } from 'redux-form-material-ui'

import { CREATE_COMMENT, GET_MEDIUM } from '../queries';

import Logo from './Logo';

const styles = theme => ({
  actions: {
    textAlign: "right",
    marginTop: theme.spacing.unit
  }
})

class CommentForm extends React.PureComponent {
  state = {
    showAction: false
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Field
          component={TextField}
          name="body"
          margin="dense"
          placeholder="Add a public comment..."
          type="text"
          fullWidth
          multiline
          rows={4}
          rowsMax={12}
          onFocus={() => this.setState({ showAction: true })}
        />
        <Field
          component='input'
          name="mediumId"
          type="hidden"
        />
        {
          this.state.showAction &&
            <div className={classes.actions}>
              <Button onClick={this.props.handleClose}>
                Cancel
              </Button>
              <Button color={'primary'} variant={"contained"} onClick={() => this.props.handleSubmit()}>
                Submit
              </Button>
            </div>
        }
      </React.Fragment>
    );
  }
}

const Connected = connect()(withStyles(styles)(CommentForm));
const Form = reduxForm({ form: 'SignUpDialog' })(Connected);
const FormWithMutation = (props) => (
  <Mutation
    mutation={CREATE_COMMENT}
    update={(cache, { data: { createComment } }) => {
      const { medium } = cache.readQuery({ query: GET_MEDIUM, variables: { id: props.mediumId } });
      cache.writeQuery({
        query: GET_MEDIUM,
        variables: { id: props.mediumId },
        data: { medium: { ...medium, comments: [ createComment.comment, ...medium.comments ] } }
      });
    }}
  >
    {( createComment, { data }) => (<Form  {...props} onSubmit={(input) => { createComment({ variables: { input } })}} />)}
  </Mutation>
)
export default FormWithMutation;
