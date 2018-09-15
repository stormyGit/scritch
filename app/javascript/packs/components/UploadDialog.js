import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';

import uuidv4 from 'uuid/v4';

import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { TextField } from 'redux-form-material-ui';
import Dropzone from 'react-dropzone';

import { hideUploadDialog } from '../actions/uploadDialog';
import fileUploadService from '../fileUploadService';

const required = value => (value ? undefined : 'This field is required.')

const dropZoneStyles = theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 4,
    borderRadius: 2,
    textAlign: "center",
    color: theme.palette.text.primary,
    background: theme.palette.primary.light,
    fontFamily: theme.typography.fontFamily,
    cursor: "pointer",
    height: 220,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadIcon: {
    marginBottom: theme.spacing.unit * 2,
    fontSize: "4em"
  },
  progress: {
    marginBottom: theme.spacing.unit * 2,
    color: theme.palette.text.primary,
  }
});

class DropZoneField extends React.Component {
  state = {
    progress: null
  }

  handleDrop(file) {
    fileUploadService.then((evaporate) => {
      evaporate.add({
        file: file,
        name: `${uuidv4()}/${file.name}`,
        progress: (p, stats) => {
          this.setState({ progress: stats });
        }
      }).then((key) => {
        this.props.input.onChange(key);
      });
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <Dropzone
        multiple={false}
        className={classes.root}
        onDrop={(files) => this.handleDrop(files[0])}
      >
        {
          this.state.progress && this.state.progress.remainingSize === 0 &&
            <div>
              <Typography variant="title" color="inherit" noWrap>
                File uploaded
              </Typography>
            </div>
        }
        {
          this.state.progress && this.state.progress.remainingSize > 0 &&
            <div>
              <CircularProgress className={classes.progress} />
              <Typography variant="title" color="inherit" noWrap>
                {
                  this.state.progress.secondsLeft >= 0 ? `${this.state.progress.secondsLeft}s. remaining` : `Uploading`
                }
              </Typography>
            </div>
        }
        {
          !this.state.progress &&
            <div>
              <CloudUploadIcon className={classes.uploadIcon} />
              <Typography variant="title" color="inherit" noWrap>
                Select or drag a video file to upload
              </Typography>
            </div>
        }
      </Dropzone>
    );
  }
}

const DropZoneFieldWithStyle = withStyles(dropZoneStyles)(DropZoneField);

const styles = theme => ({
  moderationExplanation: {
    marginTop: theme.spacing.unit * 2,
  }
});

class UploadDialog extends React.Component {
  handleSubmit() {
    this.props.handleSubmit();
    this.props.handleClose();
  }

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Upload video</DialogTitle>
        <DialogContent>
          <Field
            component={DropZoneFieldWithStyle}
            name="key"
            validate={[required]}
          />
          <Field
            component={TextField}
            name="title"
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            validate={[required]}
          />
          <Field
            component={TextField}
            name="description"
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
          />
          <DialogContentText variant="body2" className={classes.moderationExplanation}>
            After you submit a video it will be reviewed by our team of moderators. We will let you know as soon as your video is published.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose}>
            Cancel
          </Button>
          <Button onClick={() => this.handleSubmit()} disabled={!this.props.valid}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const CREATE_MEDIUM = gql`
  mutation createMedium($input: CreateMediumInput!) {
    createMedium(input: $input) {
      medium {
        id
      }
    }
  }
`;

const Connected = connect(
  ({ uploadDialog }) => ({ open: uploadDialog }),
  (dispatch) => ({
    handleClose: () => dispatch(hideUploadDialog())
  })
)(UploadDialog);
const Form = reduxForm({ form: 'UploadDialog' })(Connected);
const StyledForm = withStyles(styles)(Form);
const FormWithMutation = () => (
  <Mutation mutation={CREATE_MEDIUM}>
    {
      (createMedium, { called }) => {
        return (
          <StyledForm
            onSubmit={(input) => {
              createMedium({ variables: { input } });
            }}
          />
        )
      }
    }
  </Mutation>
)
export default FormWithMutation;
