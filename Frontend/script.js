document.getElementById('uploadButton').addEventListener('click', function() {
    // Gerar um UUID
    var uuid = generateUUID();
    
    // Obter o input de arquivo
    var fileInput = document.getElementById('fileInput');
    
    // Verificar se um arquivo foi selecionado
    if (fileInput.files.length > 0) {
        var file = fileInput.files[0];
        
        // Ler o arquivo como uma URL de dados (base64)
        var reader = new FileReader();
        reader.onload = function(event) {
            var base64Image = event.target.result;
            
            // Enviar os dados para a API
            sendDataToAPI(base64Image, uuid);
        };
        reader.readAsDataURL(file);
    } else {
        console.error('Nenhum arquivo selecionado.');
    }
});

function generateUUID() {
    // Função para gerar UUID
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function sendDataToAPI(base64Image, uuid) {
    // Fazer uma requisição POST para a API
    var url = 'http://127.0.0.1:3000/create/';
    var payload = { base64: base64Image, uuid: uuid };
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar os dados para a API.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados enviados com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}
