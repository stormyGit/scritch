import React from "react";
import FavoriteIcon from "@material-ui/icons/Pets";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Query, Mutation } from "react-apollo";
import SvgIcon from "@material-ui/core/SvgIcon";

import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";

import { GET_MEDIUM } from "../../queries/mediaQueries";
import { CREATE_LIKE, DELETE_LIKE } from "../../queries/mediaMutations";
import countFormat from "../../countFormat";
import withCurrentSession from "../withCurrentSession";
import LikesDialog from "./LikesDialog";

const NoFavoriteIcon = props => (
  <SvgIcon {...props}>
    <path fill="none" d="M0 0h24v24H0V0z" />
    <circle
      strokeWidth="2"
      stroke={process.env.SECONDARY_COLOR}
      fill="none"
      cx="4.5"
      cy="9.5"
      r="2.5"
    />
    <circle
      strokeWidth="2"
      stroke={process.env.SECONDARY_COLOR}
      fill="none"
      cx="9"
      cy="5.5"
      r="2.5"
    />
    <circle
      strokeWidth="2"
      stroke={process.env.SECONDARY_COLOR}
      fill="none"
      cx="15"
      cy="5.5"
      r="2.5"
    />
    <circle
      strokeWidth="2"
      stroke={process.env.SECONDARY_COLOR}
      fill="none"
      cx="19.5"
      cy="9.5"
      r="2.5"
    />
    <path
      strokeWidth="2"
      stroke={process.env.SECONDARY_COLOR}
      fill="none"
      d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z"
    />
  </SvgIcon>
);

const styles = theme => ({
  root: {
    marginLeft: theme.spacing.unit,
    paddingBottom: 2,
    paddingLeft: 2,
    paddingRight: 2,
    display: "inline-block",
    borderBottomColor:
      theme.palette.type === "dark"
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(0, 0, 0, 0.2)",
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    alignItems: "center"
  },
  rootIcon: {
    marginLeft: theme.spacing.unit,
    paddingBottom: 2,
    paddingLeft: 2,
    paddingRight: 2,
    display: "inline-block",
    alignItems: "center"
  },
  iconButton: {
    padding: theme.spacing.unit - 2
  },
  button: {
    padding: "6px 3px",
    minWidth: 33
  }
});

class LikeButton extends React.Component {
  state = {
    likesDialog: false
  };

  render() {
    const { medium, classes, link, currentSession, ...props } = this.props;
    const likesCount = medium.likesCount;

    return (
      <React.Fragment>
        <div className={classes.rootIcon}>
          {medium.liked ? (
            <Mutation
              mutation={DELETE_LIKE}
              update={cache => {
                cache.writeQuery({
                  query: GET_MEDIUM,
                  variables: { id: medium.id },
                  data: {
                    medium: {
                      ...medium,
                      liked: false,
                      likesCount: likesCount - 1
                    }
                  }
                });
              }}
            >
              {deleteLike => (
                <IconButton
                  size="small"
                  color="secondary"
                  classes={{ root: classes.iconButton }}
                  onClick={() => {
                    deleteLike({
                      variables: { input: { mediumId: medium.id } }
                    });
                  }}
                  {...props}
                >
                  <FavoriteIcon fontSize={"small"} />
                </IconButton>
              )}
            </Mutation>
          ) : (
            <Mutation
              mutation={CREATE_LIKE}
              update={cache => {
                cache.writeQuery({
                  query: GET_MEDIUM,
                  variables: { id: medium.id },
                  data: {
                    medium: {
                      ...medium,
                      liked: true,
                      likesCount: likesCount + 1
                    }
                  }
                });
              }}
            >
              {createLike => (
                <IconButton
                  size="small"
                  color="secondary"
                  classes={{ root: classes.iconButton }}
                  disabled={!currentSession}
                  onClick={() => {
                    createLike({
                      variables: { input: { mediumId: medium.id } }
                    });
                  }}
                  {...props}
                >
                  <NoFavoriteIcon fontSize={"small"} />
                </IconButton>
              )}
            </Mutation>
          )}
        </div>
        <div className={classes.root}>
          <Button
            size="small"
            classes={{
              root: classes.button
            }}
            onClick={() => {
              this.setState({ likesDialog: true });
            }}
          >
            {countFormat(likesCount, "scritch", "scritches")}
          </Button>
        </div>
        <LikesDialog
          medium={medium}
          open={this.state.likesDialog}
          onClose={() => {
            this.setState({ likesDialog: false });
          }}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withCurrentSession(withWidth()(LikeButton)));
