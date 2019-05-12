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
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import uuidv4 from "uuid/v4";

import withWidth from "@material-ui/core/withWidth";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CircularProgress from "@material-ui/core/CircularProgress";

import { withRouter, Link } from "react-router-dom";
import Dropzone from "react-dropzone";

import { withStyles } from "@material-ui/core/styles";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";

import { CREATE_ADVERT } from "../../queries/advertMutations";

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
  },
  blurb: {
    fontWeight: 200
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none"
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
        accept="image/png,image/x-png,image/jpeg,image/gif"
        disabled={this.props.dropzoneDisabled}
        style={{
          height: width === "lg" || width === "xl" ? 220 : 130,
          pointerEvents: this.state.disabled ? "none" : "auto",
          cursor: this.state.disabled ? "not-allowed" : "pointer"
        }}
        onDrop={files => this.handleDrop(files)}
      >
        {this.state.uploaded && (width === "lg" || width === "xl") && (
          <div>
            <Typography variant="h6" color="inherit" noWrap>
              Great!
            </Typography>
            <Typography variant="h6" color="inherit">
              Following approval you can manage this advert from your Advertiser
              Dashboard in the Ads & Social tab!
            </Typography>
          </div>
        )}
        {this.state.uploaded && (width !== "lg" && width !== "xl") && (
          <div>
            <Typography variant="h6" color="inherit">
              Great! Following approval can manage this advert from your
              Advertiser Dashboard!
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
              {this.state.file && this.state.file.name}
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
    color: theme.palette.primary.main,
    textDecoration: "none"
  },
  chipInput: {
    marginBottom: theme.spacing.unit * 2
  },
  selectInput: {
    fontFamily: theme.typography.fontFamily
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
  blurb: {
    fontWeight: 200
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
    const { classes, uploadEnabled, width } = this.props;

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
            <Grid container spacing={8}>
              <Grid item xs={12} lg={9} xl={9}>
                <Typography variant="h6" className={classes.blurb}>
                  All media uploaded must abide by the Content Restrictions
                  detailed in the{" "}
                  <Link
                    target="_blank"
                    to="/user_guide"
                    className={classes.link}
                  >
                    Website User Guide
                  </Link>
                  .
                </Typography>
                <div style={{ padding: 10 }} />
                <Typography variant="h6" className={classes.blurb}>
                  Have an advert that relates to a product or service in the
                  fandom? Upload it here and then select an impressions bundle
                  you have complete control over!
                </Typography>
              </Grid>
              {(width === "xl" || width === "lg") && (
                <Grid item lg={3}>
                  <img
                    style={{ width: "100%" }}
                    src={require("images/pixel/Header - Advertise With Us Pop-up.png")}
                  />
                </Grid>
              )}
            </Grid>

            <div style={{ padding: 10 }} />
            <Typography variant="h6" className={classes.blurb}>
              Scritch supports 4 randomised advertisement slots on every page of
              the website (2 at the top and 2 at the bottom). Already have a
              300x90 advertisement from a previous campaign? You're good to go!
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
                <ListItemText
                  inset
                  primary="300x90 image ratio (can be bigger or smaller as long as it is the same pixel ratio)"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
                <ListItemText inset primary="Maximum file size of 10MB" />
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
              value={this.state.url}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    className={classes.domain}
                    disableTypography
                  >
                    {"http://"}
                  </InputAdornment>
                )
              }}
              onChange={e => {
                this.setState({
                  url: e.target.value,
                  dropzoneDisabled: e.target.value.length > 0 ? false : true
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
                {this.state.complete && (
                  <a
                    href="http://127.0.0.1:3001/adverts"
                    className={classes.link}
                  >
                    <Button color="secondary">Advertiser Dashboard</Button>
                  </a>
                )}
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

export default withStyles(styles)(withRouter(withWidth()(AdvertiseDialog)));
