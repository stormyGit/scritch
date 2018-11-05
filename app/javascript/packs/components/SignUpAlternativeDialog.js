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
import TextField from '@material-ui/core/TextField';

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
  telegramLoader: {
    marginTop: theme.spacing.unit * 4,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block'
  },
})

class SignUpAlternativeDialog extends React.Component {
  state = {
    submiting: false,
    sessionId: ''
  }

  render() {
    const { classes, open, onClose, loading, width } = this.props;

    return (
      <ResponsiveDialog
        open={open}
        onClose={onClose}
      >
        {
          (width !== 'lg' && width !== 'xl' || true) &&
            <DialogTitle
              className={classes.titleBarContainer}
            >
              <Grid container spacing={0} alignItems="center" justify="space-between">
                <Grid item>
                  <Typography variant="h6" noWrap color={"inherit"}>
                    {`Login with ${process.env.SITE_NAME} Telegram Bot`}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton color="inherit" onClick={onClose} aria-label="Close">
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </DialogTitle>
        }
        <DialogContent>
          <List>
            <ListItem>
             <ListItemIcon>
               <CheckIcon />
             </ListItemIcon>
             <ListItemText inset primary={
               <span>
                <span>{`Start a conversation with our `}</span>
                <a className={classes.link} href={`https://t.me/${process.env.TELEGRAM_BOT_NAME}?start=start`} target="_blank">Telegram bot</a>
                <span>.</span>
              </span>
             } />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                 <CheckIcon />
               </ListItemIcon>
               <ListItemText inset primary="Copy and paste the code given by the bot in the box below." />
              </ListItem>
            <ListItem>
              <TextField
                label="Code"
                name="code"
                variant="outlined"
                value={this.state.sessionId}
                onChange={(e) => {
                  this.setState({ sessionId: e.target.value });
                  const v4 = new RegExp(/([0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})/i);
                  if (e.target.value.match(v4)) {
                    localStorage.setItem('token', e.target.value.match(v4)[1].toLowerCase());
                    location.reload();
                  }
                }}
                margin="dense"
                fullWidth
              />
            </ListItem>
          </List>
        </DialogContent>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(withRouter(withWidth()(SignUpAlternativeDialog)));
