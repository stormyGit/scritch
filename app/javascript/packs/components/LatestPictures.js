import React from "react";
import Media from "./Media/Media";
import PageTitle from "./Global/PageTitle";
import queryString from "query-string";
import Typography from "@material-ui/core/Typography";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  padder: {
    paddingTop: 5,
    paddingLeft: 30
  },
  font: {
    fontWeight: 200
  }
});

class LatestPictures extends React.Component {
  render() {
    const query = queryString.parse(this.props.location.search);
    const { width, classes } = this.props;

    let typoSize = width === "xs" || width === "sm" ? "h5" : "h4";

    return (
      <React.Fragment>
        <PageTitle>Home</PageTitle>
        <div className={classes.padder}>
          <Typography variant={typoSize} className={classes.font}>
            Latest Pictures
          </Typography>
        </div>
        <Media home={true} sort="latest" limit={12} {...this.props} />
        <div className={classes.padder}>
          <Typography variant={typoSize} className={classes.font}>
            Most Scritched (Last 30 Days)
          </Typography>
        </div>
        <Media home={true} sort="scritches_month" limit={12} {...this.props} />
        <div className={classes.padder}>
          <Typography variant={typoSize} className={classes.font}>
            Random Pictures
          </Typography>
        </div>
        <Media home={true} sort="random" limit={12} {...this.props} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withWidth()(LatestPictures));
