import React from "react";
import Media from "./Media/Media";
import PageTitle from "./Global/PageTitle";
import queryString from "query-string";
import Typography from "@material-ui/core/Typography";

export default props => {
  const query = queryString.parse(props.location.search);

  return (
    <React.Fragment>
      <PageTitle>Home</PageTitle>
      <div style={{ paddingTop: 30, paddingLeft: 30 }}>
        <Typography variant="h4">Latest Pictures</Typography>
      </div>
      <Media home={true} sort="latest" limit={12} {...props} />
      <div style={{ paddingTop: 5, paddingLeft: 30 }}>
        <Typography variant="h4">Most Scritched</Typography>
      </div>
      <Media home={true} sort="scritches" limit={12} {...props} />
      <div style={{ paddingTop: 5, paddingLeft: 30 }}>
        <Typography variant="h4">Random Pictures</Typography>
      </div>
      <Media home={true} sort="random" limit={12} {...props} />
    </React.Fragment>
  );
};
