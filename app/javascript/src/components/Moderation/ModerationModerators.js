import React, { useState, memo } from "react";
import PageTitle from "../Global/PageTitle";
import queryString from "query-string";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CustomProgress from "../Global/CustomProgress";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import { Query, Mutation } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_MODERATORS } from "../../queries/moderationQueries";
import { UPDATE_MODERATOR, DELETE_MODERATOR } from "../../queries/moderationMutations";
import {
  Card,
  CardHeader,
  CardContent,
  FormControlLabel,
  Checkbox,
  Button
} from "@material-ui/core";

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
  },
  dangerButton: {
    color: theme.palette.danger.main
  }
});

const allCaps = [
  "adverts",
  "analytics",
  "announcements",
  "assets",
  "delete_and_edit",
  "events",
  "extra_analytics",
  "fursuit_claims",
  "maker_claims",
  "moderators",
  "reports",
  "sponsors",
  "suspended_users",
  "tickets",
  "tech",
  "tooltips",
  "claims"
];

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

const Capabilities = React.memo(
  ({ capabilities, setCapabilities, classes }) => {
    const forceUpdate = useForceUpdate();
    return (
      <Grid container spacing={8}>
        {allCaps.map(cap => (
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={capabilities.includes(cap)}
                  value={capabilities.includes(cap)}
                  onChange={() => {
                    if (capabilities.includes(cap)) {
                      var array = [];
                      capabilities.map(c => {
                        if (c != cap) {
                          array.push(c);
                        }
                      });
                    } else {
                      var array = capabilities;
                      array.push(cap);
                    }
                    setCapabilities(array);
                    forceUpdate();
                  }}
                />
              }
              label={cap}
            />
          </Grid>
        ))}
      </Grid>
    );
  },
  ({ capabilities: oldCapabilities }, { capabilities: newCapabilities }) =>
    oldCapabilities == newCapabilities
);

const Moderator = ({ moderator, classes }) => {
  const [capabilities, setCapabilities] = useState(moderator.capabilities);

  return (
    <Grid item xs={12} md={6} lg={3}>
      <Card>
        <CardHeader title={moderator.name} />
        <CardContent>
          <Typography variant="subtitle2">Creation Date</Typography>
          <Typography variant="subtitle1">{moderator.createdAt}</Typography>
          <br />
          <Typography variant="subtitle2">Access Rights</Typography>
          <Capabilities
            capabilities={capabilities}
            setCapabilities={setCapabilities}
            classes={classes}
          />
          <br />
          <Grid container spacing={48}>
            <Grid item xs={6} style={{ textAlign: "center" }}>
              <Mutation mutation={UPDATE_MODERATOR}>
                {(updateModerator, { data, loading }) =>
                  loading ? (
                    <CustomProgress size={32} />
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => {
                        updateModerator({
                          variables: {
                            input: {
                              id: moderator.id,
                              capabilities: capabilities
                            }
                          }
                        });
                      }}
                    >
                      Save
                    </Button>
                  )
                }
              </Mutation>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "center" }}>
              <Mutation mutation={DELETE_MODERATOR}>
                {(deleteModerator, { data }) => (
                  <Button
                    variant="outlined"
                    className={classes.dangerButton}
                    onClick={() => {
                      deleteModerator({
                        variables: {
                          input: {
                            id: moderator.id
                          }
                        }
                      }).then(() => location.reload());
                    }}
                  >
                    Delete
                  </Button>
                )}
              </Mutation>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

const ModerationModerators = ({ width, classes }) => {
  return (
    <React.Fragment>
      <PageTitle>{`Scritch Moderation - Moderators`}</PageTitle>{" "}
      <Query query={FETCH_MODERATORS}>
        {({ loading, error, data }) => {
          if (loading) return null; //TODO progress
          if (error) return null; //TODO error
          if (!data || !data.moderators) {
            return (
              <Typography variant="h4" gutterBottom className={classes.centeredText}>
                No Moderators Found
              </Typography>
            );
          }

          return (
            <React.Fragment>
              <Grid container spacing={16}>
                {data.moderators.map(moderator => (
                  <Moderator moderator={moderator} classes={classes} />
                ))}
              </Grid>
            </React.Fragment>
          );
        }}
      </Query>
    </React.Fragment>
  );
};

export default withStyles(styles)(withWidth()(ModerationModerators));
