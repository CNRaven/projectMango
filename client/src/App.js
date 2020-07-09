import React from 'react';
import Navbar from './Components/Navbar';

import Login from './Components/Login';
import Signin from './Signin';
import Home from './Components/Home';
import Todos from './Components/Todos';
import Register from './Components/Register';
import Admin  from './Components/Admin';
import Profile  from './Components/Profile';
import Timer  from './Components/Timer';
import Workoutnew  from './Components/Workoutnew';
import Workoutedit  from './Components/Workoutedit';
import Activityfeed  from './Components/Activityfeed';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css'

function App() {
  return (
    <div>
      <Router>
      <Navbar />
        <div className="container">
          <div className='wrapper'>
          <Route exact path="/" component={Home}/>
          <UnPrivateRoute path="/login" component={Login}/>
          {/* <UnPrivateRoute path="/signin" component={Signin}/> */}
          
          <UnPrivateRoute path="/register" component={Register}/>
          <PrivateRoute path="/todos" roles={["user","admin"]} component={Todos}/>
          <PrivateRoute path="/timer" roles={["user","admin"]} component={Timer}/>
          <PrivateRoute exact path="/profile" roles={["user","admin"]} component={Profile}/>
          <PrivateRoute exact path="/workoutnew" roles={["user","admin"]} component={Workoutnew}/>
          <PrivateRoute exact path="/workoutedit" roles={["user","admin"]} component={Workoutedit}/>
          <PrivateRoute exact path="/activityfeed" roles={["user","admin"]} component={Activityfeed}/>
          <PrivateRoute path="/admin" roles={["admin"]} component={Admin}/>
          </div> 
        </div>
      </Router>
    </div>
  );
}


export default App;



