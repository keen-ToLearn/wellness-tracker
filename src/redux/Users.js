import * as ActionTypes from './ActionTypes';

export const Users = (state = {
        isLoading : true,
        reglogging : false,
        errMes : null,
        users : []
    }, action) => {
    switch(action.type){
        case ActionTypes.USERS_LOADING:
            return {...state, isLoading: true, reglogging: false, errMes: null, users: []};
        case ActionTypes.USERS_FAILED:
            return {...state, isLoading: false, reglogging: false, errMes: action.payload, users: []};
        case ActionTypes.USERS_ADD:
            return {...state, isLoading: false, reglogging: false, errMes: null, users: action.payload};
        case ActionTypes.USERS_REGLOGGING:
            return {...state, isLoading: false, reglogging: true, errMes: null};
        case ActionTypes.USERS_REGLOG:
            let usersCopy = [...state.users];
            let userInfo = action.payload;
            if(userInfo.uid === usersCopy.length)
                usersCopy = usersCopy.concat(userInfo);
            else
                usersCopy[userInfo.uid] = userInfo;
            return {...state, isLoading: false, reglogging: false, errMes: null, users: [...usersCopy]};
        default:
            return state;
    }
}