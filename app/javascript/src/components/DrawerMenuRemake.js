import React from "react";
import { withStyles } from "@material-ui/core/styles";
import uuidv4 from "uuid/v4";
import { Query } from "react-apollo";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Paper from "@material-ui/core/Paper";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import withWidth from "@material-ui/core/withWidth";
import SubscriptionsIcon from "@material-ui/icons/ViewCarousel";
import TipsIcon from "@material-ui/icons/AttachMoney";
import FaveIcon from "@material-ui/icons/Star";
import SettingsIcon from "@material-ui/icons/Settings";
import PetsIcon from "@material-ui/icons/Pets";
import AdsIcon from "@material-ui/icons/BusinessCenter";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import TagIcon from "@material-ui/icons/AssignmentTurnedIn";

import AssetRequestDialog from "./AppDialogs/AssetRequestDialog";
import SettingsDialog from "./AppDialogs/SettingsDialog";
import AdvertiseDialog from "./AppDialogs/AdvertiseDialog";
import MetricsBar from "./AppLayout/MetricsBar";
import SponsorDashboardDialog from "./AppDialogs/SponsorDashboardDialog";
import SponsorDialog from "./AppDialogs/SponsorDialog";
import TipsDialog from "./AppDialogs/TipsDialog";
import SpeciesDialog from "./AppDialogs/SpeciesDialog";
import { GET_RIBBON_ANNOUNCEMENT } from "../queries/announcementQueries";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import HomeIcon from "@material-ui/icons/Home";
import MediaIcon from "@material-ui/icons/Photo";
import FursuitIcon from "@material-ui/icons/AccessibilityNew";
import MakerIcon from "@material-ui/icons/Build";
import EventIcon from "@material-ui/icons/Business";
import AddIcon from "@material-ui/icons/Add";
import Zoom from "@material-ui/core/Zoom";
import Tooltip from "@material-ui/core/Tooltip";

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
      padding: theme.spacing(2)
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
      marginLeft: theme.spacing(2)
    },
    nested: {
      paddingLeft: theme.spacing(4)
    },
    text: {
      color: theme.palette.text.primary
    },
    link: {
      textDecoration: "none"
    },
    paper: {
      padding: theme.spacing(2),
      margin: theme.spacing(2)
    },
    oversizeTooltip: {
      fontSize: "1.5em"
    }
  };
};

const DrawerItem = ({ classes, label, icon, path, onClick, type }) => {
  if (type === "Link") {
    return (
      <Link to={path} className={classes.link}>
        <ListItem button selected={location.pathname === path} onClick={onClick}>
          <ListItemIcon className={classes.text} color="secondary">
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={label}
            primaryTypographyProps={{
              className: classes.text,
              noWrap: true
            }}
          />
        </ListItem>
      </Link>
    );
  } else if (type === "Dialog") {
    return (
      <ListItem button onClick={onClick}>
        <ListItemIcon className={classes.text} color="secondary">
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={label}
          primaryTypographyProps={{ className: classes.text, noWrap: true }}
        />
      </ListItem>
    );
  } else if (type === "Divider") {
    return <Divider />;
  } else {
    return null;
  }
};

class DrawerMenuRemake extends React.Component {
  state = {
    settingsDialog: false,
    sponsorDialog: false,
    sponsorDashboardDialog: false,
    tipsDialog: false,
    databaseList: false,
    sponsorMenu: false,
    snack: false,
    assetDialog: false,
    adsDialog: false,
    speciesDialog: false
  };

  render() {
    const { classes, location, currentSession, width, onClose } = this.props;
    const user = currentSession && currentSession.user ? currentSession.user : null;

    if (user && user.sponsor) var sponsorLimit = new Date(user.sponsor.limit * 1000);

    const homeItem = {
      label: "Home",
      icon: <HomeIcon />,
      onClick: null,
      path: "/",
      type: "Link"
    };
    const mediaItem = {
      label: "Media",
      icon: <MediaIcon />,
      onClick: null,
      path: "/pictures",
      type: "Link"
    };
    const fursuitItem = {
      label: "Fursuits",
      icon: <FursuitIcon />,
      onClick: null,
      path: "/fursuits",
      type: "Link"
    };
    const makerItem = {
      label: "Makers",
      icon: <MakerIcon />,
      onClick: null,
      path: "/makers",
      type: "Link"
    };
    const eventItem = {
      label: "Events",
      icon: <EventIcon />,
      onClick: null,
      path: "/events",
      type: "Link"
    };
    const createItem = {
      label: "Create",
      icon: <AddIcon />,
      onClick: () => {
        this.setState({ assetDialog: true });
      },
      path: null,
      type: "Dialog"
    };
    const tagItem = {
      label: "Tag Media",
      icon: <TagIcon />,
      onClick: null,
      path: "/tag",
      type: "Link"
    };
    const subsItem = {
      label: "Subscriptions",
      icon: <SubscriptionsIcon />,
      onClick: null,
      path: "/subscriptions",
      type: "Link"
    };
    const favesItem = {
      label: "Favorites",
      icon: <FaveIcon />,
      onClick: null,
      path: "/favorites",
      type: "Link"
    };
    const announcementsItem = {
      label: "Announcements",
      icon:
        currentSession && currentSession.user.unreadAnnouncementsCount > 0 ? (
          <Badge badgeContent={user.unreadAnnouncementsCount} color="primary">
            <AnnouncementIcon />
          </Badge>
        ) : (
          <AnnouncementIcon />
        ),
      onClick: null,
      path: "/announcements",
      type: "Link"
    };
    const dividerItem = {
      type: "Divider"
    };
    const settingsItem = {
      label: "Settings",
      icon: <SettingsIcon />,
      onClick: () => this.setState({ settingsDialog: true }),
      path: null,
      type: "Dialog"
    };
    const beginSponsorshipItem = {
      label: "Become a Sponsor!",
      icon: <PetsIcon />,
      onClick: () => this.setState({ sponsorDialog: true }),
      path: null,
      type: "Dialog"
    };
    const sponsorshipItem = {
      label: "Sponsorship",
      icon: <PetsIcon />,
      onClick: () => this.setState({ sponsorDashboardDialog: true }),
      path: null,
      type: "Dialog"
    };
    const advertiseItem = {
      label: "Advertise with Scritch",
      icon: <AdsIcon />,
      onClick: () => this.setState({ adsDialog: true }),
      path: null,
      type: "Dialog"
    };
    const tipsItem = {
      label: "Tip Jar",
      icon: <TipsIcon />,
      onClick: () => this.setState({ tipsDialog: true }),
      path: null,
      type: "Dialog"
    };

    let itemsPack = [];
    let userType;
    if (currentSession) {
      if (currentSession.user.suspendedUser) userType = "Suspended";
      else if (currentSession.user.sponsor) userType = "Sponsor";
      else userType = "Basic";
    } else {
      userType = "Visitor";
    }

    switch (userType) {
      case "Suspended":
        itemsPack = [[homeItem], [announcementsItem, dividerItem, settingsItem]];
        break;
      case "Sponsor":
        itemsPack = [
          [homeItem, mediaItem, fursuitItem, makerItem, eventItem],
          [createItem, tagItem, subsItem, favesItem],
          [sponsorshipItem, advertiseItem, tipsItem],
          [announcementsItem, dividerItem, settingsItem]
        ];
        break;
      case "Basic":
        itemsPack = [
          [homeItem, mediaItem, fursuitItem, makerItem, eventItem],
          [createItem, tagItem, subsItem, favesItem],
          [beginSponsorshipItem, advertiseItem, tipsItem],
          [announcementsItem, dividerItem, settingsItem]
        ];
        break;
      case "Visitor":
        itemsPack = [
          [homeItem, mediaItem, fursuitItem, makerItem, eventItem],
          [tipsItem],
          [announcementsItem]
        ];
    }
    return (
      <React.Fragment>
        <div
          className={classes.drawerSpacer}
          style={{
            justifyContent: "space-between"
          }}
        >
          {itemsPack.map((block, index) => (
            <React.Fragment key={`block-${index}`}>
              <div>
                <List disablePadding={width !== "lg" && width !== "xl"}>
                  {block.map(item => (
                    <DrawerItem
                      classes={classes}
                      onClick={() => {
                        if ((width === "sm" || width === "xs") && item.type === "Link") {
                          onClose();
                          item.onClick;
                        } else item.onClick();
                      }}
                      label={item.label}
                      path={item.path}
                      icon={item.icon}
                      type={item.type}
                      key={`${index}-${item.label}`}
                    />
                  ))}
                </List>
              </div>
              {width !== "xl" && width !== "lg" && width !== "md" && <Divider />}
            </React.Fragment>
          ))}
          <SettingsDialog
            open={this.state.settingsDialog}
            onClose={() => {
              this.setState({ settingsDialog: false });
              if (this.props.onClose) {
                this.props.onClose();
              }
            }}
          />
          <TipsDialog
            open={this.state.tipsDialog}
            onClose={() => {
              this.setState({ tipsDialog: false });
              if (this.props.onClose) {
                this.props.onClose();
              }
            }}
          />
          <SponsorDialog
            open={this.state.sponsorDialog}
            onClose={() => {
              this.setState({ sponsorDialog: false });
              if (this.props.onClose) {
                this.props.onClose();
              }
            }}
          />
          <SpeciesDialog
            open={this.state.speciesDialog}
            onClose={() => {
              this.setState({ speciesDialog: false });
              if (this.props.onClose) {
                this.props.onClose();
              }
            }}
          />
          <AdvertiseDialog
            open={this.state.adsDialog}
            onClose={() => {
              this.setState({ adsDialog: false });
              if (this.props.onClose) {
                this.props.onClose();
              }
            }}
          />
          <AssetRequestDialog
            open={this.state.assetDialog}
            keepAssetType={null}
            onClose={() => {
              this.setState({ assetDialog: false });
              if (this.props.onClose) {
                this.props.onClose();
              }
            }}
            submitSnack={() => this.setState({ snack: true })}
            assetType="Asset"
          />
          <SponsorDashboardDialog
            open={this.state.sponsorDashboardDialog}
            onClose={() => {
              this.setState({ sponsorDashboardDialog: false });
              if (this.props.onClose) {
                this.props.onClose();
              }
            }}
          />
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.snack}
            autoHideDuration={6000}
            onClose={this.handleClose}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">Request Submitted!</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={() => this.setState({ snack: false })}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(withCurrentSession(withWidth()(DrawerMenuRemake))));
