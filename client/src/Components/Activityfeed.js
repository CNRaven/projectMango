import React, {useState,useContext,useEffect} from 'react';
import AuthService from '../Services/AuthService';
import ActivityFeedService from '../Services/ActivityFeedService';
// import Message from './Message';
// import { AuthContext } from '../Context/AuthContext';
import './Activityfeed.css';

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

    const transformDateTimeCreated = (dateTimeCreated) => {
        let dateTime = new Date(dateTimeCreated);
        return 'Date: ' + dateTime.getDate() + '-'
         + dateTime.getMonth() + '-'
         + dateTime.getFullYear() + ', Time: '
         + dateTime.getHours() + ":" +
         + dateTime.getMinutes() + ":" +
         + dateTime.getSeconds();
    }


    if (!activityFeed) {
        return <div>No data</div>;
    }

    return(
        <React.Fragment>
                    <div className='post'>
                    <h3>Post a status</h3>
                    <form className='postboard' onSubmit={onSubmit}>
                        <input 
                            name="text"
                            id="activityfeed-item"
                            type="text"
                            value={textInput.text}
                            onChange={onChange}
                            placeholder='what is on your mind?'
                        />

                        <button type="submit">Add</button> 

                    </form>
                    </div>


                    
                    <div>
                    {
                        activityFeed.activityfeed.map((feed)=> {
                            if(activityFeed) {
                                return (
                                    
                                    <div className='box' key={feed._id}>
                                        <div className='postBoxInfo'>
                                        <img src='avatar.jpg'></img>
                                        <h3>{feed.text}</h3>
                                        <p>{transformDateTimeCreated(feed.date)}</p>
                                        </div>
                                    </div>
                                )
                            }
                            
                        } )
                    }
                    </div>

            </React.Fragment>
)}

export default Activityfeed;