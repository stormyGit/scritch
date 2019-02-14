import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import uuidv4 from "uuid/v4";

import withWidth from "@material-ui/core/withWidth";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CircularProgress from "@material-ui/core/CircularProgress";

import { withRouter } from "react-router-dom";
import Dropzone from "react-dropzone";

import { withStyles } from "@material-ui/core/styles";
import ResponsiveDialog from "./ResponsiveDialog";
import GlobalProgress from "./GlobalProgress";

import { CREATE_ADVERT } from "../queries";

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
    const { classes, width } = this.props;

    return (
      <Dropzone
        multiple={false}
        className={classes.root}
        accept="image/png,image/x-png,image/jpeg"
        disabled={this.props.dropzoneDisabled}
        style={{
          height: width === "lg" || width === "xl" ? 220 : 130,
          pointerEvents: this.state.disabled ? "none" : "auto",
          cursor: this.state.disabled ? "not-allowed" : "pointer"
        }}
        onDrop={files => this.handleDrop(files)}
      >
        {this.state.uploaded && (
          <div>
            <Typography variant="h6" color="inherit" noWrap>
              File succesfully uploaded!
            </Typography>
            <Typography variant="h6" color="inherit" noWrap>
              It will soon be reviewed.
            </Typography>
            <Typography variant="h6" color="inherit">
              You can now access your advertiser dashboard from the Social & Ads
              tab!
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
        {this.props.dropzoneDisabled && (
          <div>
            <Typography variant="h6" color="inherit">
              Provide the target URL first
            </Typography>
          </div>
        )}
        {!this.state.uploaded &&
          !this.state.uploading &&
          !this.props.dropzoneDisabled && (
            <div>
              <CloudUploadIcon
                className={classes.uploadIcon}
                style={{
                  marginBottom: width === "lg" || width === "xl" ? 16 : 0
                }}
              />
              <Typography variant="h6" color="inherit" noWrap>
                {width === "lg" || width === "xl"
                  ? "Select or drag your ad file here to upload"
                  : "Select your ad file to upload"}
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
    color: theme.palette.text.primary
  },
  chipInput: {
    marginBottom: theme.spacing.unit * 2
  },
  selectInput: {
    fontFamily: theme.typography.fontFamily
  }
});

class AdvertiseDialog extends React.Component {
  state = {
    title: "",
    description: "",
    url: "",
    dropzoneDisabled: true,
    uploaded: false,
    complete: false,
    uploading: false
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
      uploading: false
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
          <GlobalProgress absolute />

          <DialogTitle>Advertise with Scritch!</DialogTitle>
          <DialogContent>
            <Typography
              gutterBottom
              variant="h6"
              component="h4"
              className={classes.content}
            >
              You want a bunch of furries to see what you have to offer? Put up
              an ad on Scritch!
              <br />
              <br />
              We offer 4 advertisement slots, visible on every page. 2 at the
              top, 2 at the bottom.
              <br />
              <br />
              Following are the requirements for the ad file. If you have a
              300x90 ad on FA going on, you should already be set to go without
              changing the file!
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
                <ListItemText
                  inset
                  primary="300x90 image ratio (smaller may not look smooth, bigger is fine up to 900x270)"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
                <ListItemText
                  inset
                  primary="Image type should be JPEG, PNG, or GIF"
                />
              </ListItem>
            </List>

            <TextField
              label="Target URL"
              name="url"
              variant="outlined"
              style={{ zIndex: 0 }}
              value={`http://${this.state.url}`}
              onChange={e => {
                this.setState({
                  url: e.target.value.substring(7),
                  dropzoneDisabled: e.target.value.length > 7 ? false : true
                });
              }}
              margin="dense"
              fullWidth
            />
            {
              <Mutation mutation={CREATE_ADVERT}>
                {(createAdvert, { called }) => {
                  return (
                    <DropZoneFieldWithStyle
                      dropzoneDisabled={this.state.dropzoneDisabled}
                      onStart={() => {
                        this.setState({ uploading: true });
                      }}
                      onLoaded={(file, result) =>
                        createAdvert({
                          variables: {
                            input: {
                              file: result,
                              url: `http://${this.state.url}`
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
            }
          </DialogContent>
          <DialogActions>
            <Grid container spacing={0} justify="space-between">
              <Grid item />
              <Grid item>
                <Button
                  disabled={this.state.uploading}
                  onClick={() => {
                    this.props.onClose();
                    this.setState({ url: "" });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!this.state.complete}
                  onClick={() => {
                    this.props.onClose();
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

export default withStyles(styles)(withRouter(AdvertiseDialog));
