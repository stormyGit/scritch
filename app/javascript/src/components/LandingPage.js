import React, {useEffect, useRef, useState} from "react";
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
import Box from "@material-ui/core/Box";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import {ToolBarHeight} from "./ScritchToolbar";

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
    minHeight: `calc(100% - ${ToolBarHeight}px)`,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: "60vw",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: "15px",
    height: "auto"
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

function LandingPage({classes}) {
  const [height, setHeight] = useState(10)
  const ref = useRef(null)
  useEffect(() => {
    function handleResize() {
      setHeight(ref.current.clientHeight);
    }
    window.addEventListener('resize', handleResize);
    setHeight(ref.current.clientHeight);
  });

  return (
    <GridList cellHeight={(height / 5) - 5} className={classes.root} cols={1} ref={ref}>
      <GridListTile rows={2}>
        <PageTitle>Home</PageTitle>
        <Paper className={classes.paper}>
          <Grid container spacing={2} alignItems="stretch" justify="flex-start">
            <Grid item>
              <img className={classes.img} alt="Scritch-Banner with pixel on it presenting the Website" src={require("images/pixel/Landing.png")}/>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" justify="space-between" alignItems="center">
                <Typography variant="h2">
                  Welcome to Scritch
                </Typography>
                <Typography variant="body" style={{width: "60%"}}>
                  Scritch is a brand new website dedicated to hosting Fursuit Convention Media, then providing tag notifications to Fursuit Owners through its comprehensive network of Makers, Suits, and Conventions past and present; bringing together Suiters, Photographers and Makers. It is THE place to go for everything Fursuit.
                </Typography>
                <Grid item container spacing={2} direction="row" justify="center" alignItems="stretch">
                  <Button xs={3} style={{margin: "1rem"}} variant="outlined">about</Button>
                  <Button xs={3} style={{margin: "1rem"}} variant="outlined">intro video</Button>
                  {/*https://www.youtube.com/watch?v=I1jMAoW-cmc*/}
                  <Button xs={3} style={{margin: "1rem"}} variant="outlined">faq</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </GridListTile>
      <GridListTile rows={2}>
        <FrontMedia filter="scritched"/>
      </GridListTile>
      <GridListTile rows={1}>
        <AppFooter/>
      </GridListTile>
    </GridList>
  );
}

export default withStyles(styles)(withWidth()(LandingPage));
