import React, {useState,useRef,useEffect} from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import './Register.css';

const Register = props=>{
    const [user,setUser] = useState({username: "", password : "", role : ""});
    const [message,setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(()=>{
        return ()=>{
            clearTimeout(timerID);
        }
    },[]);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const resetForm = ()=>{
        setUser({username : "", password : "",role : ""});
    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.register(user).then(data=>{
            const { message } = data;
            setMessage(message);
            resetForm();
            if(!message.msgError){
                timerID = setTimeout(()=>{
                    props.history.push('/login');
                },2000)
            }
        });
    }



    return(
        <React.Fragment>
        <div className='middle'>
            <div className='box'>
            <form className='register' onSubmit={onSubmit}>
                <h1>SIGN UP</h1>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input type="text" 
                       name="username" 
                       value={user.username}
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Username"/>
                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password" 
                       name="password"
                       value={user.password} 
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Password"/>
                <label htmlFor="role" className="sr-only">Role: </label>
                <input type="text" 
                       name="role"
                       value={user.role}  
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter role (admin/user)"/>
                <button className="btn btn-lg btn-primary btn-block" 
                        type="submit">Register</button>
                        <div className='error'>{message ? <Message message={message}/> : null}</div>
                        
            </form>
            </div>
        </div>

        </React.Fragment>
    )
}

export default Register;