import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Query, withApollo } from 'react-apollo';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import uuid from 'uuid/v4';

import UserAvatar from './UserAvatar';

import { GET_USERS } from '../queries';

const MENTION_REGEXP = new RegExp('[a-zA-Z0-9-_]');

class InteractiveTextInput extends React.Component {
  state = {
    searchingUser: false,
    anchorEl: null,
    q: '',
    users: [],
  }

  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  componentDidMount() {
    this.setState({ anchorEl: uuid() });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.searchUser(nextProps.value);
    }
  }

  searchUser(value) {
    const position = this.input.current.selectionStart;
    const q = this.getQuery(value);

    if (q === null) {
      this.setState({ users: [] });
      return;
    }

    this.props.client.query({
      query: GET_USERS,
      variables: {
        q,
        limit: 6,
        offset: 0,
        fillWithFollowing: true,
      }
    }).then(({ data }) => {
      this.setState({ users: data.users })
    });
  }

  getQuery(value) {
    let q = '';
    let start = this.input.current.selectionStart;
    if (start > value.length) {
      start = value.length;
    }

    for (; start < value.length; start++) {
      const char = value[start];

      if (!char.match(MENTION_REGEXP)) {
        break;
      }
    }

    for (let position = start; position > 0; position--) {
      const char = value[position - 1];

      if (char.match(MENTION_REGEXP)) {
        q = char + q;
      } else if (char === '@') {
        return (q);
      } else {
        break;
      }
    }

    return (null);
  }

  insertUser(user) {
    const value = this.props.value;

    let start = this.input.current.selectionStart;
    if (start > value.length) {
      start = value.length;
    }

    for (; start < value.length; start++) {
      const char = value[start];

      if (!char.match(/[a-zA-Z0-9-_]/)) {
        break;
      }
    }
    let stringEnd = value.slice(start, value.length);
    if (stringEnd.length === 0) {
      stringEnd = ' ';
    }

    let position;
    for (position = start; position > 0; position--) {
      const char = value[position - 1];

      if (!char.match(MENTION_REGEXP) && char !== '@') {
        break;
      }
    }
    const stringStart = value.slice(0, position);
    const newValue = `${stringStart}@${user.slug}${stringEnd}`;
    const selectionStart = stringStart.length + user.slug.length + 2;

    this.props.onChange({ target: { value: newValue }});
    this.input.current.value = newValue;
    this.input.current.setSelectionRange(selectionStart, selectionStart);
    this.input.current.focus();
    this.setState({ users: [] });
  }

  render() {
    if (!this.state.anchorEl) {
      return (null);
    }

    return (
      <div style={{ position: 'relative' }}>
        <TextField
          {...this.props}
          inputProps={{
            ...this.props.inputProps,
            ref: this.input
          }}
        />
        <div id={this.state.anchorEl} style={{ marginTop: 32, position: 'absolute' }}></div>
        <Menu
          style={{ left: 0 }}
          anchorEl={document.getElementById(this.state.anchorEl)}
          open={this.state.users.length > 0}
          onClose={() => this.setState({ users: [] })}
          disableAutoFocusItem
          disableAutoFocus
          disableEnforceFocus
        >
          {
            this.state.users.map((user) => (
              <MenuItem
                key={user.id}
                dense={false}
                style={{ height: 32 }}
                onClick={() => this.insertUser(user)}
              >
                <UserAvatar user={user} />
                <ListItemText primary={`@${user.slug}`} />
              </MenuItem>
            ))
          }
        </Menu>
      </div>
    );
  }
}

export default withApollo(InteractiveTextInput);
