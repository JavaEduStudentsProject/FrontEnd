import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

export default function ImagesGallery (props) {
    const images = props.product.gallery_images.map(url => ({
        original: `${url}`,
        thumbnail: '' }))

    return images ? <ImageGallery items={images} /> : null;
};

