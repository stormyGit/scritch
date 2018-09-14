import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link, withRouter } from 'react-router-dom'

import UserAvatar from './UserAvatar';

import { showSignUpDialog } from '../actions/signUpDialog';
import { showUploadDialog } from '../actions/uploadDialog';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
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
  userName: {
    marginRight: theme.spacing.unit,
    lineHeight: '56px',
  },
  brand: {
    fontFamily: "'Monoton', cursive",
    fontSize: '2.5em'
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
  toolbar: theme.mixins.toolbar,
});

function Layout(props) {
  const { classes, pageTitle, settingsLayout, children, currentUser } = props;

  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <div className={classes.titleZone}>
          <ButtonBase
            component={(props) => <Link to='/' {...props} />}
          >
            <Typography variant="title" color="inherit" noWrap className={classes.brand}>
              Murrtube
            </Typography>
          </ButtonBase>
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
          currentUser &&
            <ButtonBase
              component={(props) => <Link to='/profile' {...props} />}
              focusRipple
            >
              <Typography variant="subheading" className={classes.userName}>
                {props.currentUser.name}
              </Typography>
              <UserAvatar user={props.currentUser} />
            </ButtonBase>
        }
        {
          <div>
            <Button
              onClick={() => props.showUploadDialog()}
              variant="contained"
              size="large"
            >
              Upload
            </Button>
          </div>
        }
        {
          !currentUser && false &&
            <div>
              <Button
                onClick={() => props.showSignUpDialog()}
                variant="contained"
                size="large"
              >
                Join Murrtube
              </Button>
            </div>
        }
      </Toolbar>
    </AppBar>
  );
}

const ConnectedLayout = connect(
  ({ pageTitle }) => ({
    currentUser: null,
    pageTitle
  }),
  (dispatch) => ({
    showSignUpDialog: () => dispatch(showSignUpDialog()),
    showUploadDialog: () => dispatch(showUploadDialog())
  })
)(Layout)

export default withStyles(styles)(withRouter(ConnectedLayout));
