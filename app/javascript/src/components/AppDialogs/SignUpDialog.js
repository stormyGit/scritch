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
import ReCAPTCHA from "react-google-recaptcha";

import TelegramLoginButton from "react-telegram-login";
import { withRouter } from "react-router-dom";

import ResponsiveDialog from "../Global/ResponsiveDialog";
import SignUpAlternativeDialog from "./SignUpAlternativeDialog";
import CustomProgress from "../Global/CustomProgress";
import TelegramLogin from "./TelegramLogin";
import FacebookLoginScreen from "./FacebookLoginScreen";
import themeSelector from "../../themeSelector";

import { Mutation, Query } from "react-apollo";

import Logo from "../Global/Logo";
import {
  EMAIL_SIGN_IN,
  REGISTER_USER,
  RESET_PASSWORD,
  SEND_NEW_CONFIRM_MAIL
} from "../../queries/globalQueries";
import { TextField } from "@material-ui/core";

const styles = theme => ({
  brand: {
    textAlign: "center"
  },
  titleBarContainer: {
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 3
  },
  link: {
    color: theme.palette.text.primary
  },
  loginButtonContainer: {
    textAlign: "center",
    marginTop: theme.spacing.unit * 2,
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
    marginTop: theme.spacing.unit * 2,
    cursor: "pointer"
  },
  blueLink: {
    color: theme.palette.primary.main
  },
  blurb: {
    fontWeight: 200
  },
  title: {
    fontWeight: 200,
    textAlign: "center"
  },
  warning: {
    color: theme.palette.danger.main
  },
  danger: {
    color: theme.palette.danger.main
  },
  success: {
    color: theme.palette.primary.main
  }
});

const Spacer = <div style={{ padding: 8 }} />;

class SignUpDialog extends React.Component {
  state = {
    loginScreen: "all",
    signUpName: "",
    signUpEmail: "",
    forgotEmail: "",
    signUpPassword: "",
    signUpPasswordConfirm: "",
    email: "",
    password: "",
    passwordConfirm: "",
    invalidPass: false,
    invalidMail: false,
    invalidMail: false,
    invalidConfirmPass: false,
    emailDisplay: "sign_in",
    success: false,
    captcha: null
  };

  resetStates() {
    this.setState({
      signUpName: "",
      signUpEmail: "",
      forgotEmail: "",
      signUpPassword: "",
      signUpPasswordConfirm: "",
      email: "",
      password: "",
      passwordConfirm: "",
      invalidPass: false,
      invalidMail: false,
      invalidMail: false,
      invalidConfirmPass: false,
      success: false,
      captcha: null
    });
  }

  render() {
    const { classes, open, onClose, loading, width } = this.props;

    return (
      <React.Fragment>
        <ResponsiveDialog
          open={open}
          onClose={() => {
            this.setState({ loginScreen: "all" });
            onClose();
          }}
        >
          {this.state.loginScreen == "all" && (
            <React.Fragment>
              <DialogTitle className={classes.titleBarContainer}>
                <Grid container spacing={0} alignItems="center" justify="space-between">
                  <Grid item>
                    <Typography variant="h6" noWrap color={"inherit"}>
                      Sign Up or Sign In
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton color="inherit" onClick={onClose} aria-label="Close">
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={24}>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.title} variant="h5">
                      Use Social Media
                    </Typography>
                    <div className={classes.loginButtonContainer}>
                      <div className={classes.loginButton}>
                        <Button
                          onClick={() => {
                            this.setState({ loginScreen: "telegram" });
                          }}
                          variant="outlined"
                          style={{ width: "75%" }}
                        >
                          Telegram
                        </Button>
                      </div>
                      <div className={classes.loginButton}>
                        <Button
                          onClick={() => {
                            this.setState({ loginScreen: "facebook" });
                          }}
                          variant="outlined"
                          style={{ width: "75%" }}
                        >
                          Facebook
                        </Button>
                      </div>
                      <div className={classes.loginButton}>
                        <Button
                          onClick={() => {
                            this.setState({ loginScreen: "all" });
                          }}
                          variant="outlined"
                          disabled
                          style={{ width: "75%" }}
                        >
                          Twitter
                        </Button>
                      </div>
                      <div className={classes.loginButton}>
                        <Button
                          onClick={() => {
                            this.setState({ loginScreen: "all" });
                          }}
                          variant="outlined"
                          disabled
                          style={{ width: "75%" }}
                        >
                          Google
                        </Button>
                      </div>
                    </div>
                  </Grid>
                  <div />
                  <Grid item xs={12} md={6} style={{ borderLeft: "1px solid black" }}>
                    <Typography className={classes.title} variant="h5">
                      {this.state.emailDisplay === "sign_in"
                        ? "Log In via Email"
                        : this.state.emailDisplay === "sign_up"
                        ? "Create an Account"
                        : "Retrieve Password"}
                    </Typography>
                    {this.state.emailDisplay === "sign_in" && (
                      <div className={classes.loginButtonContainer}>
                        <TextField
                          label="Email"
                          name="email"
                          value={this.state.email}
                          onChange={e => this.setState({ email: e.target.value })}
                          margin="dense"
                          variant="outlined"
                          fullWidth
                        />
                        <TextField
                          label="Password"
                          name="password"
                          value={this.state.password}
                          type="password"
                          onChange={e => this.setState({ password: e.target.value })}
                          margin="dense"
                          variant="outlined"
                          fullWidth
                        />
                        <div
                          onClick={() => this.setState({ emailDisplay: "forgot_pass" })}
                          style={{ cursor: "pointer", textAlign: "left" }}
                        >
                          <Typography variant="subtitle1" className={classes.blueLink}>
                            I forgot my password
                          </Typography>
                        </div>
                        <ReCAPTCHA
                          sitekey={process.env.CAPTCHA_ACCESS_KEY}
                          onChange={value => this.setState({ captcha: value })}
                        />
                        {this.state.invalidPass && (
                          <Typography className={classes.danger} variant="subtitle1">
                            Invalid Password
                          </Typography>
                        )}
                        {this.state.invalidMail && (
                          <Typography className={classes.danger} variant="subtitle1">
                            Email not found
                          </Typography>
                        )}
                        {this.state.noConfirm && (
                          <React.Fragment>
                            <Typography className={classes.danger} variant="subtitle1">
                              Please confirm your registered Email address to access your account.
                              Didn't receive it?
                            </Typography>
                            <Mutation mutation={SEND_NEW_CONFIRM_MAIL}>
                              {(sendNewConfirmMail, { data, loading }) => {
                                if (loading) {
                                  return <CustomProgress size={32} />;
                                }
                                return (
                                  <Button
                                    variant="outlined"
                                    fullWidth
                                    type="submit"
                                    color="primary"
                                    onClick={() => {
                                      this.setState({
                                        invalidMail: false,
                                        invalidPass: false,
                                        noConfirm: false
                                      });
                                      sendNewConfirmMail({
                                        variables: {
                                          input: {
                                            email: this.state.email
                                          }
                                        }
                                      });
                                    }}
                                  >
                                    Send me a new confirmation email
                                  </Button>
                                );
                              }}
                            </Mutation>
                          </React.Fragment>
                        )}
                        {Spacer}
                        <Mutation
                          mutation={EMAIL_SIGN_IN}
                          onError={e => {
                            if (e.message == "GraphQL error: wrong_pwd")
                              this.setState({ invalidPass: true });
                            if (e.message == "GraphQL error: unknown_email")
                              this.setState({ invalidMail: true });
                            if (e.message == "GraphQL error: no_confirm")
                              this.setState({ noConfirm: true });
                          }}
                          onCompleted={() => location.reload()}
                        >
                          {(emailSignIn, { data, loading }) => {
                            if (loading) {
                              return <CustomProgress size={64} />;
                            }
                            return (
                              <Button
                                variant="outlined"
                                fullWidth
                                type="submit"
                                color="primary"
                                disabled={
                                  !this.state.email || !this.state.password || !this.state.captcha
                                }
                                onClick={() => {
                                  this.setState({
                                    invalidMail: false,
                                    invalidPass: false,
                                    noConfirm: false
                                  });
                                  emailSignIn({
                                    variables: {
                                      input: {
                                        captcha: this.state.captcha,
                                        email: this.state.email,
                                        password: this.state.password
                                      }
                                    }
                                  });
                                }}
                              >
                                Log in
                              </Button>
                            );
                          }}
                        </Mutation>
                        {Spacer}
                        <Typography variant="subtitle2">Don't have an account yet?</Typography>
                        <Button
                          color="primary"
                          onClick={() => {
                            this.resetStates();
                            this.setState({ emailDisplay: "sign_up" });
                          }}
                        >
                          Sign up!
                        </Button>
                      </div>
                    )}
                    {this.state.emailDisplay === "sign_up" && (
                      <div className={classes.loginButtonContainer}>
                        <TextField
                          label="Username"
                          name="signUpName"
                          value={this.state.signUpName}
                          onChange={e => this.setState({ signUpName: e.target.value })}
                          margin="dense"
                          variant="outlined"
                          fullWidth
                        />
                        <TextField
                          label="Email"
                          name="signUpEmail"
                          value={this.state.signUpEmail}
                          onChange={e => this.setState({ signUpEmail: e.target.value })}
                          margin="dense"
                          variant="outlined"
                          fullWidth
                        />
                        <TextField
                          label="Password (at least 8 characters)"
                          name="signUpPassword"
                          value={this.state.signUpPassword}
                          type="password"
                          onChange={e => this.setState({ signUpPassword: e.target.value })}
                          margin="dense"
                          variant="outlined"
                          fullWidth
                        />
                        <TextField
                          label="Confirm Password"
                          name="signUpPasswordConfirm"
                          value={this.state.signUpPasswordConfirm}
                          type="password"
                          onChange={e => this.setState({ signUpPasswordConfirm: e.target.value })}
                          margin="dense"
                          variant="outlined"
                          fullWidth
                        />
                        {this.state.success && (
                          <Typography className={classes.success} variant="subtitle1">
                            Account succesfully created! Please validate your registration by
                            clicking the link sent to your email.
                          </Typography>
                        )}
                        {this.state.invalidPass && (
                          <Typography className={classes.danger} variant="subtitle1">
                            Password must contain at least 8 characters
                          </Typography>
                        )}
                        {this.state.invalidConfirmPass && (
                          <Typography className={classes.danger} variant="subtitle1">
                            Passwords don't match
                          </Typography>
                        )}
                        {this.state.invalidMail && (
                          <Typography className={classes.danger} variant="subtitle1">
                            Email already exists
                          </Typography>
                        )}
                        {Spacer}
                        <Mutation
                          mutation={REGISTER_USER}
                          onError={e => {
                            if (e.message == "GraphQL error: wrong_pwd")
                              this.setState({ invalidPass: true });
                            if (e.message == "GraphQL error: email_exists")
                              this.setState({ invalidMail: true });
                            if (e.message == "GraphQL error: no_confirm")
                              this.setState({ noConfirm: true });
                          }}
                          onCompleted={() =>
                            this.setState({
                              success: true,
                              signUpEmail: "",
                              signUpPassword: "",
                              signUpPasswordConfirm: "",
                              signUpName: ""
                            })
                          }
                        >
                          {(registerUser, { data, loading }) => {
                            if (loading) {
                              return <CustomProgress size={64} />;
                            }
                            return (
                              <Button
                                variant="outlined"
                                fullWidth
                                color="primary"
                                disabled={
                                  !this.state.signUpEmail ||
                                  !this.state.signUpPassword ||
                                  !this.state.signUpPasswordConfirm ||
                                  !this.state.signUpName
                                }
                                onClick={() => {
                                  this.setState({
                                    invalidMail: false,
                                    invalidPass: false,
                                    invalidConfirmPass: false
                                  });
                                  if (this.state.signUpPassword.length < 8)
                                    this.setState({ invalidPass: true });
                                  else if (
                                    this.state.signUpPassword !== this.state.signUpPasswordConfirm
                                  )
                                    this.setState({ invalidConfirmPass: true });
                                  else {
                                    registerUser({
                                      variables: {
                                        input: {
                                          email: this.state.signUpEmail,
                                          password: this.state.signUpPassword,
                                          name: this.state.signUpName
                                        }
                                      }
                                    });
                                  }
                                }}
                              >
                                Sign Up!
                              </Button>
                            );
                          }}
                        </Mutation>
                        {Spacer}
                        <Typography variant="subtitle2">Already have an account?</Typography>
                        <Button
                          color="primary"
                          onClick={() => {
                            this.resetStates();
                            this.setState({ emailDisplay: "sign_in" });
                          }}
                        >
                          Sign in!
                        </Button>
                      </div>
                    )}
                    {this.state.emailDisplay === "forgot_pass" && (
                      <div className={classes.loginButtonContainer}>
                        <TextField
                          label="Email"
                          name="forgotEmail"
                          value={this.state.forgotEmail}
                          onChange={e => this.setState({ forgotEmail: e.target.value })}
                          margin="dense"
                          variant="outlined"
                          fullWidth
                        />
                        <ReCAPTCHA
                          sitekey={process.env.CAPTCHA_ACCESS_KEY}
                          onChange={value => this.setState({ captcha: value })}
                        />
                        {this.state.success && (
                          <Typography className={classes.success} variant="subtitle1">
                            An email with a password reset link has been sent to you.
                          </Typography>
                        )}
                        {this.state.invalidMail && (
                          <Typography className={classes.danger} variant="subtitle1">
                            Email not found
                          </Typography>
                        )}
                        {Spacer}
                        <Mutation
                          mutation={RESET_PASSWORD}
                          onError={e => {
                            if (e.message == "GraphQL error: unknown_email")
                              this.setState({ invalidMail: true });
                          }}
                          onCompleted={() => this.setState({ success: true, forgotEmail: "" })}
                        >
                          {(resetPassword, { data, loading }) => {
                            if (loading) {
                              return <CustomProgress size={64} />;
                            }
                            return (
                              <Button
                                variant="outlined"
                                fullWidth
                                color="primary"
                                disabled={!this.state.forgotEmail || !this.state.captcha}
                                onClick={() => {
                                  this.setState({
                                    invalidMail: false
                                  });
                                  resetPassword({
                                    variables: {
                                      input: {
                                        captcha: this.state.captcha,
                                        email: this.state.forgotEmail
                                      }
                                    }
                                  });
                                }}
                              >
                                Send Reset Email
                              </Button>
                            );
                          }}
                        </Mutation>
                        {Spacer}
                        <Typography variant="subtitle2">
                          Nevermind I remember my password
                        </Typography>
                        <Button
                          color="primary"
                          onClick={() => {
                            this.resetStates();
                            this.setState({ emailDisplay: "sign_in" });
                          }}
                        >
                          Sign in!
                        </Button>
                      </div>
                    )}
                  </Grid>
                </Grid>
              </DialogContent>
            </React.Fragment>
          )}
          {this.state.loginScreen == "telegram" && (
            <TelegramLogin onGoBack={() => this.setState({ loginScreen: "all" })} />
          )}
          {this.state.loginScreen == "facebook" && (
            <FacebookLoginScreen onGoBack={() => this.setState({ loginScreen: "all" })} />
          )}
        </ResponsiveDialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(withWidth()(SignUpDialog)));
