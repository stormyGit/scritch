import React, {useState} from "react";
import {withStyles} from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import AddIcon from "@material-ui/icons/Add";
import MediaIcon from "@material-ui/icons/Photo";
import FursuitIcon from "@material-ui/icons/AccessibilityNew";
import MakerIcon from "@material-ui/icons/Build";
import EventIcon from "@material-ui/icons/Business";
import useTheme from "@material-ui/core/styles/useTheme";
import Zoom from "@material-ui/core/Zoom";
import ScritchIcon from "./ScritchIcon";
import ScritchButton from "./ScritchButton";

const styles = theme => ({
  root: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1000
  },
  addMedia: {
    position: 'absolute',
    width: 48,
    transform: "rotate(-25deg) !important",
    bottom: 100 + 20,
    right: 100 - 70,
  },
  addSuit: {
    position: 'absolute',
    transform: "rotate(-40deg) !important",
    width: 48,
    bottom: 100 + 18,
    right: 100 - 18,
  },
  addMaker: {
    position: 'absolute',
    transform: "rotate(-60deg) !important",
    width: 48,
    bottom: 100 - 18,
    right: 100 + 18,
  },
  addConvention: {
    position: 'absolute',
    transform: "rotate(-75deg) !important",
    width: 48,
    bottom: 100 - 68,
    right: 100 + 30,
  },
});

function ScritchFab(props) {
  const {classes} = props;
  const [pawClicked, setPawClicked] = useState(true);

  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  const fabs = [
    {
      icon: <MediaIcon/>,
      label: 'Media',
      className: classes.addMedia
    },
    {
      icon: <FursuitIcon/>,
      label: 'Suit',
      className: classes.addSuit
    },
    {
      icon: <MakerIcon/>,
      label: 'Maker',
      className: classes.addMaker
    },
    {
      icon: <EventIcon/>,
      label: 'Convention',
      className: classes.addConvention
    },
  ];

  return (
    <div className={classes.root}>
      <ScritchButton size={56 * 2} color="secondary" aria-label="add" onClick={() => setPawClicked(!pawClicked)}/>
      {/*<Fab color="secondary" aria-label="add" onClick={() => setPawClicked(!pawClicked)}>
        <AddIcon/>
      </Fab>*/}
      {fabs.map((fab, index) => (
        <Zoom
          key={index}
          in={pawClicked}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${pawClicked ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab aria-label={fab.label} className={fab.className} color={"secondary"}>
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </div>
  );
}

export default withStyles(styles)(ScritchFab);
