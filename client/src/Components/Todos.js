import React, {useState,useContext,useEffect} from 'react';
import TodoItem from './TodoItem';
import TodoService from '../Services/TodoService';
import Message from './Message';
import { AuthContext } from '../Context/AuthContext';
import './Todos.css';

const Todos = props =>{
    const [todo,setTodo] = useState({name : ""});
    const [todos,setTodos] = useState([]);
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);
    
    useEffect(()=>{
        TodoService.getTodos().then(data =>{
            setTodos(data.todos);
        });
    },[]);

    const onSubmit = e =>{
        e.preventDefault();
        TodoService.postTodo(todo).then(data =>{
            const { message } = data;
            resetForm();
            if(!message.msgError){
                TodoService.getTodos().then(getData =>{
                    setTodos(getData.todos);
                    setMessage(message);
                });
            }
            else if(message.msgBody === "UnAuthorized"){
                setMessage(message);
                authContext.setUser({username : "", role : ""});
                authContext.setIsAuthenticated(false);
            }
            else{
                setMessage(message);
            }
        });
    }

    const onChange = e =>{
        setTodo({name : e.target.value});
    }

    const resetForm = ()=>{
        setTodo({name : ""});
    }

    return(
        <React.Fragment>
        <div classname= 'right'><div className='box'><h2>Test</h2></div></div>
        <div classname='cl right'><div className='box'><h2>Achievements</h2>            
            <ul className="list-group">
                {/* {
                    todos.map(todo =>{
                        return <TodoItem key={todo._id} todo={todo}/>
                    })
                } */}
                <li>Test1</li>
                <li>Test2</li>
                <li>Test3</li>
            </ul>
            <br/>
            <form className='todo' onSubmit={onSubmit}>
                <input type="text" 
                       name="todo" 
                       value={todo.name} 
                       onChange={onChange}
                       className="form-control"
                       placeholder="Please Enter Todo"/>
                <button className="btn btn-lg btn-primary btn-block" 
                        type="submit">Submit</button>
            </form>
            {message ? <Message message={message}/> : null}
            </div>
        </div>

        
        </React.Fragment>
    );

}

export default Todos;