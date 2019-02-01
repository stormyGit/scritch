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

import DatabaseIcon from "@material-ui/icons/LibraryBooks";

const styles = theme => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  link: {
    textDecoration: "none"
  }
});

class DatabasesButton extends React.Component {
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
            <DatabaseIcon />
          </IconButton>
        )}
        {this.props.width === "xl" && (
          <Button
            onClick={event => this.handleMenu(event)}
            size="large"
            color="primary"
          >
            Databases
          </Button>
        )}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          disableAutoFocusItem
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          onClose={() => this.handleClose()}
        >
          <Link to={"/fursuits"} className={classes.link}>
            <MenuItem onClick={() => this.handleClose()}>Fursuits</MenuItem>
          </Link>
          <Link to={"/makers"} className={classes.link}>
            <MenuItem onClick={() => this.handleClose()}>Makers</MenuItem>
          </Link>
          <Link to={"/events"} className={classes.link}>
            <MenuItem onClick={() => this.handleClose()}>Events</MenuItem>
          </Link>
        </Menu>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(withWidth()(DatabasesButton)));
