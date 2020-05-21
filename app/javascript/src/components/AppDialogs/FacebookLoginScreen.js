import React from "react";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckIcon from "@material-ui/icons/Check";
import WarningIcon from "@material-ui/icons/Warning";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import FacebookLogin from "react-facebook-login";
import { withRouter } from "react-router-dom";

import ResponsiveDialog from "../Global/ResponsiveDialog";
import SignUpAlternativeDialog from "./SignUpAlternativeDialog";
import themeSelector from "../../themeSelector";

import { Mutation, Query } from "react-apollo";

import Logo from "../CustomComponents/ScritchLogo";
import { CREATE_FACEBOOK_SESSION } from "../../queries/globalQueries";

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

class FacebookLoginScreen extends React.Component {
  state = {
    submiting: false,
    alternativeLogin: false
  };

  responseFacebook(response) {
    if (!response.accessToken) return;
    this.setState({ submiting: true });
    debugger;
    this.props.onSubmit({
      service: "facebook",
      facebookId: response.id,
      facebookEmail: response.email,
      facebookName: response.name,
      //facebookName: response.name,
      facebookToken: response.accessToken,
      facebookSignedRequest: response.signedRequest,
      facebookPhotoUrl: response.picture ? response.picture.data.url : null
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
                  Login with Facebook
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
              {`Scritch utilises Facebook Login to allow users to easily sign-in without having to provide an email address and password.`}
            </Typography>
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
                primary="Facebook will share your User ID, name, email, and avatar."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText
                inset
                primary="Scritch will not be able to create Facebook posts on your behalf."
              />
            </ListItem>
          </List>
          {
            <div className={classes.loginButtonContainer}>
              <div className={classes.loginButton}>
                {!this.state.submiting &&
                  (process.env.NODE_ENV === "production" ? (
                    <FacebookLogin
                      appId={process.env.FACEBOOK_KEY}
                      fields="name,email,picture"
                      callback={response => this.responseFacebook(response)}
                    />
                  ) : (
                    <FacebookLogin
                      appId={process.env.FACEBOOK_KEY}
                      fields="name,email,picture"
                      callback={response => this.responseFacebook(response)}
                    />
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
      </React.Fragment>
    );
  }
}

const FormWithMutation = props => (
  <Mutation mutation={CREATE_FACEBOOK_SESSION}>
    {(createFacebookSession, { data, loading, called }) => {
      return (
        <FacebookLoginScreen
          loading={loading}
          onSubmit={input => {
            createFacebookSession({ variables: { input } }).then(
              ({
                data: {
                  createFacebookSession: { session }
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
