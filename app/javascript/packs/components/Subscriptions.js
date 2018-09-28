import React from 'react';
import Media from './Media';
import PageTitle from './PageTitle';

export default (props) => (
  <React.Fragment>
    <PageTitle>Subscriptions</PageTitle>
    <Media sort="subscriptions" {...props} />
  </React.Fragment>
)
