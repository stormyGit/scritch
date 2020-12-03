import React from "react";
import {withStyles} from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import withCurrentSession from "../withCurrentSession";
import {Query} from "react-apollo";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";

import ChatIcon from "@material-ui/icons/Chat";
import ChatNoneIcon from "@material-ui/icons/ChatBubbleOutline";

import {GET_UNREAD_ACTIVITY_COUNT} from "../../queries/activityQueries";
import {GET_UNREAD_CHATS_COUNT} from "../../queries/chatQueries";

const styles = theme => ({
  rightButton: {
    display: "inline-block"
  },
  iconButton: {
    color: "white"
  }

});

class ChatButton extends React.Component {
  state = {
    uploadDialog: true
  };

  render() {
    const { classes, currentSession, disabled } = this.props;

    return (
      <React.Fragment>
        {currentSession && (
          <div className={classes.rightButton}>
            <Query
              query={GET_UNREAD_CHATS_COUNT}
              pollInterval={parseInt(process.env.UNREAD_ACTIVITY_COUNT_REFRESH_INTERVAL)}
            >
              {({ loading, error, data }) => (
                <div>
                  <IconButton  className={classes.iconButton} disabled={disabled} onClick={this.props.onClick}>
                    {loading || !data || data.unreadChatsCount <= 0 ? (
                      <ChatNoneIcon color="inherit"/>
                    ) : (
                      <Badge badgeContent={data.unreadChatsCount} color="secondary">
                        <ChatIcon />
                      </Badge>
                    )}
                  </IconButton>
                </div>
              )}
            </Query>
          </div>
        )}
        {false && (this.props.width === "xl" || this.props.width === "lg") && currentSession && (
          <div className={classes.rightButton}>
            <Query
              query={GET_UNREAD_ACTIVITY_COUNT}
              pollInterval={parseInt(process.env.UNREAD_ACTIVITY_COUNT_REFRESH_INTERVAL)}
            >
              {({ loading, error, data }) => {
                if (loading || error || !data) return null;
                if (data.unreadChatsCount <= 0)
                  return (
                    <Button
                      disabled={disabled}
                      onClick={this.props.onClick}
                      color="white"
                      className={classes.buttonPad}
                    >
                      Messages
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
                        badgeContent={data.unreadChatsCount}
                        color="secondary"
                      >
                        Messages
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

export default withStyles(styles)(withCurrentSession(withWidth()(ChatButton)));
