import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';
import TelegramLoginButton from 'react-telegram-login';
import { withRouter } from 'react-router-dom';

import ResponsiveDialog from './ResponsiveDialog';
import themeSelector from '../themeSelector';

import { Mutation, Query } from "react-apollo";

import Logo from './Logo';
import { CREATE_SESSION, GET_SESSION } from '../queries';

const styles = theme => ({
  brand: {
    textAlign: 'center'
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
  },
  telegramLoader: {
    position: 'absolute',
    left: '50%',
    top: 0,
    marginLeft: -16
  }
})

class SignUpDialog extends React.Component {
  handleTelegramResponse(response) {
    this.props.onSubmit({
      telegramId: response.id,
      telegramFirstName: response.first_name,
      telegramLastName: response.last_name,
      telegramUsername: response.username,
      telegramAuthDate: response.auth_date,
      telegramPhotoUrl: response.photo_url,
      telegramHash: response.hash
    });
  }

  render() {
    const { classes, open, onClose, loading } = this.props;

    return (
      <ResponsiveDialog
        open={open}
        onClose={onClose}
      >
        <DialogTitle className={classes.brand}>
          <Logo />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`We use `}
            <a href="https://telegram.org/blog/login" target="_blank" rel="noopener" className={classes.link}>Telegram Login for Websites</a>
            {` to allow users to easily sign-in without having to provide an email address and a password. Please note that:`}
          </DialogContentText>
          <List>
            <ListItem>
             <ListItemIcon>
               <CheckIcon />
             </ListItemIcon>
             <ListItemText inset primary={`You must be 18 or older to use ${process.env.SITE_NAME}.`} />
            </ListItem>
            <ListItem>
             <ListItemIcon>
               <CheckIcon />
             </ListItemIcon>
             <ListItemText inset primary="Telegram will share your name, username, avatar, bio and ID." />
            </ListItem>
            <ListItem>
             <ListItemIcon>
               <CheckIcon />
             </ListItemIcon>
             <ListItemText inset primary="Telegram will not share your phone number, contacts and messages." />
            </ListItem>
          </List>
          {
            <div className={classes.loginButtonContainer}>
              <div className={classes.loginButton}>
                {
                  process.env.NODE_ENV === 'production' ?
                    <TelegramLoginButton dataOnauth={(response) => this.handleTelegramResponse(response)} botName=`${process.env.TELEGRAM_BOT_NAME}}` /> :
                    <Button
                      onClick={() => {
                        this.handleTelegramResponse({
                          auth_date:1537829184,
                          first_name:"Coontail",
                          hash:"1c7bc6a02407b952d8c521f151b07a338834e62394e78ea5e5a1863e13c63993",
                          id:122117046,
                          photo_url:"https://t.me/i/userpic/320/Coontail.jpg",
                          username:"Coontail",
                        })
                      }}
                      variant="contained"
                    >
                      Login test
                    </Button>
                }
              </div>
              <CircularProgress className={classes.telegramLoader} size={32} />
            </div>
          }
        </DialogContent>
      </ResponsiveDialog>
    );
  }
}

const FormWithMutation = (props) => (
  <Mutation
    mutation={CREATE_SESSION}
    update={(cache, { data: { createSession } }) => {
      localStorage.setItem('token', createSession.session.id);
      cache.writeQuery({
        query: GET_SESSION,
        data: { session: createSession.session }
      });
      themeSelector(createSession.session.user.theme);
    }}
  >
    {(createSession, { data, loading, called }) => {
      return (
        <SignUpDialog
          loading={loading}
          onSubmit={(input) => {
            createSession({ variables: { input } }).then(({ data: { createSession: { session }}}) => {
              props.onClose();
            })
          }}
          {...props}
        />
      );
    }}
  </Mutation>
)

export default withStyles(styles)(withRouter(FormWithMutation));
