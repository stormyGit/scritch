import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import Hls from 'hls.js';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  video: {
    width: 'calc(100% - 400px)',
  },
  media: {
    minHeight: 'calc(100vh - 128px)',
  },
});

class CardVideo extends React.Component {
  componentDidMount() {
    if (Hls.isSupported()) {
      this.hls = new Hls();
      this.hls.loadSource(`${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/${this.props.medium.key}`);
      this.hls.attachMedia(this.refs.video);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.refs.video.play();
      });
    }
  }

  render() {
    const { medium, classes } = this.props;

    return (
      <video ref="video" className={classes.video} />
    )

    return (
      <CardMedia
        className={classes.media}
        image={`https://placeimg.com/640/480/${medium.id}`}
        title={medium.title}
      >
      </CardMedia>
    );
  }
}

export default withStyles(styles)(CardVideo);
