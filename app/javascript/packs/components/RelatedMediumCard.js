import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
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
import dayjs from 'dayjs';
import { keyToCdnUrl } from '../mediaService';
import timeAgo from '../timeAgo';
import Duration from './Duration';

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
    flexDirection: 'column',
    flexGrow: 1
  },
  horizontalMediaContainer: {
    maxWidth: '46%',
    minWidth: '46%',
    height: 160,
  },
  horizontalMedia: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  horizontalInfos: {
    flex: 1,
  },
  userLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});

class MediumCard extends React.Component {
  state = {
    thumbnailKey: this.props.medium.smallThumbnailKey
  }

  renderMedia() {
    const { classes, medium, horizontal, width } = this.props;

    let previewImage = new Image();
    const handleOnMouseEnter = () => {
      previewImage.onload = () => {
        this.setState({ thumbnailKey: medium.previewKey });
      };
      previewImage.src = keyToCdnUrl(medium.previewKey);
    }
    const handleOnMouseLeave = () => {

      previewImage.onload = () => {
        this.setState({ thumbnailKey: medium.smallThumbnailKey });
      };
      previewImage.src = keyToCdnUrl(medium.smallThumbnailKey);
    }

    return (
      <CardMedia
        className={classes.horizontalMedia}
        image={keyToCdnUrl(this.state.thumbnailKey)}
        title={medium.title}
        onMouseEnter={() => {
          if (this.state.thumbnailKey !== medium.previewKey && (width === 'lg' || width === 'xl')) {
            handleOnMouseEnter();
          }
        }}
        onMouseLeave={() => {
          if (this.state.thumbnailKey !== medium.smallThumbnailKey && (width === 'lg' || width === 'xl')) {
            handleOnMouseLeave();
          }
        }}
      >
        <Duration duration={medium.duration} />
      </CardMedia>
    );
  }

  renderContent() {
    const { classes, medium } = this.props;

    return (
      <CardContent className={classes.content}>
        <div>
          <Typography gutterBottom variant="body2" component="h2" className={classes.text}  noWrap>
            {medium.title}
          </Typography>
          <Typography gutterBottom variant="caption" component="h2" className={classes.text}  noWrap>
            {medium.user.name}
          </Typography>
        </div>
        <div>
          <Typography gutterBottom variant="body2" component="h2" className={classes.text}  noWrap>
            {timeAgo.format(dayjs(medium.publishedAt).toDate())}
          </Typography>
        </div>
      </CardContent>
    );
  }

  render() {
    const { classes, medium } = this.props;

    return (
      <Card className={[classes.card, classes.horizontalCard].join(' ')} elevation={0}>
        <CardActionArea component={(props) => <Link to={`/videos/${medium.slug}-${medium.id}`} {...props} />} className={classes.horizontalMediaContainer}>
          {this.renderMedia()}
        </CardActionArea>
        <div className={classes.horizontalContent}>
          <CardActionArea component={(props) => <Link to={`/videos/${medium.slug}-${medium.id}`} {...props} />} className={classes.horizontalInfos}>
            {this.renderContent()}
          </CardActionArea>
        </div>
      </Card>
    )
  }
}

MediumCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(
  withWidth()(MediumCard)
);
