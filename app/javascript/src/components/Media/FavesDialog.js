import React from "react";
import {withStyles} from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import {Query} from "react-apollo";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import EmptyFaveIcon from "@material-ui/icons/FavoriteBorder";

import dayjs from "dayjs";

import ResponsiveDialog from "../Global/ResponsiveDialog";
import EmptyList from "../Global/EmptyList";
import UserAvatar from "../Users/UserAvatar";
import withCurrentSession from "../withCurrentSession";
import timeAgo from "../../util/timeAgo";

import {GET_FAVES} from "../../queries/mediaQueries";

const styles = theme => ({
  favesContainer: {
    paddingLeft: 0,
    paddingRight: 0
  },
  emptyFavesContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  emptyFavesIcon: {
    fontSize: 2,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(1),
    color:
      theme.palette.type === "dark"
        ? "rgba(255, 255, 255, 0.3)"
        : "rgba(0, 0, 0, 0.3)"
  }
});

class FavesDialog extends React.Component {
  renderFave(fave) {
    const { currentSession, classes } = this.props;

    return (
      <ListItem
        key={fave.id}
        button
        component={props => <Link to={`/${fave.user.id}`} {...props} />}
      >
        <UserAvatar user={fave.user} />
        <ListItemText
          primary={fave.user.name}
          secondary={timeAgo.format(dayjs(fave.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  render() {
    const { faves, classes, onClose, width } = this.props;

    return (
      <React.Fragment>
        {faves.length > 0 ? (
          <DialogContent
            className={classes.favesContainer}
            style={{
              minHeight: width === "lg" || width === "xl" ? 300 : 0,
              paddingTop: 0
            }}
          >
            <List>{faves.map(fave => this.renderFave(fave))}</List>
          </DialogContent>
        ) : (
          <React.Fragment>
            <DialogTitle>
              <span />
            </DialogTitle>
            <DialogContent className={classes.emptyFavesContainer}>
              <EmptyFaveIcon className={classes.emptyFavesIcon} />
              <EmptyList label={`No public faves`} />
            </DialogContent>
          </React.Fragment>
        )}
        <DialogActions>
          <Button onClick={onClose} aria-label="Close">
            Close
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}

const FavesDialogWithWidth = withWidth()(FavesDialog);

class FaveDialogLoader extends React.Component {
  render() {
    const { currentSession, open, onClose, medium, ...props } = this.props;

    let offset = 0;
    let limit = parseInt(process.env.LIKES_PAGE_SIZE);

    return (
      <ResponsiveDialog open={open} onClose={onClose}>
        {open && (
          <Query
            query={GET_FAVES}
            variables={{ mediumId: medium.id, offset, limit }}
          >
            {({ data, loading, error, fetchMore }) => {
              if (loading || error) {
                return null;
              }

              return (
                <FavesDialogWithWidth
                  {...props}
                  currentSession={currentSession}
                  open={open}
                  onClose={onClose}
                  faves={data.faves}
                />
              );
            }}
          </Query>
        )}
      </ResponsiveDialog>
    );
  }
}

export default withCurrentSession(withStyles(styles)(FaveDialogLoader));
