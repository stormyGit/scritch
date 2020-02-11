import React, { useState } from "react";
import PageTitle from "../Global/PageTitle";
import queryString from "query-string";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import Fursuits from "../Fursuits/Fursuits";
import { Tabs, Tab, Button } from "@material-ui/core";
import { Query } from "react-apollo";
import { LOAD_FURSUITS } from "../../queries/fursuitQueries";
import FursuitCard from "../Fursuits/FursuitCard";
import LoadMoreButton from "../Global/LoadMoreButton";
import ModerationFursuitDialog from "./ModerationFursuitDialog";

import SearchBar from "material-ui-search-bar";
import { LOAD_MAKERS } from "../../queries/makerQueries";
import MakerCard from "../Makers/MakerCard";
import ModerationMakerDialog from "./ModerationMakerDialog";
import CreateFursuitDialog from "./CreateFursuitDialog";
import CreateMakerDialog from "./CreateMakerDialog";
import EmptyList from "../Global/EmptyList";
import { LOAD_EVENTS } from "../../queries/eventQueries";
import EventCard from "../Events/EventCard";
import ModerationEventDialog from "./ModerationEventDialog";
import CreateEventDialog from "./CreateEventDialog";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing.unit * 1,
    paddingRight: 0
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  padderTitle: { paddingTop: 8, paddingLeft: 30, paddingRight: 8 },
  pixelImage: {
    width: "128px",
    height: "128px"
  }
});

function renderEventResults({ data, onLoadMore, hasMore, withEvent, classes, setActiveEvent }) {
  if (data.events.length === 0) {
    const { location } = this.props;
    const query = queryString.parse(location.search);

    if (query.q) {
      return <EmptyList label={`No results were found for your search term: ${query.q}`} />;
    } else {
      return <EmptyList label={`No results`} />;
    }
  }
  return (
    <React.Fragment>
      {data.events.map(event => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={event.id}>
          <EventCard event={event} onClick={() => setActiveEvent(event.id)} />
        </Grid>
      ))}
      {hasMore && <LoadMoreButton onClick={() => onLoadMore()} />}
    </React.Fragment>
  );
}

const ModerationEvents = ({ classes, width }) => {
  const [activeEvent, setActiveEvent] = useState(null);
  const [name, setName] = useState("");
  const [newEventDialog, setNewEventDialog] = useState(false);
  const [research, setResearch] = useState("");
  const [hasMore, setHasMore] = useState(true);

  let limit = parseInt(process.env.MEDIA_PAGE_SIZE);

  return (
    <React.Fragment>
      <div style={{ padding: 16 }} />
      <Grid container spacing={8}>
        <Grid item xs={false} lg={3} />
        <Grid item xs={12} lg={6}>
          <SearchBar
            className={classes.searchBar}
            onChange={value => setName(value)}
            onCancelSearch={() => {
              setName("");
              setResearch("");
            }}
            onRequestSearch={() => setResearch(name)}
            value={name}
            placeholder="Search..."
          />
        </Grid>
        <Grid item xs={12} lg={3} style={{ textAlign: "center" }}>
          <Button variant="outlined" size="large" onClick={() => setNewEventDialog(true)}>
            New Event
          </Button>
        </Grid>
      </Grid>
      <Query
        query={LOAD_EVENTS}
        variables={{
          name: research,
          isModerator: true,
          limit,
          offset: 0
        }}
      >
        {({ data, loading, error, fetchMore }) => (
          <React.Fragment>
            <Grid
              container
              className={classes.root}
              spacing={24}
              style={{ marginTop: width === "lg" || width === "xl" ? 4 : -4 }}
            >
              {!loading &&
                !error &&
                renderEventResults({
                  data,
                  hasMore: data.events.length % limit === 0 && hasMore && data.events.length > 0,
                  onLoadMore: () => {
                    fetchMore({
                      variables: {
                        offset: data.events.length,
                        limit
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;

                        if (fetchMoreResult.events.length === 0) {
                          setHasMore(false);
                        } else {
                          return Object.assign({}, prev, {
                            events: [...prev.events, ...fetchMoreResult.events]
                          });
                        }
                      }
                    });
                  },
                  setActiveEvent
                })}
            </Grid>
          </React.Fragment>
        )}
      </Query>
      {activeEvent && (
        <ModerationEventDialog
          event={activeEvent}
          open={activeEvent != null}
          onClose={() => setActiveEvent(null)}
        />
      )}
      {newEventDialog && (
        <CreateEventDialog open={newEventDialog} onClose={() => setNewEventDialog(false)} />
      )}
    </React.Fragment>
  );
};

function renderMakerResults({ data, onLoadMore, hasMore, withMaker, classes, setActiveMaker }) {
  if (data.makers.length === 0) {
    const { location } = this.props;
    const query = queryString.parse(location.search);

    if (query.q) {
      return <EmptyList label={`No results were found for your search term: ${query.q}`} />;
    } else {
      return <EmptyList label={`No results`} />;
    }
  }
  return (
    <React.Fragment>
      {data.makers.map(maker => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={maker.id}>
          <MakerCard maker={maker} onClick={() => setActiveMaker(maker.id)} />
        </Grid>
      ))}
      {hasMore && <LoadMoreButton onClick={() => onLoadMore()} />}
    </React.Fragment>
  );
}

const ModerationMakers = ({ classes, width }) => {
  const [activeMaker, setActiveMaker] = useState(null);
  const [name, setName] = useState("");
  const [newMakerDialog, setNewMakerDialog] = useState(false);
  const [research, setResearch] = useState("");
  const [hasMore, setHasMore] = useState(true);

  let limit = parseInt(process.env.MEDIA_PAGE_SIZE);

  return (
    <React.Fragment>
      <div style={{ padding: 16 }} />
      <Grid container spacing={8}>
        <Grid item xs={false} lg={3} />
        <Grid item xs={12} lg={6}>
          <SearchBar
            className={classes.searchBar}
            onChange={value => setName(value)}
            onCancelSearch={() => {
              setName("");
              setResearch("");
            }}
            onRequestSearch={() => setResearch(name)}
            value={name}
            placeholder="Search..."
          />
        </Grid>
        <Grid item xs={12} lg={3} style={{ textAlign: "center" }}>
          <Button variant="outlined" size="large" onClick={() => setNewMakerDialog(true)}>
            New Maker
          </Button>
        </Grid>
      </Grid>
      <Query
        query={LOAD_MAKERS}
        variables={{
          name: research,
          isModerator: true,
          limit,
          offset: 0
        }}
      >
        {({ data, loading, error, fetchMore }) => (
          <React.Fragment>
            <Grid
              container
              className={classes.root}
              spacing={24}
              style={{ marginTop: width === "lg" || width === "xl" ? 4 : -4 }}
            >
              {!loading &&
                !error &&
                renderMakerResults({
                  data,
                  hasMore: data.makers.length % limit === 0 && hasMore && data.makers.length > 0,
                  onLoadMore: () => {
                    fetchMore({
                      variables: {
                        offset: data.makers.length,
                        limit
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;

                        if (fetchMoreResult.makers.length === 0) {
                          setHasMore(false);
                        } else {
                          return Object.assign({}, prev, {
                            makers: [...prev.makers, ...fetchMoreResult.makers]
                          });
                        }
                      }
                    });
                  },
                  setActiveMaker
                })}
            </Grid>
          </React.Fragment>
        )}
      </Query>
      {activeMaker && (
        <ModerationMakerDialog
          maker={activeMaker}
          open={activeMaker != null}
          onClose={() => setActiveMaker(null)}
        />
      )}
      {newMakerDialog && (
        <CreateMakerDialog open={newMakerDialog} onClose={() => setNewMakerDialog(false)} />
      )}
    </React.Fragment>
  );
};

function renderFursuitResults({ data, onLoadMore, hasMore, withMaker, classes, setActiveFursuit }) {
  if (data.fursuits.length === 0) {
    return <EmptyList label={`No results`} />;
  }
  return (
    <React.Fragment>
      {data.fursuits.map(fursuit => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={fursuit.id}>
          <FursuitCard
            withMaker={true}
            fursuit={fursuit}
            onClick={() => setActiveFursuit(fursuit.id)}
          />
        </Grid>
      ))}
      {hasMore && <LoadMoreButton onClick={() => onLoadMore()} />}
    </React.Fragment>
  );
}

const ModerationFursuits = ({ classes, width }) => {
  const [activeFursuit, setActiveFursuit] = useState(null);
  const [name, setName] = useState("");
  const [newFursuitDialog, setNewFursuitDialog] = useState(false);
  const [research, setResearch] = useState("");
  const [hasMore, setHasMore] = useState(true);

  let limit = parseInt(process.env.MEDIA_PAGE_SIZE);

  return (
    <React.Fragment>
      <div style={{ padding: 16 }} />
      <Grid container spacing={8}>
        <Grid item xs={false} lg={3} />
        <Grid item xs={12} lg={6}>
          <SearchBar
            className={classes.searchBar}
            onChange={value => setName(value)}
            onCancelSearch={() => {
              setName("");
              setResearch("");
            }}
            onRequestSearch={() => setResearch(name)}
            value={name}
            placeholder="Search..."
          />
        </Grid>
        <Grid item xs={12} lg={3} style={{ textAlign: "center" }}>
          <Button variant="outlined" size="large" onClick={() => setNewFursuitDialog(true)}>
            New Fursuit
          </Button>
        </Grid>
      </Grid>
      <Query
        query={LOAD_FURSUITS}
        variables={{
          name: research,
          isModerator: true,
          limit,
          offset: 0
        }}
      >
        {({ data, loading, error, fetchMore }) => {
          if (loading || error || !data || !data.fursuits) return null;
          return (
            <React.Fragment>
              <Grid
                container
                className={classes.root}
                spacing={24}
                style={{
                  marginTop: width === "lg" || width === "xl" ? 4 : -4
                }}
              >
                {renderFursuitResults({
                  data,
                  horizontal: false,
                  hasMore:
                    data.fursuits.length % limit === 0 && hasMore && data.fursuits.length > 0,
                  onLoadMore: () => {
                    fetchMore({
                      variables: {
                        offset: data.fursuits.length,
                        limit
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;

                        if (fetchMoreResult.fursuits.length === 0) {
                          setHasMore(false);
                        } else {
                          return Object.assign({}, prev, {
                            fursuits: [...prev.fursuits, ...fetchMoreResult.fursuits]
                          });
                        }
                      }
                    });
                  },
                  classes,
                  setActiveFursuit
                })}
              </Grid>
            </React.Fragment>
          );
        }}
      </Query>
      {activeFursuit && (
        <ModerationFursuitDialog
          fursuit={activeFursuit}
          open={activeFursuit != null}
          onClose={() => setActiveFursuit(null)}
        />
      )}
      {newFursuitDialog && (
        <CreateFursuitDialog open={newFursuitDialog} onClose={() => setNewFursuitDialog(false)} />
      )}
    </React.Fragment>
  );
};

const ModerationAssets = ({ classes, width }) => {
  const [tab, setTab] = useState("events");

  return (
    <React.Fragment>
      <PageTitle>{`Scritch Moderation - Assets`}</PageTitle>
      <Tabs
        variant="fullWidth"
        className={classes.tabsCenterer}
        value={tab}
        onChange={(e, value) => setTab(value)}
        textColor="textPrimary"
      >
        <Tab value="fursuits" icon={"Fursuits"} />
        <Tab value="makers" icon={"Makers"} />
        <Tab value="events" icon={"Events"} />
      </Tabs>
      {tab === "fursuits" && <ModerationFursuits classes={classes} width={width} />}
      {tab === "makers" && <ModerationMakers classes={classes} width={width} />}
      {tab === "events" && <ModerationEvents classes={classes} width={width} />}
    </React.Fragment>
  );
};

export default withStyles(styles)(withWidth()(ModerationAssets));
