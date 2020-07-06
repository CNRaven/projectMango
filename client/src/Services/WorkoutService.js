export default {
    getWorkout : ()=>{
        return fetch('/user/workout')
                .then(response=>{
                    if(response.status !== 401){
                        return response.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "UnAuthorized", msgError : true}};
                });
    },

    postWorkout : workout => {
        return fetch('/user/workout',{
            method : "post",
            body : JSON.stringify(workout),
            headers:{
                'Content-Type' : 'application/json'
            }
        }).then(response=>{
            if(response.status !== 401){
                return response.json().then(data => data);
            }
            else
                return {message : {msgBody : "UnAuthorized"}, msgError : true};
        });
    },

    update : workout =>{
        console.log(workout);
        return fetch('/user/workout',{
            method : "put",
            body : JSON.stringify(workout),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
          .then(data => data);
    },
}