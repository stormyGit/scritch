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

const styles = {
  card: {
    width: '100%',
    borderRadius: 0
  },
  media: {
    height: 260,
  },
};

function MediumCard(props) {
  const { classes, medium } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.card}>
        <CardMedia
          className={classes.media}
          image="http://2ap93t1x1l6e2f6gfo3ag4vw.wpengine.netdna-cdn.com/wp-content/uploads/2017/09/5_Harp-seal-1000x480.jpg"
          title={medium.title}
        >
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {medium.title}
          </Typography>
          <Typography component="p">
            {medium.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
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
