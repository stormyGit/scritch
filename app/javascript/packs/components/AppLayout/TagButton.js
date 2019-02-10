import React from "react";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import { Link, withRouter } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

const styles = theme => ({
  link: {
    textDecoration: "none"
  },
  buttonPad: {
    padding: theme.spacing.unit
  }
});

class DatabasesButton extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        {this.props.width !== "xl" && (
          <Link to="/tag" className={classes.link}>
            <IconButton title="Tag tool">
              <FontAwesomeIcon icon={faTag} />
            </IconButton>
          </Link>
        )}
        {this.props.width === "xl" && (
          <Link to="/tag" className={classes.link}>
            <Button className={classes.buttonPad} color="primary">
              Tag Tool
            </Button>
          </Link>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(withWidth()(DatabasesButton)));
