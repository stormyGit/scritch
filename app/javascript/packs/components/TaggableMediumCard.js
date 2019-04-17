import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Mutation, Query, withApollo } from "react-apollo";
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
import TagIcon from "@material-ui/icons/AssignmentTurnedIn";
import NoFavoriteIcon from "@material-ui/icons/FavoriteBorder";
import dayjs from "dayjs";
import queryString from "query-string";
import { TAG_LOCK_MEDIUM, TAG_UNLOCK_MEDIUM } from "../queries/mediaMutations";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link, withRouter } from "react-router-dom";
import { keyToCdnUrl } from "../mediaService";
import timeAgo from "../timeAgo";
import UserAvatar from "./Users/UserAvatar";
import TruncatedText from "./Global/TruncatedText";

import TagDialog from "./TagDialog";

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
  infoBar: {
    display: "flex",
    alignItems: "center"
  },
  infoBarInner: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  }
});

const GET_ACTIVE_PREVIEW = gql`
  {
    activePreview @client
  }
`;

class TaggableMediumCard extends React.Component {
  state = {
    tagDialog: false
  };

  renderMedia() {
    const { classes, medium, horizontal, width, client } = this.props;

    return (
      <Query query={GET_ACTIVE_PREVIEW}>
        {({ data }) => (
          <div className={horizontal ? undefined : classes.cardMediaContainer}>
            <CardMedia
              className={
                medium.exif && JSON.parse(medium.exif).Orientation === "6"
                  ? classes.verticalMedia
                  : classes.horizontalMedia
              }
              image={medium.thumbnail}
              title={medium.title}
            />
            {this.renderActions()}
          </div>
        )}
      </Query>
    );
  }

  renderActions() {
    const { classes, medium } = this.props;

    return (
      <div className={classes.overlay}>
        <Grid container spacing={8} wrap="nowrap" className={classes.infoBar}>
          <Grid item className={classes.infoBarInner}>
            <TagIcon
              className={classes.leftIcon}
              style={{ color: "#ffffffcc", fontSize: 30 }}
            />
            <Typography
              style={{ color: "#ffffffcc", fontSize: 15, fontWeight: 400 }}
            >
              {medium.completion}% COMPLETE
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }

  renderVertical() {
    const { classes, medium } = this.props;

    return (
      <React.Fragment>
        <Card className={classes.card} elevation={0}>
          <Mutation
            mutation={TAG_LOCK_MEDIUM}
            update={cache => {}}
            onCompleted={() => {
              this.setState({
                tagDialog: true
              });
            }}
            onError={() => {
              this.setState({
                tagDialog: true
              });
            }}
          >
            {(tagLockMedium, { data }) => (
              <CardActionArea
                onClick={() => {
                  tagLockMedium({
                    variables: {
                      input: {
                        id: medium.id
                      }
                    }
                  });
                }}
              >
                {this.renderMedia()}
              </CardActionArea>
            )}
          </Mutation>
        </Card>
        {this.state.tagDialog && medium && (
          <Mutation
            mutation={TAG_UNLOCK_MEDIUM}
            update={cache => {}}
            onCompleted={() => {
              this.setState({
                tagDialog: false
              });
            }}
            onError={() => {
              this.setState({
                tagDialog: false
              });
            }}
          >
            {(tagUnlockMedium, { data, error }) => (
              <TagDialog
                open={this.state.tagDialog}
                onClose={() => {
                  tagUnlockMedium({
                    variables: {
                      input: {
                        id: medium.id
                      }
                    }
                  });
                }}
                mediumId={medium.id}
              />
            )}
          </Mutation>
        )}
      </React.Fragment>
    );
  }

  render() {
    return this.renderVertical();
  }
}

TaggableMediumCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withWidth()(withApollo(TaggableMediumCard)));
