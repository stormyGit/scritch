import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SearchBar from 'material-ui-search-bar'
import { grey } from '@material-ui/core/colors'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'

const styles = theme => ({
  root: {
    height: 48,
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginLeft: 24,
    marginRight: 24,
  },
  iconButton: {
    opacity: 0.54,
    transform: 'scale(1, 1)',
    transition: 'transform 200ms cubic-bezier(0.4, 0.0, 0.2, 1)'
  },
  iconButtonHidden: {
    transform: 'scale(0, 0)',
    '& > $icon': {
      opacity: 0
    }
  },
  iconButtonDisabled: {
    opacity: 0.38
  },
  searchIconButton: {
    marginRight: -48
  },
  icon: {
    opacity: 0.54,
    transition: 'opacity 200ms cubic-bezier(0.4, 0.0, 0.2, 1)'
  },
  searchContainer: {
    margin: 'auto 16px',
    width: '100%'
  },
  input: {
    width: '100%',
  }
})

const SettingsSearchBar = (props) => (
  <SearchBar
    {...props}
    searchIcon={
      <SearchIcon style={{ color: grey[50] }} />
    }
    closeIcon={
      <ClearIcon style={{ color: grey[50] }} />
    }
  />
);

export default withStyles(styles)(SettingsSearchBar);
