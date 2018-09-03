import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import { Link, withRouter } from 'react-router-dom'

import UserAvatar from './UserAvatar';

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
    backgroundColor: theme.palette.primary.main,
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
    color: theme.palette.background.paper,
    marginTop: 5,
    marginBottom: 5,
    lineHeight: '36px',
    borderLeft: '1px solid rgba(255, 255, 255, 0.3)'
  },
  userName: {
    marginRight: theme.spacing.unit,
    color: theme.palette.background.paper,
    lineHeight: '56px',
  },
  brand: {
    fontFamily: "'Gloria Hallelujah', cursive",
    fontSize: '2.5em'
  },
  toolBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
      </Toolbar>
    </AppBar>
  );
}

const ConnectedLayout = connect(
  ({ pageTitle }) => ({
    currentUser: null,
    pageTitle
  })
)(Layout)

export default withStyles(styles)(withRouter(ConnectedLayout));
