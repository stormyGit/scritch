import React from "react";
import MediaTagging from "./Media/MediaTagging";
import PageTitle from "./Global/PageTitle";
import queryString from "query-string";

export default props => {
  const query = queryString.parse(props.location.search);
  const searching = query.q && query.q.length > 0;

  return (
    <React.Fragment>
      <PageTitle>Tag</PageTitle>
      <MediaTagging {...props} />
    </React.Fragment>
  );
};
