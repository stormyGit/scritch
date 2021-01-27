import {AppBar, fade, Grid, IconButton, Paper, Toolbar, useMediaQuery, withStyles} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import {NavigationContext} from "../context/NavigationContext";
import * as React from "react";
import {useContext, useRef, useState} from "react";
import ScritchLogo from "./CustomComponents/ScritchLogo";
import {Link, Redirect, withRouter} from "react-router-dom";
import DisplayPageTitle from "./AppLayout/DisplayPageTitle";
import SocialButton from "./Global/SocialButton";
import MetricsBar from "./AppLayout/MetricsBar";
import NotificationsButton from "./AppLayout/NotificationsButton";
import ChatButton from "./AppLayout/ChatButton";
import UserButton from "./AppLayout/UserButton";
import SearchIcon from "@material-ui/icons/Search";
import PageTabs from "./Global/PageTabs";
import InputBase from "@material-ui/core/InputBase";
import GlobalProgress from "./Global/GlobalProgress";
import ScritchSpinner from "./CustomComponents/ScritchSpinner";
import Typography from "@material-ui/core/Typography";
import Fursuits from "./Fursuits/Fursuits";
import Makers from "./Makers/Makers";
import Events from "./Events/Events";
import Popper from "@material-ui/core/Popper";
import {useSpring, animated} from 'react-spring/web.cjs';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {
  openDrawer,
  setActivitiesDialogState,
  setChatDialogState, setSearchDialogState, setSettingsDialogState,
  setSignupDialogState,
  setSpeciesDialogState
} from "../reducers/Action";
import {DialogContext} from "../context/DialogContext";
import Button from "@material-ui/core/Button";
import AppLayout, {DrawerWidth} from "./Global/AppLayout";
import useTheme from "@material-ui/core/styles/useTheme";

export const ToolBarHeight = 64;

const useStyles = (theme) => ({
  title: {},
  grow: {
    flexGrow: 1
  },
  sectionDesktop: {},
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  appBarShift: {
    marginLeft: DrawerWidth,
    width: `calc(100% - ${DrawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.primary
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // color: theme.palette.text.primary,
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      marginRight: 36,
    }
    // color: theme.palette.text.primary
  },
  popperRoot: {
    flexGrow: 1
  },
  evenlyDist: {
    // minWidth: "33vw",
    // width: "33vw"
  },
  searchIconButton: {
    [theme.breakpoints.up('md')]: {
      marginLeft: "2em"
    }
  },
  popperPopup: {
    zIndex: 100,
    minWidth: '50vw',
    minHeight: '50vh',
    maxWidth: '80vw',
    maxHeight: '80vh'
  }
});


const Fade = React.forwardRef((props, ref) => {
  const {in: open, children, onEnter, onExited, ...other} = props;
  const style = useSpring({
    from: {opacity: 0},
    to: {opacity: open ? 1 : 0},
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

// Fade.propTypes = {
//   children: PropTypes.element,
//   in: PropTypes.bool,
//   onEnter: PropTypes.func,
//   onExited: PropTypes.func,
// };

function ScritchToolbar({classes, history, location}) {
  const theme = useTheme();
  const navContext = useContext(NavigationContext);
  const dialogContext = useContext(DialogContext);
  const [tabIndex, setTabIndex] = useState(-1);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [scroll, setScroll] = useState('paper');
  const tiny = useMediaQuery(theme.breakpoints.down("xs"));
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  let reset = false;
  const open = Boolean(anchorEl);
  const id = open ? 'spring-popper' : undefined;
  let loadEventTimer = undefined;

  const handleClickAway = () => {
    clearTimeout(loadEventTimer);
    setAnchorEl(null);
    setName("");
    setSearch("");
    reset = false;
  };

  const SearchDialog = () => (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        className={classes.popperPopup}
        scroll={scroll}
        placement="top-start"
      >
        {({TransitionProps}) => (
          <Fade {...TransitionProps}>
            <div className={classes.popperRoot}>
              <Paper>
                <GlobalProgress absolute/>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {name !== search && (
                      <ScritchSpinner size={128}/>
                    )}
                    {name === search && name !== "" && (
                      <React.Fragment>
                        <Card>
                          <CardContent>
                            <Typography variant="h5" className={classes.title}>
                              Fursuits
                            </Typography>
                            <Fursuits searching={true} search={search}/>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent>
                            <Typography variant="h5" className={classes.title}>
                              Makers
                            </Typography>
                            <Makers searching={true} search={search}/>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent>
                            <Typography variant="h5" className={classes.title}>
                              Events
                            </Typography>
                            <Events searching={true} search={search}/>
                          </CardContent>
                        </Card>
                      </React.Fragment>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </Fade>
        )}
      </Popper>
    </ClickAwayListener>
  );

  return (
    <div>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: navContext.isDrawerOpen,
        })}>
        <Toolbar className={classes.toolBar}>
          <React.Fragment>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              className={clsx(classes.menuButton, {
                [classes.hide]: navContext.isDrawerOpen,
              })}
              onClick={() => {
                navContext.dispatchNavigationChange(openDrawer());
              }}
            >
              <MenuIcon/>
            </IconButton>
            <Link to="/">
              <ScritchLogo/>
            </Link>
            {!small && <DisplayPageTitle className={classes.title} variant="h6" noWrap/>}
            {small ? <IconButton
              color="inherit"
              onClick={() => {
                dialogContext.dispatchDialogChange(setSearchDialogState(true));
              }}
            >
              <SearchIcon/>
            </IconButton> : <Button
              variant="outlined"
              color="inherit"
              className={classes.searchIconButton}
              onClick={() => {
                dialogContext.dispatchDialogChange(setSearchDialogState(true));
              }}
            >
              <SearchIcon/>
            </Button>
            }
            {SearchDialog()}
          </React.Fragment>
          {!tiny && <div className={classes.grow}/>}
          {!tiny && <PageTabs className={classes.evenlyDist}/>}
          <div className={classes.grow}/>
          <React.Fragment>
            {!small && <MetricsBar
              openSpeciesDialog={() => dialogContext.dispatchDialogChange(setSpeciesDialogState(true))}
            />}
            <NotificationsButton
              onClick={() => dialogContext.dispatchDialogChange(setActivitiesDialogState(true))}
            />
            <ChatButton
              disabled={false}
              onClick={() => dialogContext.dispatchDialogChange(setChatDialogState(true))}
            />
            <UserButton
              openSignUp={() => dialogContext.dispatchDialogChange(setSignupDialogState(true))}
              openSettings={() => dialogContext.dispatchDialogChange(setSettingsDialogState(true))}
              openSpeciesDialog={() => dialogContext.dispatchDialogChange(setSpeciesDialogState(true))}
            />
          </React.Fragment>
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default withRouter(withStyles(useStyles)(ScritchToolbar));