import React, { useState } from "react";
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
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CommentIcon from "@material-ui/icons/Comment";
import FavoriteIcon from "@material-ui/icons/Star";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import dayjs from "dayjs";
import queryString from "query-string";
import TagIcon from "@material-ui/icons/AssignmentTurnedIn";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link, withRouter } from "react-router-dom";
import timeAgo from "../../timeAgo";
import UserAvatar from "../Users/UserAvatar";
import Gif from "./Gif";
import countContractor from "../../countContractor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faEye, faStar } from "@fortawesome/free-solid-svg-icons";

const styles = theme => ({
  card: {
    width: "100%",
    borderRadius: 0,
    position: "relative"
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    backgroundImage:
      theme.type == "dark"
        ? "linear-gradient(#000000ff, #00000000)"
        : "linear-gradient(#000000ff, #00000000)"
  },
  overlayLarge: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)"
  },
  typo: {
    color: "#ffffffdd",
    fontSize: "1.7rem"
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
    transform: "rotate(90deg)",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0
  },
  verticalMediaR: {
    transform: "rotate(-90deg)",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0
  },
  horizontalMediaContainer: {
    //maxWidth: "46%",
    minWidth: "46%",
    minHeight: "100%"
  },
  horizontalMedia: {
    width: "100%",
    height: "100%",
    position: "absolute",
    objectFit: "cover",
    top: 0,
    left: 0
  },
  horizontalMediaFlip: {
    transform: "rotate(180deg)",
    width: "100%",
    height: "100%",
    position: "absolute",
    objectFit: "cover",
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
  leftIcon: {
    marginRight: theme.spacing.unit,
    fontSize: "1.7rem"
  },
  leftIconSmall: {
    marginRight: theme.spacing.unit,
    fontSize: 17
  },
  flex: {
    display: "flex"
  },
  flexVertical: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  }
});

const Media = ({ classes, medium, width }) => {
  const [mouseOver, setMouseOver] = useState(false);

  var orientation;
  if (medium) {
    if (medium.exif && JSON.parse(medium.exif).Orientation === "6")
      orientation = classes.verticalMedia;
    else if (medium.exif && JSON.parse(medium.exif).Orientation === "8")
      orientation = classes.verticalMediaR;
    else if (medium.exif && JSON.parse(medium.exif).Orientation === "3")
      orientation = classes.horizontalMediaFlip;
    else orientation = classes.horizontalMedia;
  } else orientation = classes.horizontalMedia;

  return (
    <div
      className={classes.cardMediaContainer}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      {medium.thumbnail.substr(medium.thumbnail.lastIndexOf(".") + 1) ===
      "mp4" ? (
        <CardMedia
          className={orientation}
          component={"video"}
          src={medium.thumbnail}
          title={medium.title}
        />
      ) : (
        <CardMedia
          className={orientation}
          image={medium.thumbnail}
          title={medium.title}
        />
      )}
    </div>
  );
};

const Infos = ({ classes, medium, width, mouseOver }) => {
  if (!mouseOver)
    return (
      <div className={classes.overlay}>
        <Grid
          container
          spacing={1}
          justify="space-around"
          className={classes.flex}
        >
          <Button
            disabled
            size="small"
            style={{ color: "#ffffffee", fontSize: 17 }}
          >
            <CommentIcon className={classes.leftIconSmall} />
            {countContractor(medium.commentsCount)}
          </Button>
          <Button
            disabled
            size="small"
            style={{ color: "#ffffffee", fontSize: 17 }}
          >
            <FontAwesomeIcon icon={faPaw} className={classes.leftIconSmall} />
            {countContractor(medium.likesCount)}
          </Button>
          <Button
            disabled
            size="small"
            style={{ color: "#ffffffee", fontSize: 17 }}
          >
            <FontAwesomeIcon icon={faEye} className={classes.leftIconSmall} />
            {countContractor(medium.viewsCount)}
          </Button>
        </Grid>
      </div>
    );

  return (
    <div className={classes.overlayLarge}>
      <Grid
        container
        spacing={1}
        justify="space-between"
        className={classes.flexVertical}
      >
        <Grid
          container
          spacing={1}
          justify="space-around"
          className={classes.flex}
        >
          <Button disabled style={{ color: "#ffffffee", fontSize: "1.7rem" }}>
            <CommentIcon size="small" className={classes.leftIcon} />
            {countContractor(medium.commentsCount)}
          </Button>
          <Button disabled style={{ color: "#ffffffee", fontSize: "1.7rem" }}>
            <FontAwesomeIcon icon={faPaw} className={classes.leftIcon} />
            {countContractor(medium.likesCount)}
          </Button>
        </Grid>
        <Grid
          container
          spacing={1}
          justify="space-around"
          className={classes.flex}
        >
          <Button disabled style={{ color: "#ffffffee", fontSize: "1.7rem" }}>
            <FontAwesomeIcon icon={faStar} className={classes.leftIcon} />
            {countContractor(medium.favesCount)}
          </Button>
          <Button disabled style={{ color: "#ffffffee", fontSize: "1.7rem" }}>
            <FontAwesomeIcon icon={faEye} className={classes.leftIcon} />
            {countContractor(medium.viewsCount)}
          </Button>
        </Grid>
        <Grid
          container
          spacing={1}
          justify="space-around"
          className={classes.flex}
        >
          <Button disabled style={{ color: "#ffffffee", fontSize: "1.7rem" }}>
            <TagIcon size="small" className={classes.leftIcon} />
            {`${medium.completion}%`}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

class MediumCard extends React.Component {
  state = {
    mouseOver: false,
    displayMetrics: false
  };

  render() {
    const { classes, medium, width } = this.props;

    return (
      <Card className={classes.card} elevation={0}>
        <CardActionArea
          component={props => <Link to={`/pictures/${medium.id}`} {...props} />}
        >
          <Media classes={classes} medium={medium} width={width} />
        </CardActionArea>
      </Card>
    );
  }
}

MediumCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withWidth()(withApollo(MediumCard)));
