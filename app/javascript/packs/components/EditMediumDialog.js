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
import withWidth from '@material-ui/core/withWidth';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CircularProgress from '@material-ui/core/CircularProgress';

import ChipInput from 'material-ui-chip-input'

import { withRouter } from 'react-router-dom'
import Dropzone from 'react-dropzone';

import { Parallax, Background } from 'react-parallax';

import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

import { withStyles } from '@material-ui/core/styles';
import ResponsiveDialog from './ResponsiveDialog';
import BannerPlaceholder from './BannerPlaceholder';
import ProfileAvatar from './ProfileAvatar';
import MediumDeletionDialog from './MediumDeletionDialog';
import fileUploadService from '../fileUploadService';
import GlobalProgress from './GlobalProgress';

import { CREATE_MEDIUM, GET_MEDIUM, UPDATE_MEDIUM } from '../queries';

const BANNER_HEIGHT = '200px';
const AVATAR_SIZE = 96

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
    color: "white",
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
        this.props.onChange(temporary_key);
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
  },
  bannerMenu: {
    zIndex: 2,
  },
  dialogContent: {
    marginTop: theme.spacing.unit * 2,
  },
  editBannerButton: {
    width: '100%',
    height: BANNER_HEIGHT,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1,
    borderRadius: 0,
  },
  editAvatarButton: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1,
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    color: "white"
  },
  menuButton: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    justifyContent: 'center'
  },
  placeholderBanner: {
    width: '100%',
    height: BANNER_HEIGHT,
  },
  uploadInput: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    margin: 0,
    padding: 0,
    opacity: 0
  },
  bannerImageWide: {
    top: '-50%'
  },
  avatarContainer: {
    // paddingTop: theme.spacing.unit * 4
    marginTop: AVATAR_SIZE / -2 + theme.spacing.unit,
    zIndex: 2,
  },
  editBannerIcon: {
    display: 'block',
    fontSize: '4em',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing.unit,
    color: "white"
  },
  infoText: {
    color: 'white'
  },
  chipInput: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
  }
});

class EditMediumDialog extends React.Component {
  state = {
    mediumDeletion: false,
    title: '',
    description: '',
    commentsDisabled: false,
    tagList: [],
    temporaryKey: null,
  }

  componentDidMount() {
    this.setInitialValues(this.props.medium);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.medium !== nextProps.medium) {
      this.setInitialValues(nextProps.medium);
    }
  }

  setInitialValues(medium) {
    this.setState({
      id: medium.id,
      title: medium.title,
      description: medium.description,
      commentsDisabled: medium.commentsDisabled,
      tagList: medium.tagList,
    });
  }

  render() {
    const { classes, medium, uploadEnabled } = this.props;

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
              paddingTop: uploadEnabled ? 12 : 0
            }}
          >
            {
              uploadEnabled &&
               <DropZoneFieldWithStyle
                onChange={(temporaryKey) => {
                  this.setState({ temporaryKey });
                }}
               />
            }
            <TextField
              label="Title"
              name="title"
              value={this.state.title}
              onChange={(e) => this.setState({ title: e.target.value })}
              margin="dense"
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
              margin="dense"
              fullWidth
              multiline
              rows={4}
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
              onChange={(tagList) => { console.log(tagList); this.setState({ tagList }) }}
              className={classes.chipInput}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.commentsDisabled}
                  onChange={() => {
                    this.setState({ commentsDisabled: !this.state.commentsDisabled })
                  }}
                  color="primary"
                />
              }
              label="Disable comments"
            />
          </DialogContent>
          <DialogActions>
            <Grid container spacing={0} justify="space-between">
              <Grid item>
                {
                  medium.id &&
                    <Button
                      color="secondary"
                      onClick={() => this.setState({ mediumDeletion: true })}
                    >
                      Delete video
                    </Button>
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
                        const { session } = cache.readQuery({ query: GET_MEDIUM, variables: { id: medium.id } });
                        cache.writeQuery({
                          query: GET_MEDIUM,
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
                                  commentsDisabled: this.state.commentsDisabled,
                                  tagList: this.state.tagList,
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
                                      commentsDisabled: this.state.commentsDisabled,
                                      temporaryKey: this.state.temporaryKey,
                                      tagList: this.state.tagList,
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
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(EditMediumDialog));
