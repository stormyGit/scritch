import React from "react";
import {withApollo} from "react-apollo";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {withRouter} from "react-router-dom";

import {withStyles} from "@material-ui/core/styles";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";
import withCurrentSession from "../withCurrentSession";
import SearchBar from "material-ui-search-bar";
import {Grid} from "@material-ui/core";
import ScritchSpinner from "../CustomComponents/ScritchSpinner";
import Fursuits from "../Fursuits/Fursuits";
import Events from "../Events/Events";
import Makers from "../Makers/Makers";

const styles = theme => ({
  blurb: {
    fontWeight: 200
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none"
  },
  selectInput: {
    fontFamily: theme.typography.fontFamily
  },
  title: {
    fontWeight: 200
  }
});

class GlobalSearchDialog extends React.Component {
  state = {
    name: "",
    search: "",
    kind: null
  };

  constructor(props) {
    super(props);

    this.props.history.listen((location, action) => {
      this.setState({ name: "", search: "" });
      this.props.onClose();
    });
  }

  handleSearch(val) {
    if (this.state.name.length >= 1 && val.length < 1) {
      this.reset = true;
    }

    this.setState({ name: val });

    if (this.loadEventTimer) {
      clearTimeout(this.loadEventTimer);
    }

    if (val.length >= 1) {
      this.loadEventTimer = setTimeout(() => {
        this.setState({ search: val });
      }, 1000);
    } else if (this.reset) {
      clearTimeout(this.loadEventTimer);
      this.setState({ name: "", search: "" });
      this.reset = false;
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <ResponsiveDialog
        open={this.props.open}
        size={800}
        onClose={() => {
          this.props.onClose();
          this.setState({ description: "" });
        }}
      >
        <GlobalProgress absolute />

        <DialogTitle>Global Search</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <SearchBar
                className={classes.searchBar}
                onChange={value => this.handleSearch(value)}
                value={this.state.name}
                onCancelSearch={() => this.handleSearch("")}
                placeholder="Search..."
              />
            </Grid>
          </Grid>
          <div style={{ padding: 16 }} />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {this.state.name !== this.state.search && (
                <ScritchSpinner size={128} />
              )}
              {this.state.name === this.state.search && this.state.name !== "" && (
                <React.Fragment>
                  <Typography variant="h5" className={classes.title}>
                    Fursuits
                    <Fursuits searching={true} search={this.state.search} />
                  </Typography>
                  <div style={{ padding: 16 }} />
                  <Typography variant="h5" className={classes.title}>
                    Makers
                  </Typography>
                  <Makers searching={true} search={this.state.search} />
                  <div style={{ padding: 16 }} />
                  <Typography variant="h5" className={classes.title}>
                    Events
                  </Typography>
                  <Events searching={true} search={this.state.search} />
                </React.Fragment>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.setState({ name: "", search: "" });
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
  withApollo(withRouter(withCurrentSession(GlobalSearchDialog)))
);
