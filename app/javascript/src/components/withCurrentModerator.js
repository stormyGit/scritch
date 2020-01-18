import React from "react";
import { GET_SESSION_MODERATOR } from "../queries/globalQueries";
import { Query } from "react-apollo";

export default component => props => (
  <Query query={GET_SESSION_MODERATOR}>
    {({ loading, error, data }) => {
      if (loading) {
        return null;
      }
      if (error) {
        return React.createElement(component, {
          ...props
        });
      }
      return React.createElement(component, {
        ...props,
        currentModerator: data.session.user.moderator
      });
    }}
  </Query>
);
