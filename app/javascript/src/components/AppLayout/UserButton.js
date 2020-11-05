import React, {useContext, useState} from "react";
import {withStyles} from "@material-ui/core/styles";
import {Link, withRouter} from "react-router-dom";
import withCurrentSession from "../withCurrentSession";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {DELETE_SESSION} from "../../queries/globalQueries";
import {Mutation} from "react-apollo";

import UserAvatar from "../Users/UserAvatar";
import {IconButton} from "@material-ui/core";
import {DialogContext} from "../../context/DialogContext";
import {setSettingsDialogState, setSignupDialogState} from "../../reducers/Action";

const styles = theme => ({
  dataSpacer: {
    marginRight: theme.spacing(1)
  }
});

function UserButton({classes, currentSession, width}) {
  const dialogContext = useContext(DialogContext);
  const [userMenuAnchor, setUserMenuAnchor] = useState(false);

  return (
    <React.Fragment>
      {currentSession ? (
        <React.Fragment>
          <ButtonBase
            focusRipple
            className={classes.rightButton}
            onClick={event => setUserMenuAnchor(event.currentTarget)}
          >
            <UserAvatar user={currentSession.user}/>
          </ButtonBase>
          <Menu
            id={`user-menu`}
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={() => setUserMenuAnchor(false)}
            transformOrigin={{vertical: "top", horizontal: "center"}}
          >
            <MenuItem
              component={props => <Link to={`/${currentSession.user.slug}`} {...props} />}
              onClick={() => {
                setUserMenuAnchor(false)
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                setUserMenuAnchor(false);
                dialogContext.dispatchDialogChange(setSettingsDialogState(true));
              }}
            >
              Settings and Security
            </MenuItem>

            <Mutation mutation={DELETE_SESSION}>
              {(deleteSession, {data}) => (
                <MenuItem
                  onClick={() => {
                    deleteSession({
                      variables: {input: {id: currentSession.id}}
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
      ) : (
        <Button
          color="inherit"
          onClick={() => {dialogContext.dispatchDialogChange(setSignupDialogState(true));}}
          variant="outlined"
          // size={width === "xl" || width === "lg" ? "large" : "small"}
        >
          Sign Up/In
        </Button>
      )}
    </React.Fragment>
  );
}

export default withStyles(styles)(withRouter(withCurrentSession(withWidth()(UserButton))));
