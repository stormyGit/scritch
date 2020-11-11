import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import * as React from "react";
import {Query} from "react-apollo";
import {withStyles} from "@material-ui/core/styles";
import gql from "graphql-tag";
import {Link, withRouter} from "react-router-dom";
import {pageTitleToIndex} from "../../util/Converter";

const styles = theme => ({
  tab: {
    minWidth: "20%",
    width: "25%",
  }
});

const PageTabs = props => {
  const {classes, location} = props;
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