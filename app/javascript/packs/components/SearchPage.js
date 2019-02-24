import React from "react";
import Media from "./Media/Media";
import Fursuits from "./Fursuits/Fursuits";
import Makers from "./Makers/Makers";
import Events from "./Events/Events";
import PageTitle from "./Global/PageTitle";
import queryString from "query-string";
import Typography from "@material-ui/core/Typography";

export default props => {
  const query = queryString.parse(props.location.search);
  const searching = query.q && query.q.length > 0;
  if (!searching) props.history.push("/");

  return (
    <React.Fragment>
      <PageTitle>{`Searching: ${query.q}`}</PageTitle>
      <div style={{ paddingTop: 5, paddingLeft: 30 }}>
        <Typography variant="h4">Events</Typography>
      </div>
      <Events searching={true} {...props} />
      <div style={{ paddingTop: 5, paddingLeft: 30 }}>
        <Typography variant="h4">Makers</Typography>
      </div>
      <Makers searching={true} {...props} />
      <div style={{ paddingTop: 5, paddingLeft: 30 }}>
        <Typography variant="h4">Fursuits</Typography>
      </div>
      <Fursuits searching={true} {...props} />
    </React.Fragment>
  );
};
