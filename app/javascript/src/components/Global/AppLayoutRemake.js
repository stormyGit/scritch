import React from "react";
import {withStyles} from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Typography from "@material-ui/core/Typography";

import {Link, withRouter} from "react-router-dom";
import withCurrentSession from "../withCurrentSession";
import GlobalProgress from "../Global/GlobalProgress";
import PermanentDrawer from "../PermanentDrawer";
import TemporaryDrawer from "../TemporaryDrawer";
import AppDialogs from "../AppLayout/AppDialogs";
import CookieConsent from "react-cookie-consent";
import ScritchToolbar from "../ScritchToolbar";

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    minHeight: "calc(100vh - 56px)"
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
  content: {
    flexGrow: 1,
    minWidth: 0, // So the Typography noWrap works
    overflow: "hidden"
  },
  toolbar: {
    ...theme.mixins.toolbar,
    minHeight: "56px !important",
    "@media (min-width:0px) and (orientation: landscape)": {
      minHeight: 56
    }
  },
  toolBarRoot: {
    minHeight: "56px !important"
  },
  rootLink: {
    color: theme.palette.text.primary,
    textDecoration: "none"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: "fixed"
  },
  titleZone: {
    display: "flex",
    alignItems: "center"
  },
  searchBar: {
    flex: 1
  },
  toolBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary
  },
  toolBarDanger: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.danger.main
  },
  rightButton: {
    marginLeft: theme.spacing(2),
    display: "inline-block"
  },
  rightActions: {
    flexShrink: 0
  },
  closeIcon: {},
  searchIcon: {},
  tinyButton: {},
  buttonPad: {
    padding: theme.spacing(1)
  },
  menuLeftPadding: {
    paddingLeft: theme.spacing(1)
  },
  menuRightPadding: {
    paddingRight: theme.spacing(1)
  },
  pointer: {
    cursor: "pointer"
  },
  text: {
    fontWeight: 200,
    textAlign: "center",
    color: "white"
  },
  cookieButton: {
    backgroundColor: theme.palette.secondary.main
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  }
});

class AppLayoutRemake extends React.Component {
  state = {
    nameInput: "",
    anchorEl: null,
    uploadDialog: false,
    signUpDialog: false,
    mainDrawer: true,
    tempDrawer: false,
    searchEnabled: false,
    activitiesDialog: false,
    chatDialog: false,
    speciesDialog: false,
    settingsDialog: false,
    advertiseDialog: false,
    techDialog: false,
    query: {}
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
      document.activeElement.blur();
    }
  }

  handleSearch(val, event) {
    if (this.state.nameInput.length >= 1 && val.length < 1) {
      this.reset = true;
    }

    this.setState({nameInput: val});

    if (this.loadEventTimer) {
      clearTimeout(this.loadEventTimer);
    }

    if (val.length >= 1) {
      this.loadEventTimer = setTimeout(() => {
        this.setState({query: val});
      }, 500);
    } else if (this.reset) {
      clearTimeout(this.loadEventTimer);
      this.setState({query: val});
      this.reset = false;
    }
  }

  render() {
    const {
      classes,
      settingsLayout,
      children,
      currentSession,
      location,
      client,
      width
    } = this.props;
    const {query} = this.state;

    let bigWidth = false;
    let smallWidth = false;
    let appBarPadding;
    if (width === "xs" || width === "sm") {
      smallWidth = true;
    }
    if (width === "xl" || width === "lg") {
      bigWidth = true;
      appBarPadding = 16;
    } else {
      appBarPadding = 8;
    }

    if (currentSession && currentSession.user.suspendedUser) {
      var suspendedUserLimit = new Date(currentSession.user.suspendedUser.limit * 1000);
    }
    return (
      <React.Fragment>
        <GlobalProgress/>
        <div className={classes.root}>
          <CookieConsent
            buttonStyle={{backgroundColor: process.env.SECONDARY_COLOR}}
            style={{textAlign: "center"}}
          >
            <Typography
              variant="h5"
              component="h3"
              className={classes.text}
              style={{
                paddingLeft: bigWidth ? 200 : 0
              }}
            >
              We use cookies to improve your experience on Scritch and to keep you logged in. By
              using this Website, you consent to the storing on your device of all the technologies
              described in our{" "}
              <Link to="/privacy_policy" className={classes.link}>
                Privacy Policy
              </Link>{" "}
              and also agree to our{" "}
              <Link to="/terms_of_use" className={classes.link}>
                Terms of Use
              </Link>
              .
            </Typography>
          </CookieConsent>
          {smallWidth && (
            <React.Fragment>
              <TemporaryDrawer
                open={this.state.tempDrawer}
                onOpen={() => {
                  this.setState({tempDrawer: true});
                }}
                onClose={() => this.setState({tempDrawer: false})}
              />
            </React.Fragment>
          )}
          {!smallWidth && (
            <React.Fragment>
              <PermanentDrawer open={true}/>
            </React.Fragment>
          )}
          <main className={classes.content}>
            <ScritchToolbar/>
            <div
              style={{
                overflowX: "hidden",
                overflowY: "scroll",
                height: "calc(100vh - 56px)",
                paddingLeft:
                  bigWidth
                    ? "calc(5vw + 60px)"
                    : width === "md"
                    ? "60px"
                    : 4,
                paddingRight: bigWidth ? "5%" : width === "md" ? "60px" : 4,
                position: "relative"
              }}
            >
              {this.props.children}
            </div>
            <AppDialogs
              searchDialog={this.state.searchDialog}
              closeSearchDialog={() => this.setState({searchDialog: false})}
              chatDialog={this.state.chatDialog}
              closeChatDialog={() => this.setState({chatDialog: false})}
              signUpDialog={this.state.signUpDialog}
              closeSignUpDialog={() => this.setState({signUpDialog: false})}
              uploadDialog={this.state.uploadDialog}
              closeUploadDialog={() => this.setState({uploadDialog: false})}
              activitiesDialog={this.state.activitiesDialog}
              closeActivitiesDialog={() => this.setState({activitiesDialog: false})}
              advertiseDialog={this.state.advertiseDialog}
              closeAdvertiseDialog={() => this.setState({advertiseDialog: false})}
              settingsDialog={this.state.settingsDialog}
              closeSettingsDialog={() => this.setState({settingsDialog: false})}
              techDialog={this.state.techDialog}
              closeTechDialog={() => this.setState({techDialog: false})}
              speciesDialog={this.state.speciesDialog}
              closeSpeciesDialog={() => this.setState({speciesDialog: false})}
            />
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(withCurrentSession(withWidth()(AppLayoutRemake))));
