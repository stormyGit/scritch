import React from 'react';
import Avatar from '@material-ui/core/Avatar';

import DefaultAvatar from './DefaultAvatar';
import OnlineIcon from '@material-ui/icons/FiberManualRecord';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    right: -2,
    top: -2,
  },
  onlineIcon: {
    color: 'green',
    fontSize: 16
  }
});

const UserAvatar = ({ user, classes }) => (
  <div style={{ position: 'relative' }}>
    {user.avatar_tiny_url ?
      <Avatar src={user.avatar_tiny_url} /> :
      <DefaultAvatar text={(user.name || "").replace(/[\W_]+/g, "")[0] || "*"} size={56} key="avatar" />}
    {user.online ?
      <div className={classes.iconContainer}>
        <OnlineIcon className={classes.onlineIcon} />
      </div> : null
    }
  </div>
)

export default withStyles(styles)(UserAvatar);
