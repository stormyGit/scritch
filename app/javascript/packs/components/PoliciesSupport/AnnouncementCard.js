import React from "react";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query, withApollo } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import dayjs from "dayjs";
import queryString from "query-string";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link, withRouter } from "react-router-dom";
import timeAgo from "../../timeAgo";
import TruncatedText from "../TruncatedText";
import countFormat from "../../countFormat";

const styles = theme => ({
  card: {
    width: "100%",
    borderRadius: 0,
    paddingBottom: theme.spacing.unit * 8
  },
  content: {
    padding: theme.spacing.unit * 4
  },
  text: {
    fontWeight: 200,
    color: theme.palette.text.primary,
    fontFamily: "Roboto"
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  }
});

class AnnouncementCard extends React.Component {
  state = {};

  renderHeader() {
    const { classes, announcement } = this.props;

    return (
      <CardHeader
        title={announcement.title}
        subheader={timeAgo.format(dayjs(announcement.createdAt).toDate())}
      />
    );
  }

  renderContent() {
    const { classes, announcement, horizontal } = this.props;

    return (
      <CardContent className={classes.content} className={classes.text}>
        <ReactMarkdown
          renderers={{
            link: props => <a className={classes.link} {...props} />
          }}
          source={announcement.body}
        />
      </CardContent>
    );
  }

  renderVertical() {
    const { classes, announcement } = this.props;

    return (
      <Card className={classes.card} elevation={0}>
        {this.renderHeader()}
        {this.renderContent()}
      </Card>
    );
  }

  render() {
    const { horizontal } = this.props;

    return this.renderVertical();
  }
}

AnnouncementCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withWidth()(withApollo(AnnouncementCard)));
