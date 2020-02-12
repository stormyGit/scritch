import React from "react";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckIcon from "@material-ui/icons/Check";
import WarningIcon from "@material-ui/icons/Warning";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import TelegramLoginButton from "react-telegram-login";
import { withRouter } from "react-router-dom";

import ResponsiveDialog from "../Global/ResponsiveDialog";
import SignUpAlternativeDialog from "./SignUpAlternativeDialog";

import { Mutation } from "react-apollo";

import { CREATE_SESSION } from "../../queries/globalQueries";

const styles = theme => ({
  brand: {
    textAlign: "center"
  },
  titleBarContainer: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(3)
  },
  link: {
    color: theme.palette.text.primary
  },
  loginButtonContainer: {
    textAlign: "center",
    marginTop: theme.spacing(2),
    position: "relative"
  },
  loginButton: {
    zIndex: 1,
    position: "relative",
    minHeight: 48
  },
  telegramLoader: {
    position: "absolute",
    left: "50%",
    top: 0,
    marginLeft: -16
  },
  troubleLink: {
    textAlign: "center",
    textDecoration: "underline",
    marginTop: theme.spacing(2),
    cursor: "pointer"
  },
  blurb: {
    fontWeight: 200
  },
  warning: {
    color: theme.palette.danger.main
  }
});

class SignUpDialog extends React.Component {
  state = {
    submiting: false,
    alternativeLogin: false
  };

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
        {((width !== "lg" && width !== "xl") || true) && (
          <DialogTitle className={classes.titleBarContainer}>
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
        )}
        <DialogContent>
          <div className={classes.loginButtonContainer}>
            <div className={classes.loginButton}>
              <Button onClick={this.props.onGoBack} variant="outlined">
                Go Back
              </Button>
            </div>
          </div>
          <br />
          <DialogContentText>
            <Typography variant="h6" className={classes.blurb}>
              {`Scritch utilises `}
              <a
                href="https://telegram.org/blog/login"
                target="_blank"
                rel="noopener"
                className={classes.link}
              >
                Telegram Login for Websites
              </a>
              {` to allow users to easily sign-in without having to provide an email address and password.`}
            </Typography>
            <br />
            <Typography variant="h6" className={classes.blurb}>
              Please note that:
            </Typography>
          </DialogContentText>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText
                inset
                primary="Telegram will share your username, handle, avatar, bio and ID."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText
                inset
                primary="Telegram will not share your phone number, contacts and messages."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText
                inset
                primary="A unique session identifier will be stored in your browser to keep you connected."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon classes={{ root: classes.warning }}>
                <WarningIcon />
              </ListItemIcon>
              <ListItemText
                inset
                classes={{ primary: classes.warning }}
                primary="Telegram uses Cookies to log you in. Please make sure that Third-Party Cookies are not blocked on your browser."
              />
            </ListItem>
          </List>
          {
            <div className={classes.loginButtonContainer}>
              <div className={classes.loginButton}>
                {!this.state.submiting &&
                  (process.env.NODE_ENV === "production" ? (
                    <TelegramLoginButton
                      dataOnauth={response => this.handleTelegramResponse(response)}
                      botName={`${process.env.TELEGRAM_BOT_NAME}`}
                    />
                  ) : (
                    <Button
                      onClick={() => {
                        this.handleTelegramResponse({
                          auth_date: 123456789,
                          first_name: "Test",
                          hash: "1c7bc6a02407b952d8c521f151b07a338834e62394e78ea5e5a1863e13c63993",
                          id: 123456789,
                          photo_url: "https://t.me/i/userpic/320/Coontail.jpg",
                          username: "Test"
                        });
                      }}
                      variant="contained"
                    >
                      Login test
                    </Button>
                  ))}
              </div>
              <CircularProgress className={classes.telegramLoader} size={32} />
            </div>
          }
          {false && (
            <Typography
              variant="caption"
              className={classes.troubleLink}
              onClick={() => this.setState({ alternativeLogin: true })}
            >
              Having trouble signing in?
            </Typography>
          )}
        </DialogContent>
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

const FormWithMutation = props => (
  <Mutation mutation={CREATE_SESSION}>
    {(createSession, { data, loading, called }) => {
      return (
        <SignUpDialog
          loading={loading}
          onSubmit={input => {
            createSession({ variables: { input } }).then(
              ({
                data: {
                  createSession: { session }
                }
              }) => {
                location.reload();
              }
            );
          }}
          {...props}
        />
      );
    }}
  </Mutation>
);

export default withStyles(styles)(withRouter(withWidth()(FormWithMutation)));
