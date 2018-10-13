import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import icon from '../../../assets/images/android-icon-48x48.png';

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: theme.spacing.unit,
    width: 48,
    height: 48
  },
  brand: {
    fontFamily: "'Monoton', cursive",
    fontSize: '2.5em',
  },
})

class Logo extends React.Component {
  render() {
    const { classes, ...props } = this.props;

    return (
      <div className={classes.container}>
        <img src={icon} className={classes.icon} />
        <Typography variant="title" color="inherit" component={'span'} noWrap className={classes.brand} {...props}>
          {process.env.SITE_NAME}
        </Typography>
      </div>
    );
  }
}


export default withStyles(styles, { pureComponent: true })(Logo);
