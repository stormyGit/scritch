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

import ChipInput from 'material-ui-chip-input'

import { withRouter } from 'react-router-dom'

import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

import { withStyles } from '@material-ui/core/styles';
import ResponsiveDialog from './ResponsiveDialog';
import MediumDeletionDialog from './MediumDeletionDialog';
import GlobalProgress from './GlobalProgress';
import InteractiveTextInput from './InteractiveTextInput';

import { GET_MEDIUM, UPDATE_MEDIUM } from '../queries';

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
              paddingTop: 0,
              marginTop: medium.id ? 0 : 16,
            }}
          >
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
          </DialogContent>
          <DialogActions>
            <Grid container spacing={0} justify="space-between">
              <Grid item>
                <Button
                  color="secondary"
                  onClick={() => this.setState({ mediumDeletion: true })}
                >
                  Delete picture
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={this.props.onClose}>
                  Cancel
                </Button>
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
                              shareOnTwitter: this.state.shareOnTwitter,
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

export default withStyles(styles)(
  withRouter(
    withWidth()(EditMediumDialog)
  )
);
