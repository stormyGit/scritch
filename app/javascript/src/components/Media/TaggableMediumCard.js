import React, {memo, useState} from "react";

import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTags} from "@fortawesome/free-solid-svg-icons";

import {TAG_LOCK_MEDIUM, TAG_UNLOCK_MEDIUM} from "../../queries/mediaMutations";
import TagDialog from "./TagDialog";
import {Mutation} from "react-apollo";
import countFormat from "../../countFormat";

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
    width: "90%",
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

const Insight = withStyles(styles)(({ classes, medium, children }) => {
  return (
    <span>
      {children}
      <span className={classes.insight_stat}>
        {medium.completion}%
        <br />
        <br />
        {medium.fursuitsCount == 0
          ? "(How many Suits?)"
          : `(${countFormat(
              medium.fursuitsCount - medium.fursuits.length,
              "Suit",
              "Suits"
            )} to Tag)`}
      </span>
    </span>
  );
});

const Overlay = withStyles(styles)(
  memo(({ classes, medium }) => {
    const [mouseOver, setMouseOver] = useState(false);

    return (
      <div
        className={classes.overlay}
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
      >
        {mouseOver ? (
          <div className={classes.insight}>
            <Insight medium={medium} classes={classes}>
              <FontAwesomeIcon className={classes.insight_icon} icon={faTags} />
            </Insight>
          </div>
        ) : null}
      </div>
    );
  })
);

const Medium = withStyles(styles)(({ classes, medium }) => {
  const orientationCSS = getMediumOrientation(medium.exif, classes);
  const isMP4 =
    medium.thumbnail.substr(medium.thumbnail.lastIndexOf(".") + 1) === "mp4";

  return (
    <div className={classes.cardMediaContainer}>
      <CardMedia
        className={`${classes.media} ${orientationCSS}`}
        component={isMP4 ? "video" : "img"}
        src={medium.thumbnail}
        title={medium.title}
      />
      <Overlay medium={medium} />
    </div>
  );
});

function TaggableMediumCard({ classes, medium }) {
  const [tagDialog, setTagDialog] = useState(false);

  return (
    <React.Fragment>
      <Card className={classes.card} elevation={0}>
        <Mutation
          mutation={TAG_LOCK_MEDIUM}
          update={cache => {}}
          onCompleted={() => setTagDialog(true)}
          onError={() => setTagDialog(true)}
        >
          {(tagLockMedium, { data }) => (
            <CardActionArea
              onClick={() => {
                tagLockMedium({
                  variables: {
                    input: {
                      id: medium.id
                    }
                  }
                });
              }}
            >
              <Medium medium={medium} />
            </CardActionArea>
          )}
        </Mutation>
      </Card>
      {tagDialog && medium && (
        <Mutation
          mutation={TAG_UNLOCK_MEDIUM}
          update={cache => {}}
          onCompleted={() => setTagDialog(false)}
          onError={() => setTagDialog(false)}
        >
          {(tagUnlockMedium, { data, error }) => (
            <TagDialog
              open={tagDialog}
              onClose={() => {
                tagUnlockMedium({
                  variables: {
                    input: {
                      id: medium.id
                    }
                  }
                });
              }}
              mediumId={medium.id}
            />
          )}
        </Mutation>
      )}
    </React.Fragment>
  );
}

export default withStyles(styles)(TaggableMediumCard);
