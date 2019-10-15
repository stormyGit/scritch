import React from "react";
import PropTypes from "prop-types";
import { Mutation, withApollo } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import TagIcon from "@material-ui/icons/AssignmentTurnedIn";
import { TAG_LOCK_MEDIUM, TAG_UNLOCK_MEDIUM } from "../queries/mediaMutations";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import TagDialog from "./TagDialog";
import TagDialogMobile from "./TagDialogMobile";

const styles = theme => ({
  card: {
    width: "100%",
    borderRadius: 0,
    position: "relative"
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    backgroundImage:
      theme.type == "dark"
        ? "linear-gradient(#000000ff, #00000000)"
        : "linear-gradient(#000000ff, #00000000)"
  },
  typo: {
    color: "#ffffffdd",
    fontSize: 15
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
    transform: "rotate(90deg)",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0
  },
  verticalMediaR: {
    transform: "rotate(-90deg)",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0
  },
  horizontalMediaContainer: {
    //maxWidth: "46%",
    minWidth: "46%",
    minHeight: "100%"
  },
  horizontalMedia: {
    width: "100%",
    height: "100%",
    position: "absolute",
    objectFit: "cover",
    top: 0,
    left: 0
  },
  horizontalMediaFlip: {
    transform: "rotate(180deg)",
    width: "100%",
    height: "100%",
    position: "absolute",
    objectFit: "cover",
    top: 0,
    left: 0
  },
  horizontalInfos: {
    flex: 1
  },
  cardMediaContainer: {
    position: "relative",
    paddingTop: "100%"
  },
  infoBar: {
    display: "flex",
    alignItems: "center"
  },
  infoBarInner: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  }
});

class TaggableMediumCard extends React.Component {
  state = {
    tagDialog: false
  };

  renderMedia() {
    const { classes, medium, horizontal, width, client } = this.props;

    var orientation;
    if (medium) {
      if (medium.exif && JSON.parse(medium.exif).Orientation === "6")
        orientation = classes.verticalMedia;
      else if (medium.exif && JSON.parse(medium.exif).Orientation === "8")
        orientation = classes.verticalMediaR;
      else if (medium.exif && JSON.parse(medium.exif).Orientation === "3")
        orientation = classes.horizontalMediaFlip;
      else orientation = classes.horizontalMedia;
    } else orientation = classes.horizontalMedia;

    return (
      <div className={horizontal ? undefined : classes.cardMediaContainer}>
        <CardMedia
          className={orientation}
          image={medium.thumbnail}
          title={medium.title}
        />
        {this.renderActions()}
      </div>
    );
  }

  renderActions() {
    const { classes, medium } = this.props;

    return (
      <div className={classes.overlay}>
        <Grid container spacing={8} wrap="nowrap" className={classes.infoBar}>
          <Grid item className={classes.infoBarInner}>
            <TagIcon
              className={classes.leftIcon}
              style={{ color: "#ffffffee", fontSize: 30 }}
            />
            <Typography
              style={{ color: "#ffffffee", fontSize: 15, fontWeight: 400 }}
            >
              {medium.completion}%{" "}
              {medium.fursuitsCount == 0
                ? "(How many Suits?)"
                : `(${medium.fursuitsCount -
                    medium.fursuits.length} Suits to Tag)`}
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }

  renderVertical() {
    const { classes, medium, width } = this.props;

    return (
      <React.Fragment>
        <Card className={classes.card} elevation={0}>
          <Mutation
            mutation={TAG_LOCK_MEDIUM}
            update={cache => {}}
            onCompleted={() => {
              this.setState({
                tagDialog: true
              });
            }}
            onError={() => {
              this.setState({
                tagDialog: true
              });
            }}
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
                {this.renderMedia()}
              </CardActionArea>
            )}
          </Mutation>
        </Card>
        {this.state.tagDialog && medium && (
          <Mutation
            mutation={TAG_UNLOCK_MEDIUM}
            update={cache => {}}
            onCompleted={() => {
              this.setState({
                tagDialog: false
              });
            }}
            onError={() => {
              this.setState({
                tagDialog: false
              });
              location.reload();
            }}
          >
            {(tagUnlockMedium, { data, error }) =>
              width === "sm" || width === "xs" ? (
                <TagDialogMobile
                  open={this.state.tagDialog}
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
              ) : (
                <TagDialog
                  open={this.state.tagDialog}
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
              )
            }
          </Mutation>
        )}
      </React.Fragment>
    );
  }

  render() {
    return this.renderVertical();
  }
}

TaggableMediumCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withWidth()(withApollo(TaggableMediumCard)));
