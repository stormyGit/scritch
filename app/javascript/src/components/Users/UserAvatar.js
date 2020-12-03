import React from "react";
import Avatar from "@material-ui/core/Avatar";

import DefaultAvatar from "./DefaultAvatar";

import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  avatar: {
    background: "black"
  }
});

const UserAvatar = ({ user, classes, size, modAvatar }) => (
  <div>
    {user && user.avatar ? (
      <Avatar
        src={user.avatar}
        className={classes.avatar}
        style={size && { width: size - 4, height: size - 4 }}
      />
    ) : modAvatar ? (
      <Avatar
        src={modAvatar}
        style={size && { width: size - 4, height: size - 4 }}
      />
    ) : (
      <DefaultAvatar text={user.slug} size={size ? size : 40} key="avatar" />
    )}
  </div>
);

export default withStyles(styles)(UserAvatar);
