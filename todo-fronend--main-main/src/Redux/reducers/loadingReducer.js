import * as constants from "./../constant";

export default function loadingReducers(state = false, action) {
    switch (action.type) {
        case constants.LOADER:
            return !state;    
        default:
            return state;
    }
}