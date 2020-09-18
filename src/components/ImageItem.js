import React from 'react';

export const ImageItem = ({imgSrc, altName}) => {
    return (
        <div className="col-lg-3 col-md-4 col-sm-6">
            <img src={imgSrc} alt={altName} className="img-thumbnail img-size" />
        </div>
    )
}