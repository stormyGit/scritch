import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  colorSecondary: {
    width: '100%',
    backgroundColor: 'transparent'
  }
});

const GlobalProgress = (props) => (
  <LinearProgress color={"secondary"} {...props} />
);

export default withStyles(styles)(GlobalProgress);
