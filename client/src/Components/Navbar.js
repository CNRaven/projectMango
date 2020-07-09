import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import './Navbar.css'

const Navbar = props =>{
    const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);
    
    const onClickLogoutHandler = ()=>{
        AuthService.logout().then(data=>{
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    }

    const unauthenticatedNavBar = ()=>{
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">
                        HOME
                    </li>
                </Link>  
                <Link to="/login">
                    <li className="nav-item nav-link">
                        LOGIN
                    </li>
                </Link>  
                <Link to="/register">
                    <li className="nav-item nav-link">
                        REGISTER
                    </li>
                </Link>
            </>
        )
    }

    const authenticatedNavBar = ()=>{
        return(
            <>
                <Link to="/">
                    <li className="nav-item nav-link">
                        HOME
                    </li>
                </Link> 
                <Link to="/todos">
                    <li className="nav-item nav-link">
                        TODOS
                    </li>
                </Link> 
                <Link to="/profile">
                    <li className="nav-item nav-link">
                        PROFILE
                    </li>
                </Link>                
                <Link to="/timer">
                    <li className="nav-item nav-link">
                        TIMER
                    </li>
                </Link>
                <Link to="/workoutnew">
                    <li className="nav-item nav-link">
                        Workout new
                    </li>
                </Link>
                {/* <Link to="/getusers">
                    <li className="nav-item nav-link">
                        All users
                    </li>
                </Link> */}
                {
                    user.role === "admin" ? 
                    <Link to="/admin">
                        <li className="nav-item nav-link">
                            ADMIN
                        </li>
                    </Link> : null
                }  
                <button type="button" className="logout-btn" onClick={onClickLogoutHandler}>
                    LOGOUT
                </button>
            </>
        )
    }
    return(
        <div className='navbar-container'>
            <div className='navbar-wrapper'>
            <img src='logo2.svg' className='logo_navbar'></img>
                <div>
                    <ul>
                        { !isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;