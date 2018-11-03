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

import withWidth from '@material-ui/core/withWidth';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CircularProgress from '@material-ui/core/CircularProgress';

import ChipInput from 'material-ui-chip-input'

import { withRouter } from 'react-router-dom'
import Dropzone from 'react-dropzone';

import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

import { withStyles } from '@material-ui/core/styles';
import ResponsiveDialog from './ResponsiveDialog';
import MediumDeletionDialog from './MediumDeletionDialog';
import fileUploadService from '../fileUploadService';
import GlobalProgress from './GlobalProgress';
import MultipleMediaDialog from './MultipleMediaDialog';
import InteractiveTextInput from './InteractiveTextInput';

import { CREATE_MEDIUM, GET_MEDIUM, UPDATE_MEDIUM } from '../queries';

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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  uploadIcon: {
    fontSize: "4em"
  },
  progress: {
    color: "white",
  },
});

class DropZoneField extends React.Component {
  state = {
    progress: null,
    disabled: false
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

  handleDrop(file) {
    if (this.state.disabled) {
      return ;
    }

    this.evaporate.then((evaporate) => {
      evaporate.add({
        file: file,
        name: uuidv4(),
        progress: (p, stats) => {
          this.setState({ progress: stats });
        }
      }).then((temporary_key) => {
        this.props.onChange(temporary_key);
      });
    });
    this.setState({ disabled: true });
  }

  render() {
    const { classes, width } = this.props;

    return (
      <Dropzone
        multiple={false}
        className={classes.root}
        style={{
          height: width === 'lg' || width === 'xl' ? 220 : 130,
          pointerEvents: this.state.disabled ? 'none' : 'auto',
          cursor: this.state.disabled ? 'not-allowed' : 'pointer',
        }}
        accept="video/mp4,video/x-m4v,video/*,video/quicktime"
        onDrop={(files) => this.handleDrop(files[0])}
      >
        {
          this.state.progress && this.state.progress.remainingSize === 0 &&
            <div>
              <Typography variant="h6" color="inherit" noWrap>
                File uploaded
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
            </div>
        }
        {
          !this.state.progress &&
            <div>
              <CloudUploadIcon
                className={classes.uploadIcon}
                style={{
                  marginBottom: width === 'lg' || width === 'xl' ? 16 : 0
                }}
              />
              <Typography variant="h6" color="inherit" noWrap>
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
  },
  bannerMenu: {
    zIndex: 2,
  },
  dialogContent: {
  },
  chipInput: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
  },
  link: {
    color: theme.palette.text.primary,
  }
});

class EditMediumDialog extends React.Component {
  state = {
    mediumDeletion: false,
    title: '',
    description: '',
    commentsEnabled: true,
    shareOnTwitter: true,
    tagList: [],
    temporaryKey: null,
    visibility: 'public',
    restriction: 'none',
    multipleMedia: false
  }

  componentDidMount() {
    this.setInitialValues(this.props.medium);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      this.setInitialValues(nextProps.medium);
    }
  }

  setInitialValues(medium) {
    this.setState({
      id: medium.id,
      title: medium.title,
      description: medium.description,
      commentsEnabled: !medium.commentsDisabled,
      shareOnTwitter: true,
      tagList: medium.tagList,
      visibility: medium.visibility,
      restriction: medium.restriction,
    });
  }

  render() {
    const { classes, medium, uploadEnabled, width } = this.props;

    return (
      <React.Fragment>
        <ResponsiveDialog
          open={this.props.open}
          onClose={this.props.onClose}
        >
          <GlobalProgress absolute />
          {
            medium.id && <DialogTitle>{medium.title}</DialogTitle>
          }
          <DialogContent
            className={classes.dialogContent}
            style={{
              paddingTop: uploadEnabled ? 12 : 0,
              marginTop: medium.id ? 0 : 16,
            }}
          >
            {
              uploadEnabled &&
              <React.Fragment>
                 <DropZoneFieldWithStyle
                  onChange={(temporaryKey) => {
                    this.setState({ temporaryKey });
                  }}
                 />
                 <DialogContentText variant="body2">
                  {`Please do not publish content that doesn't belong to you and do not publish videos of other ${process.env.CONTENT_PRODUCERS_NAME} without their authorization.`}
                 </DialogContentText>
              </React.Fragment>
            }
            <TextField
              label="Title"
              name="title"
              value={this.state.title}
              onChange={(e) => this.setState({ title: e.target.value })}
              margin="dense"
              fullWidth
            />
            <InteractiveTextInput
              label="Description"
              name="description"
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
              margin="dense"
              fullWidth
              multiline
              rows={3}
              rowsMax={12}
            />
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

            <FormControl fullWidth margin={'dense'}>
              <InputLabel htmlFor="visibility-helper">Visibility</InputLabel>
              <Select
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
                value={this.state.restriction}
                onChange={(e) => { this.setState({ restriction: e.target.value }) }}
                input={<Input name="restriction" id="restriction-helper" />}
              >
                <MenuItem value={'none'}>No restriction</MenuItem>
                <MenuItem value={'registered'}>Registered users only</MenuItem>
                <MenuItem value={'content_producers'}>{`Other ${process.env.CONTENT_PRODUCERS_NAME} only`}</MenuItem>
              </Select>
            </FormControl>
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
              !medium.id && process.env.TWITTER_ACCOUNT &&
                <FormControlLabel
                  margin={'dense'}
                  control={
                    <Switch
                      disabled={this.state.restriction !== 'none' || this.state.visibility !== 'public'}
                      checked={this.state.shareOnTwitter && this.state.restriction === 'none' && this.state.visibility === 'public'}
                      onChange={() => {
                        this.setState({ shareOnTwitter: !this.state.shareOnTwitter })
                      }}
                      color="primary"
                    />
                  }
                  label={
                    <span>
                      <span>{`Share on `}</span>
                      <a className={classes.link} target="_blank" href={`https://twitter.com/${process.env.TWITTER_ACCOUNT}`}>{`@${process.env.TWITTER_ACCOUNT}`}</a>
                      <span>{` Twitter feed`}</span>
                    </span>
                  }
                />
            }
          </DialogContent>
          <DialogActions>
            <Grid container spacing={0} justify="space-between">
              <Grid item>
                {
                  medium.id ?
                    <Button
                      color="secondary"
                      onClick={() => this.setState({ mediumDeletion: true })}
                    >
                      Delete video
                    </Button> :
                      (true &&
                        <Button
                          onClick={() => {
                            this.setState({ multipleMedia: true });
                            if (width === 'xl' || width === 'lg') {
                              this.props.onClose();
                            }
                          }}
                        >
                          Import multiple videos
                        </Button>
                    )
                }
              </Grid>
              <Grid item>
                <Button onClick={this.props.onClose}>
                  Cancel
                </Button>
                {
                  medium.id ?
                    <Mutation
                      mutation={UPDATE_MEDIUM}
                      update={(cache, { data: { updateMedium } }) => {
                        cache.writeQuery({
                          query: GET_MEDIUM,
                          variables: { id: medium.id },
                          data: { medium: updateMedium.medium }
                        });
                      }}
                    >
                      {( updateMedium, { data }) => (
                        <Button
                          disabled={!this.state.title || /^\s*$/.test(this.state.title)}
                          onClick={() => {
                            updateMedium({
                              variables: {
                                input: {
                                  id: medium.id,
                                  title: this.state.title,
                                  description: this.state.description,
                                  commentsDisabled: !this.state.commentsEnabled,
                                  tagList: this.state.tagList,
                                  visibility: this.state.visibility,
                                  restriction: this.state.restriction,
                                }
                              }
                            }).then(() => {
                              this.props.onClose()
                            })
                          }}
                        >
                          Save
                        </Button>
                      )}
                    </Mutation> :
                    <Mutation mutation={CREATE_MEDIUM}>
                      {
                        (createMedium, { called }) => {
                          if (called) {
                            return (
                              <Dialog
                                open
                                onClose={() => this.props.onClose()}
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
                                  <Button onClick={() => this.props.onClose()}>
                                    Close
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            );
                          }
                          return (
                            <Button
                              disabled={!this.state.title || /^\s*$/.test(this.state.title) || !this.state.temporaryKey}
                              onClick={() => {
                                createMedium({
                                  variables: {
                                    input: {
                                      title: this.state.title,
                                      description: this.state.description,
                                      commentsDisabled: !this.state.commentsEnabled,
                                      shareOnTwitter: this.state.shareOnTwitter && this.state.restriction === 'none' && this.state.visibility === 'public',
                                      temporaryKey: this.state.temporaryKey,
                                      tagList: this.state.tagList,
                                      visibility: this.state.visibility,
                                      restriction: this.state.restriction,
                                    }
                                  }
                                });
                              }}
                            >
                              Submit
                            </Button>
                          )
                        }
                      }
                    </Mutation>
                }
              </Grid>
            </Grid>
          </DialogActions>
        </ResponsiveDialog>
        <MediumDeletionDialog
          medium={medium}
          open={this.state.mediumDeletion}
          onClose={() => this.setState({ mediumDeletion: false })}
          onDelete={() => {
            this.setState({ mediumDeletion: false });
            this.props.onClose();
            this.props.history.push({
              pathname: '/'
            });
          }}
        />
        <MultipleMediaDialog
          open={this.state.multipleMedia}
          onClose={() => {
            this.setState({ multipleMedia: false });
            this.props.onClose();
          }}
          onSubmit={() => {
            this.setState({ mediumDeletion: false });
            this.props.history.push({
              pathname: '/'
            });
            this.props.onClose();
          }}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  withRouter(
    withWidth()(EditMediumDialog)
  )
);
