import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import withWidth from "@material-ui/core/withWidth";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const ResponsiveDialog = ({ width, ...props }) => (
  <Dialog
    TransitionComponent={Transition}
    fullScreen={width === "md" || width === "sm" || width === "xs"}
    PaperProps={{
      style: width === "lg" || width === "xl" ? { minWidth: 600 } : {}
    }}
    {...props}
  />
);

export default withWidth()(ResponsiveDialog);
