import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";

import DefaultFursuitAvatar from "./DefaultFursuitAvatar";

import { withStyles } from "@material-ui/core/styles";

const DEFAULT_SIZE = 64;

const styles = theme => ({
  paper: {
    backgroundColor: "black",
    border: "2px solid white",
    borderRadius: "100%",
    overflow: "hidden"
  },
  avatar: {
    fontSize: 30
  }
});

class FursuitAvatar extends React.Component {
  render() {
    const { avatar, specy, classes, className, size } = this.props;
    const effectiveSize = size || DEFAULT_SIZE;

    return (
      <div className={className}>
        <Paper
          className={classes.paper}
          style={{ width: effectiveSize, height: effectiveSize }}
        >
          {avatar ? (
            <Avatar
              src={avatar}
              className={classes.avatar}
              style={{ width: effectiveSize - 4, height: effectiveSize - 4 }}
            />
          ) : (
            <DefaultFursuitAvatar
              className={classes.avatar}
              specy={specy}
              size={effectiveSize - 4}
              key="avatar"
            />
          )}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(FursuitAvatar);
