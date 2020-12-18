import React, {useContext, useState} from "react";
import {withStyles} from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import MediaIcon from "@material-ui/icons/Photo";
import {EventIcon, MakerIcon, SpeciesIcon} from "./ScritchIcons";
import useTheme from "@material-ui/core/styles/useTheme";
import Zoom from '@material-ui/core/Zoom';
import ScritchButton from "./ScritchButton";
import {setAssetRequestEventDialogState, setAssetRequestFursuitDialogState, setAssetRequestMakerDialogState, setUploadDialogState} from "../../reducers/Action";
import {DialogContext} from "../../context/DialogContext";
import {pageTitleToIndex} from "../../util/converter";
import {NavigationContext} from "../../context/NavigationContext";
import Tooltip from "@material-ui/core/Tooltip";

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
    bottom: 112,
    right: 32,
  },
  addMaker: {
    position: 'absolute',
    width: 48,
    bottom: 110,
    right: 81,
  },
  addConvention: {
    position: 'absolute',
    width: 48,
    bottom: 80,
    right: 122,
  },
});

const ScritchFab = ({classes}) => {
  const theme = useTheme();
  const [pawClicked, setPawClicked] = useState(false);
  const dialogContext = useContext(DialogContext);
  const pageIndex = pageTitleToIndex(location.pathname);
  const {scrollAmount} = useContext(NavigationContext);

  let bottomSpacing = 2;
  // if (pageIndex !== false)
  //   bottomSpacing += 6;
  if (scrollAmount >= 0)
    bottomSpacing += 6;

  const fabs = [
    {
      icon: <EventIcon/>,
      label: 'Convention',
      className: classes.addConvention,
      dialogCallback: setAssetRequestEventDialogState(true),
      tooltipText: "Add a new Event"
    },
    {
      icon: <SpeciesIcon/>,
      label: 'Suit',
      className: classes.addSuit,
      dialogCallback: setAssetRequestFursuitDialogState(true),
      tooltipText: "Add a new Suit"
    },
    {
      icon: <MakerIcon/>,
      label: 'Maker',
      className: classes.addMaker,
      dialogCallback: setAssetRequestMakerDialogState(true),
      tooltipText: "Add a new Maker"
    },
    {
      icon: <MediaIcon/>,
      label: 'Media',
      className: classes.addMedia,
      dialogCallback: setUploadDialogState(true),
      tooltipText: "Add new Images or Videos"
    },
  ];

  return (
    <div className={classes.root} style={{bottom: theme.spacing(bottomSpacing)}}>
      <ScritchButton size={64} color="secondary" aria-label="add" onClick={() => setPawClicked(!pawClicked)}/>
      {fabs.map((fab, index) => (
        <Zoom key={index + ""} in={pawClicked}>
          <Tooltip title={fab.tooltipText} aria-label={fab.tooltipText} placement="left">
            <Fab aria-label={fab.label} className={fab.className} color={"secondary"} onClick={() => dialogContext.dispatchDialogChange(fab.dialogCallback)}>
              {fab.icon}
            </Fab>
          </Tooltip>
        </Zoom>
      ))}

    </div>
  );
};

export default withStyles(styles)(ScritchFab);
