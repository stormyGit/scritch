import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import randomColor from 'randomcolor';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  avatar: {
    display: 'flex'
  },
};

const DefaultAvatar = (props) => {
  let sizeStyle;
  if (props.bigSquared) {
    sizeStyle = {
      margin: 2,
      height: 200,
      width: 200,
      borderRadius: 0,
      fontSize: '4em',
    };
  } else {
    sizeStyle = {
      width: 48,
      height: 48,
      borderRadius: 24,
      fontSize: '1em'
    };
  }

  return (
    <Avatar
      className={props.classes.avatar}
      style={{
        backgroundColor: randomColor({luminosity: 'dark', seed: props.text}),
        ...sizeStyle
      }}
    >
      {props.text[0]}
    </Avatar>
  );
}

export default withStyles(styles)(DefaultAvatar);
