import React from "react";
import { withStyles } from "@material-ui/core/styles";
import icon from "../../../../assets/images/logo_small.png";

const styles = theme => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 64,
    width: 64
  }
});

class ScritchLogo extends React.Component {
  render() {
    const { classes, ...props } = this.props;

    return (
      <div className={classes.container}>
        <img src={icon} className={classes.icon} />
      </div>
    );
  }
}

export default withStyles(styles, { pureComponent: true })(ScritchLogo);
