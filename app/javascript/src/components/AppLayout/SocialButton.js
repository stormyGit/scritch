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
    padding: theme.spacing(1)
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

    return (
      <React.Fragment>
        {this.props.width !== "xl" && this.props.width !== "lg" && (
          <IconButton
            aria-owns={open ? "menu-appbar" : undefined}
            aria-haspopup="true"
            title="Social"
            onClick={event => this.handleMenu(event)}
            color="primary"
          >
            <SocialIcon />
          </IconButton>
        )}
        {(this.props.width === "xl" || this.props.width === "lg") && (
          <Button
            onClick={event => this.handleMenu(event)}
            color="primary"
            className={classes.buttonPad}
          >
            Ads & Social
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
          <a
            href={"https://t.me/ScritchNews"}
            target="_blank"
            className={classes.link}
          >
            <MenuItem onClick={() => this.handleClose()}>
              Scritch Telegram Channel
            </MenuItem>
          </a>
          <a
            href={"https://twitter.com/PixelScritch"}
            target="_blank"
            className={classes.link}
          >
            <MenuItem onClick={() => this.handleClose()}>Twitter</MenuItem>
          </a>
          {currentSession && (
            <MenuItem
              onClick={() => {
                this.handleClose();
                this.props.openAdvertise();
              }}
            >
              Advertise with Scritch
            </MenuItem>
          )}
          {currentSession && currentSession.user.hasAdverts && (
            <a
              href={`${process.env.SITE_URL}/adverts`}
              className={classes.link}
            >
              <MenuItem onClick={() => this.handleClose()}>
                Advertiser Dashboard
              </MenuItem>
            </a>
          )}
          <Link to="/ads" className={classes.link}>
            <MenuItem onClick={() => this.handleClose()}>Ads List</MenuItem>
          </Link>
        </Menu>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  withCurrentSession(withRouter(withWidth()(SocialButton)))
);
