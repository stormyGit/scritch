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
import {setAssetRequestEventDialogState, setAssetRequestFursuitDialogState, setAssetRequestMakerDialogState, setUploadDialogState} from "../../reducers/Action";
import {DialogContext} from "../../context/DialogContext";
import {pageTitleToIndex} from "../../util/converter";
import {NavigationContext} from "../../context/NavigationContext";

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

const ScritchFab = ({classes}) => {
  const theme = useTheme();
  const [pawClicked, setPawClicked] = useState(false);
  const dialogContext = useContext(DialogContext);
  const pageIndex = pageTitleToIndex(location.pathname);
  const {scrollAmount} = useContext(NavigationContext);

  let bottomSpacing = 2;
  if (pageIndex !== false)
    bottomSpacing += 6;
  if (scrollAmount >= 0)
    bottomSpacing += 6;

  const fabs = [
    {
      icon: <EventIcon/>,
      label: 'Convention',
      className: classes.addConvention,
      dialogCallback: setAssetRequestEventDialogState(true)
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
      icon: <MediaIcon/>,
      label: 'Media',
      className: classes.addMedia,
      dialogCallback: setUploadDialogState(true)
    },
  ];

  return (
    <div className={classes.root} style={{bottom: theme.spacing(bottomSpacing)}}>
      <ScritchButton size={64} color="secondary" aria-label="add" onClick={() => setPawClicked(!pawClicked)}/>
      {fabs.map((fab, index) => (
        <Zoom key={index + ""} in={pawClicked}>
          <Fab aria-label={fab.label} className={fab.className} color={"secondary"} onClick={() => dialogContext.dispatchDialogChange(fab.dialogCallback)}
          >
            {fab.icon}
          </Fab>
        </Zoom>
      ))}

    </div>
  );
};

export default withStyles(styles)(ScritchFab);
