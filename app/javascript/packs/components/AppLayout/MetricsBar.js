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
              {false && (
                <Link to="/" className={classes.link}>
                  Zebra
                </Link>
              )}
              {"Score: "}
              {true && currentSession.user.score}
              <FontAwesomeIcon
                title="Scritches"
                icon={faPaw}
                className={classes.dataSpacer}
              />{" "}
              {currentSession.user.likedCount}
              <FontAwesomeIcon
                title="Favorites"
                icon={faStar}
                className={classes.dataSpacer}
              />{" "}
              {currentSession.user.favedCount}
              <FontAwesomeIcon
                title="Followers"
                icon={faUsers}
                className={classes.dataSpacer}
              />{" "}
              {currentSession.user.followersCount}
              <FontAwesomeIcon
                title="Tagged in"
                icon={faTags}
                className={classes.dataSpacer}
              />{" "}
              {currentSession.user.taggedCount}
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
