import React, { useState, useContext, useEffect} from 'react';
import GroupsService from '../Services/GroupsService';
import CreateGroup from './CreateGroup';
import { Link } from 'react-router-dom';

const Groups = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        GroupsService.getGroups().then(data => {
            setGroups(data);
        })
    }, []);

    const groupsElements = groups.map(group => {
        return (
            <div key={group.id}>
                <Link 
                    to={{
                        pathname:'/group',
                        state: { groupId: group.id }
                            }}>{group.name}</Link>
                <p>{group.description}</p>
            </div>
        );
    });

    const addCreatedGroupToState = (createdGroup) => {
        let currentGroups = [...groups];
        currentGroups.push(createdGroup);
        setGroups(currentGroups);
    }

    return (

        <div>
            <CreateGroup groupCreated={createdGroup => addCreatedGroupToState(createdGroup)}/>
            <h1>All existing groups</h1>
            {groupsElements}
        </div>
    )
}

export default Groups;