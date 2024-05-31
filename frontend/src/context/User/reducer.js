import { CHANGE_ERROR, CHANGE_TOKEN, CHANGE_LOADING, CHANGE_USER, CHANGE_SCHEDULES} from './actions';

const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case CHANGE_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case CHANGE_USER:
            return {
                ...state,
                user: action.payload,
            };
        case CHANGE_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        case CHANGE_SCHEDULES:
            return {
                ...state,
                schedules: action.payload,
            };
        
        default:
            return state;
    }
}

export default reducer;