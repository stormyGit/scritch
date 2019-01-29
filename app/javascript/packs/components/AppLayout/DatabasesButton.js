import React from "react";
import queryString from "query-string";
import { withStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

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
        <IconButton
          aria-owns={open ? "menu-appbar" : undefined}
          aria-haspopup="true"
          title="Databases"
          onClick={event => this.handleMenu(event)}
          color="inherit"
        >
          <DatabaseIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          onClose={() => this.handleClose()}
        >
          <Link to={"/databases"} className={classes.link}>
            <MenuItem onClick={() => this.handleClose()}>Fursuits</MenuItem>
          </Link>
          <Link to={"/databases"} className={classes.link}>
            <MenuItem onClick={() => this.handleClose()}>Makers</MenuItem>
          </Link>
          <Link to={"/databases"} className={classes.link}>
            <MenuItem onClick={() => this.handleClose()}>Events</MenuItem>
          </Link>
        </Menu>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(DatabasesButton));
