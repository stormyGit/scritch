import React from 'react';
import Avatar from '@material-ui/core/Avatar';

import DefaultAvatar from './DefaultAvatar';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  avatar: {
    background: 'black'
  }
});

const UserAvatar = ({ user, classes }) => (
  <div>
    {user.avatar ?
      <Avatar src={user.avatar} className={classes.avatar} /> :
      <DefaultAvatar text={user.slug} size={40} key="avatar" />}
  </div>
)

export default withStyles(styles)(UserAvatar);
