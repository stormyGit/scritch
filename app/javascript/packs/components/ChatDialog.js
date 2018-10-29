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
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import ResponsiveDialog from './ResponsiveDialog';
import UserAvatar from './UserAvatar';
import EmptyList from './EmptyList';
import withCurrentSession from './withCurrentSession';
import ScrollArea from 'react-scrollbar';
import FormattedText from './FormattedText';

import { combineUUIDs } from '../utils';

import { GET_CHAT, GET_MESSAGES, CREATE_MESSAGE } from '../queries';

const styles = (theme) => ({
  title: {
    padding: theme.spacing.unit * 1,
  },
  messageGrid: {
    flexGrow: 1,
  },
  messageInput: {
    paddingTop: 12
  },
  scrollArea: {
    flex: 1,
  },
  messages: {
    paddingBottom: 0,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    flex: "1 1 auto",
    overflowY: 'auto',
    overflowX: 'hidden',
    minHeight: 300,
    overflowY: 'hidden',
  },
  emptyList: {
    minHeight: 300 - 24,
  },
  messageBox: {
    flexGrow: 1,
    // padding: theme.spacing.unit * 2,
    background: "#333",
    borderRadius: 3,
    alignItems: 'center',
  },
  messageText: {
    padding: theme.spacing.unit,
  },
});

class ChatDialog extends React.Component {
  state = {
    message: ''
  }

  constructor(props) {
    super(props);
    this.messagesScroll = React.createRef();
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.messagesScroll.current) {
        this.messagesScroll.current.scrollBottom();
        // this.messagesScroll.current.scrollTop = this.messagesScroll.current.scrollHeight;
      }
    });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.messages !== nextProps.messages) {
      this.scrollToBottom();
    }
  }

  renderMessage(message, last) {
    const { classes, user, currentSession } = this.props;

    if (message.senderId === currentSession.user.id) {
      return (
        <Grid container spacing={8} key={message.id} alignItems="flex-end" wrap="nowrap" style={{ marginBottom: last ? 4 : 16 }}>
          <Grid item className={classes.messageBox} style={{ marginRight: 8, marginLeft: 58 }}>
            <FormattedText text={message.body} className={classes.messageText} />
          </Grid>
          <Grid item>
            <UserAvatar user={currentSession.user} />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container spacing={8} key={message.id} alignItems="flex-end" wrap="nowrap" style={{ marginBottom: last ? 4 : 16 }}>
          <Grid item>
            <UserAvatar user={user} />
          </Grid>
          <Grid item className={classes.messageBox} style={{ marginLeft: 8, marginRight: 58 }}>
            <FormattedText text={message.body} className={classes.messageText} />
          </Grid>
        </Grid>
      );
    }
  }

  render() {
    const { classes, open, onClose, user, currentSession, messages } = this.props;
    const chatId = combineUUIDs(user.id, currentSession.user.id);

    return (
      <React.Fragment>
        <DialogTitle className={classes.title}>
          <Grid container spacing={0} alignItems="center" justify="space-between">
            <Grid item>
              <Grid container spacing={0} alignItems="center">
                <Grid item>
                  <UserAvatar user={user} className={classes.userAvatar} />
                </Grid>
                <Grid item style={{ marginLeft: 12 }}>
                  {user.name}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton color="inherit" onClick={onClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
          {
            messages.length === 0 ?
              <DialogContent>
                <EmptyList
                  className={classes.emptyList}
                  label={`No messages.`}
                />
              </DialogContent> :
                <ScrollArea className={classes.messages} ref={this.messagesScroll}>
                  {
                    messages.map((message, index) => (
                      this.renderMessage(message, messages.length === (index + 1))
                    ))
                  }
                </ScrollArea>
          }
        <DialogActions>
          <Grid spacing={8} container alignItems="flex-end">
            <Grid item className={classes.messageGrid}>
              <TextField
                InputProps={{
                  className: classes.messageInput
                }}
                placeholder="Write your message"
                name="message"
                value={this.state.message}
                onChange={(e) => this.setState({ message: e.target.value })}
                variant="filled"
                fullWidth
                multiline
                rows={1}
                rowsMax={12}
              />
            </Grid>
            <Grid item>
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
                  <Button
                    onClick={onClose}
                    variant="outlined"
                    margin="none"
                    onClick={() => {
                      createMessage({
                        variables: {
                          input: {
                            recipientId: user.id,
                            body: this.state.message,
                          }
                        }
                      }).then(() => {
                        this.setState({ message: '' });
                      });
                    }}
                  >
                    Send
                  </Button>
                )}
              </Mutation>
            </Grid>
          </Grid>
        </DialogActions>
      </React.Fragment>
    );
  }
}

const ChatDialogLoader = ({ currentSession, user, open, onClose, ...props }) => {
  let offset = 0;
  let limit = parseInt(process.env.MESSAGES_PAGE_SIZE);

  if (!currentSession) {
    return (null);
  }

  const chatId = combineUUIDs(user.id, currentSession.user.id);

  return (
    <ResponsiveDialog
      open={open}
      onClose={onClose}
    >
      {
        open &&
          <Query query={GET_MESSAGES} variables={{ sort: "latest", chatId, offset, limit }} fetchPolicy="network-only" pollInterval={parseInt(process.env.MESSAGES_REFRESH_INTERVAL)}>
            {({ data, loading, error, fetchMore }) => {
              if (loading || error) {
                return (null);
              }

              return (<ChatDialog {...props} currentSession={currentSession} user={user} open={open} onClose={onClose} messages={data.messages} />);
            }}
          </Query>
      }
    </ResponsiveDialog>
  );
}

export default withCurrentSession(
  withStyles(styles)(ChatDialogLoader)
);
