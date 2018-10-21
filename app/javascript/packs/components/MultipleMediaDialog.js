import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import uuidv4 from 'uuid/v4';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import withWidth from '@material-ui/core/withWidth';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import Fade from '@material-ui/core/Fade';

import ChipInput from 'material-ui-chip-input'

import { withRouter } from 'react-router-dom'
import Dropzone from 'react-dropzone';

import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

import { withStyles } from '@material-ui/core/styles';
import ResponsiveDialog from './ResponsiveDialog';
import fileUploadService from '../fileUploadService';
import GlobalProgress from './GlobalProgress';

import { CREATE_MEDIUM } from '../queries';

const dropZoneStyles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 4,
    borderRadius: 2,
    textAlign: "center",
    color: 'white',
    background: theme.palette.primary.light,
    fontFamily: theme.typography.fontFamily,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    translation: 'opacity 0.5s ease',
    overflow: 'hidden'
  },
  uploadIcon: {
    fontSize: "4em"
  },
  progress: {
    color: "white",
  }
});

const processFileName = (file) => (
  file.name
   .replace(/\.[^.]+$/, '')
   .replace(/[^a-zA-Z]+/, ' ')
   .split(' ').filter((word) => word.length > 0)
   .map(word => word.charAt(0).toUpperCase() + word.slice(1))
   .join(' ')
)

class DropZoneField extends React.Component {
  state = {
    progress: null,
    disabled: false,
    file: null
  }
  evaporate = null;

  componentDidMount() {
    this.evaporate = fileUploadService();
  }

  componentWillUnmount() {
    this.evaporate.then((evaporate) => {
      evaporate.cancel();
    });
  }

  handleDrop(files) {
    if (this.state.disabled) {
      return ;
    }

    const pushFile = (index) => {
      this.evaporate.then((evaporate) => (
        evaporate.add({
          file: files[index],
          name: uuidv4(),
          progress: (p, stats) => {
            this.setState({ file: files[index], progress: stats });
          }
        }).then((temporaryKey) => {
          this.props.onUploaded(files[0], temporaryKey);

          if (files[index + 1]) {
            pushFile(index + 1);
          } else {
            this.props.onComplete();
          }
        })
      ))
    }
    pushFile(0);
    this.setState({ disabled: true });
    this.props.onStart();
  }

  render() {
    const { classes, width } = this.props;

    return (
      // accept="video/mp4,video/x-m4v,video/*,video/quicktime"

      <Dropzone
        multiple={true}
        className={classes.root}
        style={{
          height: width === 'lg' || width === 'xl' ? 220 : 130,
          pointerEvents: this.state.disabled ? 'none' : 'auto',
          cursor: this.state.disabled ? 'not-allowed' : 'pointer',
        }}
        onDrop={(files) => this.handleDrop(files)}
      >
        {
          this.state.progress && this.state.progress.remainingSize === 0 &&
            <div>
              <Typography variant="h6" color="inherit" noWrap>
                All videos were successfuly imported
              </Typography>
            </div>
        }
        {
          this.state.progress && this.state.progress.remainingSize > 0 &&
            <div>
              <CircularProgress
                className={classes.progress}
                variant={"static"}
                value={parseInt(this.state.progress.totalUploaded / this.state.progress.fileSize * 95) + 5}
                style={{
                  marginBottom: width === 'lg' || width === 'xl' ? 16 : 0
                }}
              />
              <Typography variant="h6" color="inherit" noWrap>
                {
                  this.state.progress.secondsLeft >= 0 ? `${this.state.progress.secondsLeft}s. remaining` : `Uploading`
                }
              </Typography>
              <Typography variant="caption" color="inherit" noWrap>
                {
                  this.state.file.name
                }
              </Typography>
            </div>
        }
        {
          !this.state.progress &&
            <div>
              <CloudUploadIcon
                className={classes.uploadIcon}
                style={{
                  marginBottom: width === 'lg' || width === 'xl' ? 16 : 0,
                }}
              />
              <Typography
                variant="h6"
                color="inherit"
                noWrap
              >
                {
                  (width === 'lg' || width === 'xl') ?
                    "Select or drag video files to upload" :
                    "Select video files to upload"
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
  },
  bannerMenu: {
    zIndex: 2,
  },
  dialogContent: {
  },
  snackbar: {
    position: 'absolute',
  }
});

class MultipleMediaDialog extends React.Component {
  state = {
    title: '',
    description: '',
    commentsEnabled: true,
    tagList: [],
    visibility: '',
    restriction: '',
    uploaded: false,
    complete: false,
    notificationOpen: false,
    notificationMessage: {},
    notificationKey: new Date().getTime(),
  }
  notificationsQueue = [];

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      this.setInitialValues();
    }
  }

  setInitialValues() {
    this.setState({
      visibility: '',
      restriction: '',
      uploaded: false,
      complete: false,
      notificationOpen: false,
      notificationMessage: {},
      notificationKey: new Date().getTime(),
    });
  }

  processNotificationQueue = () => {
    if (this.notificationsQueue.length > 0) {
      this.setState({
        notificationMessage: this.notificationsQueue.shift(),
        notificationOpen: true,
      });
    }
  };

  handleNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ notificationOpen: false });
  };

  handleNotificationExited = () => {
    this.processNotificationQueue();
  };

  render() {
    const { classes, uploadEnabled } = this.props;
    const { notificationOpen, notificationMessage } = this.state;
    const { notificationBody, notificationKey } = notificationMessage;

    return (
      <React.Fragment>
        <ResponsiveDialog
          open={this.props.open}
          onClose={this.props.onClose}
          disableBackdropClick={this.state.uploading}
          disableEscapeKeyDown={this.state.uploading}
        >
          <GlobalProgress absolute />
          <DialogTitle>Import multiple videos</DialogTitle>
          <DialogContent
            className={classes.dialogContent}
            style={{
              paddingTop: uploadEnabled ? 12 : 0
            }}
          >
            <DialogContentText variant="body2">
              {`Please select the default visibility and restriction settings you want to apply to all your videos. The name of each video file will be used as a title.`}
            </DialogContentText>
            <FormControl fullWidth margin={'dense'}>
              <InputLabel htmlFor="visibility-helper">Visibility</InputLabel>
              <Select
                disabled={this.state.uploading}
                value={this.state.visibility}
                onChange={(e) => {  this.setState({ visibility: e.target.value }) }}
                input={<Input name="visibility" id="visibility-helper" />}
              >
                <MenuItem value={'public'}>Public</MenuItem>
                <MenuItem value={'unlisted'}>Unlisted</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin={'dense'}>
              <InputLabel htmlFor="restriction-helper">Restriction</InputLabel>
              <Select
                disabled={this.state.uploading}
                value={this.state.restriction}
                onChange={(e) => { this.setState({ restriction: e.target.value }) }}
                input={<Input name="restriction" id="restriction-helper" />}
              >
                <MenuItem value={'none'}>No restriction</MenuItem>
                <MenuItem value={'registered'}>Registered users only</MenuItem>
                <MenuItem value={'content_producers'}>{`Other ${process.env.CONTENT_PRODUCERS_NAME} only`}</MenuItem>
              </Select>
            </FormControl>
            {
              this.state.visibility !== '' && this.state.restriction !== '' &&
              <Mutation mutation={CREATE_MEDIUM}>
                {
                  (createMedium, { called }) => {
                    return (
                      <DropZoneFieldWithStyle
                       onStart={() => {
                         this.setState({ uploading: true });
                       }}
                       onUploaded={(file, temporaryKey) => {
                         createMedium({
                           variables: {
                             input: {
                               title: processFileName(file),
                               description: this.state.description,
                               commentsDisabled: !this.state.commentsEnabled,
                               temporaryKey,
                               tagList: this.state.tagList,
                               visibility: this.state.visibility,
                               restriction: this.state.restriction,
                             }
                           }
                         });

                         this.notificationsQueue.push({
                           notificationBody: `${file.name} uploaded`,
                           notificationKey: new Date().getTime(),
                         });

                         if (this.state.notificationOpen) {
                           this.setState({ notificationOpen: false });
                         } else {
                           this.processNotificationQueue();
                         }
                       }}
                       onComplete={() => {
                         this.setState({ complete: true });
                       }}
                      />
                    )
                  }
                }
              </Mutation>
            }
          </DialogContent>
          <DialogActions>
            <Grid container spacing={0} justify="space-between">
              <Grid item>
              </Grid>
              <Grid item>
                <Button
                  disabled={this.state.uploading}
                  onClick={this.props.onClose}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!this.state.complete}
                  onClick={this.props.onClose}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
          <Snackbar
            key={notificationKey}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            className={classes.snackbar}
            open={notificationOpen}
            autoHideDuration={6000}
            onClose={this.handleNotificationClose}
            onExited={this.processNotificationQueue}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            TransitionComponent={Fade}
            message={<span id="message-id">{notificationBody}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleNotificationClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </ResponsiveDialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(MultipleMediaDialog));
