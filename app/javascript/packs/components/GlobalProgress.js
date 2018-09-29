import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  colorSecondary: {
    width: '100%',
    backgroundColor: 'transparent',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 5
  }
});

const GlobalProgress = (props) => (
  <LinearProgress color={"secondary"} {...props} id="globalProgress" />
);

export default withStyles(styles)(GlobalProgress);
