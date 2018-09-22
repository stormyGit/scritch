import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link, withRouter } from 'react-router-dom'
import TelegramLoginButton from 'react-telegram-login';
import { Mutation, Query } from "react-apollo";
import SignUpDialog from './SignUpDialog';
import UploadDialog from './UploadDialog';

import UserAvatar from './UserAvatar';
import Logo from './Logo';

import { showUploadDialog } from '../actions/uploadDialog';
import { TOGGLE_SIGNUP_DIALOG, GET_SESSION } from '../queries';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  rootLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'fixed',
  },
  titleZone: {
    display: 'flex',
  },
  settingsLayoutContainer: {
    flexGrow: 1,
    position: 'absolute',
    width: 'calc(100% - 660px)',
    left: 300,
  },
  pageTitle: {
    marginLeft: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    marginTop: 5,
    marginBottom: 5,
    lineHeight: '36px',
    borderLeft: '1px solid rgba(255, 255, 255, 0.3)'
  },
  toolBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  avatar: {
    marginLeft: theme.spacing.unit * 2
  },
  toolbar: theme.mixins.toolbar,
});

class CustomAppBar extends React.PureComponent {
  state = {
    uploadDialog: false,
    signUpDialog: false
  }
  render() {
    const { classes, pageTitle, settingsLayout, children, currentUser } = this.props;

    return (
      <React.Fragment>
        <Query query={GET_SESSION}>
          {({ data, loading, error }) => (
            <AppBar position="absolute" className={classes.appBar}>
              <Toolbar className={classes.toolBar}>
                <div className={classes.titleZone}>
                  <Link to='/' className={classes.rootLink}>
                    <Logo />
                  </Link>
                  { pageTitle && <Typography variant="headline" className={classes.pageTitle}>
                    {pageTitle}
                  </Typography>}
                </div>
                {
                  settingsLayout ?
                    <div className={classes.settingsLayoutContainer}>
                      <Grid container alignItems="center" justify="center">
                        <Grid container item xs={6}>
                          {children}
                        </Grid>
                      </Grid>
                    </div> : children
                }
                {
                  !loading && data.session &&
                    <div>
                      <Button
                        onClick={() => this.setState({ uploadDialog: true })}
                        variant="contained"
                        size="large"
                      >
                        Upload
                      </Button>
                    </div>
                }
                {
                  !loading && data.session &&
                    <ButtonBase
                      component={(props) => <Link to={`/${data.session.user.slug}`} {...props} />}
                      focusRipple
                      className={classes.avatar}
                    >
                      <UserAvatar user={data.session.user} />
                    </ButtonBase>
                }
                {
                  !loading && !data.session &&
                    <div>
                      <Button
                        onClick={() => this.setState({ signUpDialog: true })}
                        variant="contained"
                        size="large"
                      >
                        Login with Telegram
                      </Button>
                    </div>
                }
              </Toolbar>
            </AppBar>
          )}
        </Query>
        <SignUpDialog open={this.state.signUpDialog} onClose={() => this.setState({ signUpDialog: false })} />
        <UploadDialog open={this.state.uploadDialog} onClose={() => this.setState({ uploadDialog: false })} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(CustomAppBar));
