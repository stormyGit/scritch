import React from 'react';
import { withApollo } from 'react-apollo';

class PageTitle extends React.Component {
  componentDidMount() {
    this.props.client.writeData({ data: { pageTitle: this.props.children }});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.children !== nextProps.children) {
      this.props.client.writeData({ data: { pageTitle: nextProps.children }});
    }
  }

  render() {
    return (null);
  }
}

export default withApollo(PageTitle);
