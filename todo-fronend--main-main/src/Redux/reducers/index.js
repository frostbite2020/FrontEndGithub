import { combineReducers } from "redux";

import user from './userReducer';
import loading from './loadingReducer';
import todoCategory from './todolistReducer';
import subTodoList from './subTodoListReducer';
import todoDaily from './todoDailyReducer';
import todoDailyHistory from './todoDailyHistoryReducer'

const rootReducer = combineReducers({user, loading, todoCategory, subTodoList, todoDaily, todoDailyHistory});

export default rootReducer;

