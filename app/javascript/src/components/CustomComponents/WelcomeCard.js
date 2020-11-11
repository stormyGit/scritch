import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import React, {useState} from "react";
import {withStyles} from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import useTheme from "@material-ui/core/styles/useTheme";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import clsx from "clsx";
import Grow from "@material-ui/core/Grow";
import {Link} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";

const styles = theme => ({
  root: {
    display: 'flex',
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    margin: 'auto',
    maxWidth: "60vw",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: "15px",
    height: "auto"
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    flex: '1 0 auto',
    paddingLeft: theme.spacing(2)
  },
  imgVisible: {
    margin: 'auto',
    minWidth: "16vw",
    paddingBottom: "16vw"
  },
  imgHidden: {
    width: 0,
    height: 0,
  },
  videoVisible: {
    margin: 'auto',
    minWidth: "28vw",
    minHeight: "16vw",
  },
  videoHidden: {
    width: 0,
    height: 0,
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
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
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <Card className={classes.root}>
      <Grow in={!videoOpen}>
        <CardMedia
          className={clsx(classes.drawer, {
            [classes.imgVisible]: !videoOpen,
            [classes.imgHidden]: videoOpen,
          })}
          image={require("images/pixel/Landing.png")}
          title="Scritch-Banner with pixel on it presenting the Website"
        />
      </Grow>
      <Grow in={videoOpen}>
        <iframe
          className={clsx(classes.drawer, {
            [classes.videoHidden]: !videoOpen,
            [classes.videoVisible]: videoOpen,
          })}
          src="https://www.youtube-nocookie.com/embed/I1jMAoW-cmc" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
      </Grow>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h3" variant="h3">
            Welcome to Scritch
          </Typography>
          <Typography variant="body1">
            Scritch is a brand new website dedicated to hosting Fursuit Convention Media, then providing tag notifications to Fursuit Owners through its comprehensive network of Makers, Suits, and Conventions past and present; bringing together Suiters, Photographers and Makers. It is THE place to go for everything Fursuit.
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Button xs={3} style={{marginRight: "1rem"}} variant="outlined" component={Link} to={"/announcements"}>News</Button>
          <Button xs={3} style={{marginRight: "1rem"}} variant="outlined" onClick={() => setVideoOpen(!videoOpen)}>Video</Button>
          <Button xs={3} style={{marginRight: "1rem"}} variant="outlined" component={Link} to={"/user_guide"}>About</Button>
        </div>
      </div>
    </Card>
  );
}

export default withStyles(styles)(withWidth()(WelcomeCard));
