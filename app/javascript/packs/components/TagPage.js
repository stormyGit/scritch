import React from "react";
import TaggableMedia from "./TaggableMedia";
import PageTitle from "./Global/PageTitle";
import queryString from "query-string";

export default props => {
  const query = queryString.parse(props.location.search);
  const searching = query.q && query.q.length > 0;

  return (
    <React.Fragment>
      <PageTitle>Tag</PageTitle>
      <TaggableMedia sort="latest" {...props} />
    </React.Fragment>
  );
};
