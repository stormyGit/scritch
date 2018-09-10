import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link, withRouter } from 'react-router-dom';

const styles = theme => ({
  card: {
    width: '100%',
    borderRadius: 0
  },
  media: {
    height: 260,
  },
  text: {
  }
});

function MediumCard(props) {
  const { classes, medium } = props;

  return (
    <Card className={classes.card} elevation={0}>
      <CardActionArea
        className={classes.card}
        component={(props) => <Link to={`/${medium.id}`} {...props} />}
      >
        <CardMedia
          className={classes.media}
          image={`https://placeimg.com/640/480/${medium.id}`}
          title={medium.title}
        >
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2" className={classes.text}>
            {medium.title}
          </Typography>
          <Typography component="p" className={classes.text} noWrap>
            {medium.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" className={classes.text}>
          Share
        </Button>
        <Button size="small" className={classes.text}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

MediumCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediumCard);
