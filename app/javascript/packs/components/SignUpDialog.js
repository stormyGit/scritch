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
import SignUpAlternativeDialog from './SignUpAlternativeDialog';
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
    marginTop: theme.spacing.unit * 2,
    cursor: 'pointer',
  }
})

class SignUpDialog extends React.Component {
  state = {
    submiting: false,
    alternativeLogin: false,
  }

  handleTelegramResponse(response) {
    this.setState({ submiting: true });
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
    const { classes, open, onClose, loading, width } = this.props;

    return (
      <React.Fragment>
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
                      Login with Telegram
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
               <ListItemText inset primary={`You must be ${process.env.MINIMUM_AGE} or older to use ${process.env.SITE_NAME}.`} />
              </ListItem>
              <ListItem>
               <ListItemIcon>
                 <CheckIcon />
               </ListItemIcon>
               <ListItemText inset primary="Telegram will share your username, handle, avatar, bio and ID. Telegram will not share your phone number, contacts and messages." />
              </ListItem>
              <ListItem>
               <ListItemIcon>
                 <CheckIcon />
               </ListItemIcon>
               <ListItemText inset primary="A unique session identifier will be stored in your browser to keep you connected." />
              </ListItem>
            </List>
            {
              <div className={classes.loginButtonContainer}>
                <div className={classes.loginButton}>
                  {
                    !this.state.submiting && (process.env.NODE_ENV === 'production' ?
                      <TelegramLoginButton dataOnauth={(response) => this.handleTelegramResponse(response)} botName={`${process.env.TELEGRAM_BOT_NAME}`} /> :
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
                      </Button>)
                  }
                </div>
                <CircularProgress className={classes.telegramLoader} size={32} />
              </div>
            }
            {
              true &&
                <Typography
                  variant="caption"
                  className={classes.troubleLink}
                  onClick={() => this.setState({ alternativeLogin: true })}
                >
                  Having trouble signin in?
                </Typography>
            }
          </DialogContent>
        </ResponsiveDialog>
        <SignUpAlternativeDialog
          open={this.state.alternativeLogin}
          onClose={() => {
            this.setState({ alternativeLogin: false });
          }}
        />
      </React.Fragment>
    );
  }
}

const FormWithMutation = (props) => (
  <Mutation
    mutation={CREATE_SESSION}
  >
    {(createSession, { data, loading, called }) => {
      return (
        <SignUpDialog
          loading={loading}
          onSubmit={(input) => {
            createSession({ variables: { input } }).then(({ data: { createSession: { session }}}) => {
              localStorage.setItem('token', session.id);
              location.reload();
            })
          }}
          {...props}
        />
      );
    }}
  </Mutation>
)

export default withStyles(styles)(withRouter(withWidth()(FormWithMutation)));
