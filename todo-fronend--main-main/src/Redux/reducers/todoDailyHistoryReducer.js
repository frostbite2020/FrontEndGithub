import * as constans from '../constant'

export default function todoDailyHistoryReducers(state= [], action){
    switch (action.type) {
        case constans.FETCH_ALL_DAILY_TODO_HISTORY:
            return action.payload;

        case constans.RESET_USER_INFO:
            return [];
        default:
            return state;
    }
}