import React from "react";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import withCurrentSession from "../withCurrentSession";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faStar,
  faEye,
  faImage
} from "@fortawesome/free-solid-svg-icons";

const styles = theme => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
  metrics: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4
  },
  dataSpacer: {
    marginLeft: theme.spacing.unit * 2
  }
});

class MetricsBar extends React.Component {
  state = {};

  render() {
    const { classes, currentSession } = this.props;

    return (
      <React.Fragment>
        {currentSession && (
          <div className={classes.metrics}>
            <Typography variant="subtitle1">
              <Link to="/" className={classes.link}>
                Zebra
              </Link>
              <FontAwesomeIcon icon={faPaw} className={classes.dataSpacer} /> 0
              <FontAwesomeIcon icon={faStar} className={classes.dataSpacer} /> 0
              <FontAwesomeIcon icon={faEye} className={classes.dataSpacer} /> 0
              <FontAwesomeIcon
                icon={faImage}
                className={classes.dataSpacer}
              />{" "}
              0
            </Typography>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  withCurrentSession(withRouter(withWidth()(MetricsBar)))
);
