import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

import DefaultAvatar from './DefaultAvatar';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paper: {
    backgroundColor: 'black',
    border: '2px solid white',
    borderRadius: '100%',
    width: 64,
    height: 64,
    overflow: 'hidden'
  },
  avatar: {
    fontSize: 30,
    width: 60,
    height: 60,
  }
});

class ProfileAvatar extends React.Component {
  render() {
    const { avatar, slug, classes, className } = this.props;
    return (
      <div className={className}>
        <Paper className={classes.paper}>
          {avatar ?
            <Avatar src={avatar} className={classes.avatar} /> :
            <DefaultAvatar className={classes.avatar} text={slug} size={56} key="avatar" />}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(ProfileAvatar);
