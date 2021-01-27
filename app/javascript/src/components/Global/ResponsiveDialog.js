import React, {useContext} from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import withWidth from "@material-ui/core/withWidth";
import {useMediaQuery} from "@material-ui/core";
import useTheme from "@material-ui/core/styles/useTheme";
import {NavigationContext} from "../../context/NavigationContext";
import {withRouter} from "react-router-dom";
import {setDialogChange, setRequestDialogChange} from "../../reducers/Action";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function ResponsiveDialog({width, history, open, onClose, ...props}) {
  const theme = useTheme();
  const tinyWidth = useMediaQuery(theme.breakpoints.down("md"));
  const {isRequestDialogClose, dispatchNavigationChange} = useContext(NavigationContext);

  const historyAwareOnClose = () => {
    dispatchNavigationChange(setDialogChange(false));
    if (onClose)
      onClose();
    dispatchNavigationChange(setRequestDialogChange(false));
  }

  React.useEffect(() => {
      if (!!open) {
        dispatchNavigationChange(setDialogChange(true));
      }
    }, [open]
  )

  React.useEffect(() => {
      if (isRequestDialogClose && !!open) {
        historyAwareOnClose();
      }
    }, [isRequestDialogClose, open]
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
      onClose={historyAwareOnClose}
    />
  );
}

export default withRouter(withWidth()(ResponsiveDialog));
