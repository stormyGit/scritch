import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  duration: {
    position: "absolute",
    right: theme.spacing.unit,
    bottom: theme.spacing.unit,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    borderRadius: 3,
    color: "white",
    height: 19
  }
});

const Gif = ({ classes }) => (
  <Typography variant="body2" className={classes.duration}>
    GIF
  </Typography>
);

export default withStyles(styles)(Gif);
