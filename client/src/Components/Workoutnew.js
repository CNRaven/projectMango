import React, {useState} from 'react';
import WorkoutService from '../Services/WorkoutService';

const Workoutnew = () => {
    const [workout,setWorkout] = useState({
        name: "", 
        description: "", 
        round1ex1: "", 
        round1ex2: "", 
        round1ex3: "", 
        round1ex4: "",
        round2ex1: "",
        round2ex2: "",
        round2ex3: "",
        round2ex4: "",
        round3ex1: "",
        round3ex2: "",
        round3ex3: "",
        round3ex4: "",
        round4ex1: "",
        round4ex2: "",
        round4ex3: "",
        round4ex4: "",
        round5ex1: "",
        round5ex2: "",
        round5ex3: "",
        round5ex4: "",

    });



    const onChange = e => {
        setWorkout({...workout, 
            [e.target.name]: e.target.value, 
            [e.target.description]: e.target.value,
             
            [e.target.round1ex1]: e.target.value,
            [e.target.round1ex2]: e.target.value,
            [e.target.round1ex3]: e.target.value,
            [e.target.round1ex4]: e.target.value,
   
            [e.target.round2ex1]: e.target.value,
            [e.target.round2ex2]: e.target.value,
            [e.target.round2ex3]: e.target.value,
            [e.target.round2ex4]: e.target.value,
   
            [e.target.round3ex1]: e.target.value,
            [e.target.round3ex2]: e.target.value,
            [e.target.round3ex3]: e.target.value,
            [e.target.round3ex4]: e.target.value,
   
            [e.target.round4ex1]: e.target.value,
            [e.target.round4ex2]: e.target.value,
            [e.target.round4ex3]: e.target.value,
            [e.target.round4ex4]: e.target.value,

            [e.target.round5ex1]: e.target.value,
            [e.target.round5ex2]: e.target.value,
            [e.target.round5ex3]: e.target.value,
            [e.target.round5ex4]: e.target.value   
        });
        console.log(workout);
    }

    const onSubmit = e =>{
        e.preventDefault();
        WorkoutService.postWorkout(workout).then(data=>{ 
            console.log(workout);
        });
    }

    return(
    <div>
        <h1>Workout New</h1>
        <form onSubmit={onSubmit}>
                    <label htmlFor="workout-name">Workout Name: </label>
                    <input 
                        name="name"
                        id="workout-name"
                        type="text"
                        value={workout.name}
                        onChange={onChange}
                    />
                    <label htmlFor="workout-description">Workout Description:</label>
                    <input 
                        name="description"
                        id="workout-description"
                        type="text"
                        value={workout.description}
                        onChange={onChange}
                    />
                    <br />
                    
                    <br />
                    <h2>Round 1</h2>
                    <label htmlFor="workout-round1-ex1">Exercise 1</label> 
                    <input 
                        name="round1ex1"
                        id="workout-round1-ex1"
                        type="text"
                        value={workout.round1ex1}
                        onChange={onChange} 
                    />
                    <label htmlFor="workout-round1-ex2">Exercise 2</label>
                    <input 
                        name="round1ex2"
                        id="workout-round1-ex2"
                        type="text"
                        value={workout.round1ex2}
                        onChange={onChange} 
                    />
                    <label htmlFor="workout-round1-ex3">Exercise 3</label> 
                    <input 
                        name="round1ex3"
                        id="workout-round1-ex3"
                        type="text"
                        value={workout.round1ex3}
                        onChange={onChange} 
                    />
                    <label htmlFor="workout-round1-ex4">Exercise 4</label>
                    <input 
                        name="round1ex4"
                        id="workout-round1-ex4"
                        type="text"
                        value={workout.round1ex4}
                        onChange={onChange} 
                    />



                    <h2>Round 2</h2>
                    <label htmlFor="workout-round2-ex1">Exercise 1</label> 
                    <input 
                        name="round2ex1"
                        id="workout-round2-ex1"
                        type="text"
                        value={workout.round2ex1}
                        onChange={onChange} 
                    />
                    <label htmlFor="workout-round2-ex2">Exercise 2</label>
                    <input 
                        name="round2ex2"
                        id="workout-round2-ex2"
                        type="text"
                        value={workout.round2ex2}
                        onChange={onChange} 
                    />
                    <label htmlFor="workout-round2-ex3">Exercise 3</label> 
                    <input 
                        name="round2ex3"
                        id="workout-round2-ex3"
                        type="text"
                        value={workout.round2ex3}
                        onChange={onChange} 
                    />
                    <label htmlFor="workout-round2-ex4">Exercise 4</label>
                    <input 
                        name="round2ex4"
                        id="workout-round2-ex4"
                        type="text"
                        value={workout.round2ex4}
                        onChange={onChange} 
                    />

                    <h2>Round 3</h2>
                    <label htmlFor="workout-round3-ex1">Exercise 1</label> 
                    <input 
                        name="round3ex1"
                        id="workout-round3-ex1"
                        type="text"
                        value={workout.round3ex1}
                        onChange={onChange} 
                    />
                    <label htmlFor="workout-round3-ex2">Exercise 2</label>
                    <input 
                        name="round3ex2"
                        id="workout-round3-ex2"
                        type="text"
                        value={workout.round3ex2}
                        onChange={onChange} 
                    />
                    <label htmlFor="workout-round3-ex3">Exercise 3</label> 
                    <input 
                        name="round3ex3"
                        id="workout-round3-ex3"
                        type="text"
                        value={workout.round3ex3}
                        onChange={onChange} 
                    />
                    <label htmlFor="workout-round3-ex4">Exercise 4</label>
                    <input 
                        name="round3ex4"
                        id="workout-round3-ex4"
                        type="text"
                        value={workout.round3ex4}
                        onChange={onChange} 
                    />



                    <h2>Round 4</h2>
                    <label htmlFor="workout-round4-ex1">Exercise 1</label> 
                    <input 
                        name="round4ex1"
                        id="workout-round4-ex1"
                        type="text"
                        value={workout.round4ex1}
                        onChange={onChange} 
                    />
                    <label htmlFor="workout-round4-ex2">Exercise 2</label>
                    <input 
                        name="round4ex2"
                        id="workout-round4-ex2"
                        type="text"
                        value={workout.round4ex2}
                        onChange={onChange} 
                    />
                    <label htmlFor="workout-round4-ex3">Exercise 3</label> 
                    <input 
                        name="round4ex3"
                        id="workout-round4-ex3"
                        type="text"
                        value={workout.round4ex3}
                        onChange={onChange} 
                    />
                    <label htmlFor="workout-round4-ex4">Exercise 4</label>
                    <input 
                        name="round4ex4"
                        id="workout-round4-ex4"
                        type="text"
                        value={workout.round4ex4}
                        onChange={onChange} 
                    />


                    <h2>Round 5</h2>
                    <label htmlFor="workout-round5-ex1">Exercise 1</label> 
                    <input 
                        name="round5ex1"
                        id="workout-round5-ex1"
                        type="text"
                        value={workout.round5ex1}
                        onChange={onChange} 
                    />
                    <label htmlFor="workout-round5-ex2">Exercise 2</label>
                    <input 
                        name="round5ex2"
                        id="workout-round5-ex2"
                        type="text"
                        value={workout.round5ex2}
                        onChange={onChange} 
                    />
                    <label htmlFor="workout-round5-ex3">Exercise 3</label> 
                    <input 
                        name="round5ex3"
                        id="workout-round5-ex3"
                        type="text"
                        value={workout.round5ex3}
                        onChange={onChange} 
                    />
                    <label htmlFor="workout-round5-ex4">Exercise 4</label>
                    <input 
                        name="round5ex4"
                        id="workout-round5-ex4"
                        type="text"
                        value={workout.round5ex4}
                        onChange={onChange} 
                    />
                    <br />
                    <br />
                    <button type="submit">Add New Workout</button> 
                </form>

    </div>)
}

export default Workoutnew;