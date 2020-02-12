import React from "react";
import PageTitle from "../Global/PageTitle";
import queryString from "query-string";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Query } from "react-apollo";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import { FETCH_ANALYTICS } from "../../queries/moderationQueries";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing(1),
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

class ModerationAnalytics extends React.Component {
  render() {
    const { width, classes } = this.props;

    return (
      <React.Fragment>
        <PageTitle>{`Scritch Moderation - Analytics`}</PageTitle>
        <Query query={FETCH_ANALYTICS}>
          {({ loading, error, data }) => {
            if (loading) return null; //TODO progress
            if (error) return null; //TODO error
            if (!data || !data.moderationAnalytics) {
              return (
                <Typography
                  variant="h4"
                  gutterBottom
                  className={classes.centeredText}
                >
                  Something went wrong
                </Typography>
              );
            }

            console.log(data);
            return (
              <React.Fragment>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography
                      variant="h4"
                      gutterBottom
                      className={classes.centeredText}
                    >
                      {}
                    </Typography>
                  </Grid>
                </Grid>
              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withWidth()(ModerationAnalytics));
