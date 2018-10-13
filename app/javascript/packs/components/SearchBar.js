import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SearchBar from 'material-ui-search-bar'
import { grey } from '@material-ui/core/colors'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import Grid from '@material-ui/core/Grid';
import withWidth from '@material-ui/core/withWidth';

const styles = theme => ({
  root: {
    height: 48,
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 1,
    backgroundColor: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    boxShadow: 'none',
  },
  iconButton: {
    opacity: 0.54,
    transform: 'scale(1, 1)',
    transition: 'transform 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
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
    transition: 'opacity 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
    color: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'
  },
  searchContainer: {
    margin: 'auto 16px',
  },
})

class CustomSearchBar extends React.Component {
  render() {
    const { width, ...props } = this.props;
    return (
      <SearchBar
        {...props}
        searchIcon={
          <SearchIcon
            style={{
              display: (width !== 'lg' && width !== 'xl' ? 'none' : 'block')              
            }}
          />
        }
        closeIcon={
          <ClearIcon
            style={{
              display: (width !== 'lg' && width !== 'xl' ? 'none' : 'block')
            }}
          />
        }
      />
    );
  }
};

export default withStyles(styles)(withWidth()(CustomSearchBar));
