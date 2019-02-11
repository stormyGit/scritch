import React from "react";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import { Link, withRouter } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import withCurrentSession from "../withCurrentSession";

import SocialIcon from "@material-ui/icons/ThumbUpAlt";

const styles = theme => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  link: {
    textDecoration: "none"
  },
  buttonPad: {
    padding: theme.spacing.unit
  }
});

class SocialButton extends React.Component {
  state = {
    auth: true,
    anchorEl: null
  };

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { classes, currentSession } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    console.log(currentSession.user);
    return (
      <React.Fragment>
        {this.props.width !== "xl" && (
          <IconButton
            aria-owns={open ? "menu-appbar" : undefined}
            aria-haspopup="true"
            title="Social"
            onClick={event => this.handleMenu(event)}
            color="inherit"
          >
            <SocialIcon />
          </IconButton>
        )}
        {this.props.width === "xl" && (
          <Button
            onClick={event => this.handleMenu(event)}
            color="primary"
            className={classes.buttonPad}
          >
            Social & Ads
          </Button>
        )}
        <Menu
          id="menu-appbar"
          disableAutoFocusItem
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          onClose={() => this.handleClose()}
        >
          <a href={"https://twitter.com"} className={classes.link}>
            <MenuItem onClick={() => this.handleClose()}>Twitter</MenuItem>
          </a>
          <a href={"https://facebook.com"} className={classes.link}>
            <MenuItem onClick={() => this.handleClose()}>Facebook</MenuItem>
          </a>
          <MenuItem
            onClick={() => {
              this.handleClose();
              this.props.openAdvertise();
            }}
          >
            Advertise with Scritch
          </MenuItem>
          {currentSession.user.hasAdverts && (
            <a
              href={`${process.env.SITE_URL}/adverts`}
              className={classes.link}
            >
              <MenuItem onClick={() => this.handleClose()}>
                Advertiser Dashboard
              </MenuItem>
            </a>
          )}
        </Menu>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  withCurrentSession(withRouter(withWidth()(SocialButton)))
);
