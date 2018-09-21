import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
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
import TelegramLoginButton from 'react-telegram-login';
import GlobalProgress from './GlobalProgress';

import { Mutation, Query } from "react-apollo";

import Logo from './Logo';
import { CREATE_SESSION, GET_SIGNUP_DIALOG, TOGGLE_SIGNUP_DIALOG, GET_SESSION } from '../queries';

const styles = theme => ({
  brand: {
    textAlign: 'center'
  },
  link: {
    color: theme.palette.text.primary
  },
  loginButton: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 2
  }
})

class SignUpDialog extends React.Component {
  handleTelegramResponse(response) {
    this.props.onSubmit({
      telegramId: response.id,
      telegramFirstName: response.first_name,
      telegramLastName: response.last_name,
      telegramUserName: response.username,
      telegramAuthDate: response.auth_date,
      telegramHash: response.hash
    });
  }

  render() {
    const { classes, open, handleClose, loading } = this.props;

    return (
      <Dialog
        open={open}
        onClose={handleClose}
      >
        {loading && <GlobalProgress />}
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
             <ListItemText inset primary="Telegram will share your first name, avatar, bio and ID." />
            </ListItem>
            <ListItem>
             <ListItemIcon>
               <CheckIcon />
             </ListItemIcon>
             <ListItemText inset primary="Telegram will not share your username, phone number, contacts and messages." />
            </ListItem>
          </List>
          {
            process.env.NODE_ENV === 'production' ?
              <div className={classes.loginButton}>
                <TelegramLoginButton dataOnauth={(response) => this.handleTelegramResponse(response)} botName="MurrtubeBot" />
              </div> :
              <Button
                onClick={() => this.handleTelegramResponse({id: 643777772, first_name: "Ananas Wilson", auth_date: 1537534591, hash: "cf517b52ba9d93947ded4c24a7ffeb9480fd90a716b223e001078930fa220ebf"})}
                variant="contained"
              >
                Login test
              </Button>
          }
        </DialogContent>
      </Dialog>
    );
  }
}

const FormWithMutation = (props) => (
  <Query query={GET_SIGNUP_DIALOG}>
    {({ data: { isSignupDialogOpen }, loading }) => (
      <Mutation mutation={TOGGLE_SIGNUP_DIALOG}>
        {(toggleSignupDialog) => (
          <Mutation
            mutation={CREATE_SESSION}
            update={(cache, { data: { createSession } }) => {
              const { session } = cache.readQuery({ query: GET_SESSION });
              cache.writeQuery({
                query: GET_SESSION,
                data: { session: createSession.session }
              });
              cache.writeData({
                data: { sessionToken: createSession.session.id }
              });
            }}
          >
            {(createSession, { data, loading, called }) => {
              return (
                <SignUpDialog
                  loading={loading}
                  onSubmit={(input) => createSession({ variables: { input } })} open={isSignupDialogOpen}
                  handleClose={() => toggleSignupDialog({ variables: { isSignupDialogOpen: false }})}
                  {...props}
                />
              );
            }}
          </Mutation>
        )}
      </Mutation>
    )}
  </Query>
)

export default withStyles(styles)(FormWithMutation);
