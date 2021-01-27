import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router-dom";
import withCurrentSession from "../withCurrentSession";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  dataSpacer: {
    marginRight: theme.spacing(1)
  },
  link: {
    textDecoration: "none"
  }
});

class SponsorButton extends React.Component {
  state = {
    uploadDialog: true
  };

  render() {
    const { classes, currentSession } = this.props;
    if (!currentSession) return <React.Fragment />;

    if (currentSession.user.sponsor) {
      const sponsorLimit = new Date(currentSession.user.sponsor.limit * 1000);
    }

    return (
      <React.Fragment>
        {currentSession.user.sponsor &&
          currentSession.user.sponsor.status === "live" && (
            <a
              href={`${process.env.SITE_URL}/sponsors/cancel`}
              className={classes.link}
            >
              <Typography variant="subtitle1" className={classes.dataSpacer}>
                Sponsor!
              </Typography>
            </a>
          )}
        {currentSession.user.sponsor &&
          currentSession.user.sponsor.status === "canceled" && (
            <Typography variant="subtitle1" className={classes.dataSpacer}>
              Sponsor until {sponsorLimit.toLocaleDateString()}
            </Typography>
          )}
        {!currentSession.user.sponsor && (
          <a
            href={`${process.env.SITE_URL}/sponsors/new`}
            className={classes.link}
          >
            <Typography variant="subtitle1" className={classes.dataSpacer}>
              Become a Sponsor!
            </Typography>
          </a>
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
