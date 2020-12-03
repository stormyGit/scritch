import React from "react";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import withCurrentSession from "../withCurrentSession";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp, faDove, faPaw, faStar, faTags, faUsers} from "@fortawesome/free-solid-svg-icons";
import Badge from "@material-ui/core/Badge";

const styles = theme => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    cursor: "pointer"
  },
  metrics: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    // color: theme.palette.text.primary
  },
  dataSpacer: {
    marginLeft: theme.spacing(2)
  }
});

function MetricsBar(props) {
  const {classes, currentSession, width} = props;

  function BadgeFor(content, icon) {
    return <Badge
      badgeContent={content}
      color="white"
      showZero
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <FontAwesomeIcon
        icon={icon}
        className={classes.dataSpacer}
      />
    </Badge>;
  }

  return (
    <React.Fragment>
      {currentSession && (
        <div className={classes.metrics}>
          <Tooltip title="Involvement Species">
            <Typography
              variant="subtitle1"
              className={classes.link}
              onClick={() => props.openSpeciesDialog()}
            >
              {BadgeFor(currentSession.user.metricSpecies, faDove)}
            </Typography>
          </Tooltip>
          <Tooltip title="Scritch involvement Score">
            <Typography variant="subtitle1" className={classes.dataSpacer}>
              {BadgeFor(currentSession.user.score + currentSession.user.globalScore, faArrowUp)}
            </Typography>
          </Tooltip>
          <Tooltip title="Scritches">
            <Typography variant="subtitle1">
              {BadgeFor(currentSession.user.likedCount, faPaw)}
            </Typography>
          </Tooltip>
          <Tooltip title="Favorites">
            <Typography variant="subtitle1">
              {BadgeFor(currentSession.user.favedCount, faStar)}
            </Typography>
          </Tooltip>
          <Tooltip title="Followers">
            <Typography variant="subtitle1">
              {BadgeFor(currentSession.user.followersCount, faUsers)}
            </Typography>
          </Tooltip>
          <Tooltip title="Tagged in">
            <Typography variant="subtitle1">
              {BadgeFor(currentSession.user.taggedCount, faTags)}
            </Typography>
          </Tooltip>
        </div>
      )}
    </React.Fragment>
  );
}

export default withStyles(styles)(
  withCurrentSession(withRouter(withWidth()(MetricsBar)))
);
