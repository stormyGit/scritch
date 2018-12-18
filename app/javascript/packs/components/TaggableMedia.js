import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Gallery from "react-grid-gallery";

import queryString from "query-string";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";

import { GET_MEDIA, GET_USERS } from "../queries";

import AppLayout from "./AppLayout";
import TaggableMediumCard from "./TaggableMediumCard";
import EmptyList from "./EmptyList";
import LoadMoreButton from "./LoadMoreButton";
import UserCard from "./UserCard";

import withCurrentSession from "./withCurrentSession";

import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckIcon from "@material-ui/icons/Check";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import ResponsiveDialog from "./ResponsiveDialog";

import TagDialog from "./TagDialog";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing.unit * 1,
    paddingRight: 0
  },
  tagButton: {
    padding: theme.spacing.unit * 2
  }
});

class TaggableMedia extends React.Component {
  state = {
    tutoDialog: !this.props.currentSession.user.tagTutorial,
    tagDialog: false,
    hasMore: true
  };

  renderResults({ media, users, horizontal, onLoadMore, hasMore }) {
    const { classes } = this.props;

    if (media.length === 0 && users.length === 0) {
      const { location } = this.props;
      const query = queryString.parse(location.search);

      if (query.q) {
        return (
          <EmptyList
            label={`No results were found for your search term: ${query.q}`}
          />
        );
      } else {
        return <EmptyList label={`No results`} />;
      }
    }
    if (horizontal) {
      return (
        <React.Fragment>
          {users.length > 0 && (
            <Grid
              item
              item
              xs={12}
              lg={8}
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              <Grid container spacing={8}>
                {users.map(user => (
                  <Grid
                    item
                    item
                    xs={12}
                    lg={users.length === 1 ? 12 : 6}
                    key={user.id}
                  >
                    <UserCard user={user} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
          <Grid
            item
            item
            xs={12}
            lg={8}
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <Gallery
              images={media.map(medium => ({
                src: medium.picture,
                thumbnail: medium.thumbnail,
                thumbnailWidth: medium.width / (medium.height / 256.0),
                thumbnailHeight: 256
              }))}
            />
          </Grid>
          {hasMore && <LoadMoreButton onClick={() => onLoadMore()} />}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {users.length > 0 && (
          <Grid
            item
            item
            xs={12}
            lg={8}
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <Grid container spacing={8}>
              {users.map(user => (
                <Grid
                  item
                  item
                  xs={12}
                  lg={users.length === 1 ? 12 : 6}
                  key={user.id}
                >
                  <UserCard user={user} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
        {media.map(medium => (
          <Grid item xs={6} md={4} lg={3} key={medium.id}>
            <TaggableMediumCard medium={medium} />
          </Grid>
        ))}
        {hasMore && <LoadMoreButton onClick={() => onLoadMore()} />}
      </React.Fragment>
    );
  }

  render() {
    const { classes, currentSession, location, width } = this.props;
    const query = queryString.parse(location.search);
    let limit = parseInt(process.env.MEDIA_PAGE_SIZE);

    return (
      <Query
        query={GET_MEDIA}
        variables={{ q: query.q, offset: 0, limit, tagging: true }}
      >
        {({ data: { media, users }, loading, error, fetchMore }) => (
          <React.Fragment>
            <div style={{ padding: 5 }} />
            {false && (
              <Button
                size="large"
                className={classes.tagButton}
                onClick={() => this.setState({ tagDialog: true })}
              >
                GET RANDOM PICS TO TAG
              </Button>
            )}
            <Grid
              container
              className={classes.root}
              spacing={8}
              style={{ marginTop: width === "lg" || width === "xl" ? 4 : -4 }}
            >
              {!loading &&
                !error &&
                this.renderResults({
                  users,
                  media,
                  horizontal:
                    query.q &&
                    query.q.length > 0 &&
                    (width === "lg" || width === "xl"),
                  hasMore:
                    media.length % limit === 0 &&
                    this.state.hasMore &&
                    media.length > 0,
                  onLoadMore: () => {
                    fetchMore({
                      variables: {
                        offset: media.length,
                        limit
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;

                        if (fetchMoreResult.media.length === 0) {
                          this.setState({ hasMore: false });
                        } else {
                          return Object.assign({}, prev, {
                            media: [...prev.media, ...fetchMoreResult.media]
                          });
                        }
                      }
                    });
                  }
                })}
            </Grid>
            {!this.props.currentSession.user.tagTutorial && (
              <ResponsiveDialog open={this.state.tutoDialog}>
                {((width !== "lg" && width !== "xl") || true) && (
                  <DialogTitle>
                    <Grid
                      container
                      spacing={0}
                      alignItems="center"
                      justify="space-between"
                    >
                      <Grid item>
                        <Typography variant="h6" noWrap color={"inherit"}>
                          Tag Page Tutorial
                        </Typography>
                      </Grid>
                      <Grid item>
                        <IconButton
                          color="inherit"
                          onClick={() => this.setState({ tutoDialog: false })}
                          aria-label="Close"
                        >
                          <CloseIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </DialogTitle>
                )}
                <DialogContent>
                  <DialogContentText>Welcome to the tag page</DialogContentText>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon />
                      </ListItemIcon>
                      <ListItemText
                        inset
                        primary="This is where you tag stuff"
                      />
                    </ListItem>
                  </List>
                </DialogContent>
              </ResponsiveDialog>
            )}
            {!loading && !error && (
              <TagDialog
                open={this.state.tagDialog}
                onClose={() => this.setState({ tagDialog: false })}
                medium={media[0]}
              />
            )}
          </React.Fragment>
        )}
      </Query>
    );
  }
}

export default withStyles(styles)(
  withWidth()(withCurrentSession(TaggableMedia))
);
