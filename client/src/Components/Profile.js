import React, {useState,useContext,useEffect} from 'react';
import ProfileService from '../Services/ProfileService';
import Message from './Message';
import { AuthContext } from '../Context/AuthContext';

const Profile = () =>{
    const [profile,setProfile] = useState(null);
    useEffect(()=>{
        ProfileService.getProfile().then(data =>{
            setProfile(data.user_profile);
            console.log(data.user_profile);
            console.log('data.user_profile', data.user_profile);
        });
    },[]);

    if (!profile) {
        return <div>No data</div>;
    }
    return(
        <div>
            <h1> {profile.name} </h1>
            <h1> {profile.age} </h1>
            <h1> {profile.location} </h1>
        </div>
    );

}

export default Profile;



// import React from 'react';

// const Profile = (props) =>{
//     return (
//         <div>
//             {console.log(props)}
//             {/* <li>{props.todo.name}</li> */}

//             <li>check</li>
//         </div>
//         )
// }

// export default Profile;