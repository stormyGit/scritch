import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
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

import { hideTermsDialog } from '../actions/termsDialog';

const TermsDialog = ({ classes, open, handleClose }) => (
  <Dialog
    open={open}
    onClose={handleClose}
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
          <ListItemText inset primary="Offensive or pornographic materials are forbidden." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText inset primary="Murrtube reserves the right to refuse or suspend access to any user, for any reason or no reason, and without any notice." />
        </ListItem>
      </List>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>
        Close
      </Button>
    </DialogActions>
  </Dialog>
)

export default connect(
  ({ termsDialog }) => ({ open: termsDialog }),
  (dispatch) => ({
    handleClose: () => dispatch(hideTermsDialog())
  })
)(TermsDialog);;
