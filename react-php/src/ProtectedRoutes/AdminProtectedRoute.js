import React from "react";
import { Route, Redirect } from "react-router-dom";

/**
     * Protected route to allow only regular guest.
     * @extends Component
     */
export const AdminProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem("isLoggedIn")==="true" && localStorage.getItem("userType")==="admin") {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};