import React from "react";
import {withStyles} from "@material-ui/core/styles";
import icon from "../../../../assets/images/logo_small.png";
// import icon_bright from "../../../../assets/images/logo_small_bright.png";

const styles = () => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: ".5rem"
  },
  icon: {
    height: 64,
    width: 64
  }
});

function ScritchLogo(props) {
  const {classes} = props;

  return (
    <div className={classes.container}>
      <img src={icon} className={classes.icon}/>
    </div>
  );
}

export default withStyles(styles, {pureComponent: true})(ScritchLogo);
