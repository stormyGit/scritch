import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaw, faStar, faTags, faUsers} from "@fortawesome/free-solid-svg-icons";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import FursuitAvatar from "./FursuitAvatar";
import UnclaimDialog from "../AppDialogs/UnclaimDialog";
import withCurrentSession from "../withCurrentSession";

const styles = theme => ({
  card: {
    width: "100%",
    borderRadius: 0,
    padding: 0
  },
  fursuitLink: {
    color: theme.palette.text.primary,
    textDecoration: "none"
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  padder: {
    padding: theme.spacing(1)
  },
  metrics: {
    display: "flex"
  },
  videoCount: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    paddingRight: theme.spacing(3)
  },
  dataSpacer: {
    marginLeft: theme.spacing(2)
  },
  dataSpacerPlus: {
    marginLeft: theme.spacing(8)
  }
});

class FursuitUserCard extends React.Component {
  state = {
    unclaimDialog: false
  };

  renderHeader() {
    const { classes, fursuit } = this.props;

    return (
      <CardHeader
        className={classes.padder}
        avatar={<FursuitAvatar avatar={fursuit.avatar} />}
        title={<Typography variant="h6">{fursuit.name}</Typography>}
        subheader={fursuit.makers && fursuit.makers[0] && fursuit.makers[0].name}
      />
    );
  }

  render() {
    const { classes, fursuit, width, user, currentSession } = this.props;

    return (
      <React.Fragment>
        <Card className={classes.card} elevation={0}>
          <CardActionArea component={props => <Link to={`/fursuits/${fursuit.slug}`} {...props} />}>
            <Grid container spacing={0} justify="space-between" wrap="nowrap">
              <Grid item>{this.renderHeader()}</Grid>
              <Grid item className={classes.videoCount}>
                {(width === "xl" || width === "lg") && (
                  <div className={classes.metrics}>
                    <Tooltip title="Scritches">
                      <Typography variant="subtitle1">
                        <FontAwesomeIcon icon={faPaw} /> {fursuit.likesCount}
                      </Typography>
                    </Tooltip>
                    <Tooltip title="Favorites">
                      <Typography variant="subtitle1" className={classes.dataSpacer}>
                        <FontAwesomeIcon icon={faStar} /> {fursuit.favesCount}
                      </Typography>
                    </Tooltip>
                    <Tooltip title="Followers">
                      <Typography variant="subtitle1" className={classes.dataSpacer}>
                        <FontAwesomeIcon icon={faUsers} /> {fursuit.followersCount}
                      </Typography>
                    </Tooltip>
                    <Tooltip title="Pictures">
                      <Typography variant="subtitle1" className={classes.dataSpacer}>
                        <FontAwesomeIcon icon={faTags} /> {fursuit.mediaCount}
                      </Typography>
                    </Tooltip>
                  </div>
                )}
                {currentSession && user.id == currentSession.user.id && (
                  <Button
                    variant="outlined"
                    className={classes.dataSpacerPlus}
                    onClick={event => {
                      event.stopPropagation();
                      event.preventDefault();
                      this.setState({ unclaimDialog: true });
                    }}
                  >
                    <Typography variant="button">Unclaim</Typography>
                  </Button>
                )}
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
        <UnclaimDialog
          open={this.state.unclaimDialog}
          onClose={() => {
            this.setState({ unclaimDialog: false });
          }}
          fursuitId={fursuit.id}
        />
      </React.Fragment>
    );
  }
}

FursuitUserCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withWidth()(withCurrentSession(FursuitUserCard)));
