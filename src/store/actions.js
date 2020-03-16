import { apiKeys, baseUrl } from '../api';
import axios from 'axios';

export const actionsTypes = {
    SAVE_DATA: 'SAVE_DATA',
    SET_QUERY: 'SET_QUERY',
    COUNT_PAGE_NUMBER: 'COUNT_PAGE_NUMBER',
    RESET_QUERY: 'RESET_QUERY',
    RESET_PHOTO_LIST: 'RESET_PHOTO_LIST',
    RESET_PAGE_NUMBER: 'RESET_PAGE_NUMBER',
    GET_TIME_REQUEST: 'GET_TIME_REQUEST',
    TOGGLE_HISTORY_BTN: 'TOGGLE_HISTORY_BTN',
    SET_HISTORY_INFO_FETCHES: 'SET_HISTORY_INFO_FETCHES',
    SET_HISTORY_DATA_URLS: 'SET_HISTORY_DATA_URLS',
    CLEAR_ALL_HISTORY_DATA_URLS: 'CLEAR_ALL_HISTORY_DATA_URLS',
    CLEAR_ALL_HISTORY_DATA_INFO: 'CLEAR_ALL_HISTORY_DATA_INFO',
    CLEAR_CURRENT_HISTORY_DATA_INFO: 'CLEAR_CURRENT_HISTORY_DATA_INFO',
    CLEAR_CURRENT_ITEM_HISTORY: 'CLEAR_CURRENT_ITEM_HISTORY',
    TOTAL_AVAILABLE_PHOTOS: 'TOTAL_AVAILABLE_PHOTOS',
};

export const saveData = data => ({
    type: actionsTypes.SAVE_DATA,
    payload: data,
});

export const searchQuery = value => ({
    type: actionsTypes.SET_QUERY,
    payload: value,
});

export const counterPage = () => ({
    type: actionsTypes.COUNT_PAGE_NUMBER,
});

export const resetPhotoList = () => ({
    type: actionsTypes.RESET_PHOTO_LIST,
});

export const resetPageNumber = () => ({
    type: actionsTypes.RESET_PAGE_NUMBER,
});

export const setHistorySearch = history => ({
    type: actionsTypes.SET_HISTORY_INFO_FETCHES,
    payload: history,
});

export const getTimeResults = time => ({
    type: actionsTypes.GET_TIME_REQUEST,
    payload: time,
});

export const toggleHistoryBtn = () => ({
    type: actionsTypes.TOGGLE_HISTORY_BTN,
});

export const saveToHistoryFetches = data => ({
    type: actionsTypes.SET_HISTORY_DATA_URLS,
    payload: data,
});

export const clearAllHistoryFetches = () => ({
    type: actionsTypes.CLEAR_ALL_HISTORY_DATA_URLS,
});

export const clearAllHistoryInfoFetches = () => ({
    type: actionsTypes.CLEAR_ALL_HISTORY_DATA_INFO,
});

export const clearCurrentHistoryInfoFetches = id => ({
    type: actionsTypes.CLEAR_CURRENT_HISTORY_DATA_INFO,
    id,
});

export const clearCurrentDataHistoryFetches = id => ({
    type: actionsTypes.CLEAR_CURRENT_ITEM_HISTORY,
    id,
});

export const counterPhotos = total => ({
    type: actionsTypes.TOTAL_AVAILABLE_PHOTOS,
    payload: total,
});

export const LoadData = (keyword, currentPage) => async dispatch => {
    dispatch(counterPhotos(0));
    const start = new Date().getTime();
    const combineUrlFlickr = `${baseUrl.Flickr}api_key=${apiKeys.keyFlickr}&text=${keyword}&format=json&nojsoncallback=1&per_page=12&page=${currentPage}`;
    const combineUrlPixaby = `${baseUrl.Pixaby}/?key=${apiKeys.keyPixaby}&q=${keyword}&image_type=photo&per_page=12&page=${currentPage}`;

    const [photosFromFlickr, photosFromPixaby] = await Promise.all([
        axios.get(combineUrlFlickr),
        axios.get(combineUrlPixaby),
    ]).catch(e => {
        // console.log(e, 'e action');
    });

    const end = new Date().getTime();
    const searchTime = ((end - start) * 0.001).toFixed(3);

    const { photo } = photosFromFlickr.data.photos;
    const { total } = photosFromFlickr.data.photos;
    const totalPixaby = photosFromPixaby.data.total;
    dispatch(counterPhotos(+total + totalPixaby));
    const resultFlickr = photo.map(
        img =>
            `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_m.jpg`,
    );

    const { hits } = photosFromPixaby.data;
    const resultPixaby = hits.map(img => img.webformatURL);
    const totalPhotos = [...resultFlickr, ...resultPixaby].sort(
        () => Math.random() - 0.5,
    );

    dispatch(saveData(totalPhotos));
    dispatch(counterPage());
    dispatch(getTimeResults(searchTime));
    dispatch(
        setHistorySearch({
            currentPage,
            keyword,
            searchTime,
            userActionTime: `${
                new Date().toTimeString().split(' ')[0]
            } ${new Date().toDateString()}`,
            itemsCount: totalPhotos.length,
        }),
    );
    dispatch(saveToHistoryFetches(totalPhotos));
};
