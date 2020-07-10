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
            <div className='groupElement' key={group.id}>
                <Link 
                    to={{
                        pathname:'/group',
                        state: { groupId: group.id }
                            }}>{group.name}</Link>   
            </div>
             
        );
    });

    const addCreatedGroupToState = (createdGroup) => {
        let currentGroups = [...groups];
        currentGroups.push(createdGroup);
        setGroups(currentGroups);
    }

    return (
        <React.Fragment>
        
        <div className='left'>
            <div className='box'><h1>All existing groups</h1>
            {groupsElements}</div></div>
            <div className='middle'><div className='box'><CreateGroup groupCreated={createdGroup => addCreatedGroupToState(createdGroup)}/>
        </div></div>
        <div className='right'><img src='workout4.svg' className='workoutImg'></img></div>
            
        
        </React.Fragment>
    )
}

export default Groups;