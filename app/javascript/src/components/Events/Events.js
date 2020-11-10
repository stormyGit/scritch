import React, {useContext, useState} from "react";

import {LOAD_EVENTS} from "../../queries/eventQueries";
import {Query} from "react-apollo";
import queryString from "query-string";
import withWidth from "@material-ui/core/withWidth";
import AssetRequestDialog from "../AppDialogs/AssetRequestDialog";

import {withStyles} from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import PageTitle from "../Global/PageTitle";

import EmptyList from "../Global/EmptyList";
import LoadMoreButton from "../Global/LoadMoreButton";
import EventCard from "./EventCard";

import EventFilters from "./EventFilters";
import EventFiltersMobile from "./EventFiltersMobile";
import ScritchSpinner from "../CustomComponents/ScritchSpinner";
import {DialogContext} from "../../context/DialogContext";
import {setAssetRequestEventDialogState} from "../../reducers/Action";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing(1),
    paddingRight: 0
  },
  filters: {
    padding: theme.spacing(1),
    textAlign: "center"
  },
  requestButton: {
    top: 0,
    textAlign: "center"
  }
});

const Events = ({classes, location, width, searching, search}) => {
  const [hasMore, setMore] = useState(true);
  const [snack, setSnack] = useState(false);
  const [criteria, setCriteria] = useState({
    name: "",
    country: "",
    status: ""
  });
  let limit = search ? 12 : parseInt(process.env.MEDIA_PAGE_SIZE);
  const {dispatchDialogChange, getAssetRequestEventDialogState} = useContext(DialogContext);

  const clearFilters = () => {
    setCriteria({
      name: "",
      country: "",
      status: ""
    });
  }

  const renderResults = ({data, onLoadMore, hasMore}) => {
    if (data.events.length === 0) {
      return <EmptyList label={`No results`}/>;
    }

    return (
      <React.Fragment>
        {data.events.map(event => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={event.id}>
            <EventCard event={event} EventId={event.id}/>
          </Grid>
        ))}
        {hasMore && <LoadMoreButton onClick={() => onLoadMore()}/>}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {!searching && <PageTitle>Events</PageTitle>}
      <Query
        query={LOAD_EVENTS}
        variables={{
          name: searching ? search : criteria.name,
          country: criteria.country,
          status: criteria.status,
          limit,
          offset: 0
        }}
      >
        {({data, loading, error, fetchMore}) => {
          if (loading) return <ScritchSpinner size={search ? 64 : 128}/>;
          if (error || !data || !data.events) return null;
          return (
            <React.Fragment>
              {!searching && (
                <Grid spacing={1} container className={classes.filters} alignItems="center">
                  {(width === "xl" || width === "lg") && (
                    <Grid item lg={2}>
                      <img style={{width: "80%"}} src={require("images/pixel/Furcon.png")} alt={"Image showing a furry convention Building"}/>
                    </Grid>
                  )}
                  <Grid item xs={12} lg={8}>
                    {width === "xs" || width === "sm" ? (
                      <EventFiltersMobile
                        onChange={value => {
                          setCriteria({[value.label]: value.value}); //TODO: test
                        }}
                        clearFilters={() => clearFilters()}
                      />
                    ) : (
                      <EventFilters
                        onChange={value => {
                          setCriteria({[value.label]: value.value});
                        }}
                        clearFilters={() => clearFilters()}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} lg={2}>
                    <Button
                      variant="outlined"
                      className={classes.requestButton}
                      size="large"
                      onClick={() => dispatchDialogChange(setAssetRequestEventDialogState(true))}
                    >
                      Request a new Event
                    </Button>
                  </Grid>
                </Grid>
              )}
              <Grid
                container
                className={classes.root}
                spacing={3}
                style={{marginTop: width === "lg" || width === "xl" ? 4 : -4}}
              >
                {!loading &&
                !error &&
                  renderResults({
                  data,
                  hasMore:
                    data.events.length % limit === 0 &&
                    hasMore &&
                    data.events.length > 0,
                  onLoadMore: () => {
                    fetchMore({
                      variables: {
                        offset: data.events.length,
                        limit
                      },
                      updateQuery: (prev, {fetchMoreResult}) => {
                        if (!fetchMoreResult) return prev;

                        if (fetchMoreResult.events.length === 0) {
                          setMore(false);
                        } else {
                          return Object.assign({}, prev, {
                            events: [...prev.events, ...fetchMoreResult.events]
                          });
                        }
                      }
                    });
                  }
                })}
              </Grid>
            </React.Fragment>
          );
        }}
      </Query>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={snack}
        autoHideDuration={6000}
        onClose={() => setSnack(false)}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">Event Request Submitted!</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={() => setSnack(false)}
          >
            <CloseIcon/>
          </IconButton>
        ]}
      />
      <AssetRequestDialog
        open={getAssetRequestEventDialogState}
        keepAssetType="Event"
        onClose={() => dispatchDialogChange(setAssetRequestEventDialogState(false))}
        assetType="Event"
        submitSnack={() => setSnack(true)}
      />
    </React.Fragment>
  );
}

export default withStyles(styles)(withWidth()(Events));
