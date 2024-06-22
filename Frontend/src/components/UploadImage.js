import React, { useState } from 'react';
import { uploadImage } from '../api';

const UploadImage = ({ onUpload }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);

        try {
            await uploadImage(formData);
            onUpload(); // Chama a função de callback para atualizar a lista de imagens
        } catch (error) {
            console.error('Erro ao fazer upload da imagem', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
        </form>
    );
};

export default UploadImage;
