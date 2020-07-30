import { GET_PROFILE_BY_USERNAME } from '../actions/types';

const initialState = {
    profile: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE_BY_USERNAME:
            return {
                ...state,
                profile: action.payload
            };
        default:
            return state;
    }
};