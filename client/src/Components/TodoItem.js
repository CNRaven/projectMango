import React from 'react';
import './Todos.css';
const TodoItem = props =>{
    return (
        <div>
        {console.log(props)}
        <li>{props.todo.name}</li>
        </div>
    )
}

export default TodoItem;