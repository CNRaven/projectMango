export default {
    getActivityFeed : ()=>{
        return fetch('/user/activityfeed')
                .then(response=>{
                    if(response.status !== 401){
                        return response.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "UnAuthorized",msgError : true}};
                });
    },

    postActivityFeed : textInput => {
        return fetch('/user/activityfeed',{
            method : "post",
            body : JSON.stringify(textInput),
            headers:{
                'Content-Type' : 'application/json'
            }
        }).then(response=>{
            if(response.status !== 401){
                return response.json().then(data => data);
            }
            else
                return {message : {msgBody : "UnAuthorized"},msgError : true};
        });
    },

    // update : profile =>{
    //     console.log(profile);
    //     return fetch('/user/profile',{
    //         method : "put",
    //         body : JSON.stringify(profile),
    //         headers : {
    //             'Content-Type' : 'application/json'
    //         }
    //     }).then(res => res.json())
    //       .then(data => data);
    // },
}