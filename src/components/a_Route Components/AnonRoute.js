import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import LoadingGif from "./../LoadingGif"

function AnonRoute({ component: Component, isLoggedIn, isLoading, ...rest }) {
  if (isLoading) {
    return <LoadingGif/>;
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
