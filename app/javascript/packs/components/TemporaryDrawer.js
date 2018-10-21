import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import DrawerMenu from './DrawerMenu';

const drawerWidth = 301;

const styles = theme => {
  return ({
    drawerPadder: {
      // width: drawerWidth,
      height: '100%',
      flexShrink: 0
    },
    drawerPaper: {
      minWidth: drawerWidth,
    }
  })
};

class TemporaryDrawer extends React.Component {
  render() {
    const { classes } = this.props;
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
      <SwipeableDrawer
        variant="temporary"
        classes={{
          paper: classes.drawerPaper,
        }}
        open={this.props.open}
        onOpen={this.props.onOpen}
        onClose={this.props.onClose}
        disableDiscovery={iOS}
      >
        <DrawerMenu onClose={this.props.onClose} />
      </SwipeableDrawer>
    );
  }
}

export default withStyles(styles)(TemporaryDrawer);
