import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/lab/Slider';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  slider: {
    marginTop: theme.spacing.unit * 2
  }
});

class ImageCropper extends React.Component {
  state = {
    zoom: 0
  }

  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
  }

  render() {
    const { image, onClose, onSubmit, width, height, borderRadius, classes } = this.props;

    return (
      <Dialog
        open
      >
        <DialogContent>
          <AvatarEditor
            style={{
              width: '100%',
              height: '100%'
            }}
            ref={this.editorRef}
            image={image}
            width={width}
            height={height}
            borderRadius={borderRadius}
            scale={(1 + (this.state.zoom / 100.0) * 3)}
          />
          <Slider
            classes={{ container: classes.slider }}
            value={this.state.zoom}
            onChange={(event, value) => { this.setState({ zoom: value })}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              const canvasScaled = this.editorRef.current.getImageScaledToCanvas();

              onSubmit(canvasScaled);
              onClose();
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(ImageCropper);
