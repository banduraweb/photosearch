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
            return state+1;
        case actionsTypes.RESET_PAGE_NUMBER:

            return 1;
        default:
            return state;
    }
};


export default queryReducer;

export const rootReducer = combineReducers({
    photoList: loadReducer,
    query: queryReducer,
    page: countPageReducer
});
