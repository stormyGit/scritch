import React from "react";
import {withStyles} from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import withCurrentSession from "../withCurrentSession";
import {Query} from "react-apollo";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";

import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";

import {GET_UNREAD_ACTIVITY_COUNT} from "../../queries/activityQueries";

const styles = () => ({
  rightButton: {
    display: "inline-block"
  },
  iconButton: {
    color: "white"
  }
});

class NotificationsButton extends React.Component {
  state = {
    uploadDialog: true
  };

  render() {
    const { classes, currentSession } = this.props;

    return (
      <React.Fragment>
        {currentSession && (
          <div className={classes.rightButton}>
            <Query
              query={GET_UNREAD_ACTIVITY_COUNT}
              pollInterval={parseInt(
                process.env.UNREAD_ACTIVITY_COUNT_REFRESH_INTERVAL
              )}
            >
              {({ loading, error, data }) => (
                <Tooltip title="Notifications">
                  <IconButton className={classes.iconButton} onClick={this.props.onClick}>
                    {loading || !data || data.unreadActivityCount <= 0 ? (
                      <NotificationsNoneIcon color="inherit" />
                    ) : (
                      <Badge
                        badgeContent={data.unreadActivityCount}
                        color="secondary"
                      >
                        <NotificationsIcon />
                      </Badge>
                    )}
                  </IconButton>
                </Tooltip>
              )}
            </Query>
          </div>
        )}
        {false &&
          (this.props.width === "xl" || this.props.width === "lg") &&
          currentSession && (
            <div className={classes.rightButton}>
              <Query
                query={GET_UNREAD_ACTIVITY_COUNT}
                pollInterval={parseInt(
                  process.env.UNREAD_ACTIVITY_COUNT_REFRESH_INTERVAL
                )}
              >
                {({ loading, error, data }) => {
                  if (loading || error || !data) return null;
                  if (data.unreadActivityCount <= 0)
                    return (
                      <Button
                        onClick={this.props.onClick}
                        color="white"
                        className={classes.buttonPad}
                      >
                        Notifications
                      </Button>
                    );
                  else
                    return (
                      <Button
                        onClick={this.props.onClick}
                        color="white"
                        className={classes.buttonPad}
                      >
                        <Badge
                          className={classes.badge}
                          badgeContent={data.unreadActivityCount}
                          color="secondary"
                        >
                          Notifications
                        </Badge>
                      </Button>
                    );
                }}
              </Query>
            </div>
          )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  withCurrentSession(withWidth()(NotificationsButton))
);
