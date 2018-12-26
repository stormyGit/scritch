import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckIcon from "@material-ui/icons/Check";
import ResponsiveDialog from "./ResponsiveDialog";

const TermsDialog = ({ classes, open, onClose }) => (
  <ResponsiveDialog open={open} onClose={onClose}>
    <DialogTitle>Terms and conditions</DialogTitle>
    <DialogContent>
      <List>
        <ListItem>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText
            inset
            primary={`You must be aged ${
              process.env.MINIMUM_AGE
            } or older to use ${process.env.SITE_NAME}.`}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText
            inset
            primary="You agree not to impersonate anyone, entering factual information into website data fields."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText
            inset
            primary="You agree not to use any: material, text, username, pictures, or avatar that are forbidden under French law."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText
            inset
            primary="You agree to maintain polite conduct on the website. No hate speech, harassment, threats, and defamation."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText
            inset
            primary="You agree not to post offensive material, material depicting minors, or material depicting animals."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText
            inset
            primary={`${
              process.env.SITE_NAME
            } reserves the right to refuse or suspend access to any user and to remove any content (for any reason or no reason) without notice.`}
          />
        </ListItem>
      </List>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </ResponsiveDialog>
);

export default TermsDialog;
