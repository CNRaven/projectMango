import React from 'react';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './Signin.css'
import Register from './Components/Register';

function Signin() {
  return (
    <div className="container-signin">
        
        <div className='signcolumn sleft'>
        <img src='logo2.svg' className='logo'></img>
            <Register />
        </div>
        <div className='signcolumn sright'>
          <div className='description'>
            <h1>TEST</h1>
            <h2>Praesent congue neque id lectus imperdiet molestie. </h2>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at rhoncus sapien. Curabitur vestibulum sodales lorem ut eleifend. Sed placerat scelerisque aliquam. Morbi metus tortor, finibus at tortor mollis, viverra consectetur lectus. Maecenas ac erat sit amet purus cursus gravida. Vestibulum quis risus aliquam, imperdiet arcu et, finibus magna. In tempor risus sit amet orci malesuada, sed commodo augue iaculis. Etiam tristique metus ac tellus dictum facilisis. Aenean in vulputate quam, gravida gravida ipsum. Proin vehicula elit et dolor iaculis mattis. Curabitur euismod leo ligula, eget luctus velit pellentesque sed. Sed nec ante quis tellus venenatis sagittis sit amet at arcu. Nunc luctus urna commodo odio pellentesque condimentum. Vivamus ullamcorper semper est nec sollicitudin. Proin feugiat ipsum lorem, ac vulputate dolor lacinia a.</span>
          </div>
        </div>
    </div>
  );
}

export default Signin;
