import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    width: '100%'
  },
});

const EmptyList = ({ classes, label, className }) => (
  <Grid container alignItems="center" justify="center" className={className}>
    <Grid container item xs={12}>
      <Typography variant="caption" align="center" className={classes.title}>
        {label}
      </Typography>
    </Grid>
  </Grid>
)

export default withStyles(styles)(EmptyList);
