export default {
    getUsers : ()=>{
        return fetch('user/getallusers')
                .then(response=>{
                    if(response.status !== 401){
                        return response.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "UnAuthorized",msgError : true}};
                });
    },

    // updateUser : user =>{
    //     console.log(user);
    //     return fetch('/user/update',{
    //         method : "put",
    //         body : JSON.stringify(user),
    //         headers : {
    //             'Content-Type' : 'application/json'
    //         }
    //     }).then(res => res.json())
    //       .then(data => data);
    // },

    deleteUser : user =>{
        console.log(user);
        return fetch('/user/delete',{
            method : "put",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
          .then(data => data);
    },


}
