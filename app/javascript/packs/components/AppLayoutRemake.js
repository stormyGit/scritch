import React from "react";
import queryString from "query-string";
import { withStyles } from "@material-ui/core/styles";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import withWidth from "@material-ui/core/withWidth";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatButtleIcon from "@material-ui/icons/ChatBubble";
import ChatButtleEmptyIcon from "@material-ui/icons/ChatBubbleOutline";
import CloseIcon from "@material-ui/icons/Close";
import BackIcon from "@material-ui/icons/ArrowBack";
import BusinessIcon from "@material-ui/icons/Business";

import { Link, withRouter } from "react-router-dom";
import TelegramLoginButton from "react-telegram-login";
import SignUpDialog from "./SignUpDialog";
import MultipleMediaDialog from "./MultipleMediaDialog";
import PermanentDrawer from "./PermanentDrawer";
import TemporaryDrawer from "./TemporaryDrawer";
import AppBottomNavigation from "./AppBottomNavigation";
import withCurrentSession from "./withCurrentSession";
import SearchBar from "./SearchBar";
import GlobalProgress from "./GlobalProgress";
import ActivitiesDialog from "./ActivitiesDialog";
import ChatDialog from "./ChatDialog";
import SettingsDialog from "./SettingsDialog";
import AdvertiseDialog from "./AdvertiseDialog";

import DisplayPageTitle from "./DisplayPageTitle";
import DatabasesButton from "./AppLayout/DatabasesButton";
import UploadButton from "./AppLayout/UploadButton";
import UserButton from "./AppLayout/UserButton";
import AppDialogs from "./AppLayout/AppDialogs";

import UserAvatar from "./UserAvatar";
import Logo from "./Logo";

import {
  GET_SESSION,
  GET_UNREAD_ACTIVITY_COUNT,
  GET_UNREAD_CHATS_COUNT
} from "../queries";

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
    flexGrow: 1,
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
  tinyButton: {}
});

class AppLayoutRemake extends React.Component {
  state = {
    uploadDialog: false,
    signUpDialog: false,
    drawer: false,
    searchEnabled: false,
    activitiesDialog: false,
    chatDialog: false,
    settingsDialog: false,
    advertiseDialog: false,
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
                <DatabasesButton />
                <UploadButton
                  onClick={() => this.setState({ uploadDialog: true })}
                />

                <div className={classes.titleZone}>
                  <DisplayPageTitle />
                </div>
                <UserButton
                  onClick={() => this.setState({ signUpDialog: true })}
                />
              </Toolbar>
            </AppBar>
            <div id="scoll-parent">{this.props.children}</div>
            <AppDialogs
              uploadDialog={this.state.uploadDialog}
              closeUploadDialog={() => this.setState({ uploadDialog: false })}
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
