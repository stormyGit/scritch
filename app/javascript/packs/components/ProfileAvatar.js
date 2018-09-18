import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

import DefaultAvatar from './DefaultAvatar';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paper: {
    backgroundColor: 'black',
    border: '8px solid white',
    borderRadius: 200
  },
  avatar: {
    width: 200,
    height: 200,
  }
});

const ProfileAvatar = ({ user, classes, className }) => (
  <div className={className}>
    <Paper className={classes.paper}>
      {user.avatar ?
        <Avatar src={user.avatar} className={classes.avatar} /> :
        <DefaultAvatar text={(user.name || "").replace(/[\W_]+/g, "")[0] || "*"} size={56} key="avatar" />}
    </Paper>
  </div>
)

export default withStyles(styles)(ProfileAvatar);
