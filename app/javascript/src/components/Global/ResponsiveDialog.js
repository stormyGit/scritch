import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import withWidth from "@material-ui/core/withWidth";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function ResponsiveDialog({width, ...props}) {
  return (
    <Dialog
      TransitionComponent={Transition}
      scroll="body"
      fullScreen={width === "md" || width === "sm" || width === "xs"}
      PaperProps={{
        style:
          props.size && (width === "lg" || width === "xl")
            ? {minWidth: props.size}
            : width === "lg" || width === "xl"
            ? {minWidth: 800}
            : {}
      }}
      {...props}
    />
  );
}

export default withWidth()(ResponsiveDialog);
