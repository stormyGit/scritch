import React, {useState} from "react";
import {withStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
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

import AssetRequestDialog from "../AppDialogs/AssetRequestDialog";
import SettingsDialog from "../AppDialogs/SettingsDialog";
import AdvertiseDialog from "../AppDialogs/AdvertiseDialog";
import SponsorDashboardDialog from "../AppDialogs/SponsorDashboardDialog";
import SponsorDialog from "../AppDialogs/SponsorDialog";
import TipsDialog from "../AppDialogs/TipsDialog";
import SpeciesDialog from "../AppDialogs/SpeciesDialog";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import HomeIcon from "@material-ui/icons/Home";
import MediaIcon from "@material-ui/icons/Photo";
import FursuitIcon from "@material-ui/icons/AccessibilityNew";
import MakerIcon from "@material-ui/icons/Build";
import EventIcon from "@material-ui/icons/Business";
import AddIcon from "@material-ui/icons/Add";

import {Link, withRouter} from "react-router-dom";

import withCurrentSession from "../withCurrentSession";
import {BASIC, resolveUserType, SPONSOR, SUSPENDED, VISITOR} from "../../util/userCategory";

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

const DrawerItem = ({classes, label, icon, path, onClick, type}) => {
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
          primaryTypographyProps={{className: classes.text, noWrap: true}}
        />
      </ListItem>
    );
  } else if (type === "Divider") {
    return <Divider/>;
  } else {
    return null;
  }
};

function DrawerMenu(props) {
  const {classes, currentSession, width, onClose} = props;
  const user = currentSession && currentSession.user ? currentSession.user : null;
  const [settingsDialog, setSettingsDialog] = useState(false);
  const [sponsorDashboardDialog, setSponsorDashboardDialog] = useState(false);
  const [snack, setSnack] = useState(false);

  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  const homeItem = {
    label: "Home",
    icon: <HomeIcon/>,
    onClick: null,
    path: "/",
    type: "Link"
  };
  const tagItem = {
    label: "Tag Media",
    icon: <TagIcon/>,
    onClick: null,
    path: "/tag",
    type: "Link"
  };
  const subsItem = {
    label: "Subscriptions",
    icon: <SubscriptionsIcon/>,
    onClick: null,
    path: "/subscriptions",
    type: "Link"
  };
  const favesItem = {
    label: "Favorites",
    icon: <FaveIcon/>,
    onClick: null,
    path: "/favorites",
    type: "Link"
  };

  const sponsorshipItem = {
    label: "Sponsorship",
    icon: <PetsIcon/>,
    onClick: () => setSponsorDashboardDialog(true),
    path: null,
    type: "Dialog"
  };
  const announcementsItem = {
    label: "Announcements",
    icon:
      currentSession && currentSession.user.unreadAnnouncementsCount > 0 ? (
        <Badge badgeContent={user.unreadAnnouncementsCount} color="primary">
          <AnnouncementIcon/>
        </Badge>
      ) : (
        <AnnouncementIcon/>
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
    icon: <SettingsIcon/>,
    onClick: () => setSettingsDialog(true),
    path: null,
    type: "Dialog"
  };

  let itemsPack = [];
  let userType = resolveUserType(currentSession);

  switch (userType) {
    case SUSPENDED:
      itemsPack = [
        [homeItem],
        [announcementsItem, dividerItem, settingsItem]
      ];
      break;
    case SPONSOR:
      itemsPack = [
        [homeItem],
        [tagItem, subsItem, favesItem],
        [sponsorshipItem],
        [announcementsItem, dividerItem, settingsItem]
      ];
      break;
    case BASIC:
      itemsPack = [
        [homeItem],
        [tagItem, subsItem, favesItem],
        [announcementsItem, dividerItem, settingsItem]
      ];
      break;
    case VISITOR:
      itemsPack = [
        [homeItem],
        [announcementsItem, dividerItem]
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
            {width !== "xl" && width !== "lg" && width !== "md" && <Divider/>}
          </React.Fragment>
        ))}
        <SettingsDialog
          open={settingsDialog}
          onClose={() => {
            setSettingsDialog(false);
            handleClose();
          }}
        />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={snack}
          autoHideDuration={6000}
          onClose={handleClose}
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
              onClick={() => setSnack(false)}
            >
              <CloseIcon/>
            </IconButton>
          ]}
        />
      </div>
    </React.Fragment>
  );
}

export default withRouter(withStyles(styles)(withCurrentSession(withWidth()(DrawerMenu))));
