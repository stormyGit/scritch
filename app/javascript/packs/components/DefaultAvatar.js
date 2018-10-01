import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import randomColor from 'randomcolor';
import { withStyles } from '@material-ui/core/styles';

const DEFAULT_SIZE = 64;

const styles = theme => ({
  avatar: {
    display: 'flex',
    color: '#fff'
  },
});

const DefaultAvatar = ({ classes, text, className, size }) => {
  const effectiveSize = size || DEFAULT_SIZE;

  return (
    <Avatar
      className={[classes.avatar, className].join(' ')}
      style={{
        backgroundColor: randomColor({ luminosity: 'dark', seed: text }),
        width: effectiveSize,
        height: effectiveSize
      }}
    >
      {text[0].toUpperCase()}
    </Avatar>
  );
}

export default withStyles(styles)(DefaultAvatar);
