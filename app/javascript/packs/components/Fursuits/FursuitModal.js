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
import FursuitAvatar from "./FursuitAvatar";

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

          var image;

          if (localFursuit.avatar) image = localFursuit.avatar;
          else {
            if (localFursuit.isHybrid)
              image = require("images/species/Hybrid.png");
            else
              try {
                image = require(`images/species/${
                  localFursuit.fursuitSpecy.name
                }.png`);
              } catch (ex) {
                image = require("images/species/Missingno (No Avatar Graphic Found).png");
              }
          }

          return (
            <ResponsiveDialog open={open} onClose={onClose}>
              <GlobalProgress absolute />
              <DialogTitle>{localFursuit.name}</DialogTitle>
              <DialogContent>
                <Grid container spacing={8}>
                  <Grid item xs={5} />
                  <Grid item xs={2}>
                    <img src={image} style={{ width: "100%" }} />
                  </Grid>
                  <Grid item xs={5} />
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
                    <DialogContentText>Style</DialogContentText>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h4"
                      className={classes.text}
                      noWrap
                    >
                      {localFursuit.fursuitStyle
                        ? localFursuit.fursuitStyle.name
                        : "Unknown"}
                    </Typography>
                    <DialogContentText>Leg Type</DialogContentText>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h4"
                      className={classes.text}
                      noWrap
                    >
                      {localFursuit.fursuitLegType
                        ? localFursuit.fursuitLegType.name
                        : "Unknown"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <DialogContentText>Build</DialogContentText>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h4"
                      className={classes.text}
                      noWrap
                    >
                      {localFursuit.fursuitBuild
                        ? localFursuit.fursuitBuild.name
                        : "Unknown"}
                    </Typography>
                    <DialogContentText>Padding</DialogContentText>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h4"
                      className={classes.text}
                      noWrap
                    >
                      {localFursuit.fursuitPadding
                        ? localFursuit.fursuitPadding.name
                        : "Unknown"}
                    </Typography>
                    <DialogContentText>Fingers</DialogContentText>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h4"
                      className={classes.text}
                      noWrap
                    >
                      {localFursuit.fursuitFinger
                        ? localFursuit.fursuitFinger.name
                        : "Unknown"}
                    </Typography>
                    <DialogContentText>Base Color</DialogContentText>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h4"
                      className={classes.text}
                      noWrap
                    >
                      {localFursuit.baseColor
                        ? localFursuit.baseColor
                        : "Unknown"}
                    </Typography>
                    <DialogContentText>Eyes Color</DialogContentText>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h4"
                      className={classes.text}
                      noWrap
                    >
                      {localFursuit.eyesColor
                        ? localFursuit.eyesColor
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
                  to={`/fursuits/${localFursuit.slug}`}
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
