import React from "react";
import {Link, withRouter} from "react-router-dom";
import ResponsiveDialog from "../Global//ResponsiveDialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import GlobalProgress from "../Global/GlobalProgress";

const styles = theme => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
  text: {
    fontWeight: 200
  }
});

function MediumDataDialog(props) {
  const {classes, width, open, onClose, medium} = props;
  if (!medium) return null;

  return (
    <ResponsiveDialog open={open} onClose={onClose}>
      <GlobalProgress absolute/>
      <DialogTitle>Media Information</DialogTitle>
      <DialogContent style={{paddingBottom: 5}}>
        <Grid container spacing={1}>
          {medium.photographerSlug && (
            <Grid item xs={12}>
              <DialogContentText>Captured By</DialogContentText>
              <Typography
                gutterBottom
                variant="h6"
                component="h4"
                className={classes.text}
                noWrap
              >
                <Link
                  to={`/${medium.photographerSlug}`}
                  className={classes.link}
                >
                  {medium.photographerSlug}
                </Link>
              </Typography>
            </Grid>
          )}
          {medium.photographerString && (
            <Grid item xs={12}>
              <DialogContentText>Captured By</DialogContentText>
              <Typography
                gutterBottom
                variant="h6"
                component="h4"
                className={classes.text}
                noWrap
              >
                {medium.photographerString}
              </Typography>
            </Grid>
          )}
          {medium.edition && (
            <Grid item xs={12}>
              <DialogContentText>Event (Edition)</DialogContentText>
              <Typography
                gutterBottom
                variant="h6"
                component="h4"
                className={classes.text}
                noWrap
              >
                <Link
                  to={`/events/${medium.edition.event.slug}?edition=${medium.edition.id}`}
                  className={classes.link}
                >
                  {medium.edition.event.name} ({medium.edition.name})
                </Link>
              </Typography>
            </Grid>
          )}
          {medium.subEvent && (
            <Grid item xs={12}>
              <DialogContentText>Sub Event</DialogContentText>
              <Typography
                gutterBottom
                variant="h6"
                component="h4"
                className={classes.text}
                noWrap
              >
                {medium.subEvent.name}
              </Typography>
            </Grid>
          )}
          {medium.category && (
            <Grid item xs={12}>
              <DialogContentText>Category</DialogContentText>
              <Typography
                gutterBottom
                variant="h6"
                component="h4"
                className={classes.text}
                noWrap
              >
                {medium.category.name}
              </Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </ResponsiveDialog>
  );
}

export default withStyles(styles)(withRouter(MediumDataDialog));
