import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Query, Mutation } from 'react-apollo';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import CheckIcon from '@material-ui/icons/Check';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import ResponsiveDialog from './ResponsiveDialog';
import UserAvatar from './UserAvatar';
import EmptyList from './EmptyList';
import withCurrentSession from './withCurrentSession';

import { combineUUIDs } from '../utils';

import { GET_CHAT, GET_MESSAGES, CREATE_MESSAGE } from '../queries';

const styles = (theme) => ({

});

class ChatDialog extends React.Component {
  state = {
    message: ''
  }

  render() {
    const { classes, open, onClose, user, currentSession } = this.props;
    let offset = 0;
    let limit = parseInt(process.env.MESSAGES_PAGE_SIZE);

    const chatId = combineUUIDs(user.id, currentSession.user.id);

    return (
      <ResponsiveDialog
        open={open}
        onClose={onClose}
      >
        <DialogTitle>
          <Grid container spacing={8} alignItems="center">
            <Grid item>
              <UserAvatar user={user} className={classes.userAvatar} />
            </Grid>
            <Grid item>
              {user.name}
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Query query={GET_MESSAGES} variables={{ sort: "latest", chatId, offset, limit }} fetchPolicy="network-only">
            {({ data, loading, error, fetchMore }) => {
              if (loading || error) {
                return (null);
              }

              if (data.messages.length === 0) {
                return (
                  <EmptyList
                    label={`No messages.`}
                  />
                )
              }

              return (
                <List>
                  {
                    data.messages.map((message) => (
                      <ListItem key={message.id}>
                        <ListItemText primary={message.body} />
                      </ListItem>
                    ))
                  }
                </List>
              )
            }}
          </Query>
        </DialogContent>
        <DialogActions>
          <TextField
            label="Write your message"
            name="message"
            value={this.state.message}
            onChange={(e) => this.setState({ message: e.target.value })}
            margin="dense"
            variant="filled"
            fullWidth
            multiline
            rows={4}
            rowsMax={4}
          />
        </DialogActions>
        <Mutation
          mutation={CREATE_MESSAGE}
          update={(cache, { data: { createMessage } }) => {
            const { messages } = cache.readQuery({ query: GET_MESSAGES, variables: { chatId } });
            cache.writeQuery({
              query: GET_MESSAGES,
              variables: { chatId },
              data: { messages: [...messages, createMessage.message ] }
            });
          }}
        >
          {( createMessage, { data }) => (
            <DialogActions>
              <Button
                onClick={onClose}
                color={"primary"}
                variant="contained"
                onClick={() => {
                  createMessage({
                    variables: {
                      input: {
                        recipientId: user.id,
                        body: this.state.message,
                      }
                    }
                  });
                }}
              >
                Send
              </Button>
            </DialogActions>
          )}
        </Mutation>
      </ResponsiveDialog>
    );
  }
}

export default withCurrentSession(
  withStyles(styles)(ChatDialog)
);
