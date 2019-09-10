import React, { useState, memo } from "react";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

import { Link } from "react-router-dom";

import countContractor from "../../countContractor";

import MediumDialog from "./MediumDialog";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faCommentAlt } from "@fortawesome/free-solid-svg-icons";

const styles = theme => ({
  card: {
    width: "100%",
    borderRadius: 0,
    position: "relative"
  },
  overlay: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0)",
    "&:hover": {
      background: "rgba(0, 0, 0, 0.3)"
    }
  },
  insight: {
    listStyleType: "none",
    color: "white",
    width: "70%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: "1em"
  },
  insight_icon: {
    fontSize: "1.3em"
  },
  insight_stat: {
    fontSize: "1.2em",
    fontWeight: "bold",
    marginLeft: ".5em"
  },
  media: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0
  },
  cardMediaContainer: {
    position: "relative",
    paddingTop: "100%"
  },
  verticalMedia: {
    transform: "rotate(90deg)"
  },
  verticalMediaR: {
    transform: "rotate(-90deg)"
  },
  horizontalMedia: {
    objectFit: "cover"
  },
  horizontalMediaFlip: {
    transform: "rotate(180deg)",
    objectFit: "cover"
  }
});

// Extract the medium orientation
// Return the appropriate CSS class
function getMediumOrientation(exif, classes) {
  if (!exif) return classes.horizontalMedia;
  const orientation = JSON.parse(exif).Orientation;

  switch (orientation) {
    case "3":
      return classes.horizontalMediaFlip;
    case "6":
      return classes.verticalMedia;
    case "8":
      return classes.verticalMediaR;
    default:
      return classes.horizontalMedia;
  }
}

const Insight = withStyles(styles)(({ classes, count, children }) => {
  return (
    <span>
      {children}
      <span className={classes.insight_stat}>{countContractor(count)}</span>
    </span>
  );
});

const Overlay = withStyles(styles)(
  memo(({ classes, likesCount, commentsCount }) => {
    const [mouseOver, setMouseOver] = useState(false);

    return (
      <div
        className={classes.overlay}
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
      >
        {mouseOver ? (
          <div className={classes.insight}>
            <Insight count={likesCount}>
              <FontAwesomeIcon className={classes.insight_icon} icon={faPaw} />
            </Insight>
            <Insight count={commentsCount}>
              <FontAwesomeIcon
                className={classes.insight_icon}
                icon={faCommentAlt}
              />
            </Insight>
          </div>
        ) : null}
      </div>
    );
  })
);

const Medium = withStyles(styles)(
  ({
    classes,
    medium: { exif, thumbnail, title, likesCount, commentsCount }
  }) => {
    const orientationCSS = getMediumOrientation(exif, classes);
    const isMP4 = thumbnail.substr(thumbnail.lastIndexOf(".") + 1) === "mp4";

    return (
      <div className={classes.cardMediaContainer}>
        <CardMedia
          className={`${classes.media} ${orientationCSS}`}
          component={isMP4 ? "video" : "img"}
          src={thumbnail}
          title={title}
        />
        <Overlay likesCount={likesCount} commentsCount={commentsCount} />
      </div>
    );
  }
);

function MediaCardRework({ classes, medium }) {
  const [stateMedium, setStateMedium] = useState(null);
  console.log(stateMedium);
  return (
    <React.Fragment>
      <Card className={classes.card} elevation={0}>
        <CardActionArea onClick={() => setStateMedium(medium.id)}>
          <Medium medium={medium} />
        </CardActionArea>
      </Card>
      {stateMedium && (
        <MediumDialog
          mediumId={stateMedium}
          onClose={() => setStateMedium(null)}
          open={stateMedium != null}
        />
      )}
    </React.Fragment>
  );
}

export default withStyles(styles)(MediaCardRework);
