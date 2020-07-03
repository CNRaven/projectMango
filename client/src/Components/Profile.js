import React, {useState,useContext,useEffect} from 'react';
import AuthService from '../Services/AuthService';
import ProfileService from '../Services/ProfileService';
// import Message from './Message';
import { AuthContext } from '../Context/AuthContext';

const Profile = () =>{
    //display profile from get request
    const [message,setMessage] = useState(null);

    const [profile,setProfile] = useState({name: "", age: "", location: "", interests: "", about: "", goals: ""});

    const onChange = e => {
        setProfile({...profile, [e.target.name]: e.target.value, [e.target.age]: e.target.value, [e.target.location]: e.target.value, [e.target.interests]: e.target.value, [e.target.about]: e.target.value, [e.target.goals]: e.target.value});
        console.log(profile);
    }

    //testing
    // const [profileName,setProfileName] = useState();

    //error handling
    // const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);
    
    // get request
    useEffect(()=>{
        ProfileService.getProfile().then(data =>{
            setProfile(data.user_profile);
            // console.log(data.user_profile);
            // console.log('data.user_profile', data.user_profile);
        });
    },[]);

    //hooks for post
    // const [profileAge,setProfileAge] = useState();
    // const [profileLocation,setProfileLocation] = useState();
    // const [profileInterests,setProfileInterests] = useState();
    // const [profileAbout,setProfileAbout] = useState();
    // const [profileGoals,setProfileGoals] = useState();



    const onSubmit = e =>{
        e.preventDefault();
        AuthService.update(user).then(data=>{
            // const { message } = data;
            // setMessage(message);
            // resetForm();
            // if(!message.msgError){
            //     timerID = setTimeout(()=>{
                    props.history.push('/login');
            //     },2000)
            // }
        });
    }
    /*
    const onSubmit = e =>{
        e.preventDefault();
        ProfileService.postProfile(profile).then(data =>{

            const { message } = data;
            setMessage(message);
            resetForm();
            if(!message.msgError){
                timerID = setTimeout(()=>{
                    props.history.push('/profile');
                },1000)
            }
            setTodos(getData.todos);
            
            const { message } = data;
            if(!message.msgError){
                ProfileService.getProfiles().then(getData =>{
                    
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
*/

    // const onChange = e =>{
    //     setProfile({name : e.target.value});
    //     console.log('onChange', profile);
    // }

    if (!profile) {
        return <div>No data</div>;
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="profile-name">Enter your name: </label><br />
                <input 
                    name="name"
                    id="profile-name"
                    type="text"
                    value={profile.name}
                    onChange={onChange}
                />
                 <br />
                <label htmlFor="profile-ageUser">Your age:</label> <br />
                <input 
                     name="age"
                     id="profile-ageUser"
                     type="text"
                     value={profile.age}
                     onChange={onChange}
                />
                <br />
                <label htmlFor="profile-locationUser">Location:</label> <br />
                <input
                    name="location"
                    id="profile-locationUser"
                    type="text"
                    value={profile.location}
                    onChange={onChange} 
                />
                <br />
                <label htmlFor="profile-interestsUser">Your interests:</label> <br />
                <input 
                    name="interests"
                    id="profile-interestsUser"
                    type="text"
                    value={profile.interests}
                    onChange={onChange} 
                />
                <br />
                <label htmlFor="profile-aboutUser">About:</label> <br />
                <input     
                    name="about"
                    id="profile-aboutUser"
                    type="text"
                    value={profile.about}
                    onChange={onChange}  
                />
                <br />
                <label htmlFor="profile-goalsUser">Your Goals:</label> <br />
                <input
                    name="goals"
                    id="profile-goalsUser"
                    type="text"
                    value={profile.goals}
                    onChange={onChange}  
                />
                <br /> 
                <button type="submit">Update</button> 
            </form>
         
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