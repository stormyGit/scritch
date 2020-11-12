import Typography from "@material-ui/core/Typography";
import {Button, GridList} from "@material-ui/core";
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
import GridListTile from "@material-ui/core/GridListTile";
import PageTitle from "../Global/PageTitle";
import Box from "@material-ui/core/Box";
import {MicroPadder} from "../../util/padder";

const styles = theme => ({
  welcomeCard: {
    display: 'flex',
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    margin: 'auto',
    maxWidth: "60vw",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: "15px",
    height: "auto"
  },
  welcomeCardMobile: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
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
  videoMobile: {
    width: "100%",
    height: "calc(100vw/16*9)"
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

function WelcomeCard({classes, width}) {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <Card className={classes.welcomeCard}>
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

const WelcomeCardNormal = withStyles(styles)(withWidth()(WelcomeCard));


function WelcomeCardM({classes}) {
  const theme = useTheme();

  return (
    <Box className={classes.welcomeCardMobile}>
      <MicroPadder/>
      <Typography component="h3" variant="h3" align="center">
        Welcome to Scritch
      </Typography>
      <MicroPadder/>
      <iframe
        className={classes.videoMobile}
        src="https://www.youtube-nocookie.com/embed/I1jMAoW-cmc" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
      <Typography variant="body1" style={{margin: theme.spacing(2)}}>
        Scritch is a brand new website dedicated to hosting Fursuit Convention Media, then providing tag notifications to Fursuit Owners through its comprehensive network of Makers, Suits, and Conventions past and present; bringing together Suiters, Photographers and Makers. It is THE place to go for everything Fursuit.
      </Typography>
      <div className={classes.controls}>
        <Button xs={3} style={{marginRight: "1rem"}} variant="outlined" component={Link} to={"/announcements"}>News</Button>
        <Button xs={3} style={{marginRight: "1rem"}} variant="outlined" component={Link} to={"/user_guide"}>About</Button>
      </div>
    </Box>
  );
}

const WelcomeCardMobile = withStyles(styles)(withWidth()(WelcomeCardM));

export {WelcomeCardNormal, WelcomeCardMobile}