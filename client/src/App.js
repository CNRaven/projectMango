import React from 'react';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Home from './Components/Home';
import Todos from './Components/Todos';
import Register from './Components/Register';
import Admin  from './Components/Admin';
import Profile  from './Components/Profile';
import Timer  from './Components/Timer';
import Getallusers  from './Components/Getallusers';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css'

function App() {
  return (
    <div className="container">
      <Router>
        <Navbar/>
        <Route exact path="/" component={Home}/>
        <UnPrivateRoute path="/login" component={Login}/>
        <UnPrivateRoute path="/register" component={Register}/>
        <PrivateRoute path="/todos" roles={["user","admin"]} component={Todos}/>
        <PrivateRoute path="/timer" roles={["user","admin"]} component={Timer}/>
        <PrivateRoute exact path="/profile" roles={["user","admin"]} component={Profile}/>
        <PrivateRoute path="/admin" roles={["admin"]} component={Admin}/>
        <PrivateRoute path="/getusers" roles={["admin"]} component={Getallusers}/>
      </Router>
    </div>
  );
}

export default App;
