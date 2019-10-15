import React from "react";
import { withApollo } from "react-apollo";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CameraIcon from "@material-ui/icons/CameraAlt";
import FlashIcon from "@material-ui/icons/FlashOn";
import TimerIcon from "@material-ui/icons/Timer";
import IsoIcon from "@material-ui/icons/Iso";
import DateIcon from "@material-ui/icons/DateRange";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRulerHorizontal } from "@fortawesome/free-solid-svg-icons";

import { withStyles } from "@material-ui/core/styles";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";
import withCurrentSession from "../withCurrentSession";

const styles = theme => ({
  text: {
    fontWeight: 200,
    padding: theme.spacing.unit * 4
  },
  link: {
    textDecoration: "none"
  },
  root: {
    textAlign: "center"
  },
  leftIcon: {
    fontSize: 25
  },
  iconGridRoot: {
    alignItems: "center"
  },
  iconGrid: {
    textAlign: "center"
  },
  textGrid: {
    paddingLeft: theme.spacing.unit
  }
});

const Spacer = <div style={{ padding: 8 }} />;
const SpacerWithHR = (
  <React.Fragment>
    <hr style={{ textAlign: "center", width: "90%" }} />
  </React.Fragment>
);

class ExifDialog extends React.Component {
  state = {};

  render() {
    const { classes, medium } = this.props;

    if (!medium.exif || Object.keys(JSON.parse(medium.exif)).length === 0)
      return null;
    var exif = JSON.parse(medium.exif);

    return (
      <ResponsiveDialog
        open={this.props.open}
        onClose={() => {
          this.props.onClose();
        }}
        size={500}
      >
        <GlobalProgress absolute />

        <DialogTitle>{`EXIF Data for picture #${
          medium.id.split("-")[0]
        }`}</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <Grid container spacing={8} className={classes.iconGridRoot}>
                <Grid item xs={2} className={classes.iconGrid}>
                  <ListItemIcon>
                    <DateIcon className={classes.leftIcon} />
                  </ListItemIcon>
                </Grid>
                <Grid item xs={10}>
                  <ListItemText
                    className={classes.textGrid}
                    primary={`Captured: ${exif.DateTimeOriginal}`}
                  />
                </Grid>
              </Grid>
            </ListItem>
            {SpacerWithHR}
            <ListItem>
              <Grid container spacing={8} className={classes.iconGridRoot}>
                <Grid item xs={2} className={classes.iconGrid}>
                  <ListItemIcon>
                    <CameraIcon className={classes.leftIcon} />
                  </ListItemIcon>
                </Grid>
                <Grid item xs={10}>
                  <ListItemText
                    className={classes.textGrid}
                    primary={`Camera: ${exif.Model}`}
                  />
                </Grid>
              </Grid>
            </ListItem>
            {exif.FNumber && (
              <ListItem>
                <Grid container spacing={8} className={classes.iconGridRoot}>
                  <Grid item xs={2} className={classes.iconGrid}>
                    <ListItemIcon>
                      <Typography className={classes.leftIcon}>ʄ</Typography>
                    </ListItemIcon>
                  </Grid>
                  <Grid item xs={10}>
                    <ListItemText
                      className={classes.textGrid}
                      primary={`F-Stop: f/${String(
                        parseFloat(exif.FNumber.split("/")[0]) /
                          parseFloat(exif.FNumber.split("/")[1])
                      )}`}
                    />
                  </Grid>
                </Grid>
              </ListItem>
            )}
            {exif.ExposureTime && (
              <ListItem>
                <Grid container spacing={8} className={classes.iconGridRoot}>
                  <Grid item xs={2} className={classes.iconGrid}>
                    <ListItemIcon>
                      <TimerIcon className={classes.leftIcon} />
                    </ListItemIcon>
                  </Grid>
                  <Grid item xs={10}>
                    <ListItemText
                      className={classes.textGrid}
                      primary={`Exposure Time: ${exif.ExposureTime}`}
                    />
                  </Grid>
                </Grid>
              </ListItem>
            )}
            {exif.FocalLength && (
              <ListItem>
                <Grid container spacing={8} className={classes.iconGridRoot}>
                  <Grid item xs={2} className={classes.iconGrid}>
                    <ListItemIcon>
                      <FontAwesomeIcon
                        icon={faRulerHorizontal}
                        className={classes.leftIcon}
                      />
                    </ListItemIcon>
                  </Grid>
                  <Grid item xs={10}>
                    <ListItemText
                      className={classes.textGrid}
                      primary={`Focal Length: ${
                        exif.FocalLength.split("/")[0]
                      }.0mm`}
                    />
                  </Grid>
                </Grid>
              </ListItem>
            )}
            {exif.ISOSpeedRatings && (
              <ListItem>
                <Grid container spacing={8} className={classes.iconGridRoot}>
                  <Grid item xs={2} className={classes.iconGrid}>
                    <ListItemIcon>
                      <IsoIcon className={classes.leftIcon} />
                    </ListItemIcon>
                  </Grid>
                  <Grid item xs={10}>
                    <ListItemText
                      className={classes.textGrid}
                      primary={`ISO: ${exif.ISOSpeedRatings}`}
                    />
                  </Grid>
                </Grid>
              </ListItem>
            )}
            {exif.Flash && (
              <ListItem>
                <Grid container spacing={8} className={classes.iconGridRoot}>
                  <Grid item xs={2} className={classes.iconGrid}>
                    <ListItemIcon>
                      <FlashIcon className={classes.leftIcon} />
                    </ListItemIcon>
                  </Grid>
                  <Grid item xs={10}>
                    <ListItemText
                      className={classes.textGrid}
                      primary={`Flash: ${
                        parseInt(exif.Flash) % 2 == 0 ? "Did not fire" : "Fired"
                      }`}
                    />
                  </Grid>
                </Grid>
              </ListItem>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.props.onClose();
            }}
          >
            Close
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(
  withApollo(withRouter(withCurrentSession(ExifDialog)))
);
