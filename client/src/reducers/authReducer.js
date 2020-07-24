import {SET_CURRENT_USER} from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
    isAuthentiated: false,
    user: {}
};

export default function(state=initialState, action){
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
                isAuthentiated:  !isEmpty(action.payload)
            }
        default: 
            return state;
    }
};