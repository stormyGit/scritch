import {AppBar, fade, IconButton, Theme, Toolbar, Typography, withStyles} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import {NavigationContext} from "../context/NavigationContext";
import {useContext, useState} from "react";
import * as React from "react";
import ScritchLogo from "./CustomComponents/ScritchLogo";
import {Link, withRouter} from "react-router-dom";
import DisplayPageTitle from "./AppLayout/DisplayPageTitle";
import Button from "@material-ui/core/Button";
import UploadButton from "./AppLayout/UploadButton";
import SocialButton from "./Global/SocialButton";
import PoliciesSupportButton from "./AppLayout/PoliciesSupportButton";
import MetricsBar from "./AppLayout/MetricsBar";
import NotificationsButton from "./AppLayout/NotificationsButton";
import ChatButton from "./AppLayout/ChatButton";
import UserButton from "./AppLayout/UserButton";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PageTabs from "./Global/PageTabs";

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
  }
});


function ScritchToolbar({classes}) {
  const {dispatch, isDrawerOpen} = useContext(NavigationContext);
  const [tabIndex, setTabIndex] = useState(-1);

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
          >
            <MenuIcon/>
          </IconButton>
          <Link to="/">
            <ScritchLogo
              onClick={() =>
                this.setState({
                  tempDrawer: !this.state.tempDrawer
                })
              }
            />
          </Link>
          <DisplayPageTitle className={classes.title} variant="h6" noWrap/>
          <div className={classes.grow}/>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{'aria-label': 'search'}}
            />
          </div>
          <div className={classes.grow}/>
          <PageTabs/>
          <div className={classes.grow}/>
          <React.Fragment>
            {/*<UploadButton onClick={() => this.setState({uploadDialog: true})}/>*/}
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