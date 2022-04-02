import * as ActionTypes from './ActionTypes';

export const Records = (state = {
        isLoading : true,
        posting : false,
        errMes : null,
        records : []
    }, action) => {
    switch(action.type){
        case ActionTypes.RECORDS_LOADING:
            return {...state, isLoading: true, posting: false, errMes: null, records: []};
        case ActionTypes.RECORDS_FAILED:
            return {...state, isLoading: false, posting: false, errMes: action.payload, records: []};
        case ActionTypes.RECORDS_ADD:
            return {...state, isLoading: false, posting: false, errMes: null, records: action.payload};
        case ActionTypes.RECORDS_POSTING:
            return {...state, isLoading: false, posting: true, errMes: null};
        case ActionTypes.RECORDS_POST:
            let newRecord = action.payload;
            return {...state, isLoading: false, posting: false, errMes: null, records: state.records.concat(newRecord)};
        default:
            return state;
    }
}