import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    marginRight: theme.spacing(1)
  },
  button: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  withMargin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5)
  }
});

const LoadMoreButton = ({ classes, noMargin, spacing, ...props }) => (
  <Grid container spacing={spacing || 0} justify="center" className={classes.root}>
    <Grid item xs={12} lg={12}>
      <Button
        fullWidth
        size="large"
        className={[classes.button, noMargin ? "" : classes.withMargin].join(" ")}
        {...props}
      >
        Load more
      </Button>
    </Grid>
  </Grid>
);
export default withStyles(styles)(LoadMoreButton);
