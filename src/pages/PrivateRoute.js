import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({children, ...rest}) => {

  const {isAuthenticated, user, isLoading} = useAuth0();
  const isUser = isAuthenticated && user;

  // ----- IMPORTANT -----
  // console.log({isAuthenticated, user, isLoading})

  // we add PrivateRoute component to check isUser, true or false. if true display dashboard else display login form.

  // once user click login | signup button , isAuthenticated = false, user = undifined & isLoading = true, because of isLoading = true he will again redirect to browser login page.

  // to prevent this we add AuthWrapper component, in there we will show spinner until isLoading will become false. 

  return (
    <Route {...rest} render={() => {
      return(
        isUser ? children : <Redirect to='/login'></Redirect>
      );
    }}></Route>
  );
};
export default PrivateRoute;
