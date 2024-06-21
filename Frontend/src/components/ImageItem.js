import React, { useState } from 'react';
import { updateImage, deleteImage } from '../api';

const ImageItem = ({ image, onUpdate }) => {
    const [editing, setEditing] = useState(false);
    const [newCaption, setNewCaption] = useState(image.caption);

    const handleEdit = async () => {
        try {
            await updateImage(image.id, { caption: newCaption });
            setEditing(false);
            onUpdate(); // Atualiza a lista de imagens após a edição
        } catch (error) {
            console.error('Erro ao editar a imagem', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteImage(image.id);
            onUpdate(); // Atualiza a lista de imagens após a exclusão
        } catch (error) {
            console.error('Erro ao excluir a imagem', error);
        }
    };

    return (
        <div>
            {editing ? (
                <>
                    <input
                        type="text"
                        value={newCaption}
                        onChange={(e) => setNewCaption(e.target.value)}
                    />
                    <button onClick={handleEdit}>Salvar</button>
                </>
            ) : (
                <>
                    <img src={image.url} alt={image.caption} />
                    <p>{image.caption}</p>
                    <button onClick={() => setEditing(true)}>Editar</button>
                </>
            )}
            <button onClick={handleDelete}>Excluir</button>
        </div>
    );
};

export default ImageItem;
