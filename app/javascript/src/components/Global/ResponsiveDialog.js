import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import withWidth from "@material-ui/core/withWidth";
import {_HistoryListener} from "../../util/history";
import {useMediaQuery} from "@material-ui/core";
import useTheme from "@material-ui/core/styles/useTheme";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function ResponsiveDialog({width, open, onClose, ...props}) {
  const theme = useTheme();
  const tinyWidth = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
      if (open === undefined) return;
      if (open)
        _HistoryListener.dialogOpened();
      else
        _HistoryListener.dialogClosed();
    }, [open]
  )

  React.useEffect(() => {
      console.log("ResponsiveDialog.dispatchChange(" + _HistoryListener.dispatchChange + ", " + open + ")")
      if (_HistoryListener.dispatchChange && open) {
        console.log("close");
        onClose();
      }
    }, [_HistoryListener.dispatchChange, open]
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

export default withWidth()(ResponsiveDialog);
