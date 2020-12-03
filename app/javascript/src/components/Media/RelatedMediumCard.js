import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import timeAgo from "../../util/timeAgo";

const styles = theme => ({
  card: {
    width: "100%",
    borderRadius: 0
  },
  horizontalCard: {
    display: "flex"
  },
  horizontalContent: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  },
  horizontalMediaContainer: {
    maxWidth: "60%",
    minWidth: "60%",
    height: 160
  },
  horizontalMedia: {
    width: "100%",
    height: "100%",
    position: "relative"
  },
  horizontalInfos: {
    flex: 1
  },
  userLink: {
    color: theme.palette.text.primary,
    textDecoration: "none"
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
});

class MediumCard extends React.Component {
  renderMedia() {
    const { classes, medium, horizontal, width } = this.props;

    return (
      <CardMedia
        className={classes.horizontalMedia}
        image={medium.thumbnail}
        title={medium.title}
      />
    );
  }

  renderContent() {
    const { classes, medium } = this.props;

    return (
      <CardContent className={classes.content}>
        <div>
          <Typography
            gutterBottom
            variant="body2"
            component="h2"
            className={classes.text}
            noWrap
          >
            {medium.title}
          </Typography>
          <Typography
            gutterBottom
            variant="caption"
            component="h2"
            className={classes.text}
            noWrap
          >
            {medium.user.name}
          </Typography>
        </div>
        <div>
          <Typography
            gutterBottom
            variant="body2"
            component="h2"
            className={classes.text}
            noWrap
          >
            {timeAgo.format(dayjs(medium.createdAt).toDate())}
          </Typography>
        </div>
      </CardContent>
    );
  }

  render() {
    const { classes, medium } = this.props;

    return (
      <Card
        className={[classes.card, classes.horizontalCard].join(" ")}
        elevation={0}
      >
        <CardActionArea
          component={props => <Link to={`/pictures/${medium.id}`} {...props} />}
          className={classes.horizontalMediaContainer}
        >
          {this.renderMedia()}
        </CardActionArea>
        <div className={classes.horizontalContent}>
          <CardActionArea
            component={props => (
              <Link to={`/pictures/${medium.id}`} {...props} />
            )}
            className={classes.horizontalInfos}
          >
            {this.renderContent()}
          </CardActionArea>
        </div>
      </Card>
    );
  }
}

MediumCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withWidth()(MediumCard));
