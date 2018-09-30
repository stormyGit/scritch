import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit / 2,
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
    paddingTop: theme.spacing.unit *2,
    paddingBottom: theme.spacing.unit *2,
  }
})

const LoadMoreButton = ({ classes, ...props }) => (
  <Button
    fullWidth
    size="large"
    className={classes.root}
    {...props}
  >
    Load more
  </Button>
)
export default withStyles(styles)(LoadMoreButton);
