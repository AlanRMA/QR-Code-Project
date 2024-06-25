# Projeto QR Code

Este projeto consiste em uma aplicação que gera QR codes com base em uma imagem fornecida pelo usuário.
![screenshot](backend/temp/Screenshot_2024-06-25_at_14.25.00.png)

## Pré-requisitos

Antes de iniciar, certifique-se de ter o seguinte instalado e configurado:

- **MongoDB**: Certifique-se de que o MongoDB está instalado e em execução em sua máquina.
- **Arquivo .env**: Crie um arquivo `.env` na raiz do projeto contendo as seguintes variáveis de ambiente:
    
    ```makefile
    MONGO_URI=sua_uri_mongo
    MONGO_DB=nome_do_banco_de_dados
    MONGO_COLLECTION=nome_da_colecao
    
    ```
    
    Substitua `sua_uri_mongo`, `nome_do_banco_de_dados` e `nome_da_colecao` pelos valores correspondentes ao seu ambiente.
    

## Configuração

Além dos pré-requisitos mencionados acima, é necessário configurar o script JavaScript e o arquivo `app.py`.

1. **Script JavaScript (`script.js`)**: No arquivo `script.js`, substitua o link do host pelo host correspondente ao seu ambiente. Este link é utilizado para gerar os QR codes.
2. **Arquivo `app.py`**: No final do arquivo `app.py`, substitua o link do host pelo host correspondente ao seu ambiente. Este link é utilizado para fornecer os QR codes gerados pela aplicação.

## Executando o servidor

Para iniciar o servidor, siga estas etapas:

1. Navegue até o diretório `backend` do projeto.
2. Execute o seguinte comando no terminal:
    
    ```

    python3 app.py
    
    ```
    

Isso iniciará o servidor e você poderá acessar a aplicação.