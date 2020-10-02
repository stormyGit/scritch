import React from "react";
import FrontMedia from "./Media/FrontMedia";
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import PageTitle from "./Global/PageTitle";
import withWidth from "@material-ui/core/withWidth";
import AppFooter from "./Global/AppFooter";
import {Button} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  font: {
    fontWeight: 200,
    cursor: "pointer"
  },
  link: {
    textDecoration: "none",
    textAlign: "center"
  },
  linkTypo: {
    fontWeight: 200,
    color: theme.palette.primary.main
  },
  centeredTitle: {
    textAlign: "center"
  },
  root: {
    height: "90%",
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: "60vw",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: "15px"
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '20rem',
    maxHeight: '20rem'
  },
  rootMobile: {
    padding: theme.spacing(1)
  },
  titlePadder: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  },
  titlePadderMobile: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  landingText: {
    maxWidth: "25rem"
  }
});

const Padder = () => <div style={{padding: 8}}/>;

function LandingPage({classes, width}) {

  return (
    <Grid className={classes.root} container direction="column" alignItems="stretch" justify="space-between">
      <Grid item>
        <PageTitle>Home</PageTitle>
        <Paper className={classes.paper}>
          <Grid container spacing={2} alignItems="stretch" justify="flex-start">
            <Grid item>
              <img className={classes.img} alt="Scritch-Banner with pixel on it presenting the Website" src={require("images/pixel/Landing.png")}/>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2} alignItems="center">
                <Grid item xs>
                  <Typography variant="h2">
                    Welcome to Scritch
                  </Typography>
                </Grid>
                <Grid item xs className={classes.landingText}>
                  <Typography variant="body">
                    Scritch is a brand new website dedicated to hosting Fursuit Convention Media, then providing tag notifications to Fursuit Owners through its comprehensive network of Makers, Suits, and Conventions past and present; bringing together Suiters, Photographers and Makers. It is THE place to go for everything Fursuit.
                  </Typography>
                </Grid>
                <Grid item container spacing={2} direction="row" justify="center" alignItems="center">
                  <Button variant="outlined">about</Button>
                  <Padder/>
                  <Padder/>
                  <Button variant="outlined">intro video</Button>
                  {/*https://www.youtube.com/watch?v=I1jMAoW-cmc*/}
                  <Padder/>
                  <Padder/>
                  <Button variant="outlined">faq</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item>
        <Padder/>
      </Grid>
      <Grid item>
        <FrontMedia filter="random"/>
        {/*<FrontMedia filter="scritched"/>*/}
      </Grid>
      <Grid item>
        <Padder/>
      </Grid>
      <Grid item>
        <AppFooter/>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(withWidth()(LandingPage));
