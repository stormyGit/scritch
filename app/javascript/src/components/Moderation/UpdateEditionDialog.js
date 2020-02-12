import React from "react";
import { withRouter } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import Divider from "@material-ui/core/Divider";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Select from "../Global/Select";

import { withStyles } from "@material-ui/core/styles";
import { countriesList } from "../../countriesList";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import GlobalProgress from "../Global/GlobalProgress";

import withCurrentSession from "../withCurrentSession";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { CREATE_EVENT, CREATE_EDITION, UPDATE_EDITION } from "../../queries/eventMutations";
import { KeyboardDatePicker } from "@material-ui/pickers";

const AVATAR_SIZE = 96;

const styles = theme => ({
  bannerMenu: {
    zIndex: 4
  },
  dialogContent: {
    marginTop: theme.spacing(2)
  },
  selectInput: {
    fontFamily: theme.typography.fontFamily
  },
  editBannerButton: {
    width: "100%",
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 1,
    borderRadius: 0,
    height: "100%",
    top: 0,
    left: 0
  },
  bannerContainer: {
    width: "100%",
    paddingTop: "20%",
    position: "relative"
  },
  editAvatarButton: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 1,
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    color: "white"
  },
  menuButton: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    justifyContent: "center"
  },
  bannerIllustration: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0
  },
  uploadInput: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    margin: 0,
    padding: 0,
    opacity: 0,
    width: 1,
    height: 1
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0
  },
  avatarContainer: {
    marginTop: theme.spacing(3)
  },
  editBannerIcon: {
    display: "block",
    fontSize: "4em",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(1),
    color: "white"
  },
  infoText: {
    color: "white"
  },
  domain: {
    marginRight: 1,
    paddingBottom: 4,
    fontSize: "1rem",
    color: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"
  },
  dangerButton: {
    color: theme.palette.danger.main
  }
});

class CreateEventDialog extends React.Component {
  state = {
    name: "",
    city: "",
    country: "",
    kind: "",
    theme: "",
    venue: "",
    startDate: new Date(),
    endDate: new Date(),
    charity: "",
    attendance: "",
    year: "",
    guests: "",
    visible: true
  };

  constructor(props) {
    super(props);
    this.avatarUploadInput = React.createRef();
  }

  componentDidMount() {
    this.setInitialValues(this.props.edition);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.edition !== nextProps.edition || this.props.open !== nextProps.open) {
      this.setInitialValues(nextProps.edition);
    }
  }

  setInitialValues(edition) {
    console.log(edition);
    this.setState({
      name: edition.name,
      city: edition.city,
      country: edition.country,
      kind: edition.kind,
      theme: edition.theme,
      venue: edition.venue,
      startDate: new Date(edition.startDate),
      endDate: new Date(edition.endDate),
      charity: edition.charity,
      attendance: edition.attendance,
      year: edition.year,
      guests: edition.guestOfHonours.join(","),
      id: edition.id
    });
  }

  render() {
    const { classes, maker, currentSession } = this.props;

    return (
      <React.Fragment>
        <ResponsiveDialog open={this.props.open} onClose={this.props.onClose}>
          <GlobalProgress absolute />
          <DialogContent className={classes.dialogContent}>
            <TextField
              label="Name"
              name="name"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              margin="dense"
              fullWidth
            />
            <div style={{ padding: 5 }} />
            <TextField
              label="Country"
              name="country"
              value={this.state.country}
              onChange={e => this.setState({ country: e.target.value })}
              margin="dense"
              fullWidth
            />
            <div style={{ padding: 5 }} />
            <TextField
              label="City"
              name="city"
              value={this.state.city}
              onChange={e => this.setState({ city: e.target.value })}
              margin="dense"
              fullWidth
            />
            <div style={{ padding: 5 }} />
            <TextField
              label="Type (Furmeet, FurDance, Convention)"
              name="kind"
              value={this.state.kind}
              onChange={e => this.setState({ kind: e.target.value })}
              margin="dense"
              fullWidth
            />
            <div style={{ padding: 5 }} />
            <TextField
              label="Theme"
              name="theme"
              value={this.state.theme}
              onChange={e => this.setState({ theme: e.target.value })}
              margin="dense"
              fullWidth
            />
            <div style={{ padding: 5 }} />
            <TextField
              label="Charity"
              name="charity"
              value={this.state.charity}
              onChange={e => this.setState({ charity: e.target.value })}
              margin="dense"
              fullWidth
            />
            <div style={{ padding: 5 }} />
            <TextField
              label="Venue"
              name="venue"
              value={this.state.venue}
              onChange={e => this.setState({ venue: e.target.value })}
              margin="dense"
              fullWidth
            />
            <div style={{ padding: 5 }} />
            <TextField
              label="Year"
              name="year"
              value={this.state.year}
              onChange={e => this.setState({ year: e.target.value })}
              margin="dense"
              fullWidth
            />
            <div style={{ padding: 5 }} />
            <TextField
              label="Attendance"
              name="attendance"
              value={this.state.attendance}
              onChange={e => this.setState({ attendance: e.target.value })}
              margin="dense"
              fullWidth
            />
            <div style={{ padding: 5 }} />
            <TextField
              label="Guests (separate with comma, no spaces)"
              name="guests"
              value={this.state.guests}
              onChange={e => this.setState({ guests: e.target.value })}
              margin="dense"
              fullWidth
            />
            <div style={{ padding: 5 }} />
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="start-date"
              label="Start Date"
              value={this.state.startDate}
              onChange={e => this.setState({ startDate: e })}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
            <div style={{ padding: 5 }} />
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="end-date"
              label="End Date"
              value={this.state.endDate}
              onChange={e => this.setState({ endDate: e })}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </DialogContent>
          <DialogActions>
            <Mutation mutation={UPDATE_EDITION}>
              {(updateEdition, { data }) => (
                <Button
                  disabled={!this.state.name || /^\s*$/.test(this.state.name)}
                  onClick={() => {
                    updateEdition({
                      variables: {
                        input: {
                          id: this.state.id,
                          name: this.state.name,
                          eventId: this.props.event,
                          country: this.state.country,
                          city: this.state.city,
                          theme: this.state.theme,
                          charity: this.state.charity,
                          venue: this.state.venue,
                          attendance: parseInt(this.state.attendance),
                          kind: this.state.kind,
                          guestOfHonours: this.state.guests,
                          startDate: this.state.startDate,
                          endDate: this.state.endDate,
                          year: parseInt(this.state.year)
                        }
                      }
                    }).then(updated => {
                      this.props.onClose();
                      location.reload();
                    });
                  }}
                >
                  Save
                </Button>
              )}
            </Mutation>
            <Button onClick={this.props.onClose}>Cancel</Button>
          </DialogActions>
        </ResponsiveDialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(withCurrentSession(CreateEventDialog)));
