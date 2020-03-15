import { combineReducers } from 'redux';
import { actionsTypes } from './actions';

const startPhotoList = [];
const loadReducer = (state = startPhotoList, action) => {
    switch (action.type) {
        case actionsTypes.SAVE_DATA:
            const { payload } = action;
            return [...state, ...payload];
        case actionsTypes.RESET_PHOTO_LIST:
            return startPhotoList;
        default:
            return state;
    }
};

const queryReducer = (state = '', action) => {
    switch (action.type) {
        case actionsTypes.SET_QUERY:
            return action.payload;
        default:
            return state;
    }
};

const startPage = 1;

const countPageReducer = (state = startPage, action) => {
    switch (action.type) {
        case actionsTypes.COUNT_PAGE_NUMBER:
            return state + 1;
        case actionsTypes.RESET_PAGE_NUMBER:
            return 1;
        default:
            return state;
    }
};

const historySearchReducer = (state = [], action) => {
    switch (action.type) {
        case actionsTypes.SET_HISTORY_SEARCH:
            const { payload } = action;
            return [...state, payload];

        default:
            return state;
    }
};

const timeRequestReducer = (state = null, action) => {
    switch (action.type) {
        case actionsTypes.GET_TIME_REQUEST:
            const { payload } = action;
            return payload;
        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    photoList: loadReducer,
    query: queryReducer,
    page: countPageReducer,
    history: historySearchReducer,
    time: timeRequestReducer,
});
