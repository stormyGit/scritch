import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import React from "react";
import {withStyles} from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import useTheme from "@material-ui/core/styles/useTheme";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";

const styles = theme => ({
  root: {
    display: 'flex',
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: "60vw",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: "15px",
    height: "auto"
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  img: {
    margin: 'auto',
    minWidth: "19vw",
    minHeight: "19vw",
    maxWidth: '20rem',
    maxHeight: '20rem'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

function WelcomeCard({classes, width}) {
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.img}
        image={require("images/pixel/Landing.png")}
        title="Scritch-Banner with pixel on it presenting the Website"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            Welcome to Scritch
          </Typography>
          <Typography variant="body1">
            Scritch is a brand new website dedicated to hosting Fursuit Convention Media, then providing tag notifications to Fursuit Owners through its comprehensive network of Makers, Suits, and Conventions past and present; bringing together Suiters, Photographers and Makers. It is THE place to go for everything Fursuit.
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Button xs={3} style={{marginRight: "1rem"}} variant="outlined">about</Button>
          <Button xs={3} style={{marginRight: "1rem"}} variant="outlined">intro video</Button>
          {/*https://www.youtube.com/watch?v=I1jMAoW-cmc*/}
          <Button xs={3} style={{marginRight: "1rem"}} variant="outlined">faq</Button>
        </div>
      </div>
    </Card>
  );
}

export default withStyles(styles)(withWidth()(WelcomeCard));
