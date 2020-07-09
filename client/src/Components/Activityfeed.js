import React, {useState,useContext,useEffect} from 'react';
import AuthService from '../Services/AuthService';
import ActivityFeedService from '../Services/ActivityFeedService';
// import Message from './Message';
// import { AuthContext } from '../Context/AuthContext';
// import './profile.css';

const Activityfeed = () => {

    const [activityFeed,setActivityFeed] = useState();
    const [textInput,setTextInput] = useState({
        text: ""        }
    );

    const onChange = e => {
        setTextInput({
            [e.target.name]: e.target.value,
        });
        console.log(textInput);
    }

    useEffect(()=>{
        ActivityFeedService.getActivityFeed().then(data =>{
            setActivityFeed(data);
            console.log('data', data);
            console.log('data for activityFeed', data.activityfeed);
            // console.log('data.user_profile', data.user_profile);
        });
    },[]);


    const onSubmit = e =>{
        // e.preventDefault();
        ActivityFeedService.postActivityFeed(textInput).then(data=>{
        setTextInput({text:""})
        });
    }

    if (!activityFeed) {
        return <div>No data</div>;
    }

    return(
        <div>
            <div className="cl left">
                <div className="box">
                    <h2>Post a status</h2>
                    <form className='profileUp' onSubmit={onSubmit}>
                        <label htmlFor="activityfeed-item">what's on your mind? </label><br />
                        <input 
                            name="text"
                            id="activityfeed-item"
                            type="text"
                            value={textInput.text}
                            onChange={onChange}
                        />

                        <button type="submit">Update</button> 

                    </form>

                    <hr />
                    <div>
                    {
                        activityFeed.activityfeed.map((feed)=> {
                            if(activityFeed) {
                                return (
                                    <div key={feed._id}>
                                        {feed.text} <br /> 
                                        {feed.date}
                                        <hr />
                                    </div>
                                )
                            }
                            
                        } )
                    }
                    </div>
                </div>
            </div>
        </div>
)}

export default Activityfeed;