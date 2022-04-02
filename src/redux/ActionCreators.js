import * as ActionTypes from './ActionTypes';
import { baseURL } from '../shared/baseURL';

//Users related action creators

//to fetch users
export const fetchUsers = () => dispatch => {
    dispatch(usersLoading(true));

    return fetch(baseURL + 'users')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMes = new Error(error.message);
            throw errMes;
        })
        .then(response => response.json())
        .then(users => dispatch(usersAdd(users)))
        .catch(error => dispatch(usersFailed(error.message)));
}

export const usersLoading = () => ({
    type : ActionTypes.USERS_LOADING
});

export const usersFailed = (errMes) => ({
    type : ActionTypes.USERS_FAILED,
    payload : errMes
});

export const usersAdd = (users) => ({
    type : ActionTypes.USERS_ADD,
    payload : users
});

//to post new user
export const usersRegister = (newUser) => dispatch => {
    dispatch(userRegistering(true));

    return fetch(baseURL + 'users', {
        method : 'POST',
        body : JSON.stringify(newUser),
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials : 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMes = new Error(error.message);
        throw errMes;
    })
    .then(response => response.json())
    .then(user => dispatch(userRegister(user)))
    .catch(error => console.log(error.message));
}

export const userRegistering = () => ({
    type : ActionTypes.USERS_REGLOGGING
});

export const userRegister = (user) => ({
    type : ActionTypes.USERS_REGLOG,
    payload : user
});

//to log in out a user
export const usersLoginout = (uid, loginoutUser) => dispatch => {
    dispatch(userLoggingInout(true));

    return fetch(baseURL + 'users/' + uid.toString(), {
        method : 'PUT',
        body : JSON.stringify(loginoutUser),
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials : 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMes = new Error(error.message);
        throw errMes;
    })
    .then(response => response.json())
    .then(user => dispatch(userLoginout(user)))
    .catch(error => console.log(error.message));
}

export const userLoggingInout = () => ({
    type : ActionTypes.USERS_REGLOGGING
});

export const userLoginout = (user) => ({
    type : ActionTypes.USERS_REGLOG,
    payload : user
});

//____________________________________________________________________________________________________________________
//Records related action creators

//to fetch records
export const fetchRecords = () => dispatch => {
    dispatch(recordsLoading(true));

    return fetch(baseURL + 'records')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMes = new Error(error.message);
            throw errMes;
        })
        .then(response => response.json())
        .then(records => dispatch(recordsAdd(records)))
        .catch(error => dispatch(recordsFailed(error.message)));
}

export const recordsLoading = () => ({
    type : ActionTypes.RECORDS_LOADING
});

export const recordsFailed = (errMes) => ({
    type : ActionTypes.RECORDS_FAILED,
    payload : errMes
});

export const recordsAdd = (users) => ({
    type : ActionTypes.RECORDS_ADD,
    payload : users
});

//to post new record
export const recordsPost = (newRecord) => dispatch => {
    dispatch(recordPosting(true));

    return fetch(baseURL + 'records', {
        method : 'POST',
        body : JSON.stringify(newRecord),
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials : 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMes = new Error(error.message);
        throw errMes;
    })
    .then(response => response.json())
    .then(record => dispatch(recordPost(record)))
    .catch(error => console.log(error.message));
}

export const recordPosting = () => ({
    type : ActionTypes.RECORDS_POSTING
});

export const recordPost = (record) => ({
    type : ActionTypes.RECORDS_POST,
    payload : record
});