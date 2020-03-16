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

const historySearchInfoReducer = (state = [], action) => {
    switch (action.type) {
        case actionsTypes.SET_HISTORY_INFO_FETCHES:
            const { payload } = action;
            return [...state, payload];
        case actionsTypes.CLEAR_CURRENT_HISTORY_DATA_INFO:
            const { id } = action;
            return state.filter((_, idx) => idx !== id);
        case actionsTypes.CLEAR_ALL_HISTORY_DATA_INFO:
            return [];
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

const toggleHistoryBtnReducer = (state = false, action) => {
    switch (action.type) {
        case actionsTypes.TOGGLE_HISTORY_BTN:
            return !state;
        default:
            return state;
    }
};

const counterTotalPhotoReducer = (state = 0, action) => {
    switch (action.type) {
        case actionsTypes.TOTAL_AVAILABLE_PHOTOS:
            const { payload } = action;
            return payload;
        default:
            return state;
    }
};

const saveHistoryOfFetchesReducer = (state = [], action) => {
    switch (action.type) {
        case actionsTypes.SET_HISTORY_DATA_URLS:
            const { payload } = action;
            return [...state, payload];
        case actionsTypes.CLEAR_CURRENT_ITEM_HISTORY:
            const { id } = action;
            return state.filter((_, idx) => idx !== id);
        case actionsTypes.CLEAR_ALL_HISTORY_DATA_URLS:
            return [];
        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    photoList: loadReducer,
    query: queryReducer,
    page: countPageReducer,
    historyInfo: historySearchInfoReducer,
    time: timeRequestReducer,
    isActiveHistoryBtn: toggleHistoryBtnReducer,
    getHistoryData: saveHistoryOfFetchesReducer,
    availablePhotos: counterTotalPhotoReducer,
});
