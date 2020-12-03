import React from "react";
import Avatar from "@material-ui/core/Avatar";
import {withStyles} from "@material-ui/core/styles";

const DEFAULT_SIZE = 64;

const styles = () => ({
  avatar: {
    display: "flex",
    color: "#fff"
  }
});

const DefaultFursuitAvatar = ({ classes, specy, className, size }) => {
  const effectiveSize = size || DEFAULT_SIZE;
  let image;

  try {
    image = require(`images/species/${specy}.png`);
  } catch (ex) {
    image = require("images/species/Missingno (No Avatar Graphic Found).png");
  }
  return (
    <Avatar
      className={[classes.avatar, className].join(" ")}
      style={{
        width: effectiveSize,
        height: effectiveSize
      }}
      src={image}
    />
  );
};

export default withStyles(styles)(DefaultFursuitAvatar);
