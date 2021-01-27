import React from "react";
import uuidv4 from "uuid/v4";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import { Query, Mutation, withApollo } from "react-apollo";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import BackIcon from "@material-ui/icons/ArrowBack";
import SendIcon from "@material-ui/icons/Send";
import UnreadIcon from "@material-ui/icons/FiberManualRecord";
import EmptyChatIcon from "@material-ui/icons/ChatBubbleOutline";
import dayjs from "dayjs";

import ResponsiveDialog from "../Global/ResponsiveDialog";
import UserAvatar from "../Users/UserAvatar";
import EmptyList from "../Global/EmptyList";
import withCurrentSession from "../withCurrentSession";
import FormattedText from "../Global/FormattedText";
import InteractiveTextInput from "../Global/InteractiveTextInput";
import timeAgo from "../../util/timeAgo";

import { combineUUIDs } from "../../util/uuid";

import { GET_CHATS, GET_MESSAGES, GET_UNREAD_CHATS_COUNT } from "../../queries/chatQueries";
import { CREATE_MESSAGE, READ_CHAT } from "../../queries/chatMutations";

const styles = theme => ({
  title: {
    padding: theme.spacing(1)
  },
  unreadIcon: {
    color: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"
  },
  userLink: {
    color: theme.palette.text.primary,
    textDecoration: "none"
  },
  messageGrid: {
    flexGrow: 1
  },
  chatsTitle: {
    marginLeft: 20
  },
  userTitle: {
    overflow: "hidden"
  },
  messageInput: {
    paddingTop: 12
  },
  timestamp: {
    paddingRight: 4,
    textAlign: "right"
  },
  messages: {
    paddingBottom: 0,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    flex: "1 1 auto",
    overflowY: "auto",
    overflowX: "hidden"
    // minHeight: 300,
  },
  messageBox: {
    flexGrow: 1,
    // padding: theme.spacing(2),
    background: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.09)" : "rgba(0, 0, 0, 0.09)",
    borderRadius: 3,
    alignItems: "center"
  },
  messageText: {
    padding: theme.spacing(1)
  },
  messageActions: {
    paddingTop: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  inputAvatarContainer: {
    paddingLeft: 4,
    paddingRight: 4
  },
  chatsContainer: {
    paddingLeft: 0,
    paddingRight: 0
  },
  emptyChatsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  emptyChatsIcon: {
    display: "block",
    fontSize: "4em",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(1),
    color: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"
  }
});

class MessageInput extends React.Component {
  state = {
    message: ""
  };

  handleSend(createMessage) {
    if (this.state.message.match(/^\s*$/)) {
      return;
    }
    createMessage({
      variables: {
        input: {
          recipientId: this.props.user.id,
          body: this.state.message,
          caseId: this.props.caseId,
          caseType: this.props.caseType
        }
      }
    }).then(() => {
      this.setState({ message: "" });
    });
  }

  render() {
    const { classes, currentSession, chatId, caseId, caseType } = this.props;

    return (
      <Mutation
        mutation={CREATE_MESSAGE}
        update={(cache, { data: { createMessage } }) => {
          const { messages } = cache.readQuery({
            query: GET_MESSAGES,
            variables: { caseType, caseId }
          });
          cache.writeQuery({
            query: GET_MESSAGES,
            variables: { caseType, caseId },
            data: { messages: [...messages, createMessage.message] }
          });
        }}
      >
        {(createMessage, { data }) => (
          <Grid spacing={1} container alignItems="flex-end" wrap="nowrap">
            <Grid item>
              <div className={classes.inputAvatarContainer}>
                <UserAvatar user={currentSession.user} />
              </div>
            </Grid>
            <Grid item className={classes.messageGrid}>
              <InteractiveTextInput
                InputProps={{
                  className: classes.messageInput
                }}
                placeholder="Write your message"
                name="message"
                value={this.state.message}
                onChange={e => {
                  this.setState({ message: e.target.value });
                }}
                onKeyPress={e => {
                  const keyCode = e.keyCode || e.which;
                  if (keyCode === 13) {
                    if (e.ctrlKey) {
                      this.setState({ message: `${this.state.message}\n` });
                    } else {
                      e.preventDefault();
                      this.handleSend(createMessage);
                    }
                  }
                }}
                variant="filled"
                fullWidth
                multiline
                rows={1}
                rowsMax={12}
                autoFocus
                required
              />
            </Grid>
            <Grid item>
              <IconButton
                variant="outlined"
                margin="none"
                onClick={() => {
                  this.handleSend(createMessage);
                }}
              >
                <SendIcon />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Mutation>
    );
  }
}

class ChatDialog extends React.Component {
  constructor(props) {
    super(props);
    this.messagesScroll = React.createRef();
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.messagesScroll.current) {
        this.messagesScroll.current.scrollTop = this.messagesScroll.current.scrollHeight;
      }
    });
  }

  componentDidMount() {
    this.scrollToBottom();
    this.readChat(this.props.user);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.messages !== nextProps.messages) {
      this.scrollToBottom();
      this.readChat(nextProps.user);
    }
  }

  readChat(user) {
    this.props.client.mutate({
      mutation: READ_CHAT,
      variables: { input: { contactId: user.id } },
      update: cache => {
        // this may fell if we haven't loaded the chats before
        try {
          const { unreadChatsCount } = cache.readQuery({
            query: GET_UNREAD_CHATS_COUNT
          });
          cache.writeQuery({
            query: GET_UNREAD_CHATS_COUNT,
            data: {
              unreadChatsCount: unreadChatsCount - 1
            }
          });

          const chatId = combineUUIDs(user.id, this.props.currentSession.user.id);
          const { chats } = cache.readQuery({ query: GET_CHATS });
          cache.writeQuery({
            query: GET_CHATS,
            data: {
              chats: chats.map(chat => {
                if (chat.id === chatId) {
                  chat.isUnread = false;
                }
                return chat;
              })
            }
          });
        } catch (e) {}
      }
    });
  }

  render() {
    const { classes, open, onClose, onBack, user, currentSession, messages, width } = this.props;

    return (
      <React.Fragment>
        <DialogTitle className={classes.title}>
          <Grid container spacing={0} alignItems="center" justify="space-between" wrap="nowrap">
            <Grid item>
              <Grid container spacing={0} alignItems="center" justify="flex-start" wrap="nowrap">
                <Grid item>
                  <IconButton color="inherit" onClick={onBack}>
                    <BackIcon />
                  </IconButton>
                </Grid>
                <Grid
                  item
                  style={{ marginLeft: 8 }}
                  onClick={() => {
                    onClose();
                  }}
                >
                  <Grid
                    container
                    spacing={0}
                    alignItems="center"
                    className={classes.userTitle}
                    wrap="nowrap"
                  >
                    <Grid item>
                      <UserAvatar user={user} className={classes.userAvatar} />
                    </Grid>
                    <Grid item style={{ marginLeft: 8 }}>
                      {user.name}
                    </Grid>
                  </Grid>
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
        {!messages || messages.length === 0 ? (
          <DialogContent className={classes.emptyChatsContainer}>
            <EmptyChatIcon className={classes.emptyChatsIcon} />
            <EmptyList label={`No messages`} />
          </DialogContent>
        ) : (
          <div
            className={classes.messages}
            ref={this.messagesScroll}
            style={{
              minHeight: width === "lg" || width === "xl" ? 300 : 0
            }}
          >
            {messages.map((message, index) =>
              this.renderMessage(message, messages.length === index + 1)
            )}
          </div>
        )}
        <DialogActions className={classes.messageActions}>
          <MessageInput
            currentSession={currentSession}
            user={user}
            classes={classes}
            caseId={this.props.caseId}
            caseType={this.props.caseType}
          />
        </DialogActions>
      </React.Fragment>
    );
  }
}

const ChatDialogWithApollo = withApollo(withWidth()(ChatDialog));

class ChatsDialog extends React.Component {
  renderLastMessage(chat) {
    const { currentSession } = this.props;

    if (!chat.lastMessage) {
      return "";
    }
    if (chat.lastMessage.senderId === currentSession.user.id) {
      return `You: ${chat.lastMessage.body}`;
    } else {
      return chat.lastMessage.body;
    }
  }

  renderChat(chat) {
    const { currentSession, onUserSelected, classes } = this.props;

    return (
      <ListItem key={chat.id} button onClick={() => onUserSelected(chat.contact)}>
        <UserAvatar user={chat.contact} />
        <ListItemText primary={chat.contact.name} secondary={this.renderLastMessage(chat)} />
        {chat.isUnread && <UnreadIcon className={classes.unreadIcon} />}
      </ListItem>
    );
  }

  render() {
    const { chats, classes, onClose, width } = this.props;

    return (
      <React.Fragment>
        {chats.length > 0 ? (
          <DialogContent
            className={classes.chatsContainer}
            style={{
              minHeight: width === "lg" || width === "xl" ? 300 : 0,
              paddingTop: 0
            }}
          >
            <List>{chats.map(chat => this.renderChat(chat))}</List>
          </DialogContent>
        ) : (
          <React.Fragment>
            <DialogTitle>
              <span />
            </DialogTitle>
            <DialogContent className={classes.emptyChatsContainer}>
              <EmptyChatIcon className={classes.emptyChatsIcon} />
              <EmptyList label={`No chats`} />
            </DialogContent>
          </React.Fragment>
        )}
        <DialogActions>
          <Button onClick={onClose} aria-label="Close">
            Close
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}

const Message = ({ message, last, classes, currentSession, user, onClose }) => {
  const Timestamp = () => (
    <Typography variant="caption" className={classes.timestamp}>
      {timeAgo.format(dayjs(message.createdAt).toDate())}
    </Typography>
  );

  if (message.senderId === currentSession.user.id) {
    return (
      <Grid
        container
        spacing={1}
        key={message.id}
        alignItems="flex-end"
        wrap="nowrap"
        style={{ marginBottom: last ? 4 : 16 }}
      >
        <Grid item className={classes.messageBox} style={{ marginRight: 8, marginLeft: 56 }}>
          <FormattedText text={message.body} className={classes.messageText} />
          <Timestamp />
        </Grid>
        <Grid
          item
          onClick={() => {
            onClose();
          }}
        >
          <Link to={`/${currentSession.user.slug}`}>
            <UserAvatar user={currentSession.user} />
          </Link>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <React.Fragment>
        {message.picture && (
          <Grid
            container
            spacing={1}
            key={message.id}
            alignItems="flex-end"
            wrap="nowrap"
            style={{ marginBottom: last ? 4 : 16, justifyContent: "right" }}
          >
            <Grid
              item
              onClick={() => {
                onClose();
              }}
            >
              <Link to={`/${user.slug}`}>
                <UserAvatar user={user} />
              </Link>
            </Grid>
            <Grid item style={{ marginRight: 8, marginLeft: 56 }}>
              <a href={message.picture} target="_blank">
                <img
                  src={message.picture}
                  className={classes.messageText}
                />
              </a>
            </Grid>
          </Grid>
        )}
        {message.body !== "" && (
          <Grid
            container
            spacing={1}
            key={message.id}
            alignItems="flex-end"
            wrap="nowrap"
            style={{ marginBottom: last ? 4 : 16 }}
          >
            <Grid
              item
              onClick={() => {
                onClose();
              }}
            >
              <Link to={`/${user.slug}`}>
                <UserAvatar user={user} />
              </Link>
            </Grid>
            <Grid item className={classes.messageBox} style={{ marginRight: 8, marginLeft: 56 }}>
              <FormattedText
                text={message.body}
                className={classes.messageText}
                onChangeLocation={onClose}
              />
              <Timestamp />
            </Grid>
          </Grid>
        )}
      </React.Fragment>
    );
  }
};

const ModeratorChatDialog = ({
  caseId,
  caseType,
  currentSession,
  classes,
  open,
  onClose,
  user
}) => {
  let offset = 0;
  let limit = 12;

  return (
    <ResponsiveDialog open={open} onClose={onClose}>
      <Query
        fetchPolicy="network-only"
        query={GET_MESSAGES}
        variables={{
          sort: "latest",
          caseId: caseId,
          caseType: caseType,
          offset,
          limit
        }}
        pollInterval={parseInt(process.env.MESSAGES_REFRESH_INTERVAL)}
      >
        {({ data, loading, error, fetchMore }) => {
          if (loading || error) {
            return null;
          }
          return (
            <Grid container>
              {data.messages.map(message => {
                return (
                  <Message
                    user={user}
                    currentSession={currentSession}
                    classes={classes}
                    message={message}
                    onClose={onClose}
                  />
                );
              })}
              <MessageInput
                classes={classes}
                caseId={caseId}
                caseType={caseType}
                currentSession={currentSession}
                user={user}
              />
            </Grid>
          );
        }}
      </Query>
    </ResponsiveDialog>
  );
};

export default withCurrentSession(withStyles(styles)(ModeratorChatDialog));
