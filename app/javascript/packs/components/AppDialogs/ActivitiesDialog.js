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
import MakerAvatar from "../Makers/MakerAvatar";

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
            pathname: `/pictures/${activity.trackable.medium.id}`
          });
          this.props.onClose();
        }}
      >
        <UserAvatar user={activity.owner} size={64} />
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
                {` Scritched your Media `}
                <Typography
                  variant="body2"
                  component="span"
                  className={classes.highlight}
                >
                  {activity.trackable.medium.id.split("-")[0]}
                </Typography>
              </Typography>
            </React.Fragment>
          }
          secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  renderFaveCreate(activity) {
    const { classes } = this.props;

    return (
      <ListItem
        key={activity.id}
        button
        onClick={() => {
          this.props.history.push({
            pathname: `/pictures/${activity.trackable.medium.id}`
          });
          this.props.onClose();
        }}
      >
        <UserAvatar user={activity.owner} size={64} />
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
                {` Faved your Media `}
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
            pathname: `/pictures/${activity.trackable.medium.id}`
          });
          this.props.onClose();
        }}
      >
        <UserAvatar user={activity.owner} size={64} />
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
                {` Commented on your Media `}
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
        <UserAvatar user={activity.owner} size={64} />
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
                {` Followed you`}
              </Typography>
            </React.Fragment>
          }
          secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  renderFursuitFollowed(activity) {
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
        <UserAvatar user={activity.owner} size={64} />
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
                {` Followed your fursuit `}
                <Typography
                  variant="body2"
                  component="span"
                  className={classes.highlight}
                >
                  {activity.trackable.fursuit.name}
                </Typography>
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
        <UserAvatar
          modAvatar={require("images/pixel/Notification Avatar - Reports (General Admin Account) - Icon.png")}
          size={64}
        />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                {`We received your Report on `}
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

  renderMediumReportCreate(activity) {
    const { classes } = this.props;

    return (
      <ListItem key={activity.id}>
        <UserAvatar
          modAvatar={require("images/pixel/Notification Avatar - Reports (General Admin Account) - Icon.png")}
          size={64}
        />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                {`We received your Report on Media `}
                <Typography
                  variant="body2"
                  component="span"
                  className={classes.highlight}
                >
                  {activity.trackable.reportedPictureTitle}
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

  renderCommentReportCreate(activity) {
    const { classes } = this.props;

    return (
      <ListItem key={activity.id}>
        <UserAvatar
          modAvatar={require("images/pixel/Notification Avatar - Reports (General Admin Account) - Icon.png")}
          size={64}
        />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                {`We received your Report on Comment by `}
                <Typography
                  variant="body2"
                  component="span"
                  className={classes.highlight}
                >
                  {activity.trackable.reportedCommentUserName}
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

  renderTagReportCreate(activity) {
    const { classes } = this.props;

    return (
      <ListItem key={activity.id}>
        <UserAvatar
          modAvatar={require("images/pixel/Notification Avatar - Reports (General Admin Account) - Icon.png")}
          size={64}
        />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                {`We received your Report on Tags for Media `}
                <Typography
                  variant="body2"
                  component="span"
                  className={classes.highlight}
                >
                  {activity.trackable.reportedTagPictureTitle}
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
        button
        onClick={() => {
          this.props.history.push({
            pathname: `/pictures/${activity.trackable.medium.id}`
          });
          this.props.onClose();
        }}
      >
        <FursuitAvatar avatar={activity.trackable.medium.thumbnail} />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                {`Your Fursuit ${
                  activity.trackable.fursuit.name
                } has been Tagged in Media!`}
              </Typography>
            </React.Fragment>
          }
          secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  renderAssetRequestAccepted(activity) {
    const { classes } = this.props;

    return (
      <ListItem key={activity.id}>
        <UserAvatar
          modAvatar={require("images/pixel/Notification Avatar - Reports (General Admin Account) - Icon.png")}
          size={64}
        />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                {`Your request to add the ${activity.trackable.assetType} ${
                  activity.trackable.assetName
                } has been approved!`}
              </Typography>
            </React.Fragment>
          }
          secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  renderAssetRequestRejected(activity) {
    const { classes } = this.props;

    return (
      <ListItem key={activity.id}>
        <UserAvatar
          modAvatar={require("images/pixel/Notification Avatar - Reports (General Admin Account) - Icon.png")}
          size={64}
        />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                {`Your request to add the ${activity.trackable.assetType} ${
                  activity.trackable.assetName
                } has been rejected. Please contact Support if you think this is a mistake.`}
              </Typography>
            </React.Fragment>
          }
          secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  renderFursuitClaimSuccess(activity) {
    const { classes } = this.props;

    return (
      <ListItem
        key={activity.id}
        button
        onClick={() => {
          this.props.history.push({
            pathname: `/fursuits/${activity.trackable.slug}`
          });
          this.props.onClose();
        }}
      >
        <FursuitAvatar avatar={activity.trackable.avatar} />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                {`You have succesfully Claimed ${activity.trackable.name}!`}
              </Typography>
            </React.Fragment>
          }
          secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  renderFursuitClaimReject(activity) {
    const { classes } = this.props;

    return (
      <ListItem
        key={activity.id}
        button
        onClick={() => {
          this.props.history.push({
            pathname: `/fursuits/${activity.trackable.slug}`
          });
          this.props.onClose();
        }}
      >
        <FursuitAvatar avatar={activity.trackable.avatar} />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                {`Your Claim for ${
                  activity.trackable.name
                } has been rejected. Please contact Support if you think this is a mistake.`}
              </Typography>
            </React.Fragment>
          }
          secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  renderMakerClaimSuccess(activity) {
    const { classes } = this.props;

    return (
      <ListItem
        key={activity.id}
        button
        onClick={() => {
          this.props.history.push({
            pathname: `/makers/${activity.trackable.slug}`
          });
          this.props.onClose();
        }}
      >
        <MakerAvatar avatar={activity.trackable.avatar} />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                {`You have succesfully Claimed ${activity.trackable.name}!`}
              </Typography>
            </React.Fragment>
          }
          secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  renderMakerClaimReject(activity) {
    const { classes } = this.props;

    return (
      <ListItem
        key={activity.id}
        button
        onClick={() => {
          this.props.history.push({
            pathname: `/makers/${activity.trackable.slug}`
          });
          this.props.onClose();
        }}
      >
        <MakerAvatar avatar={activity.trackable.avatar} />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                {`Your Claim for ${
                  activity.trackable.name
                } has been rejected. Please contact Support if you think this is a mistake.`}
              </Typography>
            </React.Fragment>
          }
          secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  renderMakerCommissionsOpen(activity) {
    const { classes } = this.props;

    return (
      <ListItem
        key={activity.id}
        button
        onClick={() => {
          this.props.history.push({
            pathname: `/makers/${activity.trackable.slug}`
          });
          this.props.onClose();
        }}
      >
        <MakerAvatar avatar={activity.trackable.avatar} />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                {`The Studio ${
                  activity.trackable.name
                } has just opened for commissions!`}
              </Typography>
            </React.Fragment>
          }
          secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  renderAdvertSuccess(activity) {
    const { classes } = this.props;

    return (
      <a
        href={`${process.env.SITE_URL}/adverts`}
        style={{ textDecoration: "none" }}
      >
        <ListItem key={activity.id} button>
          <MakerAvatar avatar={activity.trackable.file} />
          <ListItemText
            primary={
              <React.Fragment>
                <Typography variant="body1">
                  {`Your Advert (#${
                    activity.trackable.id.split("-")[0]
                  }) was approved! Toggle visibility through your advertiser dashboard.`}
                </Typography>
              </React.Fragment>
            }
            secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
          />
        </ListItem>
      </a>
    );
  }

  renderAdvertReject(activity) {
    const { classes } = this.props;

    return (
      <a
        href={`${process.env.SITE_URL}/adverts`}
        style={{ textDecoration: "none" }}
      >
        <ListItem key={activity.id} button>
          <MakerAvatar avatar={activity.trackable.file} />
          <ListItemText
            primary={
              <React.Fragment>
                <Typography variant="body1">
                  {`Your Advert (#${
                    activity.trackable.id.split("-")[0]
                  }) was rejected. Check your Advertiser Dashboard for more information.`}
                </Typography>
              </React.Fragment>
            }
            secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
          />
        </ListItem>
      </a>
    );
  }

  renderSponsorshipEnded(activity) {
    const { classes } = this.props;

    return (
      <ListItem key={activity.id}>
        <UserAvatar
          modAvatar={require("images/pixel/Header - Sponsorship Successful Pop-up icon.png")}
          size={64}
        />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                {`Your Sponsorship expired.`}
              </Typography>
            </React.Fragment>
          }
          secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  renderSponsorshipCanceled(activity) {
    const { classes } = this.props;

    return (
      <ListItem key={activity.id}>
        <UserAvatar
          modAvatar={require("images/pixel/Header - Sponsorship Successful Pop-up icon.png")}
          size={64}
        />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                {`Your Sponsorship was canceled. You will remain a Sponsor until the end of your plan period.`}
              </Typography>
            </React.Fragment>
          }
          secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  renderSponsorshipStarted(activity) {
    const { classes } = this.props;

    return (
      <ListItem key={activity.id}>
        <UserAvatar
          modAvatar={require("images/pixel/Header - Sponsorship Successful Pop-up icon.png")}
          size={64}
        />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                {`You are now a Scritch Sponsor! Thank you so much!`}
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
      case "fave.create":
        return this.renderFaveCreate(activity);
      case "follow.create":
        return this.renderFollowCreate(activity);
      case "comment.create":
        return this.renderCommentCreate(activity);
      case "report.create":
        return this.renderReportCreate(activity);
      case "medium_report.create":
        return this.renderMediumReportCreate(activity);
      case "comment_report.create":
        return this.renderCommentReportCreate(activity);
      case "tag_report.create":
        return this.renderTagReportCreate(activity);
      case "fursuit_medium.create":
        return this.renderFursuitMediumCreate(activity);
      case "fursuit.claim_success":
        return this.renderFursuitClaimSuccess(activity);
      case "fursuit.claim_reject":
        return this.renderFursuitClaimReject(activity);
      case "maker.claim_success":
        return this.renderMakerClaimSuccess(activity);
      case "maker.claim_reject":
        return this.renderMakerClaimReject(activity);
      case "maker.commissions_open":
        return this.renderMakerCommissionsOpen(activity);
      case "advert.approved":
        return this.renderAdvertSuccess(activity);
      case "advert.rejected":
        return this.renderAdvertReject(activity);
      case "user.sponsorship_ended":
        return this.renderSponsorshipEnded(activity);
      case "user.sponsorship_canceled":
        return this.renderSponsorshipCanceled(activity);
      case "user.sponsorship_started":
        return this.renderSponsorshipStarted(activity);
      case "fursuit_subscription.create":
        return this.renderFursuitFollowed(activity);
      case "asset_request.accepted":
        return this.renderAssetRequestAccepted(activity);
      case "asset_request.rejected":
        return this.renderAssetRequestRejected(activity);
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
            if (loading || error || !data) {
              console.log("e", error);
              console.log("lo", loading);
              console.log("d", data);
              console.log("o", offset);
              console.log("li", limit);
              return null;
            }

            console.log("d", data);
            return (
              <React.Fragment>
                {!data.activities || data.activities.length === 0 ? (
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
                          !data.activities ||
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
