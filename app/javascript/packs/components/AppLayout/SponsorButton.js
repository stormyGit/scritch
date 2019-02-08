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

class SponsorButton extends React.Component {
  state = {
    uploadDialog: true
  };

  render() {
    const { classes, currentSession } = this.props;

    if (currentSession.user.sponsor) {
      console.log(currentSession.user.sponsor);
      var sponsorLimit = new Date(currentSession.user.sponsor.limit * 1000);
    }

    return (
      <React.Fragment>
        {currentSession.user.sponsor &&
          currentSession.user.sponsor.status == "live" && (
            <Link to="/sponsors/cancel">
              <Typography variant="subtitle1" className={classes.dataSpacer}>
                Sponsor!
              </Typography>
            </Link>
          )}
        {currentSession.user.sponsor &&
          currentSession.user.sponsor.status != "live" && (
            <Typography variant="subtitle1" className={classes.dataSpacer}>
              Sponsor!
            </Typography>
          )}
        {!currentSession.user.sponsor && (
          <Link to="/sponsors/new">
            <Typography variant="subtitle1" className={classes.dataSpacer}>
              Become a Sponsor!
            </Typography>
          </Link>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  withRouter(withCurrentSession(SponsorButton))
);
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
