import React from "react";
import queryString from "query-string";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import { Link, withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import SocialIcon from "@material-ui/icons/ThumbUpAlt";

const styles = theme => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  link: {
    textDecoration: "none"
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
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

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
            size="large"
            color="primary"
          >
            Social Media & Advertisement
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
        </Menu>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(withWidth()(SocialButton)));
