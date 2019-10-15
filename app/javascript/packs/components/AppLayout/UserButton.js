import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import withCurrentSession from "../withCurrentSession";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { DELETE_SESSION } from "../../queries/globalQueries";
import { Mutation } from "react-apollo";

import UserAvatar from "../Users/UserAvatar";

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
    const { classes, currentSession, width } = this.props;

    return (
      <React.Fragment>
        {!currentSession && (
          <Button
            onClick={this.props.openSignUp}
            variant="outlined"
            size={width === "xl" || width === "lg" ? "large" : "small"}
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
                Settings and Security
              </MenuItem>

              <Mutation mutation={DELETE_SESSION}>
                {(deleteSession, { data }) => (
                  <MenuItem
                    onClick={() => {
                      deleteSession({
                        variables: { input: { id: currentSession.id } }
                      }).then(() => {
                        localStorage.setItem("token", null);
                        location.reload();
                      });
                    }}
                  >
                    Logout
                  </MenuItem>
                )}
              </Mutation>
            </Menu>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  withRouter(withCurrentSession(withWidth()(UserButton)))
);
