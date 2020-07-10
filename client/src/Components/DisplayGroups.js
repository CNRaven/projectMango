import React, { useState, useContext, useEffect} from 'react';
import GroupsService from '../Services/GroupsService';
import CreateGroup from './CreateGroup';
import { Link } from 'react-router-dom';
import './DisplayGroups.css'

const DisplayGroups = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        GroupsService.getGroups().then(data => {
            setGroups(data);
        })
    }, []);

    const groupsElements = groups.map(group => {
        return (
            <div className='groupElement' key={group.id}>
                <Link 
                    to={{
                        pathname:'/group',
                        state: { groupId: group.id }
                            }}>{group.name}</Link>
            </div>
        );
    });

    return (

        <div>
            <h3>{groupsElements}</h3>
        </div>
    )
}

export default DisplayGroups;