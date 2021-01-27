import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  duration: {
    position: "absolute",
    right: theme.spacing(1),
    bottom: theme.spacing(1),
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderRadius: 3,
    color: "white",
    height: 19
  }
});

function formatDuration(duration) {
  const date = new Date(duration * 1000);
  let hh = date.getUTCHours();
  let mm = date.getUTCMinutes();
  let ss = date.getSeconds();

  if (duration < 60) {
    return `${ss}s`;
  }

  if (hh < 10) {
    hh = "0" + hh;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (ss < 10) {
    ss = "0" + ss;
  }

  if (duration < 3600) {
    return `${mm}:${ss}`;
  }

  return `${hh}:${mm}:${ss}`;
}

const Duration = ({ duration, classes }) => (
  <Typography variant="body2" className={classes.duration}>
    {formatDuration(duration)}
  </Typography>
);

export default withStyles(styles)(Duration);
