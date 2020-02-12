import React from "react";
import ReactMarkdown from "react-markdown";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import dayjs from "dayjs";
import timeAgo from "../../timeAgo";

const styles = theme => ({
  card: {
    width: "100%",
    borderRadius: 0,
    padding: theme.spacing(2)
  },
  content: {
    padding: theme.spacing(4)
  },
  text: {
    fontWeight: 200,
    color: theme.palette.text.primary,
    fontFamily: "Roboto"
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
  pixelImage: {
    width: "100%"
  }
});

class AnnouncementCard extends React.Component {
  state = {};

  renderHeader() {
    const { classes, announcement, width } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={1}>
          <Grid item xs={12} lg={10} xl={9}>
            <Typography variant="h3">{announcement.title}</Typography>
            <Typography variant="h6">
              {timeAgo.format(dayjs(announcement.createdAt).toDate())}
            </Typography>
          </Grid>
          {width === "xl" && <Grid item xl={1} />}
          {(width === "xl" || width === "lg") && (
            <Grid item lg={2}>
              <img
                style={{ width: "100%" }}
                src={require("images/pixel/Header - Announcements.png")}
              />
            </Grid>
          )}
        </Grid>
      </React.Fragment>
    );
  }

  renderContent() {
    const { classes, announcement, horizontal } = this.props;

    return (
      <div className={classes.content} className={classes.text}>
        <ReactMarkdown
          renderers={{
            link: props => <a className={classes.link} {...props} />
          }}
          source={announcement.body}
        />
      </div>
    );
  }

  renderVertical() {
    const { classes, announcement } = this.props;

    return (
      <React.Fragment>
        <Paper className={classes.card} elevation={0}>
          {this.renderHeader()}
          <hr />
          {this.renderContent()}
        </Paper>
        <div style={{ padding: 16 }} />
      </React.Fragment>
    );
  }

  render() {
    const { horizontal } = this.props;

    return this.renderVertical();
  }
}

export default withStyles(styles)(withWidth()(AnnouncementCard));
