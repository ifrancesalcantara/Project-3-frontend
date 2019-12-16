import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";

function AnonRoute({ component: Component, isLoggedIn, isLoading, ...rest }) {
  if (isLoading) {
    return <h1>Loading</h1>;
  } else {
    return (
      <Route
        {...rest}
        render={props =>
          !isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }
}

export default withAuth(AnonRoute);
