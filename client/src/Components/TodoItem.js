import React from 'react';

const TodoItem = props =>{
    return (
        <div>
        {console.log(props)}
        <li>{props.todo.name}</li>
        </div>
    )
}

export default TodoItem;