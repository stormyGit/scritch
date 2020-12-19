import React, {useContext, useEffect, useRef, useState} from "react";
import FrontMedia from "./Media/FrontMedia";
import {withStyles} from '@material-ui/core/styles';
import PageTitle from "./Global/PageTitle";
import withWidth from "@material-ui/core/withWidth";
import AppFooter from "./Global/AppFooter";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import useTheme from "@material-ui/core/styles/useTheme";
import {WelcomeCardMobile, WelcomeCardNormal} from "./CustomComponents/WelcomeCard";
import {NavigationContext} from "../context/NavigationContext";
import {setScrolled} from "../reducers/Action";

const styles = theme => ({
  landingPage: {
    height: `100%`,
    overflowX: "hidden",
  },
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
  landingText: {
    maxWidth: "25rem"
  },
  frontMedia: {
    marginLeft: "7vw",
    marginRight: "7vw",
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
        <WelcomeCardNormal/>
      </GridListTile>
      {!smallToMediumHeight && <GridListTile className={classes.frontMedia} rows={2}>
        <FrontMedia filter="scritched"/>
      </GridListTile>
      }
      <GridListTile rows={smallToMediumHeight ? 2 : 1}>
        <AppFooter/>
      </GridListTile>
    </GridList>
  );
};

const LandingPageNormal = withStyles(styles)(withWidth()(LandingPage));

function getOffset(el, parent) {
  const rect = el.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();
  // console.log(JSON.stringify(rect), JSON.stringify(parentRect));
  return {
    left: rect.left - parentRect.left,
    top: rect.top - parentRect.top
  };
}

const LandingPageM = ({classes}) => {
  const {dispatchNavigationChange} = useContext(NavigationContext);
  const ref = useRef(null);

  const onScroll = (event) => {
    if (ref.current !== null)
      dispatchNavigationChange(setScrolled(getOffset(ref.current, event.target).top));
  }

  return (
    <GridList className={classes.landingPage} cols={1} onScroll={onScroll}>
      <GridListTile ref={ref} rows={4}>
        <PageTitle>Home</PageTitle>
        <WelcomeCardMobile/>
      </GridListTile>
      <GridListTile rows={3}>
        <FrontMedia filter="scritched"/>
      </GridListTile>
      <GridListTile rows={3}>
        <AppFooter/>
      </GridListTile>
    </GridList>
  );
};

const LandingPageMobile = withStyles(styles)(withWidth()(LandingPageM));

export {LandingPageNormal, LandingPageMobile};