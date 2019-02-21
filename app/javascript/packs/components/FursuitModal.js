import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { Link, withRouter } from "react-router-dom";
import ResponsiveDialog from "./ResponsiveDialog";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import GlobalProgress from "./GlobalProgress";

const styles = theme => ({
  link: {
    textDecoration: "none"
  },
  text: {
    fontWeight: 200
  }
});

class FursuitModal extends React.Component {
  render() {
    const { classes, width, open, onClose, fursuit } = this.props;
    console.log(fursuit);
    if (!fursuit) return null;
    return (
      <ResponsiveDialog open={open} onClose={onClose}>
        <GlobalProgress absolute />
        <DialogTitle>{fursuit.name}</DialogTitle>
        <DialogContent>
          <Grid container spacing={8}>
            <Grid item xs={6}>
              <DialogContentText>Species</DialogContentText>
              <Typography
                gutterBottom
                variant="h6"
                component="h4"
                className={classes.text}
                noWrap
              >
                {fursuit.fursuitSpecy.name}
              </Typography>
              <DialogContentText>Made by</DialogContentText>
              <Typography
                gutterBottom
                variant="h6"
                component="h4"
                className={classes.text}
                noWrap
              >
                {fursuit.makers[0] ? fursuit.makers[0].name : "Unknown"}
              </Typography>
              <DialogContentText>Created in</DialogContentText>
              <Typography
                gutterBottom
                variant="h6"
                component="h4"
                className={classes.text}
                noWrap
              >
                {fursuit.creationYear ? fursuit.creationYear : "Unknown"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <DialogContentText>Species</DialogContentText>
              <Typography
                gutterBottom
                variant="h6"
                component="h4"
                className={classes.text}
                noWrap
              >
                {fursuit.fursuitSpecy.name}
              </Typography>
              <DialogContentText>Made by</DialogContentText>
              <Typography
                gutterBottom
                variant="h6"
                component="h4"
                className={classes.text}
                noWrap
              >
                {fursuit.makers[0] ? fursuit.makers[0].name : "Unknown"}
              </Typography>
              <DialogContentText>Created in</DialogContentText>
              <Typography
                gutterBottom
                variant="h6"
                component="h4"
                className={classes.text}
                noWrap
              >
                {fursuit.creationYear ? fursuit.creationYear : "Unknown"}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} autoFocus>
            Close
          </Button>
          <Link
            to={`/fursuits/${fursuit.slug}-${fursuit.id}`}
            className={classes.link}
          >
            <Button onClick={onClose} autoFocus>
              View full page
            </Button>
          </Link>
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(withRouter(FursuitModal));
