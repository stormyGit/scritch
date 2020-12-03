import React from "react";
import PropTypes from "prop-types";
import {withApollo} from "react-apollo";
import {withStyles} from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";

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
  verticalMedia: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: "20%",
    top: 0,
    left: 0
  },
  horizontalMediaContainer: {
    maxWidth: "46%",
    minWidth: "46%",
    minHeight: "100%"
  },
  horizontalMedia: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0
  },
  horizontalInfos: {
    flex: 1
  },
  cardMediaContainer: {
    position: "relative",
    paddingTop: "100%"
  },
  userLink: {
    color: theme.palette.text.primary,
    textDecoration: "none"
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  content: {
    textAlign: "center",
    padding: theme.spacing(1)
  },
  text: {
    fontWeight: 200
  },
  subtext: {
    fontSize: 15,
    fontWeight: 200
  }
});

class EventCard extends React.Component {
  renderMedia() {
    const { classes, event, horizontal, width, client } = this.props;

    return (
      <div className={horizontal ? undefined : classes.cardMediaContainer}>
        <CardMedia
          className={horizontal ? classes.horizontalMedia : classes.verticalMedia}
          image={event.avatar}
          title={event.name}
        />
      </div>
    );
  }

  renderContent() {
    const { classes, event, horizontal } = this.props;

    return (
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h6" component="h4" className={classes.text} noWrap>
          {event.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="h6" className={classes.subtext} noWrap>
          {event.country}
        </Typography>
      </CardContent>
    );
  }

  renderVertical() {
    const { classes, event, onClick } = this.props;

    return (
      <Card className={classes.card} elevation={0}>
        {!onClick && (
          <CardActionArea component={props => <Link to={`/events/${event.slug}`} {...props} />}>
            {this.renderMedia()}
            {this.renderContent()}
          </CardActionArea>
        )}
        {onClick && (
          <CardActionArea onClick={onClick}>
            {this.renderMedia()}
            {this.renderContent()}
          </CardActionArea>
        )}
      </Card>
    );
  }

  render() {
    const { horizontal } = this.props;

    return this.renderVertical();
  }
}

EventCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withWidth()(withApollo(EventCard)));
