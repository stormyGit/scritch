import React, {useState} from "react";
import {withStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import DrawerMenuRemake from "./DrawerMenuOld";

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

function PermanentDrawer(props) {
  const {classes, open} = props;
  const [wideDrawer, setWideDrawer] = useState(false);

  if (!open) return null;

  return (
    <React.Fragment>
      <div
        className={classes.drawerPadder}
        style={{maxWidth: wideDrawer}}
      />
      <Drawer
        onMouseEnter={() => setWideDrawer(true)}
        onMouseLeave={() => setWideDrawer(false)}
        open={open}
        variant="permanent"
        classes={
          wideDrawer === false
            ? {paper: classes.drawerPaperShort}
            : {paper: classes.drawerPaperWide}
        }
        PaperProps={{
          elevation: 0
        }}
      >
        <div className={classes.toolbar}/>
        <DrawerMenuRemake
          disableProfile
          disableNotifications
          disableUpload
        />
      </Drawer>
    </React.Fragment>
  );
}

export default withStyles(styles)(PermanentDrawer);
