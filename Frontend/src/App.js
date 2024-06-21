import React from 'react';
import UploadImage from './components/UploadImage';
import ImageList from './components/ImageList';

const App = () => {
    const handleUpload = () => {
        // Atualize a lista de imagens
        window.location.reload();
    };

    return (
        <div>
            <h1>Gerenciador de Imagens do Restaurante</h1>
            <UploadImage onUpload={handleUpload} />
            <ImageList />
        </div>
    );
};

export default App;
