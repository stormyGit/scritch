import React from "react";
import { Link, withRouter } from "react-router-dom";
import ResponsiveDialog from "../Global//ResponsiveDialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import GlobalProgress from "../Global/GlobalProgress";
import { LOAD_MAKER } from "../../queries/makerQueries";
import { Query } from "react-apollo";

const styles = theme => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
  text: {
    fontWeight: 200
  }
});

class ModerationMakerDialog extends React.Component {
  render() {
    const { classes, width, open, onClose, maker } = this.props;
    if (!maker) return null;

    return (
      <Query
        query={LOAD_MAKER}
        variables={{
          id: maker,
          sort: "alpha"
        }}
      >
        {({ loading, error, data }) => {
          if (loading || error || !data || !data.maker) return null;
          let localMaker = data.maker;

          return (
            <ResponsiveDialog open={open} onClose={onClose}>
              <GlobalProgress absolute />
              <DialogTitle>
                <Grid container spacing={8}>
                  <Grid item xs={false} lg={1} />
                  <Grid item xs={12} lg={11}>
                    {localMaker.name}
                  </Grid>
                </Grid>
              </DialogTitle>
              <DialogContent style={{ paddingBottom: 5 }}>
                <Grid container spacing={8}>
                  <Grid item xs={false} lg={1} />
                  <Grid item xs={12} lg={10}>
                    <Grid container spacing={8}>
                      <Grid item xs={4}>
                        <img src={localMaker.avatar} style={{ width: "100%" }} />
                      </Grid>
                      <Grid item xs={8} />
                      <Grid item xs={12}>
                        <div style={{ padding: 5 }} />
                        <hr />
                        <div style={{ padding: 5 }} />
                      </Grid>
                      <Grid item xs={6}>
                        <DialogContentText>Country</DialogContentText>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="h4"
                          className={classes.text}
                          noWrap
                        >
                          {localMaker.country}
                        </Typography>
                        <div style={{ padding: 5 }} />
                        <DialogContentText>Region</DialogContentText>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="h4"
                          className={classes.text}
                          noWrap
                        >
                          {localMaker.region ? localMaker.region : "Unknown"}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <DialogContentText>Website</DialogContentText>
                        <a href={localMaker.web} target="_blank" className={classes.link}>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="h4"
                            className={classes.link}
                            noWrap
                          >
                            {localMaker.web ? localMaker.web : "Unknown"}
                          </Typography>
                        </a>
                        <div style={{ padding: 5 }} />
                        <DialogContentText>Commission Status</DialogContentText>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="h4"
                          className={classes.text}
                          noWrap
                        >
                          {localMaker.commissionStatus.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={false} lg={1} />
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose} autoFocus>
                  Close
                </Button>
                <Link to={`/makers/${localMaker.slug}`} className={classes.link}>
                  <Button onClick={onClose} autoFocus>
                    View full page
                  </Button>
                </Link>
              </DialogActions>
            </ResponsiveDialog>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(withRouter(ModerationMakerDialog));
