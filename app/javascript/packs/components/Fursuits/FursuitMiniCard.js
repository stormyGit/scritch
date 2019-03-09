import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query, withApollo } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import queryString from "query-string";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link, withRouter } from "react-router-dom";

import Background from "../../photo.jpg";

const styles = theme => ({
  card: {
    width: "100%",
    borderRadius: 0
  },
  horizontalCard: {
    display: "flex"
  },
  horizontalContent: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  },
  verticalMedia: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0
  },
  horizontalMediaContainer: {
    maxWidth: "46%",
    minWidth: "46%",
    minHeight: "100%"
  },
  horizontalMedia: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0
  },
  horizontalInfos: {
    flex: 1
  },
  cardMediaContainer: {
    position: "relative",
    paddingTop: "56%"
  },
  userLink: {
    color: theme.palette.text.primary,
    textDecoration: "none"
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  content: {
    textAlign: "center",
    padding: theme.spacing.unit * 1
  },
  tags: {
    overflow: "hidden",
    maxHeight: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 2
  },
  noTags: {
    fontStyle: "italic"
  },
  chip: {
    marginRight: theme.spacing.unit
  },
  text: {
    fontWeight: 200,
    textAlign: "center"
  },
  avatar: {
    width: "100%",
    objectFit: "cover"
  }
});

class FursuitMiniCard extends React.Component {
  state = {};

  render() {
    const { classes, fursuit, onClick } = this.props;

    var image;

    if (fursuit.avatar) image = fursuit.avatar;
    else {
      if (fursuit.isHybrid) image = require("images/species/Hybrid.png");
      else
        try {
          image = require(`images/species/${fursuit.fursuitSpecy.name}.png`);
        } catch (ex) {
          image = require("images/species/Missingno (No Avatar Graphic Found).png");
        }
    }

    return (
      <Grid container spacing={8} justify="center" alignItems="center">
        <Grid item lg={12} xs={12}>
          <img
            src={image}
            onClick={() => {
              onClick(fursuit);
            }}
            className={classes.avatar}
          />
        </Grid>
        <Grid item lg={12} xs={12} className={classes.content}>
          <Typography
            gutterBottom
            variant="h6"
            component="h5"
            className={classes.text}
            noWrap
          >
            {fursuit.name}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

FursuitMiniCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withWidth()(withApollo(FursuitMiniCard)));
