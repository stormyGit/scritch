import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import DrawerMenuRemake from "./DrawerMenuRemake";

const wideDrawer = 60;

const styles = theme => {
  return {
    drawerPadder: {
      height: "100%",
      flexShrink: 0
    },
    drawerPaperWide: {
      width: 300,
      overflowX: "hidden",
      position: "fixed",
      background:
        theme.palette.type === "dark"
          ? "rgba(0, 0, 0, 0.9)"
          : "rgba(255, 255, 255, 0.9)",
      borderRightWidth: 0
    },
    drawerPaperShort: {
      width: 60,
      position: "fixed",
      overflowX: "hidden",
      background: "rgba(0, 0, 0, 0)",
      borderRightWidth: 0
    },
    text: {},
    toolbar: theme.mixins.toolbar
  };
};

class PermanentDrawer extends React.Component {
  state = {
    wideDrawer: false
  };
  render() {
    const { classes } = this.props;

    if (!this.props.open) return null;

    return (
      <React.Fragment>
        <div
          className={classes.drawerPadder}
          style={{ maxWidth: this.state.wideDrawer }}
        />
        <Drawer
          onMouseEnter={() => this.setState({ wideDrawer: true })}
          onMouseLeave={() => this.setState({ wideDrawer: false })}
          open={this.props.open}
          variant="permanent"
          classes={
            this.state.wideDrawer === false
              ? { paper: classes.drawerPaperShort }
              : { paper: classes.drawerPaperWide }
          }
          PaperProps={{
            elevation: 0
          }}
        >
          <div className={classes.toolbar} />
          <DrawerMenuRemake
            disableProfile
            disableNotifications
            disableUpload
            wide={this.state.drawerPaperWide}
          />
        </Drawer>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(PermanentDrawer);
