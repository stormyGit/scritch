import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import icon from '../../../assets/images/android-icon-96x96.png';

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
  },
  logo: {
    position: 'relative',
    alignItems: 'center',
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing.unit,
    width: 96,
    height: 96
  },
})

class UnderReview extends React.Component {
  render() {
    const { classes, ...props } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.logo}>
          <img src={icon} className={classes.icon} />
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(UnderReview);
