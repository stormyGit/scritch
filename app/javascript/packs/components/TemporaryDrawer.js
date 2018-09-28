import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import DrawerMenu from './DrawerMenu';

const drawerWidth = 301;

const styles = theme => {
  return ({
    drawerPadder: {
      // width: drawerWidth,
      height: '100%',
      flexShrink: 0
    },
  })
};

class TemporaryDrawer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Drawer
        variant="temporary"
        classes={{
          paper: classes.drawerPaper,
        }}
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <DrawerMenu disableNavigation onClose={this.props.onClose} />
      </Drawer>
    );
  }
}

export default withStyles(styles)(TemporaryDrawer);
