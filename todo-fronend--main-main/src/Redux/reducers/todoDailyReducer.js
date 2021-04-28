import * as constant from '../constant'

export default function todoDailyReducers(state =[], action){
    switch (action.type) {
        case constant.FETCH_ALL_DAILY_TODO:
            return action.payload;  
        
        case constant.CREATE_DAILY_TODO:
            return state.concat(action.payload);

        case constant.DELETE_DAILY_TODO:
            return state.filter(item => item.id !== action.payload);

        case constant.CHECK_DAILY_TODO:
            return state.map(item => {
                if (item._id === action.payload.id)
                    return { ...item, ...action.payload.data};
                else 
                    return item;
            })

        case constant.RESET_USER_INFO:
            return [];

        default:
            return state;
    }
}