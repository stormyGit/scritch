import React from "react";
import {withStyles} from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import {Link, withRouter} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTag} from "@fortawesome/free-solid-svg-icons";

const styles = theme => ({
  link: {
    textDecoration: "none"
  },
  buttonPad: {
    padding: theme.spacing(1)
  }
});

function TagButton(props) {
  const {classes} = props;

  return (
    <React.Fragment>
      {props.width !== "xl" && (
        <Link to="/tag" className={classes.link}>
          <IconButton title="Tag tool">
            <FontAwesomeIcon icon={faTag}/>
          </IconButton>
        </Link>
      )}
      {props.width === "xl" && (
        <Link to="/tag" className={classes.link}>
          <Button className={classes.buttonPad} color="primary">
            Tag Tool
          </Button>
        </Link>
      )}
    </React.Fragment>
  );
}

export default withStyles(styles)(withRouter(withWidth()(TagButton)));
