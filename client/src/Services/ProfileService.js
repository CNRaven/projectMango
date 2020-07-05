export default {
    getProfile : ()=>{
        return fetch('/user/profile')
                .then(response=>{
                    if(response.status !== 401){
                        return response.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "UnAuthorized",msgError : true}};
                });
    },

    postProfile : profile => {
        return fetch('/user/profile',{
            method : "post",
            body : JSON.stringify(profile),
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

    update : profile =>{
        console.log(profile);
        return fetch('/user/profile',{
            method : "put",
            body : JSON.stringify(profile),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
          .then(data => data);
    },
}