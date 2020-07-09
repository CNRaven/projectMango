export default {
    getGroups: ()=>{
        return fetch('/user/groups')
                .then(response=>{
                    if(response.status !== 401){
                        return response.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "UnAuthorized",msgError : true}};
                });
    },

    getGroupById: (groupId)=>{
        return fetch(`/user/groups/${groupId}`)
                .then(response=>{
                    if(response.status !== 401){
                        return response.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "UnAuthorized",msgError : true}};
                });
    },

    createGroup: group => {
        return fetch('/user/groups',{
            method: "post",
            body: JSON.stringify(group),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response=>{
            if(response.status !== 401){
                return response.json().then(data => data);
            }
            else
                return { message: {msgBody: "UnAuthorized"},msgError: true };
        });
    },

    joinGroupById: (groupId) => {
        return fetch(`/user/groups/${groupId}/join`,{
            method: "post",
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response=>{
            if(response.status !== 401){
                return response.json().then(data => data);
            }
            else
                return { message: {msgBody: "UnAuthorized"},msgError: true };
        });
    },

    leaveGroupById: (groupId) => {
        return fetch(`/user/groups/${groupId}/leave`,{
            method: "post",
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response=>{
            if(response.status !== 401){
                return response;
            }
            else
                return { message: {msgBody: "UnAuthorized"},msgError: true };
        });
    },

    deleteGroupById: (groupId) => {
        return fetch(`/user/groups/${groupId}/delete`,{
            method: "post",
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response=>{
            if(response.status !== 401){
                return response;
            }
            else
                return { message: {msgBody: "UnAuthorized"},msgError: true };
        });
    },

    addPostToGroupFeed: (groupId, requestBody) => {
        return fetch(`/user/groups/${groupId}/feed`,{
            method: "post",
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response=>{
            if(response.status !== 401){
                return response.json().then(data => data);
            }
            else
                return { message: {msgBody: "UnAuthorized"},msgError: true };
        });
    },

    likePostById: (groupId, postId) => {
        return fetch(`/user/groups/${groupId}/feed/${postId}/like`,{
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response=>{
            if(response.status !== 401){
                return;
            }
            else
                return { message: {msgBody: "UnAuthorized"},msgError: true };
        });
    },

    deletePostById: (groupId, postId) => {
        return fetch(`/user/groups/${groupId}/feed/${postId}/delete`,{
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response=>{
            if(response.status !== 401){
                return;
            }
            else
                return { message: {msgBody: "UnAuthorized"},msgError: true };
        });
    },
}