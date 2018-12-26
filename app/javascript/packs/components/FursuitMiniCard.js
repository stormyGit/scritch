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
import FavoriteIcon from "@material-ui/icons/Favorite";
import NoFavoriteIcon from "@material-ui/icons/FavoriteBorder";
import dayjs from "dayjs";
import queryString from "query-string";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link, withRouter } from "react-router-dom";
import { keyToCdnUrl } from "../mediaService";
import timeAgo from "../timeAgo";
import UserAvatar from "./UserAvatar";
import TruncatedText from "./TruncatedText";
import UnderReview from "./UnderReview";
import countFormat from "../countFormat";

import Background from "../photo.jpg";

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
    paddingTop: "56%"
  },
  userLink: {
    color: theme.palette.text.primary,
    textDecoration: "none"
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  content: {
    textAlign: "center",
    padding: theme.spacing.unit * 1
  },
  tags: {
    overflow: "hidden",
    maxHeight: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 2
  },
  noTags: {
    fontStyle: "italic"
  },
  chip: {
    marginRight: theme.spacing.unit
  },
  text: {
    fontWeight: 200,
    textAlign: "center"
  },
  avatar: {
    width: "100%",
    objectFit: "cover"
  }
});

const GET_ACTIVE_PREVIEW = gql`
  {
    activePreview @client
  }
`;

class FursuitMiniCard extends React.Component {
  state = {};

  render() {
    const { classes, fursuit, onClick } = this.props;

    console.log(fursuit);

    return (
      <Grid container spacing={8} justify="center" alignItems="center">
        <Grid item lg={12} xs={12}>
          <img
            src={require("../photo.jpg")}
            onClick={() => {
              onClick(fursuit);
            }}
            className={classes.avatar}
          />
        </Grid>
        <Grid item lg={12} xs={12} className={classes.content}>
          <Typography
            gutterBottom
            variant="h6"
            component="h5"
            className={classes.text}
            noWrap
          >
            {fursuit.name}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

FursuitMiniCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withWidth()(withApollo(FursuitMiniCard)));
