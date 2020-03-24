import React, {useContext} from 'react';
import { AuthContext } from './Context/AuthContext';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Todo from './Components/Todos';
import Admin from './Components/Admin';
import Register from './Components/Register';

import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import {BrowserRouter as Router, Route} from 'react-router-dom';


function App() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext); 
  console.log(user);
  console.log(isAuthenticated);
  return (
    <Router>
      <Navbar />
      
      <Route exact path="/" component={Home} />
      <UnPrivateRoute path="/login" component={Login} />
      <UnPrivateRoute path="/register" component={Register} />
      <PrivateRoute path="/todos" roles={["user", "admin"]} component={Todo} />
      <PrivateRoute path="/admin" roles={["admin"]} component={Admin} />

    </Router>
  );
}

export default App;
