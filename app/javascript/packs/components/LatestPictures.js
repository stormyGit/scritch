import React from "react";
import FrontMedia from "./Media/FrontMedia";
import PageTitle from "./Global/PageTitle";
import queryString from "query-string";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const styles = theme => ({
  font: {
    fontWeight: 200
  },
  link: {
    textDecoration: "none"
  },
  linkTypo: {
    fontWeight: 200,
    color: theme.palette.primary.main
  },
  centeredTitle: {
    textAlign: "center"
  },
  root: {
    padding: theme.spacing.unit * 3,
    display: "flex",
    alignItems: "center"
  }
});

const Padder = () => <div style={{ padding: 16 }} />;

class LatestPictures extends React.Component {
  render() {
    const { width, classes } = this.props;
    let typoSize = width === "xs" || width === "sm" ? "h5" : "h4";

    return (
      <React.Fragment>
        <PageTitle>Home</PageTitle>
        <div className={classes.root}>
          <Grid container spacing={40} className={classes.centeredTitle}>
            <Grid item xs={12} lg={6}>
              <Typography variant={typoSize} className={classes.font}>
                Latest
              </Typography>
              <Padder />
              <FrontMedia filter="latest" />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography variant={typoSize} className={classes.font}>
                Most Scritched (Last 30 Days)
              </Typography>
              <Padder />
              <FrontMedia filter="scritched" />
            </Grid>
            <Grid item xs={12} lg={12}>
              <Link to="/pictures" className={classes.link}>
                <Typography variant={typoSize} className={classes.linkTypo}>
                  Browse more Media...
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withWidth()(LatestPictures));
