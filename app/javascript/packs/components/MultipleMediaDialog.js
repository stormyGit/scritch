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
  },
});

const processFileName = (file) => (
  file.name
   .replace(/\.[^.]+$/, '')
   .replace(/[^a-zA-Z0-9]+/, ' ')
   .split(' ').filter((word) => word.length > 0)
   .map(word => word.charAt(0).toUpperCase() + word.slice(1))
   .join(' ')
)

class DropZoneField extends React.Component {
  state = {
    progress: null,
    disabled: false,
    file: null,
    uploaded: false
  }

  handleDrop(files) {
    if (this.state.disabled) {
      return ;
    }

    const pushFile = (index) => {
      this.setState({ file: files[index], uploading: true })

      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.props.onLoaded(files[index], reader.result).then(() => {
          if (files[index + 1]) {
            pushFile(index + 1);
          } else {
            this.setState({ uploaded: true, uploading: false })
            this.props.onComplete();
          }
        });
      });
      reader.readAsDataURL(files[index]);
    }
    pushFile(0);
    this.setState({ disabled: true });
    this.props.onStart();
  }

  render() {
    const { classes, width } = this.props;

    return (
      <Dropzone
        multiple={true}
        className={classes.root}
        accept="image/png,image/x-png,image/jpeg"
        style={{
          height: width === 'lg' || width === 'xl' ? 220 : 130,
          pointerEvents: this.state.disabled ? 'none' : 'auto',
          cursor: this.state.disabled ? 'not-allowed' : 'pointer',
        }}
        onDrop={(files) => this.handleDrop(files)}
      >
        {
          this.state.uploaded &&
            <div>
              <Typography variant="h6" color="inherit" noWrap>
                All pictures were successfuly imported
              </Typography>
            </div>
        }
        {
          this.state.uploading &&
            <div>
              <CircularProgress
                className={classes.progress}
                style={{
                  marginBottom: width === 'lg' || width === 'xl' ? 16 : 0
                }}
              />
              <Typography variant="caption" color="inherit" noWrap>
                {
                  this.state.file.name
                }
              </Typography>
            </div>
        }
        {
          !this.state.uploaded && !this.state.uploading &&
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
                    "Select or drag picture files to upload" :
                    "Select picture files to upload"
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
  link: {
    color: theme.palette.text.primary,
  },
  chipInput: {
    marginBottom: theme.spacing.unit * 2,
  },

});

class MultipleMediaDialog extends React.Component {
  state = {
    title: '',
    description: '',
    commentsEnabled: true,
    shareOnTwitter: true,
    tagList: [],
    uploaded: false,
    complete: false,
    uploading: false,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      this.setInitialValues();
    }
  }

  setInitialValues() {
    this.setState({
      uploaded: false,
      complete: false,
      uploading: false,
    });
  }

  render() {
    const { classes, uploadEnabled } = this.props;

    return (
      <React.Fragment>
        <ResponsiveDialog
          open={this.props.open}
          onClose={this.props.onClose}
          disableBackdropClick={this.state.uploading}
          disableEscapeKeyDown={this.state.uploading}
        >
          <DialogTitle>Upload pictures</DialogTitle>
          <DialogContent
            className={classes.dialogContent}
          >
            <ChipInput
              fullWidth
              label="Tags"
              newChipKeyCodes={[13, 188, 32]}
              InputProps={{
                margin: "dense"
              }}
              defaultValue={this.state.tagList}
              onChange={(tagList) => { this.setState({ tagList }) }}
              className={classes.chipInput}
            />
            <FormControlLabel
              margin={'dense'}
              control={
                <Switch
                  checked={this.state.commentsEnabled}
                  onChange={() => {
                    this.setState({ commentsEnabled: !this.state.commentsEnabled })
                  }}
                  color="primary"
                />
              }
              label={this.state.commentsEnabled ? "Comments enabled" : "Comments disabled"}
            />
            {
              <Mutation mutation={CREATE_MEDIUM}>
                {
                  (createMedium, { called }) => {
                    return (
                      <DropZoneFieldWithStyle
                       onStart={() => {
                         this.setState({ uploading: true });
                       }}
                       onLoaded={(file, result) => (
                         createMedium({
                           variables: {
                             input: {
                               title: processFileName(file),
                               description: this.state.description,
                               commentsDisabled: !this.state.commentsEnabled,
                               shareOnTwitter: this.state.shareOnTwitter,
                               picture: result,
                               tagList: this.state.tagList,
                             }
                           }
                         })
                       )}
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
        </ResponsiveDialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(MultipleMediaDialog));
