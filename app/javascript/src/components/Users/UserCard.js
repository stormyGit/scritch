import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link, withRouter } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import TruncatedText from "../Global/TruncatedText";
import countFormat from "../../countFormat";

const styles = theme => ({
  card: {
    width: "100%",
    borderRadius: 0
  },
  userLink: {
    color: theme.palette.text.primary,
    textDecoration: "none"
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  videoCount: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    paddingRight: theme.spacing(3)
  },
  padder: {
    padding: theme.spacing(1)
  }
});

class MediumCard extends React.Component {
  renderHeader() {
    const { classes, user } = this.props;

    return (
      <CardHeader
        className={classes.padder}
        avatar={<UserAvatar user={user} size={64} />}
        title={<Typography variant="h6">{user.name}</Typography>}
      />
    );
  }

  render() {
    const { classes, user } = this.props;

    return (
      <Card className={classes.card} elevation={0}>
        <CardActionArea
          component={props => <Link to={`/${user.slug}`} {...props} />}
        >
          <Grid container spacing={0} justify="space-between" wrap="nowrap">
            <Grid item>{this.renderHeader()}</Grid>
            <Grid item className={classes.videoCount}>
              <Typography variant="button">
                {countFormat(user.mediaCount, "picture", "pictures")}
              </Typography>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    );
  }
}

MediumCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withWidth()(MediumCard));
