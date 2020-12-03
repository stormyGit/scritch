import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import CloseIcon from "@material-ui/icons/Close";
import OutlinedFlag from "@material-ui/icons/OutlinedFlag";
import HelpIcon from "@material-ui/icons/HelpOutline";

import withCurrentSession from "../withCurrentSession";
import {withStyles} from "@material-ui/core/styles";
import {GET_MEDIUM} from "../../queries/mediaQueries";
import {Mutation, Query} from "react-apollo";
import {UPDATE_MEDIUM} from "../../queries/mediaMutations";

import ReportDialog from "../AppDialogs/ReportDialog";
import TagReportDialog from "../AppDialogs/TagReportDialog";
import FursuitMiniCard from "../Fursuits/FursuitMiniCard";
import {Checkbox, FormControlLabel, InputAdornment, TextField, withWidth} from "@material-ui/core";
import {LOAD_FURSUITS} from "../../queries/fursuitQueries";
import SearchBar from "material-ui-search-bar";
import {LOAD_EDITIONS, LOAD_EVENTS_SELECT, LOAD_SUB_EVENTS} from "../../queries/eventQueries";
import Select from "../Global/Select";
import {LOAD_CATEGORIES} from "../../queries/categoryQueries";
import LoadMoreButton from "../Global/LoadMoreButton";

const styles = theme => ({
  dialogTitleRoot: {
    margin: 0,
    padding: theme.spacing(2)
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
  dataLink: {
    textDecoration: "none",
    color: theme.palette.secondary.main
  },
  text: {
    fontWeight: 200
  },
  masterGridOnLoad: {
    padding: theme.spacing(4),
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  masterGrid: {
    padding: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em"
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  },
  dataGrid: {
    padding: theme.spacing(1),
    width: "100%",
    overflowY: "auto",
    height: "fit-content",
    display: "flex"
  },
  flexSection: {
    display: "flex",
    justifyContent: "space-between"
  },
  flexSectionCentered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  flexSectionSpacedCentered: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  mediaH: {
    width: "100%",
    maxHeight: "calc(100vh - 56px)",
    objectFit: "contain"
  },
  mediaHflip: {
    transform: "rotate(180deg)",
    width: "100%",
    maxHeight: "calc(100vh - 56px)",
    objectFit: "contain"
  },
  mediaVleft: {
    transform: "rotate(90deg)",
    width: "calc(100vh - 56px)",
    height: "calc(100vh - 56px)",
    maxHeight: "calc(100vh - 56px)",
    objectFit: "contain",
    margin: "auto",
    display: "block"
  },
  mediaVright: {
    transform: "rotate(-90deg)",
    width: "calc(100vh - 56px)",
    height: "calc(100vh - 56px)",
    maxHeight: "calc(100vh - 56px)",
    objectFit: "contain",
    margin: "auto",
    display: "block"
  },
  copied: {
    color: theme.palette.primary.main
  },
  dataFieldTitle: {
    maxWidth: "40vw",
    fontWeight: 200
  },
  innerDialogCloseButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  masterGridBackdrop: {
    padding: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black"
  },
  fursuitLink: {
    textDecoration: "none"
  },
  dialogHeight: {
    height: "100%"
  },
  sideHeight: {
    maxHeight: "100%"
  },
  leftIcon: {
    fontSize: 25
  },
  iconGridRoot: {
    alignItems: "center"
  },
  centeredItem: {
    textAlign: "center"
  },
  textGrid: {
    paddingLeft: theme.spacing(1)
  },
  fursuitsCountField: {
    width: "100%"
  },
  selectInput: {
    fontFamily: theme.typography.fontFamily
  },
  domain: {
    marginRight: 1,
    paddingBottom: 0,
    fontSize: "1rem",
    color: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"
  },
  listPadding: {
    marginTop: 0,
    marginBottom: 0
  },
  headTitle: {
    paddingLeft: theme.spacing(2)
  }
});

const Spacer = () => <div style={{ padding: 8 }} />;

const FatDivider = () => <hr style={{ borderTop: "1px solid", width: "80%", color: "grey" }} />;

const PhotographerSection = React.memo(
  ({
    classes,
    photographerSlug,
    setPhotographerSlug,
    photographerString,
    setPhotographerString,
    isPhotographer,
    setIsPhotographer
  }) => {
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <Typography color="primary" variant="h6" className={classes.headTitle}>
            Photographer
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ paddingTop: 0 }}>
          <FormControlLabel
            className={classes.listPadding}
            control={
              <Checkbox
                checked={isPhotographer}
                onChange={e => setIsPhotographer(e.target.checked)}
                color="primary"
              />
            }
            label="I captured this media"
          />
        </Grid>
        {!isPhotographer && (
          <React.Fragment>
            <Typography variant="body2" style={{ paddingLeft: 15, paddingBottom: 10 }}>
              Provide one:
            </Typography>
            <Grid item xs={12}>
              <TextField
                className={classes.listPadding}
                label="Photographer's Scritch URL"
                name="photographerSlug"
                variant="outlined"
                value={photographerSlug}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className={classes.domain} disableTypography>
                      {"http://scritch.es/"}
                    </InputAdornment>
                  )
                }}
                onChange={e => {
                  setPhotographerSlug(e.target.value);
                }}
                margin="dense"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.listPadding}
                label="Photographer's Name"
                name="photographerString"
                variant="outlined"
                value={photographerString}
                onChange={e => {
                  setPhotographerString(e.target.value);
                }}
                margin="dense"
                fullWidth
              />
            </Grid>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  },
  (
    {
      photographerSlug: oldPhotographerSlug,
      photographerString: oldPhotographerString,
      isPhotographer: oldIsPhotographer
    },
    {
      photographerSlug: newPhotographerSlug,
      photographerString: newPhotographerString,
      isPhotographer: newIsPhotographer
    }
  ) =>
    oldPhotographerSlug == newPhotographerSlug &&
    oldPhotographerString == newPhotographerString &&
    oldIsPhotographer == newIsPhotographer
);

const EventSection = React.memo(
  ({
    classes,
    mediaEvent,
    setMediaEvent,
    mediaEdition,
    setMediaEdition,
    mediaSubEvent,
    setMediaSubEvent
  }) => {
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <Typography color="primary" variant="h6" className={classes.headTitle}>
            Event
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Query
            query={LOAD_EVENTS_SELECT}
            variables={{
              offset: 0,
              limit: 1000
            }}
          >
            {({ data, loading, error, fetchMore }) => {
              if (loading || error) {
                return <CircularProgress />;
              }

              const eventList = [];
              data.events.map(e => eventList.push({ value: e.id, label: e.name }));
              return (
                <Select
                  fullWidth
                  isClearable
                  placeholder="Event"
                  isSearchable
                  value={mediaEvent}
                  onChange={event => {
                    let editionSwitch = mediaEvent && mediaEvent.value != event;
                    setMediaEvent(event);
                    if (editionSwitch) setMediaEdition(null);
                  }}
                  options={eventList}
                  className={classes.selectInput}
                />
              );
            }}
          </Query>
        </Grid>
        {mediaEvent && Object.keys(mediaEvent).length != 0 && mediaEvent.value != null && (
          <Grid item xs={12}>
            <Query
              query={LOAD_EDITIONS}
              variables={{
                offset: 0,
                limit: 150,
                eventId: mediaEvent.value
              }}
            >
              {({ data, loading, error, fetchMore }) => {
                if (loading || error) {
                  return <CircularProgress />;
                }

                const editionList = [];
                data.editions.map(e =>
                  editionList.push({
                    value: e.id,
                    label: e.name
                  })
                );
                return (
                  <Select
                    fullWidth
                    isClearable
                    placeholder="Edition"
                    isSearchable
                    value={mediaEdition}
                    onChange={edition => {
                      setMediaEdition(edition);
                    }}
                    options={editionList}
                    className={classes.selectInput}
                  />
                );
              }}
            </Query>
          </Grid>
        )}
        <Grid item xs={12}>
          <Query
            query={LOAD_SUB_EVENTS}
            variables={{
              sort: "latest",
              offset: 0,
              limit: 150
            }}
          >
            {({ data, loading, error, fetchMore }) => {
              if (loading || error) {
                return <CircularProgress />;
              }
              const subEventList = [];
              data.subEvents.map(e =>
                subEventList.push({
                  value: e.id,
                  label: e.name
                })
              );
              return (
                <Select
                  isClearable
                  fullWidth
                  clearable={true}
                  placeholder="SubEvent"
                  defaultValue={mediaSubEvent}
                  isSearchable
                  onChange={subEvent => {
                    setMediaSubEvent(subEvent);
                  }}
                  options={subEventList}
                  className={classes.selectInput}
                />
              );
            }}
          </Query>
        </Grid>
      </React.Fragment>
    );
  },
  (
    { mediaEvent: oldMediaEvent, mediaEdition: oldMediaEdition, mediaSubEvent: oldMediaSubEvent },
    { mediaEvent: newMediaEvent, mediaEdition: newMediaEdition, mediaSubEvent: newMediaSubEvent }
  ) =>
    oldMediaEvent == newMediaEvent &&
    oldMediaEdition == newMediaEdition &&
    oldMediaSubEvent == newMediaSubEvent
);

const CategorySection = React.memo(
  ({ classes, mediaCategory, setMediaCategory }) => {
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <Typography color="primary" variant="h6" className={classes.headTitle}>
            Category
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Query
            query={LOAD_CATEGORIES}
            variables={{
              sort: "latest",
              offset: 0,
              limit: 150
            }}
          >
            {({ data, loading, error, fetchMore }) => {
              if (loading || error) {
                return <CircularProgress />;
              }
              const categoryList = [];
              data.categories.map(e =>
                categoryList.push({
                  value: e.id,
                  label: e.name
                })
              );
              return (
                <Select
                  fullWidth
                  clearable={true}
                  placeholder="Category"
                  defaultValue={mediaCategory}
                  isSearchable
                  onChange={category => {
                    setMediaCategory(category);
                  }}
                  options={categoryList}
                  className={classes.selectInput}
                />
              );
            }}
          </Query>
        </Grid>
      </React.Fragment>
    );
  },
  ({ mediaCategory: oldMediaCategory }, { mediaCategory: newMediaCategory }) =>
    oldMediaCategory == newMediaCategory
);

function renderResults({
  data,
  onLoadMore,
  hasMore,
  setQuery,
  fursuits,
  setFursuits,
  setNameInput
}) {
  if (data.length === 0) {
    if (query.q) {
      return <EmptyList label={`No results were found for your search term: ${query.q}`} />;
    } else {
      return <EmptyList label={`No results`} />;
    }
  }

  return (
    <React.Fragment>
      {data.fursuits.map(fursuit => (
        <Grid item xs={4} key={fursuit.id}>
          <FursuitMiniCard
            fursuit={fursuit}
            onClick={payload => {
              setQuery("");
              setNameInput("");
              setFursuits([...fursuits, payload]);
            }}
          />
        </Grid>
      ))}
      {hasMore && <LoadMoreButton onClick={() => onLoadMore()} />}
    </React.Fragment>
  );
}

var reset;
var loadEventTimer;

function handleSearch(val, query, setQuery, nameInput, setNameInput) {
  if (nameInput.length >= 1 && val.length < 1) {
    reset = true;
  }

  setNameInput(val);

  if (loadEventTimer) {
    clearTimeout(loadEventTimer);
  }

  if (val.length >= 1) {
    loadEventTimer = setTimeout(() => {
      setQuery(val);
    }, 500);
  } else if (reset) {
    clearTimeout(loadEventTimer);
    setQuery(val);
    reset = false;
  }
}

const FursuitsSearchSection = React.memo(
  ({ classes, fursuits, setFursuits, disabled }) => {
    const [hasMore, setHasMore] = useState(true);
    const [query, setQuery] = useState("");
    const [nameInput, setNameInput] = useState("");
    var limit = 12;

    return (
      <React.Fragment>
        <Grid item xs={12}>
          <SearchBar
            className={classes.searchBar}
            disabled={disabled}
            onChange={value => handleSearch(value, query, setQuery, nameInput, setNameInput)}
            value={nameInput}
            onCancelSearch={() => handleSearch("", query, setQuery, nameInput, setNameInput)}
            placeholder="Search fursuits..."
          />
        </Grid>
        <Grid item xs={12} className={classes.flexSectionSpacedCentered}>
          {query.length >= 1 && (
            <Query
              query={LOAD_FURSUITS}
              variables={{
                name: query,
                limit,
                offset: 0,
                exclude: fursuits.map(a => a.id)
              }}
            >
              {({ data, loading, error, fetchMore }) => (
                <React.Fragment>
                  <Grid container className={classes.root} spacing={1}>
                    {!loading &&
                      !error &&
                      renderResults({
                        data,
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
                        setQuery,
                        setNameInput,
                        fursuits,
                        setFursuits
                      })}
                  </Grid>
                </React.Fragment>
              )}
            </Query>
          )}
        </Grid>
      </React.Fragment>
    );
  },
  ({ fursuits: oldFursuits }, { fursuits: newFursuits }) => oldFursuits == newFursuits
);

const FursuitsSection = ({ classes, fursuits, setFursuits, medium }) => {
  return (
    <React.Fragment>
      {fursuits.map(fursuit => (
        <Grid item xs={12} lg={6} key={fursuit.id}>
          <FursuitMiniCard
            fursuit={fursuit}
            onClick={payload => {
              if (medium.fursuits.map(e => e.id).includes(payload.id)) return null;
              let index = fursuits.indexOf(payload);
              setFursuits(fursuits.filter((_, i) => i !== index));
            }}
          />
        </Grid>
      ))}
    </React.Fragment>
  );
};

const FursuitNumberSection = ({ classes, fursuitsCount, setFursuitsCount }) => {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography color="primary" variant="h6" className={classes.headTitle}>
          Fursuits
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Number of Fursuits"
          name="fursuitsCount"
          variant="outlined"
          className={classes.fursuitsCountField}
          style={{ zIndex: 0 }}
          value={fursuitsCount || ""}
          onChange={e => setFursuitsCount(e.target.value)}
          margin="dense"
        />
      </Grid>
    </React.Fragment>
  );
};

function TagDialog({ classes, width, open, onClose, mediumId, editMedium, currentSession }) {
  const [fursuitsCount, setFursuitsCount] = useState(null);
  const [fursuits, setFursuits] = useState(null);
  const [mediaCategory, setMediaCategory] = useState(null);
  const [photographerSlug, setPhotographerSlug] = useState(null);
  const [photographerString, setPhotographerString] = useState(null);
  const [isPhotographer, setIsPhotographer] = useState(true);
  const [mediaEvent, setMediaEvent] = useState(null);
  const [mediaEdition, setMediaEdition] = useState(null);
  const [mediaSubEvent, setMediaSubEvent] = useState(null);
  const [tagReportDialog, setTagReportDialog] = useState(false);
  const [help, setHelp] = useState(false);
  const [initialValues, setInitialValues] = useState(false);
  const [reportDialog, setReportDialog] = useState(false);
  const [showOwnerEditor, setShowOwnerEditor] = useState(true);

  return (
    <ResponsiveDialog open={open} onClose={onClose} size={1280}>
      <DialogContent
        style={{
          padding: 0,
          width: "100%"
        }}
      >
        <Mutation
          mutation={UPDATE_MEDIUM}
          update={(cache, { data: { medium } }) => {
            cache.writeQuery({
              query: GET_MEDIUM,
              variables: { id: mediumId },
              data: {
                medium
              }
            });
          }}
        >
          {(updateMedium, { called }) => (
            <Query query={GET_MEDIUM} variables={{ id: mediumId }}>
              {({ error, loading, data }) => {
                if (error || loading) {
                  return (
                    <Grid container spacing={3}>
                      <Grid item xs={12} lg={9} className={classes.masterGridOnLoad}>
                        <CircularProgress />
                      </Grid>
                      <Grid item xs={12} lg={3} className={classes.masterGridOnLoad}>
                        <CircularProgress />
                      </Grid>
                    </Grid>
                  );
                }
                const medium = data ? data.medium : null;

                if (!medium) {
                  return (
                    <Grid container spacing={1}>
                      <Grid item xs={12} className={classes.masterGridOnLoad}>
                        <Typography variant="h6">Something went wrong :(</Typography>
                      </Grid>
                    </Grid>
                  );
                }

                if (initialValues === false) {
                  setInitialValues(true);
                  setFursuitsCount(medium.fursuitsCount);
                  setPhotographerString(medium.photographerString);
                  setPhotographerSlug(medium.photographerSlug);
                  setIsPhotographer(
                    medium.photographerSlug && medium.photographerSlug == currentSession.user.slug
                  );
                  setMediaEvent(
                    medium.edition
                      ? {
                          value: medium.edition.event.id,
                          label: medium.edition.event.name
                        }
                      : null
                  );
                  setMediaEdition(
                    medium.edition ? { value: medium.edition.id, label: medium.edition.name } : null
                  );
                  setMediaCategory(
                    medium.category
                      ? {
                          value: medium.category.id,
                          label: medium.category.name
                        }
                      : null
                  );
                  setMediaSubEvent(
                    medium.subEvent
                      ? {
                          value: medium.subEvent.id,
                          label: medium.subEvent.name
                        }
                      : null
                  );
                  setFursuits(medium.fursuits ? medium.fursuits : []);
                }

                var orientation;
                if (medium) {
                  if (medium.exif && JSON.parse(medium.exif).Orientation === "6")
                    orientation = classes.mediaVleft;
                  else if (medium.exif && JSON.parse(medium.exif).Orientation === "8")
                    orientation = classes.mediaVright;
                  else if (medium.exif && JSON.parse(medium.exif).Orientation === "3")
                    orientation = classes.mediaHflip;
                  else orientation = classes.mediaH;
                } else orientation = classes.mediaH;

                return (
                  <React.Fragment>
                    <Grid container spacing={0}>
                      <Grid item xs={12} lg={9} className={classes.masterGridBackdrop}>
                        {medium.resized.substr(medium.resized.lastIndexOf(".") + 1) === "mp4" && (
                          <video
                            loop="loop"
                            autoplay="autoplay"
                            onContextMenu={e => {
                              e.preventDefault();
                            }}
                            className={orientation}
                            src={medium.resized}
                          />
                        )}
                        {medium.resized.substr(medium.resized.lastIndexOf(".") + 1) !== "mp4" && (
                          <img
                            onClick={() => {}}
                            onContextMenu={e => {
                              e.preventDefault();
                            }}
                            className={orientation}
                            src={`${medium.resized}`}
                            title={medium.title}
                          />
                        )}
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        lg={3}
                        className={classes.dataGrid}
                        style={{
                          maxHeight:
                            width === "xl" || width === "lg"
                              ? medium.height < medium.width
                                ? medium.height / (medium.width / 960)
                                : 920
                              : "100%"
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12} className={classes.flexSection}>
                            {currentSession && (
                              <Tooltip title="Report Media">
                                <IconButton onClick={() => setReportDialog(true)}>
                                  <OutlinedFlag />
                                </IconButton>
                              </Tooltip>
                            )}
                            <Tooltip title="Completion Guide">
                              <IconButton onClick={() => setHelp(!help)}>
                                <HelpIcon />
                              </IconButton>
                            </Tooltip>
                            <Button
                              color="primary"
                              disabled={
                                (fursuits && fursuitsCount < fursuits.length) ||
                                (fursuitsCount && isNaN(fursuitsCount)) ||
                                (mediaEvent && (!mediaEdition || !mediaSubEvent)) ||
                                (mediaSubEvent && !mediaEdition) ||
                                (!isPhotographer && !photographerSlug && !photographerString)
                              }
                              onClick={() => {
                                updateMedium({
                                  variables: {
                                    input: {
                                      id: medium.id,
                                      title: medium.title,
                                      categoryId: mediaCategory && mediaCategory.value,
                                      editionId: mediaEdition ? mediaEdition.value : null,
                                      subEventId: mediaSubEvent ? mediaSubEvent.value : null,
                                      isPhotographer: isPhotographer,
                                      photographerSlug: photographerSlug,
                                      photographerString: photographerString,
                                      fursuitsCount: parseInt(fursuitsCount),
                                      fursuits: fursuits.map(a => a.id)
                                    }
                                  }
                                }).then(() => {
                                  onClose();
                                  //!this.props.noReload && location.reload();
                                });
                              }}
                            >
                              Save Changes
                            </Button>
                            <IconButton onClick={onClose} autoFocus>
                              <CloseIcon />
                            </IconButton>
                          </Grid>
                          {help && (
                            <Grid item xs={12}>
                              <Typography variant="subtitle1">
                                The Category makes up 20% of Completion.
                                <br />
                                Entering Number of Fursuits in this media constitutes 10%
                                Completion.
                                <br />
                                The remaining 70% are equally split by the number of Fursuits
                                declared when tagged.
                              </Typography>
                            </Grid>
                          )}
                          {editMedium && (
                            <React.Fragment>
                              <Grid item xs={12} className={classes.centeredItem}>
                                <Button
                                  variant="outlined"
                                  onClick={() => setShowOwnerEditor(!showOwnerEditor)}
                                >
                                  {showOwnerEditor ? "Hide Data Section" : "Show Data Section"}
                                </Button>
                              </Grid>
                              {showOwnerEditor && (
                                <React.Fragment>
                                  <PhotographerSection
                                    classes={classes}
                                    photographerSlug={photographerSlug}
                                    setPhotographerSlug={setPhotographerSlug}
                                    photographerString={photographerString}
                                    setPhotographerString={setPhotographerString}
                                    isPhotographer={isPhotographer}
                                    setIsPhotographer={setIsPhotographer}
                                  />
                                  <FatDivider />
                                  <EventSection
                                    classes={classes}
                                    mediaEvent={mediaEvent}
                                    setMediaEvent={setMediaEvent}
                                    mediaEdition={mediaEdition}
                                    setMediaEdition={setMediaEdition}
                                    mediaSubEvent={mediaSubEvent}
                                    setMediaSubEvent={setMediaSubEvent}
                                  />
                                  <FatDivider />
                                  <CategorySection
                                    classes={classes}
                                    mediaCategory={mediaCategory}
                                    setMediaCategory={setMediaCategory}
                                  />
                                  <FatDivider />
                                </React.Fragment>
                              )}
                            </React.Fragment>
                          )}

                          <FursuitNumberSection
                            classes={classes}
                            fursuitsCount={fursuitsCount}
                            setFursuitsCount={setFursuitsCount}
                          />
                          <Grid item xs={12} className={classes.centeredItem}>
                            <Button variant="outlined" onClick={() => setTagReportDialog(true)}>
                              Wrong Tags?
                            </Button>
                          </Grid>
                          {fursuitsCount != null && fursuitsCount > 0 && (
                            <FursuitsSearchSection
                              classes={classes}
                              fursuits={fursuits}
                              setFursuits={setFursuits}
                              disabled={fursuitsCount ? fursuits.length >= fursuitsCount : true}
                            />
                          )}
                          {fursuits && fursuits.length > 0 && (
                            <FursuitsSection
                              classes={classes}
                              fursuits={fursuits}
                              setFursuits={setFursuits}
                              medium={medium}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <TagReportDialog
                      open={tagReportDialog}
                      onClose={() => setTagReportDialog(false)}
                      medium={medium}
                    />
                    <ReportDialog
                      open={reportDialog}
                      onClose={() => setReportDialog(false)}
                      resource="medium"
                      resourceId={medium.id}
                    />
                  </React.Fragment>
                );
              }}
            </Query>
          )}
        </Mutation>
      </DialogContent>
    </ResponsiveDialog>
  );
}

// class oldTagDialog extends React.Component {
//   state = {
//     copied: false,
//     reportDialog: false,
//     editMedium: false,
//     downloadDialog: false,
//     tagReportDialog: false,
//     mediaCategory: null,
//     fursuits: null,
//     fursuitsCount: 0,
//     query: "",
//     nameInput: ""
//   };

//   setInitialValues(medium) {
//     this.setState({
//       mediaCategory: medium.category,
//       fursuits: medium.fursuits ? medium.fursuits : [],
//       fursuitsCount: medium.fursuitsCount
//     });
//   }

//   isFormOk() {
//     if (this.state.fursuits.length > this.state.fursuitsCount) return false;
//     return true;
//   }

//   handleSearch(val) {
//     if (this.state.nameInput.length >= 1 && val.length < 1) {
//       this.reset = true;
//     }

//     this.setState({ nameInput: val });

//     if (this.loadEventTimer) {
//       clearTimeout(this.loadEventTimer);
//     }

//     if (val.length >= 1) {
//       this.loadEventTimer = setTimeout(() => {
//         this.setState({ query: val });
//       }, 500);
//     } else if (this.reset) {
//       clearTimeout(this.loadEventTimer);
//       this.setState({ query: val });
//       this.reset = false;
//     }
//   }

//   render() {
//     const {
//       classes,
//       width,
//       open,
//       onClose,
//       mediumId,
//       currentSession
//     } = this.props;
//     if (!mediumId) return null;

//     return (

//                             <Grid item xs={12}>
//                               <SearchBar
//                                 className={classes.searchBar}
//                                 onChange={value => this.handleSearch(value)}
//                                 value={this.state.nameInput}
//                                 onCancelSearch={() => this.handleSearch("")}
//                                 placeholder="Search fursuits..."
//                               />
//                             </Grid>
//                             <FursuitsSection
//                               classes={classes}
//                               medium={medium}
//                               query={this.state.query}
//                               fursuits={this.state.fursuits}
//                             />
//                           </Grid>
//                         </Grid>
//                       </Grid>
//                       <TagReportDialog
//                         open={this.state.tagReportDialog}
//                         onClose={() =>
//                           this.setState({ tagReportDialog: false })
//                         }
//                         medium={medium}
//                       />
//                       <ReportDialog
//                         open={this.state.reportDialog}
//                         onClose={() => this.setState({ reportDialog: false })}
//                         resource="medium"
//                         resourceId={medium.id}
//                       />
//                     </React.Fragment>
//                   );
//                 }}
//               </Query>
//             )}
//           </Mutation>
//         </DialogContent>
//       </ResponsiveDialog>
//     );
//   }
// }

export default withStyles(styles)(withRouter(withCurrentSession(withWidth()(TagDialog))));
