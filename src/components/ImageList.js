import React from 'react';
import { ImageItem } from './ImageItem';

export const ImageList = ({imgList}) => {
    
    return (
        <div className="container-fluid">
            <div className="row">
                {imgList.map(img => (
                    <ImageItem imgSrc={img.img_src} altName={img.id} key={img.id}/>
                ))}
            </div>
        </div>
    )
}