import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const UploadImage = () => {
    const [base64String, setBase64String] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result.replace("data:", "").replace(/^.+,/, "");
            setBase64String(base64);
        };
        reader.readAsDataURL(file);
    };

    const uploadImage = async () => {
        const payload = {
            base64: base64String,
            uuid: uuidv4()
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };

        try {
            const response = await fetch('https://f3ab9269-e495-4e9f-92ed-48c02a09974c-00-2jqb9bh52d3bj.worf.replit.dev/upload', requestOptions);
            const data = await response.json();
            setResponseMessage(`Success: ${data.message}`);
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('Error uploading image');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileSelect} />
            <button onClick={uploadImage}>Upload Image</button>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default UploadImage;
