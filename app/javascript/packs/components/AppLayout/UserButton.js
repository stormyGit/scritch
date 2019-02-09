import React from "react";
import queryString from "query-string";
import { withStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import withCurrentSession from "../withCurrentSession";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import UserAvatar from "../UserAvatar";

import UploadIcon from "@material-ui/icons/CloudUpload";

const styles = theme => ({
  dataSpacer: {
    marginRight: theme.spacing.unit * 1
  }
});

class UserButton extends React.Component {
  state = {
    uploadDialog: true
  };

  render() {
    const { classes, currentSession } = this.props;

    return (
      <React.Fragment>
        {!currentSession && (
          <Button
            onClick={this.props.openSignUp}
            variant="outlined"
            size="large"
          >
            Login with Telegram
          </Button>
        )}
        {currentSession && (
          <React.Fragment>
            <ButtonBase
              focusRipple
              className={classes.rightButton}
              onClick={event =>
                this.setState({
                  userMenuAnchor: event.currentTarget
                })
              }
            >
              <UserAvatar user={currentSession.user} />
            </ButtonBase>
            <Menu
              id={`user-menu`}
              anchorEl={this.state.userMenuAnchor}
              open={Boolean(this.state.userMenuAnchor)}
              onClose={() => this.setState({ userMenuAnchor: null })}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <MenuItem
                component={props => (
                  <Link to={`/${currentSession.user.slug}`} {...props} />
                )}
                onClick={() => {
                  this.setState({ userMenuAnchor: null });
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  this.setState({
                    userMenuAnchor: null
                  });
                  this.props.openSettings();
                }}
              >
                Settings and security
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(withCurrentSession(UserButton)));
// ship renews on: {sponsorLimit.toLocaleDateString()}
// <React.Fragment>
//   {currentSession && (
//     <Button
//       onClick={() => this.setState({ uploadDialog: true })}
//       variant="contained"
//       size="large"
//       color="primary"
//     >
//       Upload
//     </Button>
//   )}
// </React.Fragment>
