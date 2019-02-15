import React from "react";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import queryString from "query-string";
import Hidden from "@material-ui/core/Hidden";
import Slide from "@material-ui/core/Slide";

import { Link, withRouter } from "react-router-dom";
import withCurrentSession from "./withCurrentSession";
import SearchBar from "./SearchBar";
import GlobalProgress from "./GlobalProgress";
import PermanentDrawer from "./PermanentDrawer";

import DatabasesButton from "./AppLayout/DatabasesButton";
import TagButton from "./AppLayout/TagButton";
import UploadButton from "./AppLayout/UploadButton";
import SocialButton from "./AppLayout/SocialButton";
import PoliciesSupportButton from "./AppLayout/PoliciesSupportButton";
import DisplayPageTitle from "./AppLayout/DisplayPageTitle";
import MetricsBar from "./AppLayout/MetricsBar";
import UserButton from "./AppLayout/UserButton";
import NotificationsButton from "./AppLayout/NotificationsButton";
import TechButton from "./AppLayout/TechButton";
import SponsorButton from "./AppLayout/SponsorButton";
import AppDialogs from "./AppLayout/AppDialogs";
import MenuIcon from "@material-ui/icons/Menu";

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    minHeight: "calc(100vh - 56px)"
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
  }
});

class AppLayoutRemake extends React.Component {
  state = {
    uploadDialog: false,
    signUpDialog: false,
    mainDrawer: true,
    searchEnabled: false,
    activitiesDialog: false,
    chatDialog: false,
    settingsDialog: false,
    advertiseDialog: false,
    techDialog: false,
    query: {}
  };

  componentDidMount() {
    this.handleQuery(this.props);
  }

  componentWillReceiveProps(nextProps) {
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
      pathname: "/pictures",
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

    return (
      <React.Fragment>
        <GlobalProgress />
        <div className={classes.root}>
          {this.state.mainDrawer && (
            <Hidden mdDown>
              <PermanentDrawer />
            </Hidden>
          )}
          <main className={classes.content}>
            <div className={classes.toolbar} />
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
                  <React.Fragment>
                    <IconButton
                      title="Menu"
                      color="inherit"
                      onClick={() =>
                        this.setState({ mainDrawer: !this.state.mainDrawer })
                      }
                    >
                      <MenuIcon color="primary" />
                    </IconButton>

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

                {this.state.searchEnabled && !query.q && (
                  <IconButton
                    className={classes.closeIcon}
                    onClick={() => {
                      this.setState({ searchEnabled: false });
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
                {(this.state.searchEnabled ||
                  width === "lg" ||
                  width === "xl") && (
                  <div
                    className={classes.searchBar}
                    style={{
                      paddingLeft: appBarPadding,
                      maxWidth: width === "lg" || width === "xl" ? 300 : "none",
                      marginRight: width === "lg" || width === "xl" ? 16 : 0
                    }}
                  >
                    <SearchBar
                      autoFocus={width !== "lg" && width !== "xl" && !query.q}
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

                {!this.state.searchEnabled && width !== "lg" && width !== "xl" && (
                  <IconButton
                    className={[classes.searchIcon, classes.tinyButton].join(
                      " "
                    )}
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
                    {width === "xl" && <MetricsBar />}
                    <NotificationsButton
                      onClick={() => this.setState({ activitiesDialog: true })}
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
            <div>{this.props.children}</div>
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
