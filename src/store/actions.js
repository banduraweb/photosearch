import {apiKeys, baseUrl} from '../api'

export const actionsTypes = {
    SAVE_DATA: 'SAVE_DATA',
    SET_QUERY: 'SET_QUERY',
    COUNT_PAGE_NUMBER: 'COUNT_PAGE_NUMBER',
    RESET_QUERY: 'RESET_QUERY',
    RESET_PHOTO_LIST: 'RESET_PHOTO_LIST',
    RESET_PAGE_NUMBER: 'RESET_PAGE_NUMBER',
};


export const saveData = data => ({
    type: actionsTypes.SAVE_DATA,
    payload: data
});


export const searchQuery = ({target}) => ({
    type: actionsTypes.SET_QUERY,
    payload: target.value
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



export const LoadData = (keyword, currentPage) => async dispatch => {
   // console.log(currentPage,'currentPage');

    const combineUrl = `${baseUrl}api_key=${apiKeys.keyFlickr}&text=${keyword}&format=json&nojsoncallback=1&per_page=12&page=${currentPage}`;
    console.log(combineUrl,'currentPage');
    const fetchedData = await fetch(combineUrl);
    const loadedData = await fetchedData.json();
    const {photo} = loadedData.photos;
    const result = photo.map(img=>
        `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_m.jpg`);
   // console.log(result);
    dispatch(saveData(result));
    dispatch(counterPage());

};

// 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=dd4a16666bdf3c2180b43bec8dd1534a&text=cars&format=json&nojsoncallback=1&per_page=12&page=1'