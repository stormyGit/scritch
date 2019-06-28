import React from "react";
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
  typo: {
    color: "#ffffffdd",
    fontSize: 15
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
    height: "178%",
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
  horizontalInfos: {
    flex: 1
  },
  cardMediaContainer: {
    position: "relative",
    paddingTop: "100%"
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
    fontSize: 15
  }
});

const GET_ACTIVE_PREVIEW = gql`
  {
    activePreview @client
  }
`;

class MediumCard extends React.Component {
  state = {
    displayMetrics: false
  };

  renderMedia() {
    const { classes, medium, horizontal, width, client } = this.props;

    return (
      <Query query={GET_ACTIVE_PREVIEW}>
        {({ data }) => (
          <div className={horizontal ? undefined : classes.cardMediaContainer}>
            {medium.thumbnail.substr(medium.thumbnail.lastIndexOf(".") + 1) ===
            "mp4" ? (
              <CardMedia
                className={
                  medium.exif && JSON.parse(medium.exif).Orientation === "6"
                    ? classes.verticalMedia
                    : classes.horizontalMedia
                }
                component={"video"}
                src={medium.thumbnail}
                title={medium.title}
              />
            ) : (
              <CardMedia
                className={
                  medium.exif && JSON.parse(medium.exif).Orientation === "6"
                    ? classes.verticalMedia
                    : classes.horizontalMedia
                }
                image={medium.thumbnail}
                title={medium.title}
              />
            )}
            {this.renderActions()}
          </div>
        )}
      </Query>
    );
  }

  renderActions() {
    const { classes, medium, width } = this.props;

    return (
      <div className={classes.overlay}>
        {(width === "sm" || width === "xs") && (
          <Grid container spacing={8} justify="space-between" wrap="nowrap">
            <Grid item xs={4}>
              <Button disabled size="small" style={{ color: "#ffffffee" }}>
                <CommentIcon className={classes.leftIcon} />
                {countContractor(medium.commentsCount)}
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button disabled size="small" style={{ color: "#ffffffee" }}>
                <FontAwesomeIcon icon={faPaw} className={classes.leftIcon} />
                {countContractor(medium.likesCount)}
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button disabled size="small" style={{ color: "#ffffffee" }}>
                <FontAwesomeIcon icon={faStar} className={classes.leftIcon} />
                {countContractor(medium.favesCount)}
              </Button>
            </Grid>
          </Grid>
        )}
        {width !== "sm" && width !== "xs" && (
          <Grid
            container
            spacing={8}
            justify="space-between"
            wrap="nowrap"
            style={{ maxWidth: "100%" }}
          >
            <Grid item>
              <Button disabled style={{ color: "#ffffffee", fontSize: 15 }}>
                <CommentIcon size="small" className={classes.leftIcon} />
                {countContractor(medium.commentsCount)}
              </Button>
            </Grid>
            <Grid item>
              <Button disabled style={{ color: "#ffffffee", fontSize: 15 }}>
                <FontAwesomeIcon icon={faPaw} className={classes.leftIcon} />
                {countContractor(medium.likesCount)}
              </Button>
            </Grid>
            <Grid item>
              <Button disabled style={{ color: "#ffffffee", fontSize: 15 }}>
                <FontAwesomeIcon icon={faStar} className={classes.leftIcon} />
                {countContractor(medium.favesCount)}
              </Button>
            </Grid>
            <Grid item>
              <Button disabled style={{ color: "#ffffffee", fontSize: 15 }}>
                <FontAwesomeIcon icon={faEye} className={classes.leftIcon} />
                {countContractor(medium.viewsCount)}
              </Button>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }

  renderVertical() {
    const { classes, medium } = this.props;

    return (
      <Card className={classes.card} elevation={0}>
        <CardActionArea
          component={props => <Link to={`/pictures/${medium.id}`} {...props} />}
        >
          {this.renderMedia()}
        </CardActionArea>
      </Card>
    );
  }

  render() {
    const { horizontal } = this.props;

    return this.renderVertical();
  }
}

MediumCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withWidth()(withApollo(MediumCard)));
