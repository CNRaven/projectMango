import React, {useState, useEffect} from 'react';
import './Timer.css';
import './timer.svg';
import WorkoutService from '../Services/WorkoutService';

const Timer = () => {
    
   

    const [workouts,setWorkouts] = useState(null);
    

    useEffect(()=>{
        WorkoutService.getWorkout().then(data =>{
            setWorkouts(data.workout);
        });
    },[]);

    
    if(!workouts) {
       return <h3>No data</h3>
    }

    const WorkoutElements = workouts.map(workout => {
            return <div className='groupElement'>{workout.name}</div>})

    return(
        
        <React.Fragment>
        
                <h3>{WorkoutElements}</h3>


        </React.Fragment>
    )
}

export default Timer;
