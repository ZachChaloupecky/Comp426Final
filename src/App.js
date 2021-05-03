
import React from 'react';
import { AuthProvider } from './components/contexts/AuthContext';
import Signup from './components/Signup';
import Profile from './Profile'
import Gameview from './components/Gameview'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import Music from './components/Music';

function App() {


  return (
    
    <>
<Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Profile}></PrivateRoute>
          <Route path="/signup" component={Signup}></Route>
          <Route path ="/login" component={Login}></Route>
          <PrivateRoute exact path="/game" component={Gameview}></PrivateRoute>
        </Switch>
      </AuthProvider>
    </Router>    
    <Music/>
    </>
  );
}

export default App;
