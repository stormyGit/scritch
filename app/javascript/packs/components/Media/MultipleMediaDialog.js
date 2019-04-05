import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import uuidv4 from "uuid/v4";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckIcon from "@material-ui/icons/Check";
import InputAdornment from "@material-ui/core/InputAdornment";

import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";

import Select from "react-select";

import withWidth from "@material-ui/core/withWidth";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";

import ChipInput from "material-ui-chip-input";

import { withRouter, Link } from "react-router-dom";
import Dropzone from "react-dropzone";

import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";

import { withStyles } from "@material-ui/core/styles";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";

import { CREATE_MEDIUM } from "../../queries/mediaMutations";
import { LOAD_CATEGORIES } from "../../queries/categoryQueries";
import {
  LOAD_EVENTS,
  LOAD_EDITIONS,
  LOAD_SUB_EVENTS
} from "../../queries/eventQueries";

const dropZoneStyles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 4,
    borderRadius: 2,
    textAlign: "center",
    color: "white",
    background: theme.palette.primary.light,
    fontFamily: theme.typography.fontFamily,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    translation: "opacity 0.5s ease",
    overflow: "hidden"
  },
  uploadIcon: {
    fontSize: "4em"
  },
  progress: {
    color: "white"
  }
});

const processFileName = file =>
  file.name
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9]+/, " ")
    .split(" ")
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

class DropZoneField extends React.Component {
  state = {
    progress: null,
    disabled: false,
    file: null,
    uploaded: false
  };

  handleDrop(files) {
    if (this.state.disabled) {
      return;
    }

    const pushFile = index => {
      this.setState({ file: files[index], uploading: true });

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.props.onLoaded(files[index], reader.result).then(() => {
          if (files[index + 1]) {
            pushFile(index + 1);
          } else {
            this.setState({ uploaded: true, uploading: false });
            this.props.onComplete();
          }
        });
      });
      reader.readAsDataURL(files[index]);
    };
    pushFile(0);
    this.setState({ disabled: true });
    this.props.onStart();
  }

  render() {
    const { classes, width, dropzoneDisabled } = this.props;

    return (
      <Dropzone
        multiple={true}
        className={classes.root}
        disabled={dropzoneDisabled}
        accept="image/png,image/x-png,image/jpeg"
        style={{
          height: width === "lg" || width === "xl" ? 220 : 130,
          pointerEvents:
            this.state.disabled || dropzoneDisabled ? "none" : "auto",
          cursor:
            this.state.disabled || dropzoneDisabled ? "no-drop" : "pointer"
        }}
        onDrop={files => this.handleDrop(files)}
      >
        {this.state.uploaded && (
          <div>
            <Typography variant="h6" color="inherit" noWrap>
              All pictures were successfuly imported
            </Typography>
          </div>
        )}
        {this.state.uploading && (
          <div>
            <CircularProgress
              className={classes.progress}
              style={{
                marginBottom: width === "lg" || width === "xl" ? 16 : 0
              }}
            />
            <Typography variant="caption" color="inherit" noWrap>
              {this.state.file.name}
            </Typography>
          </div>
        )}
        {dropzoneDisabled && !this.state.uploaded && !this.state.uploading && (
          <div>
            <CloudUploadIcon
              className={classes.uploadIcon}
              style={{
                marginBottom: width === "lg" || width === "xl" ? 16 : 0
              }}
            />
            <Typography variant="h6" color="inherit">
              {width === "lg" || width === "xl"
                ? "Select from the above dropdowns before dragging media into this area or clicking this area"
                : "Click here to upload media after selecting dropdowns"}
            </Typography>
          </div>
        )}
        {!dropzoneDisabled && !this.state.uploaded && !this.state.uploading && (
          <div>
            <CloudUploadIcon
              className={classes.uploadIcon}
              style={{
                marginBottom: width === "lg" || width === "xl" ? 16 : 0
              }}
            />
            <Typography variant="h6" color="inherit" noWrap>
              {width === "lg" || width === "xl"
                ? "Select or drag media files to upload"
                : "Select media files to upload"}
            </Typography>
          </div>
        )}
      </Dropzone>
    );
  }
}

const DropZoneFieldWithStyle = withStyles(dropZoneStyles)(
  withWidth()(DropZoneField)
);

const styles = theme => ({
  moderationExplanation: {
    marginTop: theme.spacing.unit * 2
  },
  bannerMenu: {
    zIndex: 2
  },
  dialogContent: {},
  link: {
    color: theme.palette.secondary.main,
    textDecoration: "none",
    fontWeight: 400
  },
  chipInput: {
    marginBottom: theme.spacing.unit * 2
  },
  selectInput: {
    fontFamily: theme.typography.fontFamily
  },
  blurb: {
    fontWeight: 200
  },
  domain: {
    marginRight: 1,
    paddingBottom: 3,
    fontSize: "1rem",
    color:
      theme.palette.type === "dark"
        ? "rgba(255, 255, 255, 0.5)"
        : "rgba(0, 0, 0, 0.5)"
  },
  listPadding: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit
  }
});

class MultipleMediaDialog extends React.Component {
  state = {
    title: "",
    description: "",
    photographerSlug: "",
    photographerString: "",
    commentsEnabled: true,
    shareOnTwitter: true,
    mediaEvent: {},
    mediaEdition: {},
    mediaCategory: {},
    mediaSubEvent: {},
    uploaded: false,
    complete: false,
    uploading: false,
    isPhotographer: true
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      this.setInitialValues();
    }
  }

  setInitialValues() {
    this.setState({
      uploaded: false,
      complete: false,
      uploading: false,
      photographerSlug: "",
      photographerString: "",
      isPhotographer: true,
      mediaEvent: {},
      mediaEdition: {},
      mediaCategory: {},
      mediaSubEvent: {}
    });
  }

  render() {
    const { classes, uploadEnabled } = this.props;

    return (
      <React.Fragment>
        <ResponsiveDialog
          open={this.props.open}
          onClose={this.props.onClose}
          disableBackdropClick={this.state.uploading}
          disableEscapeKeyDown={this.state.uploading}
        >
          <DialogTitle>Upload Media</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <Typography variant="h6" className={classes.blurb}>
              Event Media? - Select Event, Edition, and Sub Event below
            </Typography>
            <Typography variant="h6" className={classes.blurb}>
              Non-Event Media? - Select only a Category below
            </Typography>
            <div style={{ padding: 5 }} />
            <Typography variant="h6" color="primary">
              Categories
            </Typography>
            <div style={{ padding: 5 }} />
            <Query
              query={LOAD_CATEGORIES}
              variables={{ sort: "latest", offset: 0, limit: 150 }}
            >
              {({ data, loading, error, fetchMore }) => {
                if (loading || error) {
                  return null;
                }
                const categoryList = [{ value: null, label: "Not applicable" }];
                data.categories.map(e =>
                  categoryList.push({ value: e.id, label: e.name })
                );
                return (
                  <Select
                    fullWidth
                    clearable={true}
                    placeholder="Category"
                    isSearchable
                    onChange={mediaCategory => {
                      this.setState({ mediaCategory: mediaCategory });
                    }}
                    options={categoryList}
                    className={classes.selectInput}
                  />
                );
              }}
            </Query>
            <div style={{ padding: 5 }} />
            <hr />
            <div style={{ padding: 5 }} />
            <Query
              query={LOAD_EVENTS}
              variables={{ sort: "latest", offset: 0, limit: 150 }}
            >
              {({ data, loading, error, fetchMore }) => {
                if (loading || error) {
                  return null;
                }

                const eventList = [{ value: null, label: "Not applicable" }];
                data.events.map(e =>
                  eventList.push({ value: e.id, label: e.name })
                );
                return (
                  <Select
                    fullWidth
                    clearable={true}
                    placeholder="Event"
                    isSearchable
                    onChange={mediaEvent => {
                      this.setState({
                        mediaEvent: mediaEvent,
                        mediaEdition: {},
                        mediaSubEvent: {}
                      });
                    }}
                    options={eventList}
                    className={classes.selectInput}
                  />
                );
              }}
            </Query>

            <div style={{ padding: 5 }} />
            {this.state.mediaEvent &&
              Object.keys(this.state.mediaEvent).length != 0 &&
              this.state.mediaEvent.value && (
                <Query
                  query={LOAD_EDITIONS}
                  variables={{
                    sort: "latest",
                    offset: 0,
                    limit: 150,
                    eventId: this.state.mediaEvent.value
                  }}
                >
                  {({ data, loading, error, fetchMore }) => {
                    if (loading || error) {
                      return null;
                    }

                    const editionList = [];
                    data.editions.map(e =>
                      editionList.push({ value: e.id, label: e.name })
                    );
                    console.log("edition: ", this.state.mediaEdition);
                    return (
                      <Select
                        fullWidth
                        clearable={true}
                        placeholder="Edition"
                        isSearchable
                        onChange={mediaEdition => {
                          this.setState({
                            mediaEdition: mediaEdition,
                            mediaSubEvent: {}
                          });
                        }}
                        options={editionList}
                        className={classes.selectInput}
                      />
                    );
                  }}
                </Query>
              )}
            <div style={{ padding: 5 }} />
            {this.state.mediaEdition &&
              Object.keys(this.state.mediaEdition).length != 0 &&
              this.state.mediaEdition.value && (
                <Query
                  query={LOAD_SUB_EVENTS}
                  variables={{
                    offset: 0,
                    limit: 150
                  }}
                >
                  {({ data, loading, error, fetchMore }) => {
                    if (loading || error) {
                      return null;
                    }

                    const subEventList = [];
                    data.subEvents.map(e =>
                      subEventList.push({ value: e.id, label: e.name })
                    );
                    return (
                      <Select
                        fullWidth
                        clearable={true}
                        placeholder="Sub Event"
                        isSearchable
                        onChange={mediaSubEvent => {
                          this.setState({ mediaSubEvent: mediaSubEvent });
                        }}
                        options={subEventList}
                        className={classes.selectInput}
                      />
                    );
                  }}
                </Query>
              )}
            <div style={{ padding: 5 }} />
            <Typography variant="h6" color="primary">
              Ownership
            </Typography>
            <div style={{ paddingLeft: 15 }}>
              <FormControlLabel
                className={classes.listPadding}
                control={
                  <Checkbox
                    checked={this.state.isPhotographer}
                    onChange={e =>
                      this.setState({ isPhotographer: e.target.checked })
                    }
                    value={this.state.isPhotographer}
                    color="primary"
                  />
                }
                label="I captured this media"
              />
            </div>
            {!this.state.isPhotographer && (
              <React.Fragment>
                <Typography
                  variant="body2"
                  style={{ paddingLeft: 15, paddingBottom: 5 }}
                >
                  Provide at least one:
                </Typography>
                <div style={{ padding: 5 }} />
                <TextField
                  className={classes.listPadding}
                  label="Photographer's Scritch URL"
                  name="photographerSlug"
                  variant="outlined"
                  style={{ zIndex: 0 }}
                  value={this.state.photographerSlug}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        className={classes.domain}
                        disableTypography
                      >
                        {"http://scritch.es/"}
                      </InputAdornment>
                    )
                  }}
                  onChange={e => {
                    this.setState({
                      photographerSlug: e.target.value
                    });
                  }}
                  margin="dense"
                  fullWidth
                />
                <TextField
                  className={classes.listPadding}
                  label="Photographer's Name"
                  name="photographerString"
                  variant="outlined"
                  style={{ zIndex: 0 }}
                  value={this.state.photographerString}
                  onChange={e => {
                    this.setState({
                      photographerString: e.target.value
                    });
                  }}
                  margin="dense"
                  fullWidth
                />
                <div style={{ padding: 5 }} />
              </React.Fragment>
            )}
            <Typography variant="h6" color="primary">
              Requirements
            </Typography>
            <div style={{ padding: 5 }} />
            <Typography variant="h6" className={classes.blurb}>
              All media uploaded must abide by the Content Restrictions detailed
              in the{" "}
              <Link target="_blank" to="/user_guide" className={classes.link}>
                Website User Guide
              </Link>
              .
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
                <ListItemText
                  inset
                  primary="You must have captured the media or have permission from the media creator to Upload it to Scritch"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
                <ListItemText
                  inset
                  primary="Try and avoid uploading a lot of media from the same shoot where minimal differences are apparent"
                />
              </ListItem>
            </List>
            <Typography variant="h6" color="primary">
              Upload
            </Typography>
            <div style={{ padding: 5 }} />
            <Mutation mutation={CREATE_MEDIUM}>
              {(createMedium, { called }) => {
                return (
                  <DropZoneFieldWithStyle
                    dropzoneDisabled={
                      (Object.keys(this.state.mediaSubEvent).length == 0 &&
                        Object.keys(this.state.mediaCategory).length == 0) ||
                      (Object.keys(this.state.mediaEvent).length != 0 &&
                        Object.keys(this.state.mediaSubEvent).length == 0) ||
                      (!this.state.isPhotographer &&
                        (this.state.photographerSlug === "" &&
                          this.state.photographerString === ""))
                    }
                    onStart={() => {
                      this.setState({ uploading: true });
                    }}
                    onLoaded={(file, result) =>
                      createMedium({
                        variables: {
                          input: {
                            title: processFileName(file),
                            description: this.state.description,
                            commentsDisabled: false,
                            shareOnTwitter: this.state.shareOnTwitter,
                            isPhotographer: this.state.isPhotographer,
                            photographerSlug: this.state.photographerSlug,
                            photographerString: this.state.photographerString,
                            picture: result,
                            editionId: this.state.mediaEdition.value,
                            categoryId: this.state.mediaCategory.value,
                            subEventId: this.state.mediaSubEvent.value
                          }
                        }
                      })
                    }
                    onComplete={() => {
                      this.setState({ complete: true });
                    }}
                  />
                );
              }}
            </Mutation>
          </DialogContent>
          <DialogActions>
            <Grid container spacing={0} justify="space-between">
              <Grid item />
              <Grid item>
                <Button
                  disabled={this.state.uploading}
                  onClick={() => {
                    this.props.onClose();
                    this.setInitialValues();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!this.state.complete}
                  onClick={() => {
                    this.props.onClose();
                    this.setInitialValues();
                    location.reload();
                  }}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </ResponsiveDialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(MultipleMediaDialog));
