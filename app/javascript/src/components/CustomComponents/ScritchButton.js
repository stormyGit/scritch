import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {useTheme} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    filter: "drop-shadow(8px 8px 10px rgba(0,0,0,0.2))",
  },
  bt: {
    borderRadius: "50%"
  }
});

const lineProps = {
  strokeOpacity: 1,
  strokeWidth: 1,
  strokeLineCap: "round",
  strokeLineJoin: "round",
}

function ScritchButton({color, size, onClick, children, classes}) {
  const theme = useTheme();
  const c = theme.palette[color].main;
  return (
    <Button className={classes.bt} onClick={onClick}>
      <svg className={classes.root} width={size} height={size} viewBox="16 16 48 48" fill={c} {...lineProps}>
        <path
          d="m 25.858464,25.858465 c -7.302645,7.302646 -6.367398,28.945733 0.758681,36.071814 3.209449,3.209447 7.592324,2.661359 11.724144,-1.470461 4.491389,-4.491391 5.150753,-9.76353 8.752876,-13.365654 3.63339,-3.63339 8.913806,-4.301029 13.365653,-8.752875 4.13182,-4.131821 4.679908,-8.514695 1.470461,-11.724144 -7.126081,-7.12608 -28.769169,-8.061327 -36.071815,-0.75868 z"/>
        <path d="m 44,38 h -6 v 6 h -2 v -6 h -6 v -2 h 6 v -6 h 2 v 6 h 6 z"
              fill="#000000"/>
      </svg>
    </Button>
  );
}

export default withStyles(styles, {pureComponent: true})(ScritchButton);
