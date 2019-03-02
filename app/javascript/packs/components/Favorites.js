import React from "react";
import Media from "./Media/Media";
import PageTitle from "./Global/PageTitle";
import queryString from "query-string";
import Typography from "@material-ui/core/Typography";

export default props => {
  const query = queryString.parse(props.location.search);

  return (
    <React.Fragment>
      <PageTitle>Favorites Gallery</PageTitle>
      <Media faves={true} sort="latest" {...props} />
    </React.Fragment>
  );
};
