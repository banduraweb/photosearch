import React, { useState } from 'react';
import loadingImg from '../../img/loading.png';
import errorImg from '../../img/default-img.gif';
const CurrentImg = ({ photo, alt }) => {
    const [displayImg, setDisplayImg] = useState(loadingImg);
    const handleImageLoaded = () => {
        setDisplayImg(photo);
    };
    const handleImageErrored = ({ target }) => {
        target.src = errorImg;
    };
    return (
        <img
            className="gallery__img"
            src={displayImg}
            onLoad={handleImageLoaded}
            onError={e => handleImageErrored(e)}
            alt={alt}
        />
    );
};
export default CurrentImg;
