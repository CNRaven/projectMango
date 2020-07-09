import React, {useState, useEffect} from 'react';
import './Timer.css';
import './timer.svg';
import WorkoutService from '../Services/WorkoutService';

const Timer = () => {
    
    let [startTimer, setStartTimer] = useState(false);
    let combined = [];
    let exerciseTime = null;
    let num = -1;

    const [workouts,setWorkouts] = useState(null);
    const [counter, setCounter] = useState(5);
    const [workoutSelected, setWorkoutSelected] = useState(0);

    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');
    const [timerThirty, setTimerThirty] = useState('00');
    const [workoutTime, setWorkoutTime] = useState(30)
    const [workoutIterator, setWorkoutIterator] = useState(0);
    


    let combineWorkouts = () =>{
        combined = [...workouts[0].round1,"BREAK", ...workouts[0].round2, "BREAK", ...workouts[0].round3, "BREAK", ...workouts[0].round4, "BREAK", ...workouts[0].round5];
    }

    const calcTime = (counter) => {
        const minutes = Math.floor(counter / 60);
        const seconds = Math.floor(counter % 60);
        const thirty = Math.floor(counter % workoutTime);

        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
        setTimerThirty(thirty);
    }
    
   var toggleTimer = () => {
    startTimer = !startTimer;
    console.log(startTimer);
    setStartTimer(startTimer);
   }

    useEffect(()=>{
        WorkoutService.getWorkout().then(data =>{
            setWorkouts(data.workout);
        });
    },[]);

    useEffect(() => {
        if(startTimer) {
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);  
            counter > 0 && setTimeout(() => setWorkoutIterator(workoutIterator+1), 30000);  
            calcTime(counter);
        }

      }, [counter, startTimer]);
    
      const timeInputHandler = (e) =>{
        console.log(e.target.value);
        setCounter(e.target.value);
        if(e.target.value == 900) {
            setWorkoutTime(30);
            console.log(30);
        } else if (e.target.value == 1800) {
            setWorkoutTime(60);
            console.log(60);
        } else if (e.target.value == 2700) {
            setWorkoutTime(90);
            console.log(90);
        } else {
            console.log("something went wrong")
        }
      }
      
      const workoutSelectHandler = (e) =>{
        console.log(e.target.value);
        setWorkoutSelected(e.target.value);
      }

    if(!workouts) {
       return <h3>No data</h3>
    }

    return(
        //call combineWorkouts to combine all workouts into a single array
        <React.Fragment>
        
            {combineWorkouts()}

            <div className='left'>
                <div className='box'>
                    <h1>Intervals</h1>
                    <p>15 mins = 30 seconds per exercise</p>
                    <img src='arrow.svg' className='arrow' ></img>
                    <p> 30 second break per round</p>
                    <p>30 mins = 60 seconds per exercise</p>
                    <img src='arrow.svg' className='arrow' ></img>
                    <p> 60 second break per round</p>
                    <p>45 mins = 90 seconds per exercise</p>
                    <img src='arrow.svg' className='arrow' ></img>
                    <p> 90 second break per round</p>
                </div>
            </div>

            <div className='middle'>
            <div className='box'>
                <h1>Timer</h1>
                
                <div className='timer'>
                    <div className='configTimer'>
                    <h1>{workouts[workoutSelected].name}</h1>
                    {/* <h4>{workouts[workoutSelected].description}</h4> */}
                    <div className='selectTimer'>
                            <select onChange={timeInputHandler} name="cars" id="cars">
                                <option value="900">15 Minutes</option>
                                <option value="1800">30 Minutes</option>
                                <option value="2700">45 Minutes</option>
                            </select>    
                            <button onClick={()=>toggleTimer()}> {startTimer == false ? "Start" : "Pause"}</button>
                            <br />
                            
                        </div>
                        </div>
                    <div className='clock'>
                    <h1>{timerMinutes} Min {timerSeconds} Sec</h1>
                        {/* {timerThirty} Time until next exercise */}
                        </div>

                    <div className='infoTimer'>
                        <div className='currentEx'>
                        <h2>{counter === 0 ? "complete" : "Keep going"}</h2>
                            <h1>Current Exercise : {combined[workoutIterator]}{console.log(combined)}</h1>
                            <h2>NEXT : {combined[workoutIterator+1]}</h2>
                            
                            </div>

                        
                    </div>

                        
                </div>   
            </div>
            </div>
            <div className='right'>
            <div className='box'>
            
             <h1>Workouts</h1>
                    <select onChange={workoutSelectHandler} name="workout-selection" id="workout-selection">
                                    {workouts.map(()=> {
                                        num = num+1;
                                         return <option value={num}>{workouts[num].name}</option>
                                    } )}
                        </select>
                        {
                        // console.log(workouts[0])
                        }
                        <h2>{workouts[workoutSelected].name}</h2>
                        <h2>Round 1</h2>
                        {workouts[workoutSelected].round1.map((item)=> {
                            return item + " | ";
                        } )}
                        <h2>Round 2</h2>
                        {workouts[workoutSelected].round2.map((item)=> {
                            return item + " | ";
                        } )}
                        <h2>Round 3</h2>
                        {workouts[workoutSelected].round3.map((item)=> {
                            return item + " | ";
                        } )}
                        <h2>Round 4</h2>
                        {workouts[workoutSelected].round4.map((item)=> {
                            return item + " | ";
                        } )}
                        <h2>Round 5</h2>
                        {workouts[workoutSelected].round5.map((item)=> {
                            return item + " | ";
                        } )}
                        </div>
                </div>
                

        </React.Fragment>
    )
}

export default Timer;
