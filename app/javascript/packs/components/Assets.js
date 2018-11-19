import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Events from './Events';
import Makers from './Makers';
import Photographers from './Photographers';
import Fursuits from './Fursuits';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import { Link, withRouter } from 'react-router-dom';

const styles = theme => {
  return ({

  });
};

class Assets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFilter: props.currentFilter || "fursuits",
    };
  }

  componentDidMount() {
  }

  handleChange = (e, value) => {
    console.log(value);
    this.setState({ currentFilter: value });
  }

  render() {
    const {classes, events, eventFilters} = this.props;

    return (
      <div>
        <Tabs
          value={this.state.currentFilter}
          textColor="secondary"
          onChange={this.handleChange}
          centered
          fullWidth
        >
          <Tab label="Fursuits" value="fursuits" />
          <Tab label="Makers" value="makers" />
          <Tab label="Events" value="events" />
        </Tabs>
        {this.state.currentFilter == "events" && <Events />}
        {this.state.currentFilter == "fursuits" && <Fursuits />}
        {this.state.currentFilter == "makers" && <Makers />}
        {this.state.currentFilter == "photographers" && <Photographers />}
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Assets));
