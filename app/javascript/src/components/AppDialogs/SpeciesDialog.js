import React from "react";
import {withApollo} from "react-apollo";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {withRouter} from "react-router-dom";

import {withStyles} from "@material-ui/core/styles";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";
import withCurrentSession from "../withCurrentSession";

const styles = theme => ({
  text: {
    fontWeight: 200,
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1)
  },
  paperQuote: {
    padding: theme.spacing(3),
    overflowX: "auto"
  },
  buttonPadder: {
    paddingTop: theme.spacing(2)
  },
  link: {
    textDecoration: "none"
  },
  root: {
    textAlign: "center"
  }
});

const Spacer = <div style={{ padding: 8 }} />;

class SpeciesDialog extends React.Component {
  state = {
    description: ""
  };

  componentDidMount() {
    if (this.props.currentSession) {
      this.setState({ description: "" });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      this.setState({ description: "" });
    }
  }

  render() {
    const { classes, currentSession, user } = this.props;

    if (!currentSession) {
      return null;
    }

    return (
      <ResponsiveDialog
        open={this.props.open}
        onClose={() => {
          this.props.onClose();
          this.setState({ description: "" });
        }}
      >
        <GlobalProgress absolute />

        <DialogTitle>Involvement Species</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">
            As a User Account Involvement score increases, an Involvement
            Species is assigned in Rank up alphabetically through tiers set by
            the following formula:
          </Typography>
          <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
            Involvement Species User Block = Total Number of Users / Total
            Number of Species
          </Typography>
          {Spacer}
          <Paper className={classes.paperQuote}>
            <Typography
              variant="subtitle1"
              style={{ fontStyle: "italic", fontWeight: 800 }}
            >
              Example 1
            </Typography>
            <Typography variant="subtitle1" style={{ fontStyle: "italic" }}>
              Total Number of Users: 750
              <br />
              Total Number of Species: 180
              <br />
              750 / 180 = 4.17 (Rounded Down to 4)
              <br />
              Equates to a User Species Block value of 4. Allowing a top heavy
              top user species by addressing the decimal:
              <br />
              4 x 180 = 720 (Everything Above 720 Top User Block) = 30 Zebras
              <br />
            </Typography>
          </Paper>
          {Spacer}
          <Paper className={classes.paperQuote}>
            <Typography
              variant="subtitle1"
              style={{ fontStyle: "italic", fontWeight: 800 }}
            >
              Example 2
            </Typography>
            <Typography variant="subtitle1" style={{ fontStyle: "italic" }}>
              Total Number of Users: 17560
              <br />
              Total Number of Species: 240
              <br />
              17560 / 240 = 73.17 (Rounded Down to 73)
              <br />
              Equates to a User Species Block value of 73. Allowing a top heavy
              top user species by addressing the decimal:
              <br />
              73 x 239 = 17447 (Everything Above 17447 Top User Block) = 113
              Zebras
              <br />
            </Typography>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.props.onClose();
            }}
          >
            Close
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(
  withApollo(withRouter(withCurrentSession(SpeciesDialog)))
);
