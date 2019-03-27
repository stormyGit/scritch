import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import withCurrentSession from "../withCurrentSession";
import dateFormat from "dateformat";

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

const MustLog = ({ classes, className, currentSession }) => (
  <React.Fragment>
    <div className={classes.padder} />
    <Grid container alignItems="center" justify="center" className={className}>
      <Grid container item xs={12}>
        {!currentSession && (
          <Typography variant="h4" align="center" className={classes.title}>
            You must be logged in to access this page
          </Typography>
        )}
        {currentSession && currentSession.user.suspendedUser && (
          <React.Fragment>
            <Typography variant="h4" align="center" className={classes.title}>
              Your account has been suspended for the following reason:
            </Typography>
            <Typography variant="h5" align="center" className={classes.title}>
              {currentSession.user.suspendedUser.reason}
            </Typography>
            <Typography variant="h4" align="center" className={classes.title}>
              You cannot access this page until hiatus is over{" "}
              {`(on: ${dateFormat(
                new Date(currentSession.user.suspendedUser.limit * 1000),
                "mmmm dS, yyyy"
              )})`}
            </Typography>
          </React.Fragment>
        )}
      </Grid>
    </Grid>
    <div className={classes.padder} />
  </React.Fragment>
);

export default withStyles(styles)(withCurrentSession(MustLog));
