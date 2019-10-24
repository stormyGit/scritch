import React from "react";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import queryString from "query-string";
import Typography from "@material-ui/core/Typography";
import dateFormat from "dateformat";

import { Link, withRouter } from "react-router-dom";
import withCurrentSession from "../withCurrentSession";
import SearchBar from "../Global/SearchBar";
import GlobalProgress from "../Global/GlobalProgress";
import PermanentDrawer from "../PermanentDrawer";
import TemporaryDrawer from "../TemporaryDrawer";

import UploadButton from "../AppLayout/UploadButton";
import SocialButton from "../AppLayout/SocialButton";
import PoliciesSupportButton from "../AppLayout/PoliciesSupportButton";
import DisplayPageTitle from "../AppLayout/DisplayPageTitle";
import MetricsBar from "../AppLayout/MetricsBar";
import UserButton from "../AppLayout/UserButton";
import NotificationsButton from "../AppLayout/NotificationsButton";
import AppDialogs from "../AppLayout/AppDialogs";
import CookieConsent from "react-cookie-consent";
import logo from "../../../../assets/images/logo.png";

const styles = theme => ({
  root: {
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
    backgroundColor: theme.palette.background.paper
  },
  toolBarDanger: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.danger.main
  },
  rightButton: {
    marginLeft: theme.spacing.unit * 2,
    display: "inline-block"
  },
  rightActions: {
    flexShrink: 0
  },
  closeIcon: {},
  searchIcon: {},
  tinyButton: {},
  buttonPad: {
    padding: theme.spacing.unit
  },
  menuLeftPadding: {
    paddingLeft: theme.spacing.unit
  },
  menuRightPadding: {
    paddingRight: theme.spacing.unit
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
  }
});

class AppLayoutRemake extends React.Component {
  state = {
    uploadDialog: false,
    signUpDialog: false,
    mainDrawer: true,
    tempDrawer: false,
    searchEnabled: false,
    activitiesDialog: false,
    chatDialog: false,
    speciesDialog: false,
    settingsDialog: false,
    advertiseDialog: false,
    techDialog: false,
    query: {}
  };

  componentDidMount() {
    this.handleQuery(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      this.handleQuery(nextProps);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
      document.activeElement.blur();
    }
  }

  handleQuery(props) {
    const query = queryString.parse(props.location.search);
    this.setState({
      query,
      searchEnabled:
        props.width !== "xl" &&
        props.width !== "lg" &&
        query.q &&
        query.q.length > 0
    });
  }

  handleRequestSearch(q) {
    this.props.history.push({
      pathname: "/search",
      search: queryString.stringify({ q })
    });
  }

  render() {
    const {
      classes,
      settingsLayout,
      children,
      currentSession,
      location,
      client,
      width
    } = this.props;
    const { query } = this.state;

    let appBarPadding;
    if (width === "xl" || width === "lg") {
      appBarPadding = 16;
    } else {
      appBarPadding = 8;
    }

    if (currentSession && currentSession.user.suspendedUser) {
      var suspendedUserLimit = new Date(
        currentSession.user.suspendedUser.limit * 1000
      );
    }
    return (
      <React.Fragment>
        <GlobalProgress />
        <div className={classes.root}>
          <CookieConsent
            buttonStyle={{ backgroundColor: process.env.SECONDARY_COLOR }}
            style={{ textAlign: "center" }}
          >
            <Typography
              variant="h5"
              component="h3"
              className={classes.text}
              style={{
                paddingLeft: width === "xl" || width === "lg" ? 200 : 0
              }}
            >
              We use cookies to improve your experience on Scritch and to keep
              you logged in. By using this Website, you consent to the storing
              on your device of all the technologies described in our{" "}
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
          {(width === "xs" || width === "sm") && (
            <React.Fragment>
              <TemporaryDrawer
                open={this.state.tempDrawer}
                onOpen={() => {
                  this.setState({ tempDrawer: true });
                }}
                onClose={() => this.setState({ tempDrawer: false })}
              />
            </React.Fragment>
          )}
          {width !== "xs" && width !== "sm" && (
            <React.Fragment>
              <PermanentDrawer open={this.state.mainDrawer} />
            </React.Fragment>
          )}
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {currentSession && currentSession.user.suspendedUser && (
              <AppBar
                position="absolute"
                className={classes.appBar}
                elevation={1}
              >
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
                  <img
                    onClick={() =>
                      this.setState({
                        mainDrawer: !this.state.mainDrawer,
                        tempDrawer: !this.state.tempDrawer
                      })
                    }
                    src={logo}
                    className={classes.pointer}
                  />
                  {(width === "sm" || width === "xs") && (
                    <Typography variant="subtitle1">Suspended</Typography>
                  )}
                  {width !== "sm" && width !== "xs" && (
                    <Typography variant="h4">Account Suspended</Typography>
                  )}
                  <Typography
                    variant={
                      width === "sm" || width === "xs" ? "subtitle1" : "h5"
                    }
                  >
                    {`Until: ${dateFormat(
                      suspendedUserLimit,
                      width === "sm" || width === "xs"
                        ? "dd/mm/yy"
                        : "mmmm dS, yyyy"
                    )}`}
                  </Typography>
                  <PoliciesSupportButton
                    openTech={() => this.setState({ techDialog: true })}
                    suspended={true}
                  />
                  <UserButton
                    openSignUp={() => this.setState({ signUpDialog: true })}
                    openSettings={() => this.setState({ settingsDialog: true })}
                  />
                </Toolbar>
              </AppBar>
            )}
            {(!currentSession ||
              (currentSession && !currentSession.user.suspendedUser)) && (
              <AppBar
                position="absolute"
                className={classes.appBar}
                elevation={1}
              >
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
                    <img
                      onClick={() =>
                        this.setState({
                          mainDrawer: !this.state.mainDrawer,
                          tempDrawer: !this.state.tempDrawer
                        })
                      }
                      src={logo}
                      className={classes.pointer}
                    />
                  )}
                  {currentSession &&
                    (this.state.searchEnabled ||
                      width === "lg" ||
                      width === "xl") && (
                      <div
                        className={classes.searchBar}
                        style={{
                          paddingLeft: appBarPadding,
                          maxWidth:
                            width === "lg" || width === "xl" ? 200 : "none",
                          marginRight: width === "lg" || width === "xl" ? 16 : 0
                        }}
                      >
                        <SearchBar
                          autoFocus={
                            width !== "lg" && width !== "xl" && !query.q
                          }
                          cancelOnEscape
                          value={query.q}
                          onRequestSearch={q => {
                            if (typeof q === "string") {
                              this.handleRequestSearch(q);
                            }
                          }}
                        />
                      </div>
                    )}

                  {!this.state.searchEnabled && (
                    <React.Fragment>
                      <UploadButton
                        onClick={() => this.setState({ uploadDialog: true })}
                      />
                      <SocialButton
                        openAdvertise={() =>
                          this.setState({ advertiseDialog: true })
                        }
                      />
                      <PoliciesSupportButton
                        openTech={() => this.setState({ techDialog: true })}
                      />
                    </React.Fragment>
                  )}

                  {this.state.searchEnabled && (
                    <IconButton
                      className={classes.closeIcon}
                      onClick={() => {
                        this.setState({ searchEnabled: false });
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}

                  {false &&
                    !this.state.searchEnabled &&
                    width !== "lg" &&
                    width !== "xl" && (
                      <IconButton
                        className={[
                          classes.searchIcon,
                          classes.tinyButton
                        ].join(" ")}
                        onClick={() => this.setState({ searchEnabled: true })}
                        color="primary"
                      >
                        <SearchIcon />
                      </IconButton>
                    )}

                  {width === "xl" && (
                    <div className={classes.titleZone}>
                      <DisplayPageTitle />
                    </div>
                  )}

                  {!this.state.searchEnabled && (
                    <React.Fragment>
                      {width === "xl" && (
                        <MetricsBar
                          openSpeciesDialog={() =>
                            this.setState({ speciesDialog: true })
                          }
                        />
                      )}
                      <NotificationsButton
                        onClick={() =>
                          this.setState({ activitiesDialog: true })
                        }
                      />
                      <UserButton
                        openSignUp={() => this.setState({ signUpDialog: true })}
                        openSettings={() =>
                          this.setState({ settingsDialog: true })
                        }
                      />
                    </React.Fragment>
                  )}
                </Toolbar>
              </AppBar>
            )}
            <div
              style={{
                overflowX: "hidden",
                overflowY: "scroll",
                height: "calc(100vh - 56px)",
                paddingLeft:
                  width === "xl" || width === "lg" ? "calc(5vw + 60px)" : 4,
                paddingRight: width === "xl" || width === "lg" ? "5%" : 4,
                position: "relative"
              }}
            >
              {this.props.children}
            </div>
            <AppDialogs
              signUpDialog={this.state.signUpDialog}
              closeSignUpDialog={() => this.setState({ signUpDialog: false })}
              uploadDialog={this.state.uploadDialog}
              closeUploadDialog={() => this.setState({ uploadDialog: false })}
              activitiesDialog={this.state.activitiesDialog}
              closeActivitiesDialog={() =>
                this.setState({ activitiesDialog: false })
              }
              advertiseDialog={this.state.advertiseDialog}
              closeAdvertiseDialog={() =>
                this.setState({ advertiseDialog: false })
              }
              settingsDialog={this.state.settingsDialog}
              closeSettingsDialog={() =>
                this.setState({ settingsDialog: false })
              }
              techDialog={this.state.techDialog}
              closeTechDialog={() => this.setState({ techDialog: false })}
              speciesDialog={this.state.speciesDialog}
              closeSpeciesDialog={() => this.setState({ speciesDialog: false })}
            />
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  withRouter(withCurrentSession(withWidth()(AppLayoutRemake)))
);
