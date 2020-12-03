import {withStyles} from "@material-ui/core";
import React, {useContext} from "react";
import MediaIcon from "@material-ui/icons/PhotoLibrary";
import FursuitIcon from "@material-ui/icons/AccessibilityNew";
import MakerIcon from "@material-ui/icons/Build";
import EventIcon from "@material-ui/icons/Business";
import AppBar from "@material-ui/core/AppBar";
import Slide from "@material-ui/core/Slide";
import {NavigationContext} from "../../context/NavigationContext";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {Link, withRouter} from "react-router-dom";
import {pageTitleToIndex} from "../../util/converter";

const styles = theme => ({
  quickAccessFooter: {
    // height: 48,
    top: 'auto',
    bottom: 0,
    // backgroundColor: theme.palette.background.paper
  }
})

const QuickAccessFooter = ({classes, location}) => {
  const {scrollAmount} = useContext(NavigationContext);
  const PageRoute = location.pathname;

  return (
    <Slide direction="up" in={scrollAmount >= 0} unmountOnExit>
      <AppBar position="fixed" color="primary" className={classes.quickAccessFooter}>
        <Tabs value={pageTitleToIndex(PageRoute)} variant="fullWidth" indicatorColor="primary" textColor="secondary">
          <Tab icon={<MediaIcon/>} to="/pictures" aria-label="Media" component={Link}/>
          <Tab icon={<FursuitIcon/>} to="/fursuits" aria-label="Fursuits" component={Link}/>
          <Tab icon={<MakerIcon/>} to="/makers" aria-label="Makers" component={Link}/>
          <Tab icon={<EventIcon/>} to="/events" aria-label="Events" component={Link}/>
        </Tabs>
      </AppBar>
    </Slide>
  );
}
export default withRouter(withStyles(styles)(QuickAccessFooter));