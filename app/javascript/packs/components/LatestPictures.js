import React from "react";
import Media from "./Media/Media";
import PageTitle from "./Global/PageTitle";
import queryString from "query-string";

export default props => {
  const query = queryString.parse(props.location.search);
  const searching = query.q && query.q.length > 0;

  return (
    <React.Fragment>
      <PageTitle>{searching ? "Search" : "Latest Pictures"}</PageTitle>
      <Media sort="latest" {...props} />
    </React.Fragment>
  );
};
