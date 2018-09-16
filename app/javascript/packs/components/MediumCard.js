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
import timeAgo from '../timeAgo';

const styles = theme => ({
  card: {
    width: '100%',
    borderRadius: 0,
  },
  horizontalCard: {
    display: 'flex',
  },
  horizontalContent: {
    display: 'flex',
    flexDirection: 'column'
  },
  verticalMedia: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  horizontalMediaContainer: {
    width: '60%',
    height: 340,
  },
  horizontalMedia: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  horizontalInfos: {
    flex: 1
  },
  duration: {
    position: 'absolute',
    right: theme.spacing.unit,
    bottom: theme.spacing.unit,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    borderRadius: 3
  },
  userLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  }
});

class MediumCard extends React.Component {
  state = {
    thumbnailKey: this.props.medium.thumbnailKey
  }

  formatDuration(duration) {
    var date = new Date(duration * 1000);
    var hh = date.getUTCHours();
    var mm = date.getUTCMinutes();
    var ss = date.getSeconds();

    if (duration < 60) {
      return (`${ss}s`);
    }

    if (hh < 10) {hh = "0"+hh;}
    if (mm < 10) {mm = "0"+mm;}
    if (ss < 10) {ss = "0"+ss;}

    if (duration < 3600) {
      return (`${mm}:${ss}`);
    }

    return (`${hh}:${mm}:${ss}`);
  }

  renderHeader() {
    const { classes, medium } = this.props;

    return (
      <CardHeader
        avatar={
          <Link to={`/${medium.user.slug}`} className={classes.userLink}>
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          </Link>
        }
        title={<Link to={`/${medium.user.slug}`} className={classes.userLink}>{medium.user.name}</Link>}
        subheader={timeAgo.format(new Date(medium.createdAt))}
      />
    );
  }

  renderMedia() {
    const { classes, medium, horizontal } = this.props;
    return (
      <CardMedia
        className={horizontal ? classes.horizontalMedia : classes.verticalMedia}
        image={keyToUrl(this.state.thumbnailKey)}
        title={medium.title}
        onMouseEnter={() => this.setState({ thumbnailKey: medium.previewKey })}
        onMouseLeave={() => this.setState({ thumbnailKey: medium.thumbnailKey })}
      >
        <Typography variant="body2" className={classes.duration}>
          {this.formatDuration(medium.duration)}
        </Typography>
      </CardMedia>
    );
  }

  renderContent() {
    const { classes, medium, horizontal } = this.props;

    return (
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="headline" component="h2" className={classes.text}>
          {medium.title}
        </Typography>
        <Typography component="p" className={classes.text} noWrap={!horizontal}>
          {medium.description}
        </Typography>
      </CardContent>
    );
  }

  renderVertical() {
    const { classes, medium } = this.props;

    return (
      <Card className={classes.card} elevation={0}>
        {this.renderHeader()}
        <CardActionArea component={(props) => <Link to={`/videos/${medium.id}`} {...props} />}>
          {this.renderMedia()}
          {this.renderContent()}
        </CardActionArea>
      </Card>
    )
  }

  renderHorizontal() {
    const { classes, medium } = this.props;

    return (
      <Card className={[classes.card, classes.horizontalCard].join(' ')} elevation={0}>
        <CardActionArea component={(props) => <Link to={`/videos/${medium.id}`} {...props} />} className={classes.horizontalMediaContainer}>
          {this.renderMedia()}
        </CardActionArea>
        <div className={classes.horizontalContent}>
          {this.renderHeader()}
          <CardActionArea component={(props) => <Link to={`/videos/${medium.id}`} {...props} />} className={classes.horizontalInfos}>
            {this.renderContent()}
          </CardActionArea>
        </div>
      </Card>
    )
  }

  render() {
    const { horizontal } = this.props;

    if (horizontal) {
      return this.renderHorizontal();
    }
    return this.renderVertical();
  }
}

MediumCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediumCard);
