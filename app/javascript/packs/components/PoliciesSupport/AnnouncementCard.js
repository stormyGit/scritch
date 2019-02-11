import React from "react";
import ReactMarkdown from "react-markdown";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import dayjs from "dayjs";
import timeAgo from "../../timeAgo";

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

export default withStyles(styles)(withWidth()(AnnouncementCard));
