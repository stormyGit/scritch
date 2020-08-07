import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import * as React from "react";
import {Query} from "react-apollo";
import {withStyles} from "@material-ui/core/styles";
import gql from "graphql-tag";
import {Link} from "react-router-dom";

const styles = theme => ({});

const GET_PAGE_TITLE = gql`
    {
        pageTitle @client
    }
`;

function PageTabs(props) {
  const {classes} = props;

  function toIndex(pageTitle) {
    switch (pageTitle.toLowerCase()) {
      case "media":
        return 0;
      case "fursuits":
        return 1;
      case "makers":
        return 2;
      case "events":
        return 3;
    }
    return false;
  }

  return (
    <React.Fragment>
      <Query query={GET_PAGE_TITLE}>
        {({data}) =>
          data.pageTitle && (
            <Tabs value={toIndex(data.pageTitle)}>
              {/*<Tab to="/" label="" component={Link}/>*/}
              <Tab to="/pictures" label="Media" component={Link}/>
              <Tab to="/fursuits" label="Fursuits" component={Link}/>
              <Tab to="/makers" label="Makers" component={Link}/>
              <Tab to="/events" label="Events" component={Link}/>
            </Tabs>
          )
        }
      </Query>
    </React.Fragment>
  );
}

export default withStyles(styles)(PageTabs);