import React from 'react';
import Media from './Media';
import PageTitle from './PageTitle';
import queryString from 'query-string';

export default (props) => {
  const query = queryString.parse(props.location.search)
  const searching = query.q && query.q.length > 0;

  return (
    <React.Fragment>
      <PageTitle>{searching ? "Search" : "Latest Videos"}</PageTitle>
      <Media sort="latest" {...props} />
    </React.Fragment>
  )
}
