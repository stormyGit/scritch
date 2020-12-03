import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import * as React from "react";
import {withStyles} from "@material-ui/core/styles";
import {Link, withRouter} from "react-router-dom";
import {pageTitleToIndex} from "../../util/converter";

const styles = theme => ({
  tab: {
    minWidth: "20%",
    width: "25%",
  }
});

const PageTabs = ({classes, location}) => {
  const PageRoute = location.pathname;

  return (
    <Tabs value={pageTitleToIndex(PageRoute)}>
      <Tab classes={{root: classes.tab}} to="/pictures" label="Media" component={Link}/>
      <Tab classes={{root: classes.tab}} to="/fursuits" label="Fursuits" component={Link}/>
      <Tab classes={{root: classes.tab}} to="/makers" label="Makers" component={Link}/>
      <Tab classes={{root: classes.tab}} to="/events" label="Events" component={Link}/>
    </Tabs>
  );
};

export default withRouter(withStyles(styles)(PageTabs));