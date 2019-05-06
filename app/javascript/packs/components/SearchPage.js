import React from "react";
import Media from "./Media/Media";
import Fursuits from "./Fursuits/Fursuits";
import Makers from "./Makers/Makers";
import Events from "./Events/Events";
import PageTitle from "./Global/PageTitle";
import queryString from "query-string";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing.unit * 1,
    paddingRight: 0
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  padderTitle: { paddingTop: 8, paddingLeft: 30, paddingRight: 8 },
  pixelImage: {
    width: "128px",
    height: "128px"
  }
});

class SearchPage extends React.Component {
  render() {
    const query = queryString.parse(this.props.location.search);
    const searching = query.q && query.q.length > 0;
    if (!searching) this.props.history.push("/");
    const { width, classes } = this.props;

    return (
      <React.Fragment>
        <PageTitle>{`Searching: ${query.q}`}</PageTitle>
        <div className={classes.padderTitle}>
          <Grid
            container
            spacing={8}
            className={classes.flex}
            justifyContent="space-between"
          >
            <Grid item>
              <Typography variant="h4">Events</Typography>
            </Grid>
            {(width === "lg" || width === "xl") && (
              <Grid item>
                <img
                  src={require("images/pixel/Furcon.png")}
                  className={classes.pixelImage}
                />
              </Grid>
            )}
          </Grid>
        </div>
        <Events searching={true} {...this.props} />
        <div className={classes.padderTitle}>
          <Grid
            container
            spacing={8}
            className={classes.flex}
            justifyContent="space-between"
          >
            <Grid item>
              <Typography variant="h4">Makers</Typography>
            </Grid>
            {(width === "lg" || width === "xl") && (
              <Grid item>
                <img
                  src={require("images/pixel/Header - Search Maker Browse flip.png")}
                  className={classes.pixelImage}
                />
              </Grid>
            )}
          </Grid>
        </div>
        <Makers searching={true} {...this.props} />
        <div className={classes.padderTitle}>
          <Grid
            container
            spacing={8}
            className={classes.flex}
            justifyContent="space-between"
          >
            <Grid item>
              <Typography variant="h4">Fursuits</Typography>
            </Grid>
            {(width === "lg" || width === "xl") && (
              <Grid item>
                <img
                  src={require("images/pixel/Header - Search Fursuit Browse flip.png")}
                  className={classes.pixelImage}
                />
              </Grid>
            )}
          </Grid>
        </div>
        <Fursuits searching={true} {...this.props} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withWidth()(SearchPage));
