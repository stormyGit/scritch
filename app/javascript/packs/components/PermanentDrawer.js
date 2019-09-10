import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import DrawerMenuRemake from "./DrawerMenuRemake";

const drawerWidth = 60;

const styles = theme => {
  return {
    drawerPadder: {
      width: drawerWidth,
      height: "100%",
      flexShrink: 0
    },
    drawerPaper: {
      position: "relative",
      width: drawerWidth,
      position: "fixed",
      backgroundColor: theme.palette.background.paper,
      borderRightWidth: 0
    },
    text: {},
    toolbar: theme.mixins.toolbar
  };
};

class PermanentDrawer extends React.Component {
  render() {
    const { classes } = this.props;

    if (!this.props.open) return null;

    return (
      <React.Fragment>
        <div className={classes.drawerPadder} />
        <Drawer
          open={this.props.open}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          PaperProps={{
            elevation: 0
          }}
        >
          <div className={classes.toolbar} />
          <DrawerMenuRemake disableProfile disableNotifications disableUpload />
        </Drawer>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(PermanentDrawer);
