import React from "react";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import { Link, withRouter } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import SupportIcon from "@material-ui/icons/ContactSupport";

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
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <React.Fragment>
        {this.props.width !== "xl" && (
          <IconButton
            aria-owns={open ? "menu-appbar" : undefined}
            aria-haspopup="true"
            title="Databases"
            onClick={event => this.handleMenu(event)}
            color="inherit"
          >
            <SupportIcon />
          </IconButton>
        )}
        {this.props.width === "xl" && (
          <Button
            onClick={event => this.handleMenu(event)}
            color="primary"
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
          <Link to={"/"} className={classes.link}>
            <MenuItem onClick={() => this.handleClose()}>User Guides</MenuItem>
          </Link>
          <Link to={"/"} className={classes.link}>
            <MenuItem onClick={() => this.handleClose()}>FAQ</MenuItem>
          </Link>
          <Link to={"/terms_and_conditions"} className={classes.link}>
            <MenuItem onClick={() => this.handleClose()}>
              Terms & Conditions
            </MenuItem>
          </Link>
          <Link to={"/privacy_policy"} className={classes.link}>
            <MenuItem onClick={() => this.handleClose()}>
              Privacy Policy
            </MenuItem>
          </Link>
          <Link to={"/code_of_conduct"} className={classes.link}>
            <MenuItem onClick={() => this.handleClose()}>
              Code Of Conduct
            </MenuItem>
          </Link>
          <Link to={"/"} className={classes.link}>
            <MenuItem
              onClick={() => {
                this.handleClose();
                this.props.openTech();
              }}
            >
              Report an Issue
            </MenuItem>
          </Link>
        </Menu>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  withRouter(withWidth()(PoliciesSupportButton))
);
