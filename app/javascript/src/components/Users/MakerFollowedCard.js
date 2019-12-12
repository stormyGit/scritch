import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
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
    marginRight: theme.spacing.unit
  },
  videoCount: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    paddingRight: theme.spacing.unit * 3
  },
  padder: {
    padding: theme.spacing.unit
  },
  avatar: {
    borderRadius: "20%",
    width: 64
  }
});

class MakerFollowedCard extends React.Component {
  renderHeader() {
    const { classes, maker } = this.props;

    return (
      <CardHeader
        className={classes.padder}
        avatar={<img src={maker.avatar} className={classes.avatar} />}
        title={<Typography variant="h6">{maker.name}</Typography>}
        subheader={maker.country}
      />
    );
  }

  render() {
    const { classes, maker } = this.props;

    return (
      <Card className={classes.card} elevation={0}>
        <CardActionArea
          component={props => <Link to={`/makers/${maker.slug}`} {...props} />}
        >
          <Grid container spacing={0} justify="space-between" wrap="nowrap">
            <Grid item>{this.renderHeader()}</Grid>
            <Grid item className={classes.videoCount}>
              <Typography variant="button">
                {countFormat(maker.fursuitsNumber, "fursuit", "fursuits")}
              </Typography>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    );
  }
}

MakerFollowedCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withWidth()(MakerFollowedCard));
