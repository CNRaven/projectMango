import React, {useState,useContext,useEffect} from 'react';
import AdminService from '../Services/AdminService';
import { AuthContext } from '../Context/AuthContext';
import './Admin.css';

const Admin = ()=>{
    const [message,setMessage] = useState('');
    const [users,setUsers] = useState([]);
    const authContext = useContext(AuthContext);

    useEffect(()=>{
        AdminService.getUsers().then(data =>{
            setUsers(data.document);
            console.log(data.document);
        });
    },[]);

    const removeUserFromState = (user) => {
        let currentUsers = [...users];
        let foundUserIndex = 0;
        currentUsers.forEach(currentUser => {
            if (currentUser._id == user._id) {
                return;
            }
            foundUserIndex++;
        });
        if (foundUserIndex !== -1) {
            currentUsers.splice(foundUserIndex, 1);
        }

        setUsers(currentUsers);
    }

    const deleteUserBtnHandler = (user) => {
        AdminService.deleteUser(user).then(response => {
            // error deleting the user
            if (response.message) {
                setMessage('Failed to delete the user');
            } else {
                // successfully deleted the user
                removeUserFromState(user);
                setMessage(response);
            }
        });
    }

    const table = users.map((user, id)=> {
        let deleteUserBtn = null;
        if (authContext.user.username == user.username) {
            deleteUserBtn = (
                <p>N/A</p>
            );
        } else {
            deleteUserBtn = (
                <button onClick={() => deleteUserBtnHandler(user)} className="remove-button">Delete</button>
            );
        }

        return(
            <tr key={id}>
                <td>{ user.username }</td>
                <td>{ user.name }</td>
                <td>{ user.location }</td>
                <td>{ user.role }</td>
                <td> 
                    {deleteUserBtn}
                </td>
            </tr>
        );
    })

    if(!users) {
        return (
            <p>Failed to retrieve the users.</p>
        )
    }
    return(
        <div className='middle'>
            <div className='box'>
            <h1>Admin Page</h1>
                
            <table className="center">
                <tbody>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Role</th>
                        <th scope="col">Delete</th>
                    </tr>
                    {table}
                </tbody>
            </table>
            {
                message 
                ? <p>{message}</p>
                : null
            }
            <br />  
            </div>  
        </div>
    )
}

export default Admin;