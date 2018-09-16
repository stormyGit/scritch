import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  brand: {
    fontFamily: "'Monoton', cursive",
    fontSize: '2.5em',
  },
})

const Logo = ({ classes, ...props }) => (
  <Typography variant="title" color="inherit" component={'span'} noWrap className={classes.brand} {...props}>
    {process.env.SITE_NAME}
  </Typography>
)

export default withStyles(styles)(Logo);
