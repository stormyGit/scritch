import React, {useContext, useEffect, useRef} from "react";
import {withStyles} from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Typography from "@material-ui/core/Typography";
import {Link, withRouter} from "react-router-dom";
import withCurrentSession from "../withCurrentSession";
import GlobalProgress from "../Global/GlobalProgress";
import CookieConsent from "react-cookie-consent";
import ScritchToolbar, {ToolBarHeight} from "../ScritchToolbar";
import ScritchFab from "../CustomComponents/ScritchFab";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {NavigationContext} from "../../context/NavigationContext";
import {closeDrawer} from "../../reducers/Action";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import DrawerMenu from "../NavigationDrawer/DrawerMenu";
import QuickAccessFooter from "../AppLayout/QuickAccessFooter";
import {useMediaQuery} from "@material-ui/core";
import useTheme from "@material-ui/core/styles/useTheme";
import AppDialogWrapper from "../AppLayout/AppDialogWrapper";


export const DrawerWidth = 240;

const styles = theme => ({
  root: {
    top: ToolBarHeight,
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    minHeight: `calc(100vh - ${ToolBarHeight}px)`
  },
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em"
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  },
  content: {
    flexGrow: 1,
    minWidth: 0, // So the Typography noWrap works
    overflow: "hidden"
  },
  toolbar: {
    ...theme.mixins.toolbar,
    minHeight: `${ToolBarHeight}px !important`,
    "@media (min-width:0px) and (orientation: landscape)": {
      minHeight: ToolBarHeight
    }
  },
  toolBarRoot: {
    minHeight: `${ToolBarHeight}px !important`
  },
  rootLink: {
    color: theme.palette.text.primary,
    textDecoration: "none"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: "fixed"
  },
  titleZone: {
    display: "flex",
    alignItems: "center"
  },
  searchBar: {
    flex: 1
  },
  toolBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary
  },
  toolBarDanger: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.danger.main
  },
  rightButton: {
    marginLeft: theme.spacing(2),
    display: "inline-block"
  },
  rightActions: {
    flexShrink: 0
  },
  closeIcon: {},
  searchIcon: {},
  tinyButton: {},
  buttonPad: {
    padding: theme.spacing(1)
  },
  menuLeftPadding: {
    paddingLeft: theme.spacing(1)
  },
  menuRightPadding: {
    paddingRight: theme.spacing(1)
  },
  pointer: {
    cursor: "pointer"
  },
  text: {
    fontWeight: 200,
    textAlign: "center",
    color: "white"
  },
  cookieButton: {
    backgroundColor: theme.palette.secondary.main
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  appBody: {
    overflowX: "hidden",
    height: `calc(100vh - ${ToolBarHeight}px)`,
    position: "relative",
    // paddingRight: theme.spacing(1) + 1,
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(8) + 1,
    },
  },
  drawerOpen: {
    width: DrawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    // width: theme.spacing(1) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8) + 1,
    },
  },
});

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function AppLayout({classes, children, location}) {
  const theme = useTheme();
  const {dispatchNavigationChange, isDrawerOpen} = useContext(NavigationContext);
  const prevLocation = usePrevious(location);
  const tinyWidth = useMediaQuery(theme.breakpoints.down("xs"));
  const bigWidth = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    if (location !== prevLocation) {
      window.scrollTo(0, 0);
      document.activeElement.blur();
    }
  }, []);
  return (
    <React.Fragment>
      <GlobalProgress/>
      <div className={classes.root}>
        <CookieConsent
          buttonStyle={{backgroundColor: process.env.SECONDARY_COLOR}}
          style={{textAlign: "center", zIndex: 100}}
        >
          <Typography
            variant="h5"
            component="h3"
            className={classes.text}
            style={{
              paddingLeft: bigWidth ? 200 : 0
            }}
          >
            We use cookies to improve your experience on Scritch and to keep you logged in. By
            using this Website, you consent to the storing on your device of all the technologies
            described in our{" "}
            <Link to="/privacy_policy" className={classes.link}>
              Privacy Policy
            </Link>{" "}
            and also agree to our{" "}
            <Link to="/terms_of_use" className={classes.link}>
              Terms of Use
            </Link>
            .
          </Typography>
        </CookieConsent>
        <ScritchFab/>
        <Drawer
          variant="persistent"
          anchor="left"
          open={isDrawerOpen}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: isDrawerOpen,
            [classes.drawerClose]: !isDrawerOpen,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: isDrawerOpen,
              [classes.drawerClose]: !isDrawerOpen,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={() => dispatchNavigationChange(closeDrawer())}>
              <ChevronLeftIcon/>
            </IconButton>
          </div>
          <Divider/>
          <DrawerMenu
            disableProfile
            disableNotifications
            disableUpload
          />
        </Drawer>
        <main className={classes.content}>
          <ScritchToolbar/>
          <div className={classes.appBody}>
            {children}
          </div>
          {tinyWidth && <QuickAccessFooter/>}
          <AppDialogWrapper/>
        </main>
      </div>
    </React.Fragment>
  );
}

export default withStyles(styles)(withRouter(withCurrentSession(withWidth()(AppLayout))));
