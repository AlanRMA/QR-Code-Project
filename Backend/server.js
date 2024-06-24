const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Adicione esta linha para habilitar CORS

app.use(express.json());

app.post('/upload', (req, res) => {
    // Sua lógica de upload
    res.json({ message: 'Upload successful!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
