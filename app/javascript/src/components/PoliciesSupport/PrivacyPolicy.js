import React from "react";
import {withStyles} from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import PageTitle from "../Global/PageTitle";

import Privacy from "../../PrivacyPolicy";

const styles = theme => ({
  card: {
    width: "100%",
    borderRadius: 0,
    paddingBottom: theme.spacing(8)
  },
  content: {
    padding: theme.spacing(4)
  },
  text: {
    fontWeight: 200,
    color: theme.palette.text.primary,
    fontFamily: "Roboto"
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
  root: {
    width: "100%",
    padding: theme.spacing(1),
    paddingRight: 0,
    paddingBottom: theme.spacing(8)
  },
  gridPadder: {
    width: "100%",
    paddingLeft: theme.spacing(16),
    paddingRight: theme.spacing(16)
  }
});

function PrivacyPolicy(props) {
  const {classes, announcement, width} = props;

  return (
    <React.Fragment>
      <PageTitle>Privacy Policy</PageTitle>
      <Grid
        container
        className={
          width !== "lg" && width !== "xl" ? classes.root : classes.gridPadder
        }
        spacing={1}
        style={{marginTop: width === "lg" || width === "xl" ? 4 : -4}}
      >
        <Grid item xs={12}>
          <Card className={classes.card} elevation={0}>
            <CardContent className={classes.content} className={classes.text}>
              <Privacy/>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default withStyles(styles)(withWidth()(PrivacyPolicy));
