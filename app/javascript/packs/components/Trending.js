import React from "react";
import Assets from "./Assets";
import PageTitle from "./PageTitle";

export default props => (
  <React.Fragment>
    <PageTitle>Databases</PageTitle>
    <Assets {...props} />
  </React.Fragment>
);
