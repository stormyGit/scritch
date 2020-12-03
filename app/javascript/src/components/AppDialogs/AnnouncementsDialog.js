import React from "react";
import { Query, withApollo } from "react-apollo";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import timeAgo from "../../util/timeAgo";
import dayjs from "dayjs";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";
import EmptyList from "../Global/EmptyList";
import LoadMoreButton from "../Global/LoadMoreButton";
import FormattedText from "../Global/FormattedText";
import UserAvatar from "../Users/UserAvatar";
import withCurrentSession from "../withCurrentSession";

import { GET_ANNOUNCEMENTS } from "../../queries/announcementQueries";
import { READ_ANNOUNCEMENTS } from "../../queries/announcementMutations";

const styles = theme => ({
  emptyNoficationContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  emptyNoficationIcon: {
    // fontSize: 2,
    display: "block",
    fontSize: "4em",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(1),
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
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  commentBody: {
    fontStyle: "italic"
  },
  announcement: {
    alignItems: "flex-start"
  }
});

class AnnouncementsDialog extends React.Component {
  state = {
    hasMore: true
  };

  componentDidMount() {}

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open && nextProps.currentSession) {
      this.props.client.mutate({
        mutation: READ_ANNOUNCEMENTS,
        variables: { input: {} },
        update: cache => {
          const { session } = cache.readQuery({ query: GET_SESSION });
          cache.writeQuery({
            query: GET_SESSION,
            data: {
              session: {
                ...session,
                user: { ...session.user, unreadAnnouncementsCount: 0 }
              }
            }
          });
        }
      });
    }
  }

  render() {
    const { classes, match, width } = this.props;
    let offset = 0;
    let limit = parseInt(process.env.ANNOUNCEMENTS_PAGE_SIZE);

    return (
      <ResponsiveDialog
        open={this.props.open}
        onClose={this.props.onClose}
        className={classes.root}
      >
        <GlobalProgress absolute />
        <Query query={GET_ANNOUNCEMENTS} variables={{ offset, limit }}>
          {({ loading, error, data, fetchMore }) => {
            if (loading || error || !data.announcements) {
              return null;
            }

            return (
              <React.Fragment>
                {data.announcements.length === 0 ? (
                  <DialogContent className={classes.emptyNoficationContainer}>
                    <NotificationsNoneIcon
                      className={classes.emptyNoficationIcon}
                    />
                    <EmptyList label={`No recent announcement`} />
                  </DialogContent>
                ) : (
                  <DialogContent className={classes.notificationsContainer}>
                    <List>
                      {data.announcements.map(announcement => (
                        <ListItem
                          key={announcement.id}
                          className={classes.announcement}
                        >
                          <UserAvatar user={announcement.sender} />
                          <ListItemText
                            primary={<FormattedText text={announcement.body} />}
                            secondary={timeAgo.format(
                              dayjs(announcement.createdAt).toDate()
                            )}
                          />
                        </ListItem>
                      ))}
                    </List>
                    {data.announcements.length % limit === 0 &&
                      this.state.hasMore && (
                        <div className={classes.loadMoreContainer}>
                          <LoadMoreButton
                            noMargin
                            onClick={() => {
                              fetchMore({
                                variables: {
                                  offset: data.announcements.length,
                                  limit
                                },
                                updateQuery: (prev, { fetchMoreResult }) => {
                                  if (!fetchMoreResult) return prev;

                                  if (
                                    fetchMoreResult.announcements.length === 0
                                  ) {
                                    this.setState({ hasMore: false });
                                  } else {
                                    return Object.assign({}, prev, {
                                      announcements: [
                                        ...prev.announcements,
                                        ...fetchMoreResult.announcements
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

export default withStyles(styles)(
  withApollo(withRouter(withCurrentSession(AnnouncementsDialog)))
);
