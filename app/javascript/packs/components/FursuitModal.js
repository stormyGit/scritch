import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { Link, withRouter } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import GlobalProgress from "./GlobalProgress";
import { DELETE_MEDIUM } from "../queries";

const styles = theme => ({
  link: {
    textDecoration: "none"
  }
});

class FursuitModal extends React.Component {
  render() {
    const { classes, width, open, onClose, fursuit } = this.props;

    if (!fursuit) return null;
    return (
      <Dialog open={open} onClose={onClose}>
        <GlobalProgress absolute />
        <DialogTitle>{fursuit.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>DialogContentText</DialogContentText>
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
      </Dialog>
    );
  }
}

export default withStyles(styles)(withRouter(FursuitModal));
