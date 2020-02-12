import React from "react";
import PageTitle from "../Global/PageTitle";
import dateFormat from "dateformat";
import queryString from "query-string";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { FETCH_SUSPENDED_USERS } from "../../queries/moderationQueries";

import CustomProgress from "../Global/CustomProgress";
import { Query, Mutation } from "react-apollo";
import { REMOVE_SUSPENSION } from "../../queries/moderationMutations";
import { Button } from "@material-ui/core";

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

class ModerationSuspendedUsers extends React.Component {
  render() {
    const { width, classes } = this.props;

    return (
      <React.Fragment>
        <PageTitle>{`Scritch Moderation - Suspended Users`}</PageTitle>
        <Query query={FETCH_SUSPENDED_USERS}>
          {({ data, loading, error }) => {
            if (error) return null;
            if (loading) return <CustomProgress size={64} />;
            return (
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">User Name</TableCell>
                    <TableCell align="right">Service</TableCell>
                    <TableCell align="right">Locator</TableCell>
                    <TableCell align="right">Limit</TableCell>
                    <TableCell align="right">Reason</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.moderationSuspended.map(susp => (
                    <TableRow key={susp.id}>
                      <TableCell component="th" scope="row">
                        #{susp.id.split("-")[0]}
                      </TableCell>
                      <TableCell align="right">{susp.user.name}</TableCell>
                      <TableCell align="right">{susp.user.service}</TableCell>
                      <TableCell align="right">
                        {susp.user.service === "telegram" ? susp.user.telegramId : susp.user.email}
                      </TableCell>
                      <TableCell align="right">{`${dateFormat(
                        new Date(susp.limit * 1000),
                        "mmmm dS, yyyy"
                      )}`}</TableCell>
                      <TableCell align="right">{susp.reason}</TableCell>
                      <TableCell align="right">
                        <Mutation mutation={REMOVE_SUSPENSION}>
                          {(removeSuspension, { data }) => {
                            return (
                              <Button
                                variant="outlined"
                                onClick={() =>
                                  removeSuspension({
                                    variables: { input: { id: susp.id } }
                                  }).then(() => location.reload())
                                }
                              >
                                Lift
                              </Button>
                            );
                          }}
                        </Mutation>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withWidth()(ModerationSuspendedUsers));
