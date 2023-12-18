import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

function App() {
  return (
    <>
      <Route path="/sign-up" exact component={SignUp} />
      <Route path="/sign-in" exact component={SignIn} />
    </>
  );
}
