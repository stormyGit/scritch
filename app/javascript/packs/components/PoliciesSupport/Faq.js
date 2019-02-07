import React from "react";

import { Query } from "react-apollo";
import { GET_ANNOUNCEMENTS } from "../../queries";
import queryString from "query-string";
import withWidth from "@material-ui/core/withWidth";

import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import PageTitle from "../PageTitle";
import AnnouncementCard from "./AnnouncementCard";
import CheckoutForm from "../CheckoutForm";

import EmptyList from "../EmptyList";
import LoadMoreButton from "../LoadMoreButton";

import { Link, withRouter } from "react-router-dom";

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
        <CheckoutForm />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withWidth()(Faq));
