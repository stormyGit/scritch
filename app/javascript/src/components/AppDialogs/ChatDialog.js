import React from "react";
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
import timeAgo from "../../timeAgo";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import { combineUUIDs } from "../../utils";
import Divider from "@material-ui/core/Divider";

import { GET_CHATS, GET_MESSAGES, GET_UNREAD_CHATS_COUNT } from "../../queries/chatQueries";
import { CREATE_MESSAGE, READ_CHAT } from "../../queries/chatMutations";
import { Paper, ClickAwayListener, MenuList, MenuItem } from "@material-ui/core";
import ImageCropper from "../Global/ImageCropper";

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
    fontSize: 2,
    display: "block",
    fontSize: "4em",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(1),
    color: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"
  },
  uploadInput: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    margin: 0,
    padding: 0,
    opacity: 0,
    width: 1,
    height: 1
  }
});

class MessageInput extends React.Component {
  state = {
    message: "",
    picture: null,
    pictureLoaded: false,
    pictureMenu: false,
    pictureToEdit: null
  };

  constructor(props) {
    super(props);
    this.pictureUploadInput = React.createRef();
  }

  handleSend(createMessage) {
    if (this.state.message.match(/^\s*$/) && !this.state.picture) {
      return;
    }
    createMessage({
      variables: {
        input: {
          recipientId: this.props.user.id,
          body: this.state.message,
          picture: this.state.picture,
          chatId: this.props.chatId,
          caseId: this.props.caseId,
          caseType: this.props.caseType
        }
      }
    }).then(() => {
      this.setState({ message: "", picture: "", pictureLoaded: false, pictureToEdit: null });
    });
  }

  render() {
    const { classes, currentSession, user, chatId } = this.props;

    return (
      <Mutation
        mutation={CREATE_MESSAGE}
        update={(cache, { data: { createMessage } }) => {
          const { messages } = cache.readQuery({
            query: GET_MESSAGES,
            variables: { chatId }
          });
          cache.writeQuery({
            query: GET_MESSAGES,
            variables: { chatId },
            data: { messages: [...messages, createMessage.message] }
          });

          try {
            const { chats } = cache.readQuery({ query: GET_CHATS });
            cache.writeQuery({
              query: GET_CHATS,
              data: {
                chats: chats.map(chat => {
                  if (chat.id === chatId) {
                    chat.lastMessage = createMessage.message;
                  }
                  return chat;
                })
              }
            });
          } catch (e) {}
        }}
      >
        {(createMessage, { data }) => (
          <React.Fragment>
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
                    this.pictureUploadInput.current.click();
                    this.setState({ pictureLoaded: false });
                  }}
                >
                  <InsertPhotoIcon />
                </IconButton>
                <input
                  accept="image/png,image/x-png,image/jpeg"
                  className={classes.uploadInput}
                  ref={this.pictureUploadInput}
                  type="file"
                  onChange={e => {
                    this.setState({ pictureToEdit: e.target.files[0] });
                  }}
                />
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
            {this.state.pictureToEdit && (
              <ImageCropper
                image={this.state.pictureToEdit}
                width={500}
                height={500}
                borderRadius={0}
                onClose={() => {
                  this.setState({ pictureToEdit: null });
                }}
                onSubmit={canvas => {
                  this.setState(
                    {
                      picture: canvas.toDataURL(),
                      removePicture: false,
                      pictureLoaded: true
                    },
                    () => this.handleSend(createMessage)
                  );
                }}
              />
            )}
          </React.Fragment>
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
    this.readChat(this.props.user, this.props.chatId);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.messages !== nextProps.messages) {
      this.scrollToBottom();
      this.readChat(nextProps.user, this.props.chatId);
    }
  }

  readChat(user, chatId) {
    this.props.client.mutate({
      mutation: READ_CHAT,
      variables: { input: { chatId: chatId } },
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

  renderMessage(message, last) {
    const { classes, user, currentSession, onClose } = this.props;

    const Timestamp = () => (
      <Typography variant="caption" className={classes.timestamp}>
        {timeAgo.format(dayjs(message.createdAt).toDate())}
      </Typography>
    );

    if (message.senderId === currentSession.user.id) {
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
              <Grid item style={{ marginRight: 8, marginLeft: 56 }}>
                <img
                  src={message.picture}
                  className={classes.messageText}
                  onChangeLocation={onClose}
                />
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
              <Grid item className={classes.messageBox} style={{ marginRight: 8, marginLeft: 56 }}>
                <FormattedText
                  text={message.body}
                  className={classes.messageText}
                  onChangeLocation={onClose}
                />
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
          )}
        </React.Fragment>
      );
    } else {
      return (
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
          <Grid item className={classes.messageBox} style={{ marginLeft: 8, marginRight: 56 }}>
            <FormattedText
              text={message.body}
              className={classes.messageText}
              onChangeLocation={onClose}
            />
            <Timestamp />
          </Grid>
        </Grid>
      );
    }
  }

  render() {
    const {
      classes,
      open,
      onClose,
      onBack,
      user,
      currentSession,
      messages,
      width,
      chatId
    } = this.props;

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
                  <Link to={`/${user.slug}`} className={classes.userLink}>
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
                  </Link>
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
            chatId={chatId}
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
    const { currentSession, onUserSelected, classes, onOpenChat } = this.props;

    return (
      <ListItem
        key={chat.id}
        button
        onClick={() => {
          onUserSelected(chat.contact);
          onOpenChat(chat.id);
        }}
      >
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

const ChatsDialogWithWidth = withWidth()(ChatsDialog);

class ChatDialogLoader extends React.Component {
  state = {
    user: null,
    chat: null
  };

  componentDidMount() {
    this.setState({ user: this.props.user });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.user });
  }

  render() {
    const { currentSession, open, onClose, ...props } = this.props;

    let offset = 0;
    let limit = 12;

    if (!currentSession) {
      return null;
    }

    return (
      <ResponsiveDialog open={open} onClose={onClose}>
        {open && !this.state.user && (
          <Query
            query={GET_CHATS}
            fetchPolicy="network-only"
            variables={{ sort: "latest", offset, limit }}
            pollInterval={parseInt(process.env.MESSAGES_REFRESH_INTERVAL)}
          >
            {({ data, loading, error, fetchMore }) => {
              if (loading || error || !data.chats) {
                return null;
              }

              return (
                <ChatsDialogWithWidth
                  {...props}
                  currentSession={currentSession}
                  open={open}
                  chatId={this.state.chat}
                  onClose={onClose}
                  onOpenChat={e => this.setState({ chat: e })}
                  chats={data.chats}
                  onUserSelected={user => {
                    this.setState({ user });
                  }}
                />
              );
            }}
          </Query>
        )}
        {open && this.state.user && currentSession.user && this.state.chat && (
          <Query
            query={GET_MESSAGES}
            variables={{
              sort: "latest",
              offset,
              chatId: this.state.chat,
              limit
            }}
            fetchPolicy="network-only"
            pollInterval={parseInt(process.env.MESSAGES_REFRESH_INTERVAL)}
          >
            {({ data, loading, error, fetchMore }) => {
              if (loading || error) {
                return null;
              }
              return (
                <ChatDialogWithApollo
                  {...props}
                  currentSession={currentSession}
                  user={this.state.user}
                  open={open}
                  onClose={onClose}
                  chatId={this.state.chat}
                  onOpenChat={e => this.setState({ chat: e })}
                  messages={data.messages}
                  onBack={() => {
                    this.setState({ user: null, chat: null });
                  }}
                />
              );
            }}
          </Query>
        )}
      </ResponsiveDialog>
    );
  }
}

export default withCurrentSession(withStyles(styles)(ChatDialogLoader));
