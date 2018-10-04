import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  colorSecondary: {
    width: '100%',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    zIndex: 5,
    display: 'none'
  }
});

const GlobalProgress = ({ absolute, ...props }) => (
  <LinearProgress
    color={"secondary"}
    style={{
      position: absolute ? 'absolute' : 'fixed'
    }}
    {...props}
    className="globalProgress"
  />
);

export default withStyles(styles)(GlobalProgress);
