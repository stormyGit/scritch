import React from "react";
import PageTitle from "./Global/PageTitle";
import MediaFaved from "./Media/MediaFaved";

export default () => {
  return (
    <React.Fragment>
      <PageTitle>Favorites</PageTitle>
      <MediaFaved />
    </React.Fragment>
  );
};
