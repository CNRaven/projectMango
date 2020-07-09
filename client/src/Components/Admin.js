import React, {useState,useContext,useEffect} from 'react';
import AdminService from '../Services/AdminService';
import { AuthContext } from '../Context/AuthContext';
import './Admin.css';

const Admin = ()=>{
    const [message,setMessage] = useState(null);
    const [users,setUsers] = useState(null);

    useEffect(()=>{
        AdminService.getUsers().then(data =>{
            setUsers(data.document);
            console.log(data.document);
        });
    },[]);

    // console.log(users);

    if(!users) {
        return <p>No data</p>
    }
    return(
        <div>
            <h1>Admin Page</h1>
                
            <table className="center">
                <tbody>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Role</th>
                    </tr>
                    {
                        users.map((user)=> {
                            return(
                                <tr >
                                    <td>{ user.username }</td>
                                    <td>{ user.name }</td>
                                    <td>{ user.location }</td>
                                    <td>{ user.role }</td>
                                    <td> 
                                        <form action="/del" method="post">
                                            <button type="submit" className="remove-button" name="remove" value="{user._id}" >Delete</button>
                                        </form>
                                    </td>
                                </tr>
                            );
                        } )
                    }
                </tbody>
            </table>
            <br />    
        </div>
    )
}

export default Admin;