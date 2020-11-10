import React, {useContext, useState} from "react";
import {withStyles} from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import MediaIcon from "@material-ui/icons/Photo";
import FursuitIcon from "@material-ui/icons/AccessibilityNew";
import MakerIcon from "@material-ui/icons/Build";
import EventIcon from "@material-ui/icons/Business";
import useTheme from "@material-ui/core/styles/useTheme";
import Zoom from '@material-ui/core/Zoom';
import ScritchButton from "./ScritchButton";
import {setActivitiesDialogState, setAssetDialogState, setAssetRequestEventDialogState, setAssetRequestFursuitDialogState, setAssetRequestMakerDialogState, setSearchDialogState, setSettingsDialogState, setSpeciesDialogState, setUploadDialogState} from "../../reducers/Action";
import NotificationsButton from "../AppLayout/NotificationsButton";
import {DialogContext} from "../../context/DialogContext";
import {pageTitleToIndex} from "../Global/PageTabs";

const styles = theme => ({
  root: {
    transform: 'rotate(-45deg)',
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1000
  },
  addMedia: {
    position: 'absolute',
    width: 48,
    bottom: 80,
    right: -10,
  },
  addSuit: {
    position: 'absolute',
    width: 48,
    bottom: 110,
    right: 30,
  },
  addMaker: {
    position: 'absolute',
    width: 48,
    bottom: 110,
    right: 80,
  },
  addConvention: {
    position: 'absolute',
    width: 48,
    bottom: 82,
    right: 118,
  },
});

function ScritchFab(props) {
  const {classes} = props;
  const [pawClicked, setPawClicked] = useState(false);
  const dialogContext = useContext(DialogContext);
  const pageIndex = pageTitleToIndex(location.pathname);

  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  const fabs = [
    {
      icon: <MediaIcon/>,
      label: 'Media',
      className: classes.addMedia,
      dialogCallback: setUploadDialogState(true)
    },
    {
      icon: <FursuitIcon/>,
      label: 'Suit',
      className: classes.addSuit,
      dialogCallback: setAssetRequestFursuitDialogState(true)
    },
    {
      icon: <MakerIcon/>,
      label: 'Maker',
      className: classes.addMaker,
      dialogCallback: setAssetRequestMakerDialogState(true)
    },
    {
      icon: <EventIcon/>,
      label: 'Convention',
      className: classes.addConvention,
      dialogCallback: setAssetRequestEventDialogState(true)
    },
  ];

  return (
    <div className={classes.root} style={{bottom: pageIndex === false ? theme.spacing(2) : theme.spacing(8)}}>
      <ScritchButton size={64} color="secondary" aria-label="add" onClick={() => setPawClicked(!pawClicked)}/>
      {/*<Fab color="secondary" aria-label="add" onClick={() => setPawClicked(!pawClicked)}>
        <AddIcon/>

      </Fab>*/}

      {fabs.map((fab, index) => (
        <Zoom in={pawClicked}>
          <Fab aria-label={fab.label} className={fab.className} color={"secondary"} onClick={() => dialogContext.dispatchDialogChange(fab.dialogCallback)}
          >
            {fab.icon}
          </Fab>
        </Zoom>
      ))}

    </div>
  );
}

export default withStyles(styles)(ScritchFab);
