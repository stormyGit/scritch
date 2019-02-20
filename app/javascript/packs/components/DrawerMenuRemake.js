import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Query, Mutation, withApollo } from "react-apollo";
import Divider from "@material-ui/core/Divider";
import ButtonBase from "@material-ui/core/ButtonBase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import withWidth from "@material-ui/core/withWidth";
import dateFormat from "dateformat";
import SubscriptionsIcon from "@material-ui/icons/ViewCarousel";
import DashboardIcon from "@material-ui/icons/Web";
import StatsIcon from "@material-ui/icons/Poll";
import FaveIcon from "@material-ui/icons/Star";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import PictureIcon from "@material-ui/icons/PhotoLibrary";
import SettingsIcon from "@material-ui/icons/Settings";
import ToysIcon from "@material-ui/icons/Toys";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import AsssistantPhotoIcon from "@material-ui/icons/AssistantPhoto";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import UploadIcon from "@material-ui/icons/CloudUpload";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import TagIcon from "@material-ui/icons/AssignmentTurnedIn";

import TermsDialog from "./TermsDialog";
import TechDialog from "./TechDialog";
import PrivacyPolicyDialog from "./PrivacyPolicyDialog";
import SettingsDialog from "./SettingsDialog";
import SignUpDialog from "./SignUpDialog";
import AnnouncementsDialog from "./AnnouncementsDialog";
import MultipleMediaDialog from "./MultipleMediaDialog";

import ProfileAvatar from "./ProfileAvatar";
import themeSelector from "../themeSelector";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import HomeIcon from "@material-ui/icons/Home";
import DatabaseIcon from "@material-ui/icons/LibraryBooks";

import { Link, withRouter } from "react-router-dom";

import withCurrentSession from "./withCurrentSession";

const styles = theme => {
  return {
    drawerSpacer: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1
    },
    profile: {
      display: "flex",
      width: "100%",
      position: "relative",
      justifyContent: "flex-start",
      padding: theme.spacing.unit * 2
    },
    bannerPlaceholder: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 0.4
    },
    userInfo: {
      display: "flex",
      zIndex: 1,
      alignItems: "center"
    },
    infoText: {
      marginLeft: theme.spacing.unit * 2
    },
    nested: {
      paddingLeft: theme.spacing.unit * 4
    },
    text: {
      color: theme.palette.text.primary
    },
    link: {
      textDecoration: "none"
    }
  };
};

class DrawerMenuRemake extends React.Component {
  state = {
    settingsDialog: false,
    databaseList: false,
    sponsorMenu: true
  };
  render() {
    const { classes, location, currentSession, width } = this.props;
    const user =
      currentSession && currentSession.user ? currentSession.user : null;

    if (user && user.sponsor)
      var sponsorLimit = new Date(user.sponsor.limit * 1000);

    return (
      <React.Fragment>
        <div
          className={classes.drawerSpacer}
          style={{
            justifyContent:
              width === "lg" || width === "xl" ? "space-between" : "flex-start"
          }}
        >
          <div>
            <List disablePadding={width !== "lg" && width !== "xl"}>
              <React.Fragment>
                <ListItem
                  button
                  selected={
                    location.pathname === "/" ||
                    location.pathname === "/pictures"
                  }
                  onClick={() => {
                    this.props.history.push({
                      pathname: "/"
                    });
                    if (this.props.onClose) {
                      this.props.onClose();
                    }
                  }}
                >
                  <ListItemIcon className={classes.text} color="secondary">
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Home"
                    primaryTypographyProps={{ className: classes.text }}
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    this.setState({ databaseList: !this.state.databaseList });
                  }}
                >
                  <ListItemIcon className={classes.text} color="secondary">
                    <DatabaseIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Browse"
                    primaryTypographyProps={{ className: classes.text }}
                  />
                  {this.state.databaseList ? (
                    <ExpandLess className={classes.text} />
                  ) : (
                    <ExpandMore className={classes.text} />
                  )}
                </ListItem>
                <Collapse
                  in={this.state.databaseList}
                  timeout="auto"
                  unmountOnExit
                >
                  {user && (
                    <List component="div" disablePadding>
                      <ListItem
                        button
                        onClick={() => {
                          this.props.history.push({
                            pathname: "/pictures"
                          });
                          if (this.props.onClose) {
                            this.props.onClose();
                          }
                        }}
                        className={classes.nested}
                        selected={location.pathname === "/pictures"}
                      >
                        <ListItemText
                          primary="Media"
                          primaryTypographyProps={{ className: classes.text }}
                        />
                      </ListItem>
                      <ListItem
                        button
                        onClick={() => {
                          this.props.history.push({
                            pathname: "/fursuits"
                          });
                          if (this.props.onClose) {
                            this.props.onClose();
                          }
                        }}
                        className={classes.nested}
                        selected={location.pathname === "/fursuits"}
                      >
                        <ListItemText
                          primary="Fursuits"
                          primaryTypographyProps={{ className: classes.text }}
                        />
                      </ListItem>
                      <ListItem
                        button
                        selected={location.pathname === "/makers"}
                        onClick={() => {
                          this.props.history.push({
                            pathname: "/makers"
                          });
                          if (this.props.onClose) {
                            this.props.onClose();
                          }
                        }}
                        className={classes.nested}
                      >
                        <ListItemText
                          primary="Makers"
                          primaryTypographyProps={{ className: classes.text }}
                        />
                      </ListItem>
                      <ListItem
                        button
                        selected={location.pathname === "/events"}
                        onClick={() => {
                          this.props.history.push({
                            pathname: "/events"
                          });
                          if (this.props.onClose) {
                            this.props.onClose();
                          }
                        }}
                        className={classes.nested}
                      >
                        <ListItemText
                          primary="Events"
                          primaryTypographyProps={{ className: classes.text }}
                        />
                      </ListItem>
                    </List>
                  )}
                  {!user && (
                    <List component="div" disablePadding>
                      <ListItem button disabled className={classes.nested}>
                        <ListItemText
                          primary="You must be logged in"
                          primaryTypographyProps={{ className: classes.text }}
                        />
                      </ListItem>
                    </List>
                  )}
                </Collapse>
                {currentSession && (
                  <ListItem
                    button
                    selected={location.pathname === "/tag"}
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/tag"
                      });
                      if (this.props.onClose) {
                        this.props.onClose();
                      }
                    }}
                  >
                    <ListItemIcon className={classes.text} color="secondary">
                      <TagIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Tag Media"
                      primaryTypographyProps={{ className: classes.text }}
                    />
                  </ListItem>
                )}
                {user && (
                  <ListItem
                    button
                    selected={location.pathname === "/stats"}
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/stats"
                      });
                      if (this.props.onClose) {
                        this.props.onClose();
                      }
                    }}
                  >
                    <ListItemIcon className={classes.text} color="secondary">
                      <StatsIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Statistics"
                      primaryTypographyProps={{ className: classes.text }}
                    />
                  </ListItem>
                )}
              </React.Fragment>
            </List>
          </div>
          {user && user.sponsor && (
            <div>
              <ListItem
                button
                onClick={() => {
                  this.setState({ sponsorMenu: !this.state.sponsorMenu });
                }}
              >
                <ListItemIcon className={classes.text} color="secondary">
                  <DatabaseIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Sponsor Menu"
                  primaryTypographyProps={{ className: classes.text }}
                />
                {this.state.sponsorMenu ? (
                  <ExpandLess className={classes.text} />
                ) : (
                  <ExpandMore className={classes.text} />
                )}
              </ListItem>
              <Collapse
                in={this.state.sponsorMenu}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <ListItem button disabled>
                    <ListItemText
                      primary={
                        user.sponsor.status == "live"
                          ? `Renews: ${dateFormat(
                              sponsorLimit,
                              "mmmm dS, yyyy"
                            )}`
                          : `Expires ${dateFormat(
                              sponsorLimit,
                              "mmmm dS, yyyy"
                            )}`
                      }
                      primaryTypographyProps={{ className: classes.text }}
                    />
                  </ListItem>
                  <ListItem
                    button
                    selected={location.pathname === "/subscriptions"}
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/subscriptions"
                      });
                      if (this.props.onClose) {
                        this.props.onClose();
                      }
                    }}
                  >
                    <ListItemIcon className={classes.text} color="secondary">
                      <SubscriptionsIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Subscriptions"
                      primaryTypographyProps={{ className: classes.text }}
                    />
                  </ListItem>
                  <ListItem
                    button
                    selected={location.pathname === "/favorites"}
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/favorites"
                      });
                      if (this.props.onClose) {
                        this.props.onClose();
                      }
                    }}
                  >
                    <ListItemIcon className={classes.text} color="secondary">
                      <FaveIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Favorites Gallery"
                      primaryTypographyProps={{ className: classes.text }}
                    />
                  </ListItem>
                  <a
                    href={`${process.env.SITE_URL}/sponsors`}
                    className={classes.link}
                  >
                    <ListItem
                      button
                      selected={location.pathname === "/sponsors"}
                    >
                      <ListItemIcon className={classes.text} color="secondary">
                        <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Sponsor Dashboard"
                        primaryTypographyProps={{ className: classes.text }}
                      />
                    </ListItem>
                  </a>
                </List>
              </Collapse>
            </div>
          )}
          <div>
            {console.log(user)}
            <List disablePadding={width !== "lg" && width !== "xl"}>
              {currentSession && !this.props.disableSettings && (
                <React.Fragment>
                  <ListItem
                    button
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/announcements"
                      });
                      if (this.props.onClose) {
                        this.props.onClose();
                      }
                    }}
                  >
                    <ListItemIcon className={classes.text}>
                      {currentSession && user.unreadAnnouncementsCount > 0 ? (
                        <Badge
                          badgeContent={user.unreadAnnouncementsCount}
                          color="primary"
                        >
                          <AnnouncementIcon />
                        </Badge>
                      ) : (
                        <AnnouncementIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary="Announcements"
                      primaryTypographyProps={{ className: classes.text }}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem
                    button
                    onClick={() => this.setState({ settingsDialog: true })}
                  >
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Settings"
                      primaryTypographyProps={{
                        noWrap: true
                      }}
                    />
                  </ListItem>
                </React.Fragment>
              )}
              {!currentSession && !this.props.disableSettings && (
                <React.Fragment>
                  <ListItem
                    button
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/announcements"
                      });
                      if (this.props.onClose) {
                        this.props.onClose();
                      }
                    }}
                  >
                    <ListItemIcon className={classes.text}>
                      <AnnouncementIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Announcements"
                      primaryTypographyProps={{ className: classes.text }}
                    />
                  </ListItem>
                </React.Fragment>
              )}
            </List>
          </div>
        </div>
        <SettingsDialog
          open={this.state.settingsDialog}
          onClose={() => {
            this.setState({ settingsDialog: false });
            if (this.props.onClose) {
              this.props.onClose();
            }
          }}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(
  withStyles(styles)(withCurrentSession(withWidth()(DrawerMenuRemake)))
);
