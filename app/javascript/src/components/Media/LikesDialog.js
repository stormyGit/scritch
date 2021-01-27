import React from "react";
import {withStyles} from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import {Query} from "react-apollo";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import EmptyLikeIcon from "@material-ui/icons/FavoriteBorder";

import dayjs from "dayjs";

import ResponsiveDialog from "../Global/ResponsiveDialog";
import EmptyList from "../Global/EmptyList";
import UserAvatar from "../Users/UserAvatar";
import withCurrentSession from "../withCurrentSession";
import timeAgo from "../../util/timeAgo";

import {GET_LIKES} from "../../queries/mediaQueries";

const styles = theme => ({
  likesContainer: {
    paddingLeft: 0,
    paddingRight: 0
  },
  emptyLikesContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  emptyLikesIcon: {
    fontSize: 2,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(1),
    color:
      theme.palette.type === "dark"
        ? "rgba(255, 255, 255, 0.3)"
        : "rgba(0, 0, 0, 0.3)"
  }
});

class LikesDialog extends React.Component {
  renderLike(like) {
    const { currentSession, classes } = this.props;

    return (
      <ListItem
        key={like.id}
        button
        component={props => <Link to={`/${like.user.id}`} {...props} />}
      >
        <UserAvatar user={like.user} />
        <ListItemText
          primary={like.user.name}
          secondary={timeAgo.format(dayjs(like.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  render() {
    const { likes, classes, onClose, width } = this.props;

    return (
      <React.Fragment>
        {likes.length > 0 ? (
          <DialogContent
            className={classes.likesContainer}
            style={{
              minHeight: width === "lg" || width === "xl" ? 300 : 0,
              paddingTop: 0
            }}
          >
            <List>{likes.map(like => this.renderLike(like))}</List>
          </DialogContent>
        ) : (
          <React.Fragment>
            <DialogTitle>
              <span />
            </DialogTitle>
            <DialogContent className={classes.emptyLikesContainer}>
              <EmptyLikeIcon className={classes.emptyLikesIcon} />
              <EmptyList label={`No public likes`} />
            </DialogContent>
          </React.Fragment>
        )}
        <DialogActions>
          <Button onClick={onClose} aria-label="Close">
            Close
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}

const LikesDialogWithWidth = withWidth()(LikesDialog);

class LikeDialogLoader extends React.Component {
  render() {
    const { currentSession, open, onClose, medium, ...props } = this.props;

    let offset = 0;
    let limit = parseInt(process.env.LIKES_PAGE_SIZE);

    return (
      <ResponsiveDialog open={open} onClose={onClose}>
        {open && (
          <Query
            query={GET_LIKES}
            variables={{ mediumId: medium.id, offset, limit }}
          >
            {({ data, loading, error, fetchMore }) => {
              if (loading || error) {
                return null;
              }

              return (
                <LikesDialogWithWidth
                  {...props}
                  currentSession={currentSession}
                  open={open}
                  onClose={onClose}
                  likes={data.likes}
                />
              );
            }}
          </Query>
        )}
      </ResponsiveDialog>
    );
  }
}

export default withCurrentSession(withStyles(styles)(LikeDialogLoader));
