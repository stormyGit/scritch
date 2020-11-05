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

import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from "@material-ui/core/styles/useTheme";
import WelcomeCard from "./CustomComponents/WelcomeCard";

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
    height: `100%`,
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

function LandingPage({classes, width}) {
  const [height, setHeight] = useState(10);
  const ref = useRef(null);
  const theme = useTheme();
  const smallToMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    function handleResize() {
      setHeight(ref.current.clientHeight);
    }

    window.addEventListener('resize', handleResize);
    setHeight(ref.current.clientHeight);
  });

  return (
    <GridList cellHeight={(height / 5) - 5} className={classes.root} cols={1} ref={ref}>
      <GridListTile rows={smallToMediumScreen ? 3 : 2}>
        <PageTitle>Home</PageTitle>
        <WelcomeCard/>
      </GridListTile>
      {!smallToMediumScreen && <GridListTile rows={2}>
        <FrontMedia filter="scritched"/>
      </GridListTile>
      }
      <GridListTile rows={smallToMediumScreen ? 2 : 1}>
        <AppFooter/>
      </GridListTile>
    </GridList>
  );
}

export default withStyles(styles)(withWidth()(LandingPage));
