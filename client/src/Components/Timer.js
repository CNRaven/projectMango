import React, {useState, useEffect} from 'react';
import './Timer.css';
import WorkoutService from '../Services/WorkoutService';

const Timer = () => {

    const [workouts,setWorkouts] = useState(null);

    const timer = new Date().toLocaleTimeString();
    console.log(timer);

    useEffect(()=>{
        WorkoutService.getWorkout().then(data =>{
            setWorkouts(data.workout);
            // console.log(data);
            // console.log('data.user_profile', data.user_profile);
        }).then();
    },[]);

    
    if(!workouts) {
       return <h3>No data</h3>
    }

    return(
        <div>
            <h1>Timer</h1>
            <div className='timer-container'>
                <div className='column-left'>
                    <h1>Suleman's easy workout</h1>
                    <div>
                        <h2>Work out number 231!</h2>
                        <h2>Completed 230 Workouts</h2>
                    </div>
                    <div>
                        <div>
                            Timer Goes here
                        </div>
                        <div>
                            Pause/Resume
                        </div>
                    </div>
                    <div>
                        <div>STAR JUMPS</div>
                        <div>NEXT</div>
                    </div>
                    <div>
                        <div>Number of Rounds</div>
                        <div>Length of round</div>
                        <div>Work Time
                        Rest time (15 seconds)</div>
                    </div>
                </div>
                <div className='column-right'>
 
                </div>
            </div>
        </div>
    )
}

export default Timer;