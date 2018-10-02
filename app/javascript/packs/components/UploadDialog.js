import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
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
import { Mutation, Query } from "react-apollo";
import { TextField } from 'redux-form-material-ui';
import Dropzone from 'react-dropzone';

import { CREATE_MEDIUM } from '../queries';
import fileUploadService from '../fileUploadService';
import ResponsiveDialog from './ResponsiveDialog';

const required = value => (value ? undefined : 'This field is required.')

const dropZoneStyles = theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 4,
    borderRadius: 2,
    textAlign: "center",
    color: 'white',
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
        name: uuidv4(),
        progress: (p, stats) => {
          this.setState({ progress: stats });
        }
      }).then((temporary_key) => {
        this.props.input.onChange(temporary_key);
      });
    })
  }

  render() {
    const { classes, width } = this.props;

    return (
      <Dropzone
        multiple={false}
        className={classes.root}
        accept="video/mp4,video/x-m4v,video/*,video/quicktime"
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
              <CircularProgress className={classes.progress} variant={"static"} value={parseInt(this.state.progress.totalUploaded / this.state.progress.fileSize * 95) + 5} />
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
                {
                  (width === 'lg' || width === 'xl') ?
                    "Select or drag a video file to upload" :
                    "Select a video file to upload"
                }
              </Typography>
            </div>
        }
      </Dropzone>
    );
  }
}

const DropZoneFieldWithStyle = withStyles(dropZoneStyles)(withWidth()(DropZoneField));

const styles = theme => ({
  moderationExplanation: {
    marginTop: theme.spacing.unit * 2,
  }
});

class UploadDialog extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <ResponsiveDialog
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <DialogContent>
          <Field
            component={DropZoneFieldWithStyle}
            name="temporaryKey"
            validate={[required]}
          />
          <Field
            component={TextField}
            name="title"
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
            rowsMax={12}
          />
          <DialogContentText variant="body2" className={classes.moderationExplanation}>
            After you submit a video it will be reviewed by our team of moderators.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>
            Cancel
          </Button>
          <Button onClick={this.props.handleSubmit} disabled={!this.props.valid}>
            Submit
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}

const Form = reduxForm({ form: 'UploadDialog' })(UploadDialog);
const FormWithMutation = ({ open, ...props }) => (
  <Mutation mutation={CREATE_MEDIUM}>
    {
      (createMedium, { called }) => {
        if (called) {
          return (
            <Dialog
              open={open}
              onClose={() => props.onClose()}
            >
              <DialogTitle>
                Video uploaded
              </DialogTitle>
              <DialogContent>
                <DialogContentText variant="body2">
                  {`Your video was successfully uploaded to our server and will be reviewed by our team of moderators before publication.`}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => props.onClose()}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          );
        }

        return (
          <Form
            open={open}
            onSubmit={(input) => {
              createMedium({ variables: { input } })
            }}
            {...props}
          />
        )
      }
    }
  </Mutation>
);

export default withStyles(styles)(FormWithMutation);
