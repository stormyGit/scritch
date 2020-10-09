import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import * as React from "react";
import {Query} from "react-apollo";
import {withStyles} from "@material-ui/core/styles";
import gql from "graphql-tag";
import {Link, withRouter} from "react-router-dom";

const styles = theme => ({
  tab: {
    minWidth: "20%",
    width: "25%",
  }
});

function PageTabs(props) {
  const {classes, location} = props;
  const PageRoute = location.pathname;

  function toIndex(pageTitle) {
    let s = pageTitle.toLowerCase();
    if (s.includes("pictures")) {
      return 0;
    } else if (s.includes("fursuits")) {
      return 1;
    } else if (s.includes("makers")) {
      return 2;
    } else if (s.includes("events")) {
      return 3;
    }
    return false;
  }

  return (
    <Tabs value={toIndex(PageRoute)}>
      <Tab classes={{root: classes.tab}} to="/pictures" label="Media" component={Link}/>
      <Tab classes={{root: classes.tab}} to="/fursuits" label="Fursuits" component={Link}/>
      <Tab classes={{root: classes.tab}} to="/makers" label="Makers" component={Link}/>
      <Tab classes={{root: classes.tab}} to="/events" label="Events" component={Link}/>
    </Tabs>
  );
}

export default withRouter(withStyles(styles)(PageTabs));