import React, {useState,useContext,useEffect} from 'react';
import AdminService from '../Services/AdminService';
import { AuthContext } from '../Context/AuthContext';

const Getallusers = () =>{
    //display all profiles from get request
    const [message,setMessage] = useState(null);
    const [users,setUsers] = useState(null);

    useEffect(()=>{
        AdminService.getUsers().then(data =>{
            setUsers(data);
            console.log(data);
        });
    },[]);

    return (
        <div>
            <h1>All Users</h1>
            {console.log(users)}
        </div>
    )
}

export default Getallusers;