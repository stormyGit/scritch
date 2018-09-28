import React from 'react';
import Media from './Media';
import PageTitle from './PageTitle';

export default (props) => (
  <React.Fragment>
    <PageTitle>Trending</PageTitle>
    <Media sort="trending" {...props} />
  </React.Fragment>
)
