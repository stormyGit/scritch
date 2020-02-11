import React from "react";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import queryString from "query-string";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";

import { GET_MEDIA_WITH_FURSUITS } from "../queries/mediaQueries";

import TaggableMediumCard from "./TaggableMediumCard";
import EmptyList from "./Global/EmptyList";
import LoadMoreButton from "./Global/LoadMoreButton";
import MediaFiltersRework from "./Media/MediaFiltersRework";

import withCurrentSession from "./withCurrentSession";

import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import ResponsiveDialog from "./Global/ResponsiveDialog";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing.unit * 1,
    paddingRight: 0
  },
  buttonRoot: {
    display: "flex",
    justifyContent: "center"
  },
  tagButton: {
    padding: theme.spacing.unit * 2
  }
});

class TaggableMedia extends React.Component {
  state = {
    tutoDialog: !this.props.currentSession.user.tagTutorial,
    tagDialog: false,
    hasMore: true,
    userId: null,
    event: null,
    edition: null,
    category: null,
    subEvent: null,
    sort: "latest",
    hasMore: true
  };

  clearFilters() {
    this.setState({
      event: null,
      edition: null,
      category: null,
      subEvent: null,
      sort: { value: "latest", label: "Latest" }
    });
  }

  renderResults({ media, horizontal, onLoadMore, hasMore }) {
    const { classes } = this.props;

    if (media.length === 0) {
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

    return (
      <React.Fragment>
        {media.map(medium => (
          <Grid item xs={12} sm={6} md={3} xl={2} key={medium.id}>
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
        query={GET_MEDIA_WITH_FURSUITS}
        variables={{
          q: query.q,
          offset: 0,
          limit,
          tagging: true,
          userId: this.state.userId,
          sort: this.state.sort.value,
          eventId: this.state.event ? this.state.event.value : null,
          editionId: this.state.edition ? this.state.edition.value : null,
          categoryId: this.state.category ? this.state.category.value : null,
          subEventId: this.state.subEvent ? this.state.subEvent.value : null
        }}
      >
        {({ data: { media }, loading, error, fetchMore }) => (
          <React.Fragment>
            <div className={classes.filters}>
              <MediaFiltersRework
                onChange={value => {
                  this.setState({ [value.label]: value.value });
                }}
                clearFilters={() => this.clearFilters()}
                isTagPage={true}
              />
            </div>
            <div className={classes.buttonRoot}>
              {!this.state.userId && (
                <Button
                  size="large"
                  className={classes.tagButton}
                  onClick={() =>
                    this.setState({ userId: currentSession.user.id })
                  }
                >
                  Show only my pictures
                </Button>
              )}
              {this.state.userId && (
                <Button
                  size="large"
                  className={classes.tagButton}
                  onClick={() => this.setState({ userId: null })}
                >
                  Show every picture
                </Button>
              )}
            </div>
            <Grid
              container
              className={classes.root}
              spacing={1}
              style={{ marginTop: width === "lg" || width === "xl" ? 4 : -4 }}
            >
              {!loading &&
                !error &&
                this.renderResults({
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
          </React.Fragment>
        )}
      </Query>
    );
  }
}

export default withStyles(styles)(
  withWidth()(withCurrentSession(TaggableMedia))
);
