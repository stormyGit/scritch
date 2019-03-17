import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query, Mutation, withApollo } from "react-apollo";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import timeAgo from "../../timeAgo";
import dayjs from "dayjs";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";
import EmptyList from "../Global/EmptyList";
import LoadMoreButton from "../Global/LoadMoreButton";
import TruncatedText from "../Global/TruncatedText";
import UserAvatar from "../Users/UserAvatar";
import Avatar from "@material-ui/core/Avatar";
import FursuitAvatar from "../Fursuits/FursuitAvatar";

import {
  GET_ACTIVITIES,
  GET_UNREAD_ACTIVITY_COUNT
} from "../../queries/activityQueries";

import {
  READ_ACTIVITIES,
  CLEAR_ACTIVITIES
} from "../../queries/activityMutations";

const styles = theme => ({
  emptyNoficationContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 8
  },
  emptyNoficationIcon: {
    fontSize: 2,
    display: "block",
    fontSize: "4em",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing.unit,
    color:
      theme.palette.type === "dark"
        ? "rgba(255, 255, 255, 0.3)"
        : "rgba(0, 0, 0, 0.3)"
  },
  notificationsContainer: {
    paddingLeft: 0,
    paddingRight: 0
  },
  loadMoreContainer: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  commentBody: {
    fontStyle: "italic"
  },
  highlight: {
    display: "inline-block",
    fontWeight: "bold"
  },
  avatar: {
    background: "black"
  }
});

class ActivitiesDialog extends React.Component {
  state = {
    hasMore: true
  };

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.props.client.mutate({
        mutation: READ_ACTIVITIES,
        variables: { input: {} },
        update: cache => {
          cache.writeQuery({
            query: GET_UNREAD_ACTIVITY_COUNT,
            data: {
              unreadActivityCount: 0
            }
          });
        }
      });
    }
  }

  renderLikeCreate(activity) {
    const { classes } = this.props;

    return (
      <ListItem
        key={activity.id}
        button
        onClick={() => {
          this.props.history.push({
            pathname: `/${activity.owner.slug}`
          });
          this.props.onClose();
        }}
      >
        <UserAvatar user={activity.owner} />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                <Typography
                  variant="body2"
                  component="span"
                  className={classes.highlight}
                >
                  {activity.owner.name}
                </Typography>
                {` liked your picture `}
                <Typography
                  variant="body2"
                  component="span"
                  className={classes.highlight}
                >
                  {activity.trackable.medium.title}
                </Typography>
              </Typography>
            </React.Fragment>
          }
          secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  renderCommentCreate(activity) {
    const { classes } = this.props;

    return (
      <ListItem
        key={activity.id}
        button
        onClick={() => {
          this.props.history.push({
            pathname: `/${activity.owner.slug}`
          });
          this.props.onClose();
        }}
      >
        <UserAvatar user={activity.owner} />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                <Typography
                  variant="body2"
                  component="span"
                  className={classes.highlight}
                >
                  {activity.owner.name}
                </Typography>
                {` commented on your picture `}
                <Typography
                  variant="body2"
                  component="span"
                  className={classes.highlight}
                >
                  {activity.trackable.medium.title}
                </Typography>
              </Typography>
              <Typography variant="caption" className={classes.commentBody}>
                <TruncatedText limit={100}>
                  {activity.trackable.body}
                </TruncatedText>
              </Typography>
            </React.Fragment>
          }
          secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  renderFollowCreate(activity) {
    const { classes } = this.props;

    return (
      <ListItem
        key={activity.id}
        button
        onClick={() => {
          this.props.history.push({
            pathname: `/${activity.owner.slug}`
          });
          this.props.onClose();
        }}
      >
        <UserAvatar user={activity.owner} />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                <Typography
                  variant="body2"
                  component="span"
                  className={classes.highlight}
                >
                  {activity.owner.name}
                </Typography>
                {` follows you`}
              </Typography>
            </React.Fragment>
          }
          secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  renderMediumRefused(activity) {
    const { classes } = this.props;

    return (
      <ListItem key={activity.id}>
        <UserAvatar user={activity.owner} />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                {`Your picture `}
                <Typography
                  variant="body2"
                  component="span"
                  className={classes.highlight}
                >
                  {activity.trackable.title}
                </Typography>
                {` was refused.`}
              </Typography>
            </React.Fragment>
          }
          secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  renderReportCreate(activity) {
    const { classes } = this.props;

    return (
      <ListItem key={activity.id}>
        <UserAvatar user={activity.owner} />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                {`We received your report on `}
                <Typography
                  variant="body2"
                  component="span"
                  className={classes.highlight}
                >
                  {activity.trackable.reportedUserName}
                </Typography>
                {`.`}
              </Typography>
            </React.Fragment>
          }
          secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  renderFursuitMediumCreate(activity) {
    const { classes } = this.props;

    return (
      <ListItem
        key={activity.id}
        onClick={() => {
          this.props.history.push({
            pathname: `/pictures/${activity.trackable.medium.id}`
          });
          this.props.onClose();
        }}
      >
        <Avatar
          src={activity.trackable.medium.thumbnail}
          className={classes.avatar}
        />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                {`Your fursuit ${
                  activity.trackable.fursuit.name
                } has been tagged in a new picture!`}
              </Typography>
            </React.Fragment>
          }
          secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  renderFursuitUserCreate(activity) {
    const { classes } = this.props;

    return (
      <ListItem
        key={activity.id}
        onClick={() => {
          this.props.history.push({
            pathname: `/fursuits/${activity.trackable.fursuit.slug}`
          });
          this.props.onClose();
        }}
      >
        <FursuitAvatar
          specy={
            activity.trackable.fursuit.isHybrid
              ? "Hybrid"
              : activity.trackable.fursuit.fursuitSpecy.name
          }
        />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                {`You have succesfully claimed ${
                  activity.trackable.fursuit.name
                }!`}
              </Typography>
            </React.Fragment>
          }
          secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  renderActivity(activity) {
    switch (activity.key) {
      case "like.create":
        return this.renderLikeCreate(activity);
      case "follow.create":
        return this.renderFollowCreate(activity);
      case "comment.create":
        return this.renderCommentCreate(activity);
      case "medium.refused":
        return this.renderMediumRefused(activity);
      case "report.create":
        return this.renderReportCreate(activity);
      case "fursuit_medium.create":
        return this.renderFursuitMediumCreate(activity);
      case "fursuit_user.create":
        return this.renderFursuitUserCreate(activity);
      default:
        return null;
    }
  }

  render() {
    const { classes, match, width } = this.props;
    let offset = 0;
    let limit = parseInt(process.env.ACTIVITIES_PAGE_SIZE);

    return (
      <ResponsiveDialog
        open={this.props.open}
        onClose={this.props.onClose}
        className={classes.root}
      >
        <GlobalProgress absolute />
        <Query query={GET_ACTIVITIES} variables={{ offset, limit }}>
          {({ loading, error, data, fetchMore }) => {
            if (loading || error || !data.activities) {
              console.log(error);
              return null;
            }

            console.log(data.activities);
            return (
              <React.Fragment>
                {data.activities.length === 0 ? (
                  <DialogContent className={classes.emptyNoficationContainer}>
                    <NotificationsNoneIcon
                      className={classes.emptyNoficationIcon}
                    />
                    <EmptyList label={`No recent activity`} />
                  </DialogContent>
                ) : (
                  <DialogContent className={classes.notificationsContainer}>
                    <List>
                      {data.activities.map(activity =>
                        this.renderActivity(activity)
                      )}
                    </List>
                    {data.activities.length % limit === 0 &&
                      this.state.hasMore && (
                        <div className={classes.loadMoreContainer}>
                          <LoadMoreButton
                            noMargin
                            onClick={() => {
                              fetchMore({
                                variables: {
                                  offset: data.activities.length,
                                  limit
                                },
                                updateQuery: (prev, { fetchMoreResult }) => {
                                  if (!fetchMoreResult) return prev;

                                  if (fetchMoreResult.activities.length === 0) {
                                    this.setState({ hasMore: false });
                                  } else {
                                    return Object.assign({}, prev, {
                                      activities: [
                                        ...prev.activities,
                                        ...fetchMoreResult.activities
                                      ]
                                    });
                                  }
                                }
                              });
                            }}
                          />
                        </div>
                      )}
                  </DialogContent>
                )}
                <DialogActions>
                  <Mutation
                    mutation={CLEAR_ACTIVITIES}
                    update={cache => {
                      cache.writeQuery({
                        query: GET_ACTIVITIES,
                        data: { activities: [] }
                      });
                      cache.writeQuery({
                        query: GET_UNREAD_ACTIVITY_COUNT,
                        data: {
                          unreadActivityCount: 0
                        }
                      });
                    }}
                  >
                    {(clearActivities, {}) => (
                      <Button
                        onClick={() =>
                          clearActivities({ variables: { input: {} } })
                        }
                        disabled={
                          loading ||
                          error ||
                          !data ||
                          data.activities.length === 0
                        }
                      >
                        Clear all notifications
                      </Button>
                    )}
                  </Mutation>
                  <Button onClick={this.props.onClose}>Close</Button>
                </DialogActions>
              </React.Fragment>
            );
          }}
        </Query>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(withApollo(withRouter(ActivitiesDialog)));
