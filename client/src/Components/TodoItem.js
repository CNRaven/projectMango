import React from 'react';
import './Todos.css';
const TodoItem = props =>{
    return (
        <React.Fragment>
        {console.log(props)}
        <li>{props.todo.name}</li>
        </React.Fragment>
    )
}

export default TodoItem;