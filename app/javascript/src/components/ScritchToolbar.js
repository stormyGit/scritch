import {AppBar, fade, Grid, IconButton, Paper, Toolbar, withStyles} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import {NavigationContext} from "../context/NavigationContext";
import * as React from "react";
import {useContext, useRef, useState} from "react";
import ScritchLogo from "./CustomComponents/ScritchLogo";
import {Link} from "react-router-dom";
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
import {openDrawer} from "../reducers/Action"; // web.cjs is required for IE 11 support

const drawerWidth = 240;

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
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  menuButton: {
    marginRight: 36,
  },
  popperRoot: {
    flexGrow: 1
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

function ScritchToolbar({classes}) {
  const {dispatch, isDrawerOpen} = useContext(NavigationContext);
  const [tabIndex, setTabIndex] = useState(-1);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [scroll, setScroll] = React.useState('paper');
  let reset = false;
  const open = Boolean(anchorEl);
  const id = open ? 'spring-popper' : undefined;
  let loadEventTimer = undefined;

  function handleClickAway() {
    clearTimeout(loadEventTimer);
    setAnchorEl(null);
    setName("");
    setSearch("");
    reset = false;
  }

  function handleSearch(ev) {
    const target = ev.target;
    const val = target.value;
    if (name.length >= 1 && val.length < 1) {
      reset = true;
    }

    setName(val);
    if (loadEventTimer) {
      clearTimeout(loadEventTimer);
    }

    if (val.length >= 1) {
      loadEventTimer = setTimeout(() => {
        setSearch(val);
        setAnchorEl(anchorEl ? null : target);
      }, 1000);
    } else if (reset) {
      handleClickAway();
    }
  }

  function SearchInput() {
    return (
      <InputBase
        value={name}
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        onChange={value => handleSearch(value)}
        inputProps={{'aria-label': 'search'}}
      />
    );
  }

  function SearchDialog() {
    return (
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
    )
  }

  return (
    <div>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isDrawerOpen,
        })}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            className={clsx(classes.menuButton, {
              [classes.hide]: isDrawerOpen,
            })}
            onClick={() => {
              dispatch(openDrawer());
            }}
          >
            <MenuIcon/>
          </IconButton>
          <Link to="/">
            <ScritchLogo/>
          </Link>
          <DisplayPageTitle className={classes.title} variant="h6" noWrap/>
          <div className={classes.grow}/>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            {SearchInput()}
            {SearchDialog()}
          </div>
          <div className={classes.grow}/>
          <PageTabs/>
          <div className={classes.grow}/>
          <React.Fragment>
            {/*<UploadButton onClick={() => this.setState({uploadDialog: true})}/>}
            <SocialButton
              openAdvertise={() => this.setState({advertiseDialog: true})}
            />
            {/*<PoliciesSupportButton openTech={() => this.setState({techDialog: true})}/>*/}
          </React.Fragment>
          <div className={classes.grow}/>
          <React.Fragment>
            <MetricsBar
              openSpeciesDialog={() => this.setState({speciesDialog: true})}
            />
            <NotificationsButton
              onClick={() => this.setState({activitiesDialog: true})}
            />
            <ChatButton
              disabled={false}
              onClick={() => this.setState({chatDialog: true})}
            />
            <UserButton
              openSignUp={() => this.setState({signUpDialog: true})}
              openSettings={() => this.setState({settingsDialog: true})}
            />
          </React.Fragment>
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default withStyles(useStyles)(ScritchToolbar);

/*
            <div className={classes.toolbar}/>
            {currentSession && currentSession.user.suspendedUser && (
              <AppBar position="absolute" className={classes.appBar} elevation={1}>
                <Toolbar
                  className={classes.toolBarDanger}
                  classes={{
                    root: classes.toolBarRoot
                  }}
                  style={{
                    paddingLeft: appBarPadding,
                    paddingRight: appBarPadding
                  }}
                >
                  <Link to="/">
                    <ScritchLogo
                      onClick={() =>
                        this.setState({
                          tempDrawer: !this.state.tempDrawer
                        })
                      }
                    />
                  </Link>
                  {(smallWidth) && (
                    <Typography variant="subtitle1">Suspended</Typography>
                  )}
                  {!smallWidth && (
                    <Typography variant="h4">Account Suspended</Typography>
                  )}
                  <Typography variant={smallWidth ? "subtitle1" : "h5"}>
                    {`Until: ${dateFormat(
                      suspendedUserLimit,
                      smallWidth ? "dd/mm/yy" : "mmmm dS, yyyy"
                    )}`}
                  </Typography>
                  <PoliciesSupportButton
                    openTech={() => this.setState({techDialog: true})}
                    suspended={true}
                  />
                  <UserButton
                    openSignUp={() => this.setState({signUpDialog: true})}
                    openSettings={() => this.setState({settingsDialog: true})}
                  />
                </Toolbar>
              </AppBar>
            )}
            {!currentSession.user.suspendedUser && (
              <AppBar position="absolute" className={classes.appBar} elevation={1}>
                <Toolbar
                  className={classes.toolBar}
                  classes={{
                    root: classes.toolBarRoot
                  }}
                  style={{
                    paddingLeft: appBarPadding,
                    paddingRight: appBarPadding
                  }}
                >
                  {!this.state.searchEnabled && (
                    <Link to="/">
                      <ScritchLogo
                        onClick={() =>
                          this.setState({
                            tempDrawer: !this.state.tempDrawer
                          })
                        }
                      />
                    </Link>
                  )}

                  {bigWidth && (
                    <div className={classes.titleZone}>
                      <DisplayPageTitle/>
                    </div>
                  )}

                  {bigWidth && (
                    <Button
                      className={[classes.searchIcon, classes.tinyButton].join(" ")}
                      onClick={() => this.setState({searchDialog: true})}
                      color="primary"
                    >
                      <SearchIcon/>
                      Search
                    </Button>
                  )}

                  {!bigWidth && (
                    <IconButton
                      className={[classes.searchIcon, classes.tinyButton].join(" ")}
                      onClick={() => this.setState({searchDialog: true})}
                      color="primary"
                    >
                      <SearchIcon/>
                    </IconButton>
                  )}
                  {!this.state.searchEnabled && (
                    <React.Fragment>
                      <UploadButton onClick={() => this.setState({uploadDialog: true})}/>
                      <SocialButton
                        openAdvertise={() => this.setState({advertiseDialog: true})}
                      />
                      <PoliciesSupportButton openTech={() => this.setState({techDialog: true})}/>
                    </React.Fragment>
                  )}

                  {!this.state.searchEnabled && (
                    <React.Fragment>
                      {bigWidth && (
                        <MetricsBar
                          openSpeciesDialog={() => this.setState({speciesDialog: true})}
                        />
                      )}
                      <NotificationsButton
                        onClick={() => this.setState({activitiesDialog: true})}
                      />
                      {currentSession && !currentSession.user.isModerator && (
                        <ChatButton
                          disabled={false}
                          onClick={() => this.setState({chatDialog: true})}
                        />
                      )}
                      <UserButton
                        openSignUp={() => this.setState({signUpDialog: true})}
                        openSettings={() => this.setState({settingsDialog: true})}
                      />
                    </React.Fragment>
                  )}
                </Toolbar>
              </AppBar>
            )}
 */