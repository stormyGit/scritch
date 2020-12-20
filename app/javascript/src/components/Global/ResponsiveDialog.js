import React, {useContext, useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import withWidth from "@material-ui/core/withWidth";
import {useMediaQuery} from "@material-ui/core";
import useTheme from "@material-ui/core/styles/useTheme";
import {NavigationContext} from "../../context/NavigationContext";
import {DIALOG_OPEN_STRING} from "../Global/HistoryWrapper";
import {withRouter} from "react-router-dom";
import {setDialogChange} from "../../reducers/Action";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function ResponsiveDialog({width,history, open, onClose, isMediumDialog, ...props}) {
  const theme = useTheme();
  const tinyWidth = useMediaQuery(theme.breakpoints.down("md"));
  const {isDialogOpen, dispatchNavigationChange} = useContext(NavigationContext);

  // if (isMediumDialog)
  // console.log("ResponsiveDialog.isMediumDialog")

  React.useEffect(() => {
      if (!!open) {
        // dispatchNavigationChange?.(isDialogOpen(true));
        if (!history.location.search.includes(DIALOG_OPEN_STRING))
          history.push("?" + DIALOG_OPEN_STRING, "HistoryListener");
      }
    }, [open]
  )

  React.useEffect(() => {
      if (isMediumDialog)
        console.log("ResponsiveDialog.dispatchChange(" + isDialogOpen + ", " + !!open + ")")
      if (isDialogOpen && !!open) {
        if (isMediumDialog)
          console.log("close");
        dispatchNavigationChange(setDialogChange(false));
        onClose();
      }
    }, [isDialogOpen, open]
  )

  let size = props.size ? props.size : 800;

  return (
    <Dialog
      TransitionComponent={Transition}
      scroll="body"
      fullScreen={tinyWidth}
      PaperProps={{
        style:
          tinyWidth ? {} : {minWidth: size}
      }}
      {...props}
      open={open}
      onClose={onClose}
    />
  );
}

export default withRouter(withWidth()(ResponsiveDialog));
