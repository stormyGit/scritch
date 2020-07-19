import React from "react";
import {withStyles} from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import queryString from "query-string";
import Button from "@material-ui/core/Button";
import DisplayPageTitle from "../AppLayout/DisplayPageTitle";

import {Link, withRouter} from "react-router-dom";
import withCurrentSession from "../withCurrentSession";
import GlobalProgress from "../Global/GlobalProgress";

import UserButton from "../AppLayout/UserButton";

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
  toolbarLink: {
    textDecoration: "none"
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
  }
});

class ModerationLayout extends React.Component {
  componentDidMount() {
    this.handleQuery(this.props);
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
          <main className={classes.content}>
            <div className={classes.toolbar} />
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
                  <Link to="/react_moderation" className={classes.toolbarLink}>
                    {(this.props.width === "xl" ||
                      this.props.width === "lg") && (
                      <Button color="primary">Home</Button>
                    )}
                    {this.props.width !== "xl" && this.props.width !== "lg" && (
                      <IconButton title="Home" color="primary">
                        <HomeIcon />
                      </IconButton>
                    )}
                  </Link>
                  {this.props.width === "xl" ||
                    (this.props.width === "lg" && (
                      <div className={classes.titleZone}>
                        <DisplayPageTitle />
                      </div>
                    ))}
                  <UserButton
                    openSignUp={() => this.setState({ signUpDialog: true })}
                    openSettings={() => this.setState({ settingsDialog: true })}
                  />
                </Toolbar>
              </AppBar>
            )}
            <div
              style={{
                overflowX: "hidden",
                overflowY: "scroll",
                height: "calc(100vh - 56px)",
                paddingLeft: width === "xl" || width === "lg" ? "5%" : 4,
                paddingRight: width === "xl" || width === "lg" ? "5%" : 4,
                position: "relative"
              }}
            >
              {this.props.children}
            </div>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  withRouter(withCurrentSession(withWidth()(ModerationLayout)))
);
