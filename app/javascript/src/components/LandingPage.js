import React, {useEffect, useRef, useState} from "react";
import FrontMedia from "./Media/FrontMedia";
import {withStyles} from '@material-ui/core/styles';
import PageTitle from "./Global/PageTitle";
import withWidth from "@material-ui/core/withWidth";
import AppFooter from "./Global/AppFooter";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
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
  landingPage: {
    height: `100%`,
  },
  landingText: {
    maxWidth: "25rem"
  }
});

const LandingPage = ({classes, width}) => {
  const [height, setHeight] = useState(10);
  const ref = useRef(null);
  const theme = useTheme();
  const smallToMediumHeight = ((height) / 5) * 3 < 512;

  useEffect(() => {
    function handleResize() {
      if (ref.current !== null)
        setHeight(ref.current.clientHeight);
    }

    window.addEventListener('resize', handleResize);
    if (ref.current !== null)
      setHeight(ref.current.clientHeight);
  });

  return (
    <GridList cellHeight={(height / 5) - 5} className={classes.landingPage} cols={1} ref={ref}>
      <GridListTile rows={smallToMediumHeight ? 3 : 2}>
        <PageTitle>Home</PageTitle>
        <WelcomeCard/>
      </GridListTile>
      {!smallToMediumHeight && <GridListTile rows={2}>
        <FrontMedia filter="scritched"/>
      </GridListTile>
      }
      <GridListTile rows={smallToMediumHeight ? 2 : 1}>
        <AppFooter/>
      </GridListTile>
    </GridList>
  );
};

export default withStyles(styles)(withWidth()(LandingPage));
