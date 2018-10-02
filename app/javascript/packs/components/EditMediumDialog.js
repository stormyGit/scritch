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
import { withRouter } from 'react-router-dom'

import { Parallax, Background } from 'react-parallax';

import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

import { withStyles } from '@material-ui/core/styles';
import ResponsiveDialog from './ResponsiveDialog';
import BannerPlaceholder from './BannerPlaceholder';
import ProfileAvatar from './ProfileAvatar';
import MediumDeletionDialog from './MediumDeletionDialog';

import { GET_MEDIUM, UPDATE_MEDIUM } from '../queries';

const BANNER_HEIGHT = '200px';
const AVATAR_SIZE = 96

const styles = theme => ({
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
  }
});

class EditMediumDialog extends React.Component {
  state = {
    mediumDeletion: false,
    title: '',
    description: ''
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
    });
  }

  render() {
    const { classes, medium } = this.props;

    return (
      <React.Fragment>
        <ResponsiveDialog
          open={this.props.open}
          onClose={this.props.onClose}
        >
          <DialogTitle>{medium.title}</DialogTitle>
          <DialogContent className={classes.dialogContent}>
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
          </DialogContent>
          <DialogActions>
            <Grid container spacing={0} justify="space-between">
              <Grid item>
                <Button
                  color="secondary"
                  onClick={() => this.setState({ mediumDeletion: true })}
                >
                  Delete video
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={this.props.onClose}>
                  Cancel
                </Button>
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
                </Mutation>
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
