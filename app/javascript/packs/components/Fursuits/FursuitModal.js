import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import ResponsiveDialog from "../Global//ResponsiveDialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import GlobalProgress from "../Global/GlobalProgress";
import { LOAD_FURSUIT } from "../../queries/fursuitQueries";
import { Query } from "react-apollo";

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
    if (!fursuit) return null;

    return (
      <Query
        query={LOAD_FURSUIT}
        variables={{
          id: fursuit.id
        }}
      >
        {({ loading, error, data }) => {
          if (!data.fursuit) return null;
          let localFursuit = data.fursuit;
          return (
            <ResponsiveDialog open={open} onClose={onClose}>
              <GlobalProgress absolute />
              <DialogTitle>{localFursuit.name}</DialogTitle>
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
                      {localFursuit.isHybrid
                        ? `Hybrid (${localFursuit.hybridSpecies
                            .map(e => e.name)
                            .join(", ")})`
                        : localFursuit.fursuitSpecy.name}
                    </Typography>
                    <DialogContentText>Made by</DialogContentText>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h4"
                      className={classes.text}
                      noWrap
                    >
                      {localFursuit.makers[0]
                        ? localFursuit.makers[0].name
                        : "Unknown"}
                    </Typography>
                    <DialogContentText>Created in</DialogContentText>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h4"
                      className={classes.text}
                      noWrap
                    >
                      {localFursuit.creationYear
                        ? localFursuit.creationYear
                        : "Unknown"}
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
                      {localFursuit.isHybrid
                        ? `Hybrid (${localFursuit.hybridSpecies
                            .map(e => e.name)
                            .join(", ")})`
                        : localFursuit.fursuitSpecy.name}
                    </Typography>
                    <DialogContentText>Made by</DialogContentText>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h4"
                      className={classes.text}
                      noWrap
                    >
                      {localFursuit.makers[0]
                        ? localFursuit.makers[0].name
                        : "Unknown"}
                    </Typography>
                    <DialogContentText>Created in</DialogContentText>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h4"
                      className={classes.text}
                      noWrap
                    >
                      {localFursuit.creationYear
                        ? localFursuit.creationYear
                        : "Unknown"}
                    </Typography>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose} autoFocus>
                  Close
                </Button>
                <Link
                  to={`/fursuits/${localFursuit.slug}-${localFursuit.id}`}
                  className={classes.link}
                >
                  <Button onClick={onClose} autoFocus>
                    View full page
                  </Button>
                </Link>
              </DialogActions>
            </ResponsiveDialog>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(withRouter(FursuitModal));
