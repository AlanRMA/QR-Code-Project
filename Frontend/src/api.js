import axios from 'axios';

const API_URL = 'https://sua-api.com';  // Substitua pelo URL da sua API

export const uploadImage = (imageData) => {
    return axios.post(`${API_URL}/images`, imageData);
};

export const fetchImages = () => {
    return axios.get(`${API_URL}/images`);
};

export const updateImage = (id, imageData) => {
    return axios.put(`${API_URL}/images/${id}`, imageData);
};

export const deleteImage = (id) => {
    return axios.delete(`${API_URL}/images/${id}`);
};
