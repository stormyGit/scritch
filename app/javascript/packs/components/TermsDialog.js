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
import ResponsiveDialog from './ResponsiveDialog';

const TermsDialog = ({ classes, open, onClose }) => (
  <ResponsiveDialog
    open={open}
    onClose={onClose}
  >
    <DialogTitle>
      Terms and conditions
    </DialogTitle>
    <DialogContent>
      <List>
        <ListItem>
         <ListItemIcon>
           <CheckIcon />
         </ListItemIcon>
         <ListItemText inset primary="You must be 18 or older to use Murrtube." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText inset primary="You agree to use truthful information and not to impersonate anyone." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText inset primary="You agree not to use any material, text, username, pictures or avatar that are forbidden under French law." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText inset primary="Hate speech, harassment, threats, defamation are forbidden." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText inset primary="Offensive materials, material displaying people under 18 or animals are forbidden." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText inset primary="Murrtube reserves the right to refuse or suspend access to any user or to remove any content, for any reason or no reason, and without any notice." />
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

export default TermsDialog;
