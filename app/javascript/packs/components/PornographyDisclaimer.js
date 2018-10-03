import React from 'react';
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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ItemIcon from '@material-ui/icons/ChevronRight';

import { withRouter } from 'react-router-dom';

import ResponsiveDialog from './ResponsiveDialog';

import Logo from './Logo';
import { CREATE_SESSION, GET_SESSION } from '../queries';

const styles = theme => ({
  brand: {
    textAlign: 'center'
  },
})

class PornographyDisclaimer extends React.Component {
  render() {
    const { classes, open, onClose } = this.props;

    return (
      <ResponsiveDialog
        open={open}
        onClose={onClose}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle className={classes.brand}>
          <Logo />
        </DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <ListItemIcon>
                <ItemIcon />
              </ListItemIcon>
              <ListItemText inset primary={`${process.env.SITE_NAME} is a pornographic website and is forbidden for minors. If you are a minor please leave immediatly.`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ItemIcon />
              </ListItemIcon>
              <ListItemText inset primary={`${process.env.SITE_NAME} est un site pornographique interdit aux mineurs. Si vous êtes mineur veuillez quitter cette page immédiatement.`} />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-between" spacing={0}>
            <Grid item>
              <Button
                component={(props) => <a href="https://google.com" {...props} />}
                onClick={onClose}
                autoFocus
              >
                Leave / Quitter
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={onClose}
              >
                {`Continue to ${process.env.SITE_NAME}`}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(withRouter(PornographyDisclaimer));
