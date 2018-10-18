import React from 'react';
import { withApollo } from 'react-apollo';

class PageTitle extends React.Component {
  componentDidMount() {
    this.setPageTitle(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.children !== nextProps.children) {
      this.setPageTitle(nextProps);
    }
  }

  setPageTitle(props) {
    props.client.writeData({ data: { pageTitle: props.children }});
    document.title = `${props.children} | ${process.env.SITE_NAME}`;
  }

  render() {
    return (null);
  }
}

export default withApollo(PageTitle);
