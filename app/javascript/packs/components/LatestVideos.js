import React from 'react';
import Media from './Media';
import PageTitle from './PageTitle';

export default (props) => (
  <React.Fragment>
    <PageTitle>Latest videos</PageTitle>
    <Media sort="latest" {...props} />
  </React.Fragment>
)
