import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query, withApollo } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import queryString from "query-string";

import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
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
  fursuitTextext: {
    fontWeight: 400,
    textAlign: "center"
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

    var species;
    if (fursuit.isHybrid) {
      species = "Hybrid";
      if (fursuit.species.length > 0) {
        species = species + ` (${fursuit.species.map(e => e.name).join(", ")})`;
      }
    } else {
      if (fursuit.species[0]) species = fursuit.species[0].name;
      else species = "Unknown Species";
    }

    return (
      <Grid container spacing={8} justify="center" alignItems="center">
        <Grid item lg={12} xs={12}>
          <Tooltip
            title={
              !fursuit.creationYear || fursuit.creationYear == 0
                ? `${species}`
                : `${fursuit.creationYear} - ${species}`
            }
            placement="top"
          >
            <img
              src={fursuit.avatar}
              onClick={() => {
                onClick(fursuit);
              }}
              className={classes.avatar}
              style={this.props.dark ? { opacity: 0.5 } : { opacity: 1 }}
            />
          </Tooltip>
        </Grid>
        <Grid item lg={12} xs={12} className={classes.content}>
          <Typography
            gutterBottom
            variant="subtitle1"
            className={classes.fursuitText}
            noWrap
          >
            {fursuit.name}
          </Typography>
          {fursuit.makers && (
            <Typography
              gutterBottom
              variant="subtitle2"
              className={classes.text}
              noWrap
            >
              {fursuit.makers[0] ? fursuit.makers[0].name : "Unknown Maker"}
            </Typography>
          )}
        </Grid>
      </Grid>
    );
  }
}

FursuitMiniCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withWidth()(withApollo(FursuitMiniCard)));
