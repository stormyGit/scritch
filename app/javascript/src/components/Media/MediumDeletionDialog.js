import React from "react";
import {Mutation} from "react-apollo";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import GlobalProgress from "../Global/GlobalProgress";
import {DELETE_MEDIUM} from "../../queries/mediaMutations";

const styles = theme => ({});

class MediumDeletionDialog extends React.Component {
  render() {
    const {
      classes,
      match,
      width,
      open,
      onClose,
      onDelete,
      medium
    } = this.props;

    return (
      <Dialog open={open} onClose={onClose}>
        <GlobalProgress absolute />
        <DialogTitle>
          {"Are you sure you want to delete this picture?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Upon confirmation, your picture and all resources attached to it
            will be permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} autoFocus>
            Cancel
          </Button>
          <Mutation mutation={DELETE_MEDIUM}>
            {(deleteMedium, { data }) => (
              <Button
                onClick={() => {
                  deleteMedium({
                    variables: {
                      input: {
                        id: medium.id
                      }
                    }
                  }).then(() => {
                    if (onDelete) {
                      onDelete();
                    }
                  });
                }}
              >
                Confirm
              </Button>
            )}
          </Mutation>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(MediumDeletionDialog);
