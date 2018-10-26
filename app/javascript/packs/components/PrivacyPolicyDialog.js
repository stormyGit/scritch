import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CheckIcon from '@material-ui/icons/Check';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import ResponsiveDialog from './ResponsiveDialog';

const PrivacyPolicyDialog = ({ classes, open, onClose }) => (
  <ResponsiveDialog
    open={open}
    onClose={onClose}
  >
    <DialogTitle>
      Privacy policy
    </DialogTitle>
    <DialogContent>
      <List>
        <ListItem>
         <ListItemIcon>
           <CheckIcon />
         </ListItemIcon>
         <ListItemText inset primary="We only store informations for the purpose of providing our service. This information includes:" />
        </ListItem>
        <List>
          <ListItem>
            <ListItemText inset primary="Personal information from your profile." />
          </ListItem>
          <ListItem>
            <ListItemText inset primary="Your subscriptions, likes and comments." />
          </ListItem>
        </List>
        <ListItem>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText inset primary={`By uploading content on ${process.env.SITE_NAME}, you grant us permission to use and alter this content for the sole purpose of providing our service (e.g. to crop and resize images and videos).`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText inset primary="We do not share or sell your information to third parties." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText inset primary="When you delete your account, all your information is deleted immediately from our active database; encrypted backups and archives that may contain information you updated or deleted may be retained for up to 7 days." />
        </ListItem>
      </List>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>
        Close
      </Button>
    </DialogActions>
  </ResponsiveDialog>
)

export default PrivacyPolicyDialog;
