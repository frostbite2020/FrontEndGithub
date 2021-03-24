import { combineReducers } from "redux";

import user from './userReducer';
import loading from './loadingReducer';
import todoCategory from './todolistReducer';
import subTodoList from './subTodoListReducer'

const rootReducer = combineReducers({user, loading, todoCategory, subTodoList});

export default rootReducer;

