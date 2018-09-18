import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import randomColor from 'randomcolor';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  avatar: {
    display: 'flex',
    color: theme.palette.text.primary,
    width: 48,
    height: 48,
    borderRadius: 24
  },
});

const DefaultAvatar = (props) => {
  return (
    <Avatar
      className={props.classes.avatar}
      style={{
        backgroundColor: randomColor({ luminosity: 'dark', seed: props.text, hue: 'red' }),
      }}
    >
      {props.text[0]}
    </Avatar>
  );
}

export default withStyles(styles)(DefaultAvatar);
