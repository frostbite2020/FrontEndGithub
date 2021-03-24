import * as constants from '../constant'


export default function subTodoListReducers(state =[], action){
   
    switch (action.type) {
        case constants.FETCH_ALL_SUB_TODO:
            return action.payload;
        case constants.CREATE_SUB_TODO:
            return state.concat(action.payload);
        case constants.DELETE_SUB_TODO:
            return state.filter(item => item.id !== action.payload);
        case constants.UPDATE_SUB_TODO:
            return state.map(item => {
                if (item._id === action.payload.todoID)
                    return { ...item, ...action.payload.data};
                else 
                    return item;
            })
        case constants.UPDATE_CHECK_SUB_TODO:
            return state.map(item => {
                if (item._id === action.payload.todoID)
                    return { ...item, ...action.payload.data};
                else 
                    return item;
            })
        case constants.RESET_USER_INFO  :
            return [];
        default:
            return state;
    }
}