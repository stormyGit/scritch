import {Divider, Grid, IconButton, Toolbar, withStyles} from "@material-ui/core";
import React, {useContext} from "react";
import MediaIcon from "@material-ui/icons/Photo";
import FursuitIcon from "@material-ui/icons/AccessibilityNew";
import MakerIcon from "@material-ui/icons/Build";
import EventIcon from "@material-ui/icons/Business";
import AppBar from "@material-ui/core/AppBar";
import Slide from "@material-ui/core/Slide";
import {NavigationContext} from "../../context/NavigationContext";

const styles = theme => ({
  quickAccessFooter: {
    height: 48,
    top: 'auto',
    bottom: 0,
    // backgroundColor: theme.palette.background.paper
  }
})

const QuickAccessFooter = ({classes}) => {
  const {scrollAmount} = useContext(NavigationContext);

  return (
    <Slide direction="up" in={scrollAmount >= 0} unmountOnExit>
      <AppBar position="fixed" color="primary" className={classes.quickAccessFooter}>
        <Toolbar>
          <Grid container direction="row" justify="space-around" aligns="center">
            <IconButton>
              <MediaIcon/>
            </IconButton>
            <Divider orientation="vertical" flexItem/>
            <IconButton>
              <FursuitIcon/>
            </IconButton>
            <Divider orientation="vertical" flexItem/>
            <IconButton>
              <MakerIcon/>
            </IconButton>
            <Divider orientation="vertical" flexItem/>
            <IconButton>
              <EventIcon/>
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}
export default withStyles(styles)(QuickAccessFooter);