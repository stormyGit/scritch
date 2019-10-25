import React from "react";
import PageTitle from "../Global/PageTitle";
import queryString from "query-string";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import { Query, Mutation } from "react-apollo";
import { FETCH_MODERATORS } from "../../queries/moderationQueries";
import { UPDATE_MODERATOR } from "../../queries/moderationMutations";

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

class ModerationModerators extends React.Component {
  state = {
    filter: ""
  };
  render() {
    const { width, classes } = this.props;

    return (
      <React.Fragment>
        <PageTitle>{`Scritch Moderation - Moderators`}</PageTitle>{" "}
        <Query
          query={FETCH_MODERATORS}
          variables={{
            filter: this.state.filter
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return null; //TODO progress
            if (error) return null; //TODO error
            if (!data || !data.moderators) {
              return (
                <Typography
                  variant="h4"
                  gutterBottom
                  className={classes.centeredText}
                >
                  No Moderators Found
                </Typography>
              );
            }

            return (
              <React.Fragment>
                {data.moderators.map(moderator => (
                  <p key={moderator.id}>{moderator.name}</p>
                ))}
              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withWidth()(ModerationModerators));
