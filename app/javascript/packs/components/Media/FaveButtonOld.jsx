import React from "react";
import FavoriteIcon from "@material-ui/icons/Star";
import NoFavoriteIcon from "@material-ui/icons/StarBorder";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { Query, Mutation } from "react-apollo";

import { withStyles } from "@material-ui/core/styles";

import { GET_MEDIUM } from "../../queries/mediaQueries";
import { CREATE_FAVE, DELETE_FAVE } from "../../queries/mediaMutations";
import countFormat from "../../countFormat";
import withCurrentSession from "../withCurrentSession";
import FavesDialog from "./FavesDialog";

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
    borderBottomStyle: "solid"
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

class FaveButton extends React.Component {
  state = {
    favesDialog: false
  };

  renderButton() {
    const { medium, classes, link, currentSession, ...props } = this.props;
    const favesCount = medium.favesCount;

    return (
      <React.Fragment>
        <div className={classes.rootIcon}>
          {medium.faved ? (
            <Mutation
              mutation={DELETE_FAVE}
              update={cache => {
                cache.writeQuery({
                  query: GET_MEDIUM,
                  variables: { id: medium.id },
                  data: {
                    medium: {
                      ...medium,
                      faved: false,
                      favesCount: favesCount - 1
                    }
                  }
                });
              }}
            >
              {deleteFave => (
                <IconButton
                  size="small"
                  color="secondary"
                  classes={{ root: classes.iconButton }}
                  onClick={() => {
                    deleteFave({
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
              mutation={CREATE_FAVE}
              update={cache => {
                cache.writeQuery({
                  query: GET_MEDIUM,
                  variables: { id: medium.id },
                  data: {
                    medium: {
                      ...medium,
                      faved: true,
                      favesCount: favesCount + 1
                    }
                  }
                });
              }}
            >
              {createFave => (
                <IconButton
                  size="small"
                  disabled={this.props.disabled}
                  color="secondary"
                  classes={{ root: classes.iconButton }}
                  disabled={!currentSession}
                  onClick={() => {
                    createFave({
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
            disabled={this.props.disabled}
            classes={{
              root: classes.button
            }}
            onClick={() => {
              this.setState({ favesDialog: true });
            }}
          >
            {countFormat(favesCount, "fave", "faves")}
          </Button>
        </div>
        <FavesDialog
          medium={medium}
          open={this.state.favesDialog}
          onClose={() => {
            this.setState({ favesDialog: false });
          }}
        />
      </React.Fragment>
    );
  }

  render() {
    const { currentSession } = this.props;

    return this.renderButton();
  }
}

export default withStyles(styles)(withCurrentSession(FaveButton));
