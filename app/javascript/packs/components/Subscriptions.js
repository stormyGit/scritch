import React from "react";
import Media from "./Media/Media";
import PageTitle from "./Global/PageTitle";

export default props => (
  <React.Fragment>
    <PageTitle>Subscriptions</PageTitle>
    <Media sort="subscriptions" {...props} />
  </React.Fragment>
);
