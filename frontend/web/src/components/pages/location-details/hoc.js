import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function withRouter(Component) {
  return props => {
    const params = useParams();
    const navigate = useNavigate();
    // ... other react-router v6 hooks

    return <Component {...props} params={params} navigate={navigate} />;
  };
}
