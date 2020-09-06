import React, {useState} from "react";
import FrontMedia from "./Media/FrontMedia";
import RandomFrontMedia from "./Media/RandomFrontMedia";
import PageTitle from "./Global/PageTitle";
import Typography from "@material-ui/core/Typography";
import withWidth from "@material-ui/core/withWidth";
import {withStyles} from "@material-ui/core/styles";
import AppFooter from "./Global/AppFooter";

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
    padding: theme.spacing(3),
    display: "flex",
    alignItems: "center"
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
  }
});

const Padder = () => <div style={{ padding: 8 }} />;

function LandingPage({classes, width}) {
  const [homeTab, setHomeTab] = useState("latest");
  let typoSize = width === "xs" || width === "sm" ? "h5" : "h4";

  return (
    <React.Fragment>
      <PageTitle>Home</PageTitle>
      <div
        className={
          width === "xs" || width === "sm" ? classes.rootMobile : classes.root
        }
      >
        <div
          onClick={() => setHomeTab("latest")}
          className={
            width === "xs" || width === "sm"
              ? classes.titlePadderMobile
              : classes.titlePadder
          }
        >
          <Typography
            variant={typoSize}
            color={homeTab === "latest" ? "primary" : "textPrimary"}
            className={classes.font}
          >
            Latest
          </Typography>
        </div>
        <div
          onClick={() => setHomeTab("scritched")}
          className={
            width === "xs" || width === "sm"
              ? classes.titlePadderMobile
              : classes.titlePadder
          }
        >
          <Typography
            variant={typoSize}
            color={homeTab === "scritched" ? "primary" : "textPrimary"}
            className={classes.font}
          >
            Most Scritched (Last 30 Days)
          </Typography>
        </div>
        <div
          onClick={() => setHomeTab("random")}
          className={
            width === "xs" || width === "sm"
              ? classes.titlePadderMobile
              : classes.titlePadder
          }
        >
          <Typography
            variant={typoSize}
            color={homeTab === "random" ? "primary" : "textPrimary"}
            className={classes.font}
          >
            Random
          </Typography>
        </div>
      </div>
      <Padder />
      {homeTab === "latest" && <FrontMedia filter="latest" />}
      {homeTab === "scritched" && <FrontMedia filter="scritched" />}
      {homeTab === "random" && <RandomFrontMedia filter="random"/>}
      {false && <AppFooter/>}
    </React.Fragment>
  );
}

export default withStyles(styles)(withWidth()(LandingPage));
