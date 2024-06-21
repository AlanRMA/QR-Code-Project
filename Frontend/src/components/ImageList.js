import React, { useEffect, useState } from 'react';
import { fetchImages } from '../api';
import ImageItem from './ImageItem';

const ImageList = () => {
    const [images, setImages] = useState([]);

    const loadImages = async () => {
        try {
            const response = await fetchImages();
            setImages(response.data);
        } catch (error) {
            console.error('Erro ao carregar imagens', error);
        }
    };

    useEffect(() => {
        loadImages();
    }, []);

    return (
        <div>
            {images.map((image) => (
                <ImageItem key={image.id} image={image} onUpdate={loadImages} />
            ))}
        </div>
    );
};

export default ImageList;
