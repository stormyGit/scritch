import React from "react";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

import { withRouter } from "react-router-dom";

import ResponsiveDialog from "../Global/ResponsiveDialog";

const styles = theme => ({
  brand: {
    textAlign: "center"
  },
  titleBarContainer: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(3)
  },
  link: {
    color: theme.palette.text.primary
  },
  telegramLoader: {
    marginTop: theme.spacing(4),
    marginLeft: "auto",
    marginRight: "auto",
    display: "block"
  }
});

class SignUpAlternativeDialog extends React.Component {
  state = {
    submiting: false,
    sessionId: ""
  };

  render() {
    const { classes, open, onClose, loading, width } = this.props;

    return (
      <ResponsiveDialog open={open} onClose={onClose}>
        {((width !== "lg" && width !== "xl") || true) && (
          <DialogTitle className={classes.titleBarContainer}>
            <Grid
              container
              spacing={0}
              alignItems="center"
              justify="space-between"
            >
              <Grid item>
                <Typography variant="h6" noWrap color={"inherit"}>
                  {`Login with ${process.env.SITE_NAME} Telegram Bot`}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  color="inherit"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </DialogTitle>
        )}
        <DialogContent>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText
                inset
                primary={
                  <span>
                    <span>{`Start a conversation with our `}</span>
                    <a
                      className={classes.link}
                      href={`https://t.me/${process.env.TELEGRAM_BOT_NAME}?start=start`}
                      target="_blank"
                    >
                      Telegram bot
                    </a>
                    <span>.</span>
                  </span>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText
                inset
                primary="Copy and paste the code given by the bot in the box below."
              />
            </ListItem>
            <ListItem>
              <TextField
                label="Code"
                name="code"
                variant="outlined"
                value={this.state.sessionId}
                onChange={e => {
                  this.setState({ sessionId: e.target.value });
                  const v4 = new RegExp(
                    /([0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})/i
                  );
                  if (e.target.value.match(v4)) {
                    location.reload();
                  }
                }}
                margin="dense"
                fullWidth
              />
            </ListItem>
          </List>
        </DialogContent>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(
  withRouter(withWidth()(SignUpAlternativeDialog))
);
