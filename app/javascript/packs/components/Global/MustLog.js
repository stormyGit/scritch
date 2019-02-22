import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%"
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    width: "100%",
    fontWeight: 200
  },
  padder: {
    padding: 100
  }
});

const MustLog = ({ classes, className }) => (
  <React.Fragment>
    <div className={classes.padder} />
    <Grid container alignItems="center" justify="center" className={className}>
      <Grid container item xs={12}>
        <Typography variant="h4" align="center" className={classes.title}>
          You must be logged in to access this page
        </Typography>
      </Grid>
    </Grid>
    <div className={classes.padder} />
  </React.Fragment>
);

export default withStyles(styles)(MustLog);
