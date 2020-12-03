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
import {IconButton, useMediaQuery} from "@material-ui/core";
import {DialogContext} from "../../context/DialogContext";
import {setSettingsDialogState, setSignupDialogState} from "../../reducers/Action";
import {faArrowUp, faDove, faPaw, faStar, faTags, faUsers} from "@fortawesome/free-solid-svg-icons";
import Badge from "@material-ui/core/Badge";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import useTheme from "@material-ui/core/styles/useTheme";

const styles = theme => ({
  dataSpacer: {
    marginRight: theme.spacing(1)
  }
});

function UserButton(props) {
  const theme = useTheme();
  const dialogContext = useContext(DialogContext);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const tinyWidth = useMediaQuery(theme.breakpoints.down("xs"));
  const {classes, currentSession, width} = props;


  function BadgeFor(content, icon, name, onClick) {
    return <MenuItem
      onClick={onClick}
    >
      <ListItemIcon>
        <Badge
          badgeContent={content}
          color="white"
          showZero
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <FontAwesomeIcon
            icon={icon}
            className={classes.dataSpacer}
          />
        </Badge>
      </ListItemIcon>
      <Typography variant="inherit">{name}</Typography>
    </MenuItem>;
  }

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
            onClose={(e) => setUserMenuAnchor(null)}
            transformOrigin={{vertical: "top", horizontal: "center"}}
          >
            <MenuItem
              component={props => <Link to={`/${currentSession.user.slug}`} {...props} />}
              onClick={() => setUserMenuAnchor(null)}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                setUserMenuAnchor(null);
                dialogContext.dispatchDialogChange(setSettingsDialogState(true));
              }}
            >
              Settings and Security
            </MenuItem>
            {tinyWidth && BadgeFor(currentSession.user.score + currentSession.user.globalScore, faArrowUp, currentSession.user.metricSpecies || "Species: none")}
            {tinyWidth && BadgeFor(currentSession.user.likedCount, faPaw, "Scritches")}
            {tinyWidth && BadgeFor(currentSession.user.favedCount, faStar, "Favorites")}
            {tinyWidth && BadgeFor(currentSession.user.followersCount, faUsers, "Followers")}
            {tinyWidth && BadgeFor(currentSession.user.taggedCount, faTags, "Tagged in")}
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
          onClick={() => {
            dialogContext.dispatchDialogChange(setSignupDialogState(true));
          }}
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
