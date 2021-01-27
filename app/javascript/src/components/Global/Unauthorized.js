import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import withCurrentSession from "../withCurrentSession";
import dateFormat from "dateformat";
import withWidth from "@material-ui/core/withWidth";

const styles = theme => ({
  root: {
    width: "100%"
  },
  title: {
    marginTop: theme.spacing(2),
    width: "100%",
    fontWeight: 200
  },
  padder: {
    padding: 56
  },
  padderSmall: {
    padding: 8
  }
});

const MustLog = ({ classes, className, currentSession, width }) => (
  <React.Fragment>
    <div
      className={
        width === "xs" || width === "sm" ? classes.padderSmall : classes.padder
      }
    />
    <Grid container spacing={1} alignItems="center" justify="center">
      <Grid item xs={12} style={{ textAlign: "center", padding: 8, margin: 8 }}>
        {!currentSession && (
          <Typography variant="h4" align="center" className={classes.title}>
            You must be logged in to access this page
          </Typography>
        )}
        {currentSession && currentSession.user.suspendedUser && (
          <React.Fragment>
            <div style={{ textAlign: "center" }}>
              <img
                style={{ width: "200px", height: "200px", textAlign: "center" }}
                src={require("images/pixel/Header - Suspension Message.png")}
              />
            </div>
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
    <div
      className={
        width === "xs" || width === "sm" ? classes.padderSmall : classes.padder
      }
    />
  </React.Fragment>
);

export default withStyles(styles)(withCurrentSession(withWidth()(MustLog)));
