import React, { useState } from 'react';
import uuid from 'react-uuid';

function App() {
    const [selectedImage, setSelectedImage] = useState('');
    const [qrGenerated, setQrGenerated] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
                setQrGenerated(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerateQR = async () => {
        if (!selectedImage) {
            alert('Por favor, selecione uma imagem primeiro.');
            return;
        }

        // Ler a imagem em base64
        const canvas = document.createElement('canvas');
        const img = document.createElement('img');
        img.src = selectedImage;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const base64Image = canvas.toDataURL('image/jpeg');

            // Gerar UUID
            const uuidValue = uuid();

            // Criar objeto com base64 e uuid
            const data = {
                base64: base64Image,
                uuid: uuidValue
            };

            // Enviar solicitação POST para a API
            fetch('http://127.0.0.1:3000/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    alert('Upload feito com sucesso!');
                    setQrGenerated(true);
                } else {
                    alert('Ocorreu um erro ao fazer o upload.');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao fazer o upload.');
            });
        };
    };

    return (
        <div>
            <h1>Criar QR Code</h1>
            <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
            <button className="upload-btn" onClick={() => document.querySelector('input[type="file"]').click()}>Selecionar Imagem</button>
            {selectedImage && (
                <>
                    <img src={selectedImage} alt="Imagem de exemplo" style={{ maxWidth: '80%', borderRadius: '20px', display: 'block', margin: '20px auto' }} />
                    <button className="upload-btn" onClick={handleGenerateQR}>Gerar QR Code</button>
                </>
            )}
        </div>
    );
}

export default App;
