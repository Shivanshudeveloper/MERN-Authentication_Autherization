import React, {useContext} from 'react';
import { AuthContext } from './Context/AuthContext';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './Components/Navbar';
import Home from './Components/Home';
import {BrowserRouter as Router, Route} from 'react-router-dom';


function App() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext); 
  console.log(user);
  console.log(isAuthenticated);
  return (
    <Router>
      <Navbar />
      
      <Route exact path="/" component={Home} />

    </Router>
  );
}

export default App;
