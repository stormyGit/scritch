import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import randomColor from 'randomcolor';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  avatar: {
    display: 'flex',
    color: '#fff'
  },
});

const DefaultAvatar = ({ classes, text, className }) => {
  return (
    <Avatar
      className={[classes.avatar, className].join(' ')}
      style={{
        backgroundColor: randomColor({ luminosity: 'dark', seed: text }),
      }}
    >
      {text[0].toUpperCase()}
    </Avatar>
  );
}

export default withStyles(styles)(DefaultAvatar);
