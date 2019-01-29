import React from "react";
import queryString from "query-string";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import withCurrentSession from "../withCurrentSession";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import UploadIcon from "@material-ui/icons/CloudUpload";

import SearchBar from "../SearchBar";

const styles = theme => ({
  searchBar: {
    flex: 1
  }
});

class GlobalSearchBar extends React.Component {
  state = { query: {} };

  handleRequestSearch(q) {
    this.props.history.push({
      pathname: "/pictures",
      search: queryString.stringify({ q })
    });
  }

  render() {
    const { classes, currentSession, width } = this.props;
    const { query } = this.state;

    let appBarPadding;
    if (width === "xl" || width === "lg") {
      appBarPadding = 16;
    } else {
      appBarPadding = 8;
    }

    return (
      <React.Fragment>
        {width === "xl" && (
          <div
            className={classes.searchBar}
            style={{
              paddingLeft: appBarPadding,
              maxWidth: width === "lg" || width === "xl" ? 600 : "none",
              marginRight: width === "lg" || width === "xl" ? 16 : 0
            }}
          >
            <SearchBar
              autoFocus={width !== "lg" && width !== "xl" && !query.q}
              cancelOnEscape
              value={query.q}
              onRequestSearch={q => {
                if (typeof q === "string") {
                  this.handleRequestSearch(q);
                }
              }}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  withCurrentSession(withWidth()(withRouter(GlobalSearchBar)))
);
