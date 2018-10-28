import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import Hls from 'hls.js';

import 'mediaelement';
import 'mediaelement/build/mediaelementplayer.min.css';

import 'mediaelement-plugins/dist/chromecast/chromecast.min.js';
import 'mediaelement-plugins/dist/chromecast/chromecast.min.css';

import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import { keyToUrl, keyToCdnUrl } from '../mediaService';

const styles = theme => ({
  video: {
    height: '100%',
    marginLeft: "auto",
    marginRight: "auto",
  },
  container: {
    width: "100%",
    background: "black",
    height: "80vh",
  },
});

class CardVideo extends React.Component {
  componentDidMount() {
    window.Hls = Hls;

    this.setState({
      player: new MediaElementPlayer(this.refs.video, {
        features: ['playpause', 'progress', 'duration', 'volume', 'chromecast', 'fullscreen'],
      })
    });
  }

  componentWillUnmount() {
    if (this.state.player) {
      this.state.player.remove();
      this.setState({player: null});
    }
  }

  render() {
    const { medium, classes, width } = this.props;
    const height = {
      xl: '80vh',
      lg: '80vh',
      md: '60vh',
      sm: '50vh',
      xs: '40vh'
    }[width];

    return (
      <div
        className={classes.container}
        style={{
          height
        }}
      >
        <video
          ref="video"
          className={classes.video}
          height="100%"
          data-cast-title={medium.title}
          data-cast-description={medium.description}
          data-cast-poster={keyToCdnUrl(medium.thumbnailKey)}
          poster={keyToCdnUrl(medium.thumbnailKey)}
        >
          <source src={keyToUrl(medium.key)} />
        </video>
      </div>
    );
  }
}

export default withStyles(styles)(withWidth()(CardVideo));
