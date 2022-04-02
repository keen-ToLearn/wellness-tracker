import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { Users } from './Users';
import { Records } from './Records';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            users : Users,
            records : Records
        }),
        applyMiddleware(thunk)
    );

    return store;
}