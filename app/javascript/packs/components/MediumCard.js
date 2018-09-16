import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { Link, withRouter } from 'react-router-dom';
import { keyToUrl } from '../mediaService';

const styles = theme => ({
  card: {
    width: '100%',
    borderRadius: 0
  },
  media: {
    height: 300
  },
  text: {
  }
});

class MediumCard extends React.Component {
  state = {
    thumbnailKey: this.props.medium.thumbnailKey
  }

  render() {
    const { classes, medium } = this.props;

    return (
      <Card className={classes.card} elevation={0}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={medium.user.name}
          subheader="September 14, 2016"
        />
        <CardActionArea
          className={classes.card}
          component={(props) => <Link to={`/${medium.id}`} {...props} />}
        >
          <CardMedia
            className={classes.media}
            image={keyToUrl(this.state.thumbnailKey)}
            title={medium.title}
            onMouseEnter={() => this.setState({ thumbnailKey: medium.previewKey })}
            onMouseLeave={() => this.setState({ thumbnailKey: medium.thumbnailKey })}
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
}

MediumCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediumCard);
