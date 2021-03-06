import React, {useState, useEffect} from 'react';
import './Timer.css';
import './timer.svg';
import WorkoutService from '../Services/WorkoutService';

const Timer = () => {
    
    let [startTimer, setStartTimer] = useState(false);
    let combined = [];
    let num = -1;

    const [workouts,setWorkouts] = useState(null);
    const [counter, setCounter] = useState(900);
    const [workoutSelected, setWorkoutSelected] = useState(0);

    const [changeWorkoutTime, setChangeWorkoutTime] = useState(30000);

    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');
    
    const [workoutIterator, setWorkoutIterator] = useState(0);
    


    let combineWorkouts = () =>{
        combined = [...workouts[0].round1,"BREAK", ...workouts[0].round2, "BREAK", ...workouts[0].round3, "BREAK", ...workouts[0].round4, "BREAK", ...workouts[0].round5];
    }

    const calcTime = (counter) => {
        const minutes = Math.floor(counter / 60);
        const seconds = Math.floor(counter % 60);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
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
            counter > 0 && setTimeout(() => setWorkoutIterator(workoutIterator+1), changeWorkoutTime);  
            calcTime(counter);
        }

      }, [counter, startTimer]);
    
     

      const timeInputHandler = (e) =>{
        console.log(e.target.value);
        setCounter(e.target.value);
        if(e.target.value == 900) {
            setChangeWorkoutTime(30000);
            console.log(changeWorkoutTime)
            // console.log(30);

        } else if (e.target.value == 1800) {
            setChangeWorkoutTime(60000);
            console.log(changeWorkoutTime)
            // console.log(60);

        } else if (e.target.value == 2700) {
            setChangeWorkoutTime(90000);
            console.log(changeWorkoutTime)
            // console.log(90);
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
                    <div className='interval'>
                        <p>15 mins = 30 seconds per exercise</p>
                        <img src='arrow.svg' className='arrow' ></img>     
                        <p> 30 second break per round</p>
                    </div>
                    <div className='interval'>
                        <p>30 mins = 60 seconds per exercise</p>
                        <img src='arrow.svg' className='arrow' ></img>
                        <p> 60 second break per round</p>
                    </div>
                    <div className='interval'>
                        <p>45 mins = 90 seconds per exercise</p>
                        <img src='arrow.svg' className='arrow' ></img>
                        <p> 90 second break per round</p>
                    </div>
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
                            <h1>Current Exercise : {combined[workoutIterator]}</h1>
                            <h3>NEXT : {combined[workoutIterator+1]}</h3>
                        <h2>{counter === 0 ? "Complete" : "Keep going"}</h2>
                            

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
                                         return <option key={num} value={num}>{workouts[num].name}</option>
                                    } )}
                        </select>
                        {
                        // console.log(workouts[0])
                        }
                        <h2>Round 1</h2>
                        <div className='roundEx'>
                        {workouts[workoutSelected].round1.map((item)=> {
                            return <div className='labelEx'>{item}</div>;
                        } )}
                        </div>
                        <h2>Round 2</h2>
                        <div className='roundEx'>
                        {workouts[workoutSelected].round2.map((item)=> {
                            return <div className='labelEx'>{item}</div>;
                        } )}
                        </div>
                        <h2>Round 3</h2>
                        <div className='roundEx'>
                        {workouts[workoutSelected].round3.map((item)=> {
                            return <div className='labelEx'>{item}</div>;
                        } )}
                        </div>
                        <h2>Round 4</h2>
                        <div className='roundEx'>                       
                        {workouts[workoutSelected].round4.map((item)=> {
                            return <div className='labelEx'>{item}</div>;
                        } )}
                        </div>
                        <h2>Round 5</h2>
                        <div className='roundEx'>                     
                        {workouts[workoutSelected].round5.map((item)=> {
                            return <div className='labelEx'>{item}</div>;
                        } )}
                        </div>
                        </div>
                </div>
                

        </React.Fragment>
    )
}

export default Timer;
