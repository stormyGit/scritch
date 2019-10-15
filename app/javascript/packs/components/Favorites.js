import React from "react";
import Media from "./Media/Media";
import PageTitle from "./Global/PageTitle";
import queryString from "query-string";

export default props => {
  return (
    <React.Fragment>
      <PageTitle>Favorites Gallery</PageTitle>
      <Media faves={true} sort="latest" {...props} />
    </React.Fragment>
  );
};
