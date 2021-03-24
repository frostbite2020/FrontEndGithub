import * as constants from '../constant'


export default function todolistReducers(state = [], action) {

    switch(action.type) {
        case constants.FETCH_ALL_TODO: 
            return action.payload;
        case constants.CREATE_TODO:
            return state.concat(action.payload);
        case constants.DELETE_TODO: 
            return state.filter(item => item.id !== action.payload);
        case constants.UPDATE_TODO: 
            return state.map(item => {
                if (item.id === action.payload.id)
                    return { ...item, ...action.payload.data};
                else 
                    return item;
            });
        case constants.RESET_USER_INFO:
            return [];
        default:
            return state;
    }
}