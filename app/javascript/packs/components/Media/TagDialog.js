import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CameraIcon from "@material-ui/icons/CameraAlt";
import FlashIcon from "@material-ui/icons/FlashOn";
import TimerIcon from "@material-ui/icons/Timer";
import IsoIcon from "@material-ui/icons/Iso";
import DateIcon from "@material-ui/icons/DateRange";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRulerHorizontal, faEye } from "@fortawesome/free-solid-svg-icons";

import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import DownloadIcon from "@material-ui/icons/SaveAlt";
import EditIcon from "@material-ui/icons/Edit";
import OutlinedFlag from "@material-ui/icons/OutlinedFlag";

import withCurrentSession from "../withCurrentSession";
import { withStyles } from "@material-ui/core/styles";
import { GET_MEDIUM } from "../../queries/mediaQueries";
import { Query, Mutation } from "react-apollo";
import {
  TAG_LOCK_MEDIUM,
  TAG_UNLOCK_MEDIUM,
  UPDATE_MEDIUM
} from "../../queries/mediaMutations";
import countFormat from "../../countFormat";

import ReportDialog from "../AppDialogs/ReportDialog";
import TagReportDialog from "../AppDialogs/TagReportDialog";
import ExifDialog from "../AppDialogs/ExifDialog";
import DownloadDialog from "../AppDialogs/DownloadDialog";
import LikeButton from "./LikeButton";
import FaveButton from "./FaveButton";
import FursuitMiniCard from "../Fursuits/FursuitMiniCard";
import EditMediumDialog from "./EditMediumDialog";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import { withWidth, CardHeader, TextField } from "@material-ui/core";
import UserAvatar from "../Users/UserAvatar";
import timeAgo from "../../timeAgo";
import dayjs from "dayjs";
import countContractor from "../../countContractor";
import { LOAD_FURSUIT, LOAD_FURSUITS } from "../../queries/fursuitQueries";
import SearchBar from "material-ui-search-bar";

const styles = theme => ({
  dialogTitleRoot: {
    margin: 0,
    padding: theme.spacing.unit * 2
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
    padding: theme.spacing.unit * 4,
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
    padding: theme.spacing.unit,
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
    right: theme.spacing.unit * 1,
    top: theme.spacing.unit * 1,
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
  iconGrid: {
    textAlign: "center"
  },
  textGrid: {
    paddingLeft: theme.spacing.unit
  },
  fursuitsCountField: {
    width: "100%"
  }
});

const Spacer = () => <div style={{ padding: 8 }} />;

const FatDivider = () => (
  <hr style={{ borderTop: "1px solid", width: "80%", color: "grey" }} />
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
      {data.fursuits.map(fursuit => (
        <Grid item xs={3} key={fursuit.id}>
          <FursuitMiniCard
            fursuit={fursuit}
            onClick={payload => {
              setQuery("");
              setNameInput("");
              setFursuits([...fursuits, payload]);
              // this.setState(prevState => ({
              //   query: "",
              //   fursuits: [...prevState.fursuits, payload]
              // }));
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

const FursuitsSearchSection = ({
  classes,
  fursuits,
  setFursuits,
  disabled
}) => {
  const [hasMore, setHasMore] = useState(false);
  const [query, setQuery] = useState("");
  const [nameInput, setNameInput] = useState("");
  var limit = 12;

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <SearchBar
          className={classes.searchBar}
          disabled={disabled}
          onChange={value =>
            handleSearch(value, query, setQuery, nameInput, setNameInput)
          }
          value={nameInput}
          onCancelSearch={() =>
            handleSearch("", query, setQuery, nameInput, setNameInput)
          }
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
                <Grid container className={classes.root} spacing={8}>
                  {!loading &&
                    !error &&
                    renderResults({
                      data,
                      hasMore:
                        data.fursuits.length % limit === 0 &&
                        hasMore &&
                        data.fursuits.length > 0,
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
                                fursuits: [
                                  ...prev.fursuits,
                                  ...fetchMoreResult.fursuits
                                ]
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
};

const FursuitsSection = ({ classes, fursuits, setFursuits, medium }) => {
  return (
    <React.Fragment>
      {fursuits.map(fursuit => (
        <Grid item xs={12} lg={6} key={fursuit.id}>
          <FursuitMiniCard
            fursuit={fursuit}
            onClick={payload => {
              if (medium.fursuits.map(e => e.id).includes(payload.id))
                return null;
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
    <Grid item xs={12}>
      <TextField
        label="No. of Fursuits"
        name="fursuitsCount"
        variant="outlined"
        className={classes.fursuitsCountField}
        style={{ zIndex: 0 }}
        value={fursuitsCount || ""}
        onChange={e => setFursuitsCount(e.target.value)}
        margin="dense"
      />
    </Grid>
  );
};

function TagDialog({
  classes,
  width,
  open,
  onClose,
  mediumId,
  currentSession
}) {
  const [fursuitsCount, setFursuitsCount] = useState(null);
  const [fursuits, setFursuits] = useState(null);
  const [mediaCategory, setMediaCategory] = useState(null);
  const [tagReportDialog, setTagReportDialog] = useState(false);
  const [initialValues, setInitialValues] = useState(false);
  const [reportDialog, setReportDialog] = useState(false);

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
                    <Grid container spacing={24}>
                      <Grid
                        item
                        xs={12}
                        lg={9}
                        className={classes.masterGridOnLoad}
                      >
                        <CircularProgress />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        lg={3}
                        className={classes.masterGridOnLoad}
                      >
                        <CircularProgress />
                      </Grid>
                    </Grid>
                  );
                }
                const medium = data ? data.medium : null;

                if (!medium) {
                  return (
                    <Grid container spacing={8}>
                      <Grid item xs={12} className={classes.masterGridOnLoad}>
                        <Typography variant="h6">
                          Something went wrong :(
                        </Typography>
                      </Grid>
                    </Grid>
                  );
                }
                console.log(medium);

                if (initialValues === false) {
                  setInitialValues(true);
                  setFursuitsCount(medium.fursuitsCount);
                  setMediaCategory(medium.category);
                  setFursuits(medium.fursuits ? medium.fursuits : []);
                }

                var orientation;
                if (medium) {
                  if (
                    medium.exif &&
                    JSON.parse(medium.exif).Orientation === "6"
                  )
                    orientation = classes.mediaVleft;
                  else if (
                    medium.exif &&
                    JSON.parse(medium.exif).Orientation === "8"
                  )
                    orientation = classes.mediaVright;
                  else if (
                    medium.exif &&
                    JSON.parse(medium.exif).Orientation === "3"
                  )
                    orientation = classes.mediaHflip;
                  else orientation = classes.mediaH;
                } else orientation = classes.mediaH;

                return (
                  <React.Fragment>
                    <Grid container spacing={0}>
                      <Grid
                        item
                        xs={12}
                        lg={9}
                        className={classes.masterGridBackdrop}
                      >
                        {medium.resized.substr(
                          medium.resized.lastIndexOf(".") + 1
                        ) === "mp4" && (
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
                        {medium.resized.substr(
                          medium.resized.lastIndexOf(".") + 1
                        ) !== "mp4" && (
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
                        <Grid container spacing={16}>
                          <Grid item xs={12} className={classes.flexSection}>
                            {currentSession && (
                              <Tooltip title="Report Media">
                                <IconButton
                                  onClick={() => setReportDialog(true)}
                                >
                                  <OutlinedFlag />
                                </IconButton>
                              </Tooltip>
                            )}
                            <Button
                              disabled={
                                !mediaCategory ||
                                (fursuits && fursuitsCount < fursuits.length) ||
                                (fursuitsCount && isNaN(fursuitsCount))
                              }
                              onClick={() => {
                                updateMedium({
                                  variables: {
                                    input: {
                                      id: medium.id,
                                      title: medium.title,
                                      categoryId:
                                        mediaCategory && mediaCategory.value,
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
                          <Grid item xs={12}>
                            <Typography variant="subtitle1">
                              The Category makes up 20% of Completion.
                              <br />
                              Entering No. of Fursuits in this media constitutes
                              10% Completion.
                              <br />
                              The remaining 70% are equally split by the number
                              of Fursuits declared when tagged.
                            </Typography>
                          </Grid>
                          <FursuitNumberSection
                            classes={classes}
                            fursuitsCount={fursuitsCount}
                            setFursuitsCount={setFursuitsCount}
                          />
                          {console.log(fursuitsCount)}
                          {fursuitsCount != null && fursuitsCount > 0 && (
                            <FursuitsSearchSection
                              classes={classes}
                              fursuits={fursuits}
                              setFursuits={setFursuits}
                              disabled={
                                fursuitsCount
                                  ? fursuits.length >= fursuitsCount
                                  : true
                              }
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

export default withStyles(styles)(
  withRouter(withCurrentSession(withWidth()(TagDialog)))
);
