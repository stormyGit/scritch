import React, {useContext, useEffect, useRef, useState} from "react";
import {withStyles} from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Typography from "@material-ui/core/Typography";
import {Link, withRouter} from "react-router-dom";
import withCurrentSession from "../withCurrentSession";
import GlobalProgress from "../Global/GlobalProgress";
import AppDialogs from "../AppLayout/AppDialogs";
import CookieConsent from "react-cookie-consent";
import ScritchToolbar from "../ScritchToolbar";
import ScritchFab from "../CustomComponents/ScritchFab";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {NavigationContext} from "../../context/NavigationContext";
import {closeDrawer, setSearchPopupState} from "../../reducers/Action";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import DrawerMenu from "../NavigationDrawer/DrawerMenu";
import DrawerMenuOld from "../NavigationDrawer/DrawerMenuOld";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    top: 56,
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    minHeight: "calc(100vh - 56px)"
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
    minHeight: "56px !important",
    "@media (min-width:0px) and (orientation: landscape)": {
      minHeight: 56
    }
  },
  toolBarRoot: {
    minHeight: "56px !important"
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
  drawerOpen: {
    width: drawerWidth,
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
    width: theme.spacing(7) + 1,
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

function AppLayout({classes, settingsLayout, children, currentSession, location, client, width}) {
  const {dispatch, isDrawerOpen} = useContext(NavigationContext);
  const [nameInput, setNameInput] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [uploadDialog, setUploadDialog] = useState(false);
  const [signUpDialog, setSignUpDialog] = useState(false);
  const [mainDrawer, setMainDrawer] = useState(true);
  const [tempDrawer, setTempDrawer] = useState(false);
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [activitiesDialog, setActivitiesDialog] = useState(false);
  const [chatDialog, setChatDialog] = useState(false);
  const [speciesDialog, setSpeciesDialog] = useState(false);
  const [settingsDialog, setSettingsDialog] = useState(false);
  const [advertiseDialog, setAdvertiseDialog] = useState(false);
  const [techDialog, setTechDialog] = useState(false);
  const [query, setQuery] = useState({});
  const prevLocation = usePrevious(location);
  useEffect(() => {
    if (location !== prevLocation) {
      window.scrollTo(0, 0);
      document.activeElement.blur();
    }
  }, []);
  let bigWidth = false;
  if (width === "xl" || width === "lg") {
    bigWidth = true;
  }
  return (
    <React.Fragment>
      <GlobalProgress/>
      <div className={classes.root}>
        <ScritchFab/>
        <CookieConsent
          buttonStyle={{backgroundColor: process.env.SECONDARY_COLOR}}
          style={{textAlign: "center"}}
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
            <IconButton onClick={() => dispatch(closeDrawer())}>
              <ChevronLeftIcon/>
            </IconButton>
          </div>
          <Divider/>
          <DrawerMenuOld
            disableProfile
            disableNotifications
            disableUpload
          />
        </Drawer>
        <main className={classes.content}>
          <ScritchToolbar/>
          <div
            style={{
              overflowX: "hidden",
              overflowY: "scroll",
              height: "calc(100vh - 56px)",
              paddingLeft:
                bigWidth
                  ? "calc(5vw + 60px)"
                  : width === "md"
                  ? "60px"
                  : 4,
              paddingRight: bigWidth ? "5%" : width === "md" ? "60px" : 4,
              position: "relative"
            }}
          >
            {children}
          </div>
          <AppDialogs
            searchDialog={false}
            closeSearchDialog={() => setSearchPopupState(false)}
            chatDialog={chatDialog}
            closeChatDialog={() => setChatDialog(false)}
            signUpDialog={signUpDialog}
            closeSignUpDialog={() => setSignUpDialog(false)}
            uploadDialog={uploadDialog}
            closeUploadDialog={() => setUploadDialog(false)}
            activitiesDialog={activitiesDialog}
            closeActivitiesDialog={() => setActivitiesDialog(false)}
            advertiseDialog={advertiseDialog}
            closeAdvertiseDialog={() => setAdvertiseDialog(false)}
            settingsDialog={settingsDialog}
            closeSettingsDialog={() => setSettingsDialog(false)}
            techDialog={techDialog}
            closeTechDialog={() => setTechDialog(false)}
            speciesDialog={speciesDialog}
            closeSpeciesDialog={() => setSpeciesDialog(false)}
          />
        </main>
      </div>
    </React.Fragment>
  );
}

export default withStyles(styles)(withRouter(withCurrentSession(withWidth()(AppLayout))));
