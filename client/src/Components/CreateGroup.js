import React, { useState, useContext, useEffect} from 'react';
import GroupsService from '../Services/GroupsService';

const CreateGroup = ({ groupCreated }) => {
    const [group, setGroup] = useState({
        name: "",
        description: ""
    });

    const onChange = e =>{
        setGroup({
            ...group,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e =>{
        e.preventDefault();
        GroupsService.createGroup(group).then(data=> {
            resetGroupDetailsInState();
            groupCreated(data);
        });
    }

    const resetGroupDetailsInState = () => {
        setGroup({
            name: "",
            description: ""
        });
    }

    return (
        <div>
            <h1>Create a group:</h1>
            <form className='register' onSubmit={onSubmit}>
                <label htmlFor="group-name">Group name:</label><br />
                <input 
                        name="name"
                        id="group-name"
                        type="text"
                        value={group.name}
                        onChange={onChange}
                />
                <label htmlFor="group-description">Group description:</label><br />
                <input 
                        name="description"
                        id="group-description"
                        type="text"
                        value={group.description}
                        onChange={onChange}
                />
                <button type="submit">Create group</button>
            </form>
        </div>
    )
}

export default CreateGroup;