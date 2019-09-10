import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import GlobalProgress from "../Global/GlobalProgress";
import { GET_MEDIUM } from "../../queries/mediaQueries";
import { Query } from "react-apollo";

const styles = theme => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
  text: {
    fontWeight: 200
  },
  masterGridOnLoad: {
    padding: theme.spacing.unit * 4,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  mediaH: {
    width: "100%",
    maxHeight: "calc(100vh - 56px)",
    objectFit: "contain"
  },
  mediaHflip: {
    transform: "rotate(180deg)",
    width: "100%",
    maxHeight: "calc(100vh - 56px)",
    objectFit: "contain"
  },
  mediaVleft: {
    transform: "rotate(90deg)",
    width: "calc(100vh - 56px)",
    height: "calc(100vh - 56px)",
    maxHeight: "calc(100vh - 56px)",
    objectFit: "contain",
    margin: "auto",
    display: "block"
  },
  mediaVright: {
    transform: "rotate(-90deg)",
    width: "calc(100vh - 56px)",
    height: "calc(100vh - 56px)",
    maxHeight: "calc(100vh - 56px)",
    objectFit: "contain",
    margin: "auto",
    display: "block"
  }
});

class MediumDialog extends React.Component {
  render() {
    const { classes, width, open, onClose, mediumId } = this.props;
    if (!mediumId) return null;

    return (
      <ResponsiveDialog open={open} onClose={onClose} size={1200}>
        <DialogContent>
          <Query query={GET_MEDIUM} variables={{ id: mediumId }}>
            {({ error, loading, data }) => {
              if (error || loading) {
                return (
                  <Grid container spacing={24}>
                    <Grid
                      item
                      xs={12}
                      lg={9}
                      className={classes.masterGridOnLoad}
                    >
                      <CircularProgress />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      lg={3}
                      className={classes.masterGridOnLoad}
                    >
                      <CircularProgress />
                    </Grid>
                  </Grid>
                );
              }
              const medium = data ? data.medium : null;

              if (!medium) {
                return (
                  <Grid container spacing={8}>
                    <Grid item xs={12} className={classes.masterGrid}>
                      <Typography variant="h6">
                        Something went wrong :(
                      </Typography>
                    </Grid>
                  </Grid>
                );
              }

              var orientation;
              if (medium) {
                if (medium.exif && JSON.parse(medium.exif).Orientation === "6")
                  orientation = classes.mediaVleft;
                else if (
                  medium.exif &&
                  JSON.parse(medium.exif).Orientation === "8"
                )
                  orientation = classes.mediaVright;
                else if (
                  medium.exif &&
                  JSON.parse(medium.exif).Orientation === "3"
                )
                  orientation = classes.mediaHflip;
                else orientation = classes.mediaH;
              } else orientation = classes.mediaH;

              return (
                <Grid container spacing={8}>
                  <Grid item xs={12} lg={9}>
                    {medium.resized.substr(
                      medium.resized.lastIndexOf(".") + 1
                    ) === "mp4" && (
                      <video
                        loop="loop"
                        autoplay="autoplay"
                        onContextMenu={e => {
                          e.preventDefault();
                        }}
                        className={orientation}
                        src={medium.resized}
                      />
                    )}
                    {medium.resized.substr(
                      medium.resized.lastIndexOf(".") + 1
                    ) !== "mp4" && (
                      <img
                        onClick={() => {}}
                        onContextMenu={e => {
                          e.preventDefault();
                        }}
                        className={orientation}
                        src={`${medium.resized}`}
                        title={medium.title}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    Content
                  </Grid>
                </Grid>
              );
            }}
          </Query>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(withRouter(MediumDialog));
