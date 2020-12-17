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
  function backButtonAwareOnClose() {
    console.log("backButtonAwareOnClose")
    _HistoryListener.dialogClosed();
    onClose();
  }

  const theme = useTheme();
  const tinyWidth = useMediaQuery(theme.breakpoints.down("md"));
  const [backButtonAwareOpen, setBackButtonAwareOpen] = useState(open);

  React.useEffect(() => {
      console.log("ResponsiveDialog.useEffect(" + open + ")")
      if (open)
        _HistoryListener.dialogOpened();
      if (backButtonAwareOpen !== open)
        setBackButtonAwareOpen(open);
    }, [open]
  )

  if (_HistoryListener.dispatchChange && backButtonAwareOpen) {
    console.log("dispatchChange")
    setBackButtonAwareOpen(false);
  }

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
      open={backButtonAwareOpen}
      onClose={() => backButtonAwareOnClose()}
    />
  );
}

export default withWidth()(ResponsiveDialog);
