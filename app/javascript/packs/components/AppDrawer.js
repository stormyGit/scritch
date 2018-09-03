import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { Link, withRouter } from 'react-router-dom'

const drawerWidth = 300;

const styles = theme => {
  console.log(theme);
  return (
    {
    drawerPadder: {
      width: drawerWidth,
      height: '100%'
    },
    drawerSpacer: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      justifyContent: 'space-between'
    },
    drawerPaper: {
      position: 'relative',
      width: drawerWidth,
      position: 'fixed',
      backgroundColor: theme.palette.primary.main,
    },
    toolbar: theme.mixins.toolbar,
  })
};

const AppDrawer = (props) => {
  const { classes, location } = props;

  return (
    <div>
      <div className={classes.drawerPadder} />
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <div className={classes.drawerSpacer}>
          <div>
            <List>
            </List>
          </div>
          <div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

const ConnectedAppDrawer = connect(
  undefined,
  (dispatch) => ({
  })
)(AppDrawer);

export default withRouter(withStyles(styles)(ConnectedAppDrawer));
