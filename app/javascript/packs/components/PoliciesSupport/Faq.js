import React from "react";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

import PageTitle from "../PageTitle";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing.unit * 1,
    paddingRight: 0,
    paddingBottom: theme.spacing.unit * 8
  },
  gridPadder: {
    width: "100%",
    paddingLeft: theme.spacing.unit * 16,
    paddingRight: theme.spacing.unit * 16
  }
});

class Faq extends React.Component {
  state = {
    hasMore: true
  };

  render() {
    const { classes, location, width } = this.props;
    let limit = 4;

    return (
      <React.Fragment>
        <PageTitle>Faq</PageTitle>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withWidth()(Faq));
