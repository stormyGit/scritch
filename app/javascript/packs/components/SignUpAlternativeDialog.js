import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import TelegramLoginButton from 'react-telegram-login';
import { withRouter } from 'react-router-dom';

import ResponsiveDialog from './ResponsiveDialog';
import themeSelector from '../themeSelector';

import { Mutation, Query } from "react-apollo";

import Logo from './Logo';
import { CREATE_SESSION, GET_SESSION } from '../queries';

const styles = theme => ({
  brand: {
    textAlign: 'center',
  },
  titleBarContainer: {
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 3
  },
  link: {
    color: theme.palette.text.primary
  },
  loginButtonContainer: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 2,
    position: 'relative',
  },
  loginButton: {
    zIndex: 1,
    position: 'relative',
    minHeight: 48
  },
  telegramLoader: {
    position: 'absolute',
    left: '50%',
    top: 0,
    marginLeft: -16
  },
  troubleLink: {
    textAlign: 'center',
    textDecoration: 'underline',
    marginTop: theme.spacing.unit * 2
  }
})

class SignUpAlternativeDialog extends React.Component {
  state = {
    submiting: false,
  }

  render() {
    const { classes, open, onClose, loading, width } = this.props;

    return (
      <ResponsiveDialog
        open={open}
        onClose={onClose}
      >
        <DialogContent>
        </DialogContent>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(withRouter(withWidth()(SignUpAlternativeDialog)));
