import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Link, withRouter } from 'react-router-dom'
import TelegramLoginButton from 'react-telegram-login';
import SignUpDialog from './SignUpDialog';
import UploadDialog from './UploadDialog';
import PermanentDrawer from './PermanentDrawer';
import TemporaryDrawer from './TemporaryDrawer';
import withCurrentSession from './withCurrentSession';

import UserAvatar from './UserAvatar';
import Logo from './Logo';

import { TOGGLE_SIGNUP_DIALOG, GET_SESSION } from '../queries';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    minHeight: '100vh'
  },
  content: {
    flexGrow: 1,
    minWidth: 0, // So the Typography noWrap works
    overflow: 'hidden'
  },
  toolbar: theme.mixins.toolbar,
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
  children: {
    minWidth: 600
  },
  separator: {
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    borderLeftColor: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
    borderLeftWidth: 1,
    borderLeftStyle: 'solid',
    [theme.breakpoints.down('md')]: {
      borderLeftWidth: 0,
      marginLeft: 0,
      marginRight: theme.spacing.unit * 2,
    },
  },
  pageTitle: {
    marginTop: 5,
    marginBottom: 5,
    lineHeight: '36px',
    flexShrink: 0,
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
  rightActions: {
    flexShrink: 0,
  },
  toolbar: theme.mixins.toolbar,
});

class AppLayout extends React.Component {
  state = {
    uploadDialog: false,
    signUpDialog: false,
    drawer: false
  }

  render() {
    const { classes, pageTitle, settingsLayout, children, currentSession } = this.props;

    return (
      <div className={classes.root}>
        <Hidden mdDown>
          <PermanentDrawer />
        </Hidden>
        <Hidden lgUp>
          <TemporaryDrawer
            open={this.state.drawer}
            onClose={() => this.setState({ drawer: false })}
          />
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <AppBar position="absolute" className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
              <div className={classes.titleZone}>
                <Hidden mdDown>
                  <Link to='/' className={classes.rootLink}>
                    <Logo />
                  </Link>
                </Hidden>
                <Hidden lgUp>
                  <IconButton
                    color="inherit"
                    onClick={() => this.setState({ drawer: true })}
                  >
                    <MenuIcon />
                  </IconButton>
                </Hidden>
                {
                  pageTitle &&
                    <React.Fragment>
                      <div className={classes.separator} />
                      <Typography variant="headline" className={classes.pageTitle}>
                        {pageTitle}
                      </Typography>
                    </React.Fragment>
                }
                <Hidden mdDown>
                  <div className={classes.children}>
                    {this.props.appBarChildren}
                  </div>
                </Hidden>
              </div>
              <div className={classes.rightActions}>
                {
                  currentSession &&
                    <Hidden mdDown>
                      <Button
                        onClick={() => this.setState({ uploadDialog: true })}
                        variant="contained"
                        size="large"
                        color="primary"
                      >
                        Upload
                      </Button>
                    </Hidden>
                }
                {
                  currentSession &&
                    <ButtonBase
                      component={(props) => <Link to={`/${currentSession.user.slug}`} {...props} />}
                      focusRipple
                      className={classes.avatar}
                    >
                      <UserAvatar user={currentSession.user} />
                    </ButtonBase>
                }
                {
                  !currentSession &&
                    <Button
                      onClick={() => this.setState({ signUpDialog: true })}
                      variant="contained"
                      size="large"
                    >
                      Login with Telegram
                    </Button>
                }
              </div>
            </Toolbar>
          </AppBar>
          <SignUpDialog open={this.state.signUpDialog} onClose={() => this.setState({ signUpDialog: false })} />
          <UploadDialog open={this.state.uploadDialog} onClose={() => this.setState({ uploadDialog: false })} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(withCurrentSession(AppLayout)));
