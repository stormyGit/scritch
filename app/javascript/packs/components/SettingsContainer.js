import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    zIndex: 2,
  },
  title: {
    marginBottom: theme.spacing.unit * 1,
    fontSize: '0.8em'
  },
  settingsPaper: {
    width: '100%',
  }
});

class SettingsContainer extends React.PureComponent {
  render() {
    const { title, classes, children, lg, xs } = this.props;

    return (
      <Grid container alignItems="center" justify="center" className={classes.root}>
        <Grid container item xs={xs || 12} lg={lg || 6}>
          <Typography variant="caption" className={classes.title}>
            {title}
          </Typography>
          <Paper className={classes.settingsPaper} elevation={1}>
            {children}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SettingsContainer);
