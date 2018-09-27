import React from 'react';
import { GET_SESSION } from '../queries';
import { Query } from 'react-apollo';

export default (component) => (props) => (
  <Query query={GET_SESSION}>
    {({ loading, error, data }) => {
      if (loading) {
        return (null);
      }
      return (React.createElement(component, { ...props, currentSession: data.session }));
    }}
  </Query>
)
