import React from "react";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import withCurrentSession from "../withCurrentSession";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faStar,
  faUsers,
  faTags
} from "@fortawesome/free-solid-svg-icons";

const styles = theme => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
  metrics: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    display: "flex"
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
              {false && (
                <Link to="/" className={classes.link}>
                  Zebra
                </Link>
              )}
              {"Score: "}
              {true && currentSession.user.globalScore}
            </Typography>
            <Tooltip title="Scritches">
              <Typography variant="subtitle1">
                <FontAwesomeIcon icon={faPaw} className={classes.dataSpacer} />{" "}
                {currentSession.user.likedCount}
              </Typography>
            </Tooltip>
            <Tooltip title="Favorites">
              <Typography variant="subtitle1">
                <FontAwesomeIcon icon={faStar} className={classes.dataSpacer} />{" "}
                {currentSession.user.favedCount}
              </Typography>
            </Tooltip>
            <Tooltip title="Followers">
              <Typography variant="subtitle1">
                <FontAwesomeIcon
                  icon={faUsers}
                  className={classes.dataSpacer}
                />{" "}
                {currentSession.user.followersCount}
              </Typography>
            </Tooltip>
            <Tooltip title="Tagged in">
              <Typography variant="subtitle1">
                <FontAwesomeIcon icon={faTags} className={classes.dataSpacer} />{" "}
                {currentSession.user.taggedCount}
              </Typography>
            </Tooltip>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  withCurrentSession(withRouter(withWidth()(MetricsBar)))
);
