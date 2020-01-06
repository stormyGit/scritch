import React from "react";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import { Link, withRouter } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import withCurrentSession from "../withCurrentSession";

import SupportIcon from "@material-ui/icons/ContactSupport";
import { Typography } from "@material-ui/core";

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

class PoliciesSupportButton extends React.Component {
  state = {
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
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <React.Fragment>
        {this.props.width !== "xl" && this.props.width !== "lg" && (
          <IconButton
            aria-owns={open ? "menu-appbar" : undefined}
            aria-haspopup="true"
            title="Support"
            onClick={event => this.handleMenu(event)}
            color={this.props.suspended ? "white" : "primary"}
          >
            <SupportIcon />
          </IconButton>
        )}
        {(this.props.width === "xl" || this.props.width === "lg") && (
          <Button
            onClick={event => this.handleMenu(event)}
            color={!this.props.suspended && "primary"}
            className={classes.buttonPad}
          >
            Support
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
          <Link to={"/announcements"} className={classes.link}>
            <MenuItem onClick={() => this.handleClose()}>
              Announcements
            </MenuItem>
          </Link>
          <Link to={"/user_guide"} className={classes.link}>
            <MenuItem onClick={() => this.handleClose()}>
              Website User Guide
            </MenuItem>
          </Link>
          <Link to={"/faq"} className={classes.link}>
            <MenuItem onClick={() => this.handleClose()}>FAQ</MenuItem>
          </Link>
          <Link to={"/terms_of_use"} className={classes.link}>
            <MenuItem onClick={() => this.handleClose()}>Terms of Use</MenuItem>
          </Link>
          <Link to={"/privacy_policy"} className={classes.link}>
            <MenuItem onClick={() => this.handleClose()}>
              Privacy Policy
            </MenuItem>
          </Link>
          {currentSession && (
            <MenuItem
              onClick={() => {
                this.handleClose();
                this.props.openTech();
              }}
            >
              Contact Support
            </MenuItem>
          )}
          <MenuItem disabled>&copy; Scritch 2020 - v1.0.12</MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  withRouter(withWidth()(withCurrentSession(PoliciesSupportButton)))
);
