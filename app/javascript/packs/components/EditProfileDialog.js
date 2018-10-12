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

import { Parallax, Background } from 'react-parallax';

import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

import { withStyles } from '@material-ui/core/styles';
import ResponsiveDialog from './ResponsiveDialog';
import BannerPlaceholder from './BannerPlaceholder';
import ProfileAvatar from './ProfileAvatar';
import GlobalProgress from './GlobalProgress';

import { GET_SESSION, UPDATE_USER } from '../queries';

const AVATAR_SIZE = 96

const styles = theme => ({
  bannerMenu: {
    zIndex: 4,
  },
  dialogContent: {
    marginTop: theme.spacing.unit * 2,
  },
  editBannerButton: {
    width: '100%',
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
  },
  uploadInput: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    margin: 0,
    padding: 0,
    opacity: 0,
    width: 1,
    height: 1,
  },
  bannerImageWide: {
    top: '-50%'
  },
  avatarContainer: {
    // paddingTop: theme.spacing.unit * 4
    // marginTop: AVATAR_SIZE / -2 + theme.spacing.unit,
    // zIndex: 2,
    marginTop: theme.spacing.unit * 3
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

class EditProfileDialog extends React.Component {
  state = {
    name: '',
    bio: '',
    website: '',
    banner: null,
    avatar: null,
    bannerMenu: false,
    avatarMenu: false,
    bannerHeight: 0,
  }

  constructor(props) {
    super(props);
    this.bannerUploadInput = React.createRef();
    this.avatarUploadInput = React.createRef();
    this.bannerRef = React.createRef();
  }

  componentDidMount() {
    this.setInitialValues(this.props.user);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      this.setInitialValues(nextProps.user);
    }
  }

  setInitialValues(user) {
    this.setState({
      id: user.id,
      name: user.name,
      bio: user.bio,
      website: user.website,
      banner: user.banner,
      avatar: user.avatar
    });
  }

  renderBanner() {
    const { user, classes } = this.props;

    if (!this.state.bannerHeight) {
      return (null);
    }

    return (
      <React.Fragment>
        <Button
          className={classes.editBannerButton}
          style={{
            height: this.state.bannerHeight
          }}
          onClick={() => this.setState({ bannerMenu: true })}
        >
          <div id="uploadBannerButton" className={classes.infoText}>
            <InsertPhotoIcon className={classes.editBannerIcon} />
            Change banner
          </div>
        </Button>
        <Popper open={this.state.bannerMenu} anchorEl={document.getElementById("uploadBannerButton")} transition disablePortal className={classes.bannerMenu}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={() => this.setState({ bannerMenu: false })}>
                  <MenuList disablePadding>
                    <MenuItem
                      className={classes.menuButton}
                      onClick={() => {
                        this.bannerUploadInput.current.click();
                        this.setState({ bannerMenu: false })
                      }}
                    >
                      Upload picture
                    </MenuItem>
                    <MenuItem
                      className={classes.menuButton}
                      onClick={() => {
                        this.setState({ banner: null, removeBanner: true, bannerMenu: false });
                      }}
                    >
                      Remove
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      className={classes.menuButton}
                      onClick={() => this.setState({ bannerMenu: false })}
                    >
                      Cancel
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <input
          className={classes.uploadInput}
          ref={this.bannerUploadInput}
          type="file"
          onChange={(e) => {
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
              this.setState({ banner: reader.result, removeBanner: false });
            };
          }}
        />
        {
          this.state.banner ?
            <Parallax
              bgImage={this.state.banner}
              strength={300}
              bgClassName={classes.bannerImageWide}
            >
              <div style={{ height: this.state.bannerHeight, width: '100%' }} />
            </Parallax> :
            <BannerPlaceholder
              className={classes.placeholderBanner}
              style={{
                height: this.state.bannerHeight
              }}
              length={90}
              slug={user.slug}
            />
        }
      </React.Fragment>
    );
  }

  renderAvatar() {
    const { user, classes } = this.props;

    return (
      <React.Fragment>
        <Button
          className={classes.editAvatarButton}
          onClick={() => this.setState({ avatarMenu: true })}
        >
          <div id="uploadAvatarButton">
            <InsertPhotoIcon />
          </div>
        </Button>
        <Popper open={this.state.avatarMenu} anchorEl={document.getElementById("uploadAvatarButton")} transition disablePortal className={classes.bannerMenu}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={() => this.setState({ avatarMenu: false })}>
                  <MenuList disablePadding>
                    <MenuItem
                      className={classes.menuButton}
                      onClick={() => {
                        this.avatarUploadInput.current.click();
                        this.setState({ avatarMenu: false })
                      }}
                    >
                      Upload picture
                    </MenuItem>
                    <MenuItem
                      className={classes.menuButton}
                      onClick={() => {
                        this.setState({ avatar: null, removeAvatar: true, avatarMenu: false });
                      }}
                    >
                      Remove
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      className={classes.menuButton}
                      onClick={() => this.setState({ avatarMenu: false })}
                    >
                      Cancel
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <input
          className={classes.uploadInput}
          ref={this.avatarUploadInput}
          type="file"
          onChange={(e) => {
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
              this.setState({ avatar: reader.result, removeAvatar: false });
            };
          }}
        />
        <ProfileAvatar avatar={this.state.avatar} slug={user.slug} className={classes.userAvatar} size={AVATAR_SIZE} />
      </React.Fragment>
    );
  }

  render() {
    const { classes, user } = this.props;

    return (
      <ResponsiveDialog
        open={this.props.open}
        onClose={this.props.onClose}
        onEntered={() => {
          this.setState({ bannerHeight: this.bannerRef.current.offsetWidth * 0.33 })
        }}
      >
        <GlobalProgress absolute />
        <div ref={this.bannerRef}>
          {this.renderBanner()}
        </div>
        <Grid container justify="center" className={classes.avatarContainer}>
          <Grid item>
            {this.renderAvatar()}
          </Grid>
        </Grid>
        <DialogContent className={classes.dialogContent}>
          <TextField
            label="Name"
            name="name"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
            margin="dense"
            fullWidth
          />
          <TextField
            label="Bio"
            name="bio"
            value={this.state.bio}
            onChange={(e) => this.setState({ bio: e.target.value })}
            margin="dense"
            fullWidth
          />
          <TextField
            label="Website"
            name="website"
            value={this.state.website}
            onChange={(e) => this.setState({ website: e.target.value })}
            margin="dense"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>
            Cancel
          </Button>
          <Mutation
            mutation={UPDATE_USER}
            update={(cache, { data: { updateUser } }) => {
              const { session } = cache.readQuery({ query: GET_SESSION });
              cache.writeQuery({
                query: GET_SESSION,
                data: { session: { ...session, user: updateUser.user } }
              });
            }}
          >
            {( updateUser, { data }) => (
              <Button
                disabled={!this.state.name || /^\s*$/.test(this.state.name)}
                onClick={() => {
                  updateUser({
                    variables: {
                      input: {
                        id: user.id,
                        name: this.state.name,
                        bio: this.state.bio,
                        website: this.state.website,
                        banner: this.state.banner,
                        avatar: this.state.avatar,
                        removeBanner: this.state.removeBanner,
                        removeAvatar: this.state.removeAvatar,
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
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(EditProfileDialog);
