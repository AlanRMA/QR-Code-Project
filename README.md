# Documento de Requisitos para Projeto QR Code

**1. Introdução**

Este documento define os requisitos para o projeto QR Code, que visa criar um sistema que permita aos restaurantes disponibilizarem seus menus aos clientes através de QR Codes. O sistema também permitirá aos usuários transformar qualquer imagem em um QR Code e escanear QR Codes para acessar conteúdo online.

**2. Objetivos**

- **Restaurante:**
    - Oferecer menus aos clientes através de QR Codes.
    - Permitir que os clientes visualizem o menu sem precisar de um garçom.
    - Facilitar o pedido de comida para os clientes.
- **Imagem:**
    - Transformar qualquer imagem em um QR Code.
    - Permitir que os usuários compartilhem informações através de QR Codes.
- **Cliente:**
    - Acessar menus de restaurantes através de QR Codes.
    - Visualizar informações online através de QR Codes.

**3. Requisitos Funcionais**

**3.1 Armazenamento de Imagens**

- Utilizar o banco de dados NoSQL MongoDB para armazenar as imagens.
- As imagens devem ser armazenadas em uma coleção separada dos dados dos usuários.
- Cada imagem deve ser identificada por um UUID único.

**3.2 API**

- A API deve fornecer endpoints para realizar operações CRUD (Create, Read, Update, Delete) em imagens.
- A API deve ser autenticada e fornecer três níveis de acesso:
    - **Admin (Nível 1):** Acesso total a todas as operações CRUD em todas as imagens.
    - **Usuário/Dono do Restaurante (Nível 2):** Acesso total a operações CRUD em suas próprias imagens e acesso de leitura a todas as imagens.
    - **Cliente (Nível 3):** Acesso de leitura a todas as imagens.
- As operações CRUD devem funcionar da seguinte maneira:
    - **Create:** Criar uma nova imagem na mesma coleção do usuário.
    - **Read:** Obter uma imagem por UUID ou obter uma lista de imagens com base em critérios de pesquisa.
    - **Update:** Atualizar uma imagem existente na mesma coleção do usuário (mantendo o UUID).
    - **Delete:** Excluir uma imagem (apenas para Admin).

**3.3 Funções Adicionais da API**

- A API deve fornecer um endpoint para criar novos usuários (Nível 2).
- A API deve fornecer um endpoint para excluir usuários (Nível 1).
- A API deve retornar uma imagem em formato binário quando um endpoint Read for acessado.
- A API deve usar índices de dados para otimizar o desempenho das operações de leitura.

**3.4 Frontend para Usuário/Dono do Restaurante**

- O frontend deve permitir que o usuário/dono do restaurante realize as seguintes operações:
    - Fazer upload de novas imagens.
    - Visualizar e editar suas próprias imagens.
    - Visualizar a lista de todas as imagens.
- O frontend deve se conectar à API para realizar as operações CRUD em imagens.

**3.5 Banco de Dados MongoDB**

- O banco de dados MongoDB deve ser levantado e hospedado em um ambiente seguro.
- O banco de dados deve ser configurado para garantir alto desempenho e disponibilidade.
- O acesso ao banco de dados deve ser controlado através de autenticação e autorização.

**4. Requisitos Não Funcionais**

- **Segurança:**
    - O sistema deve ser seguro e proteger as informações dos usuários.
    - A API deve ser autenticada e autorizada para controlar o acesso aos dados.
    - O banco de dados MongoDB deve ser configurado para garantir a segurança dos dados.
- **Desempenho:**
    - O sistema deve ser responsivo e rápido.
    - A API deve ser otimizada para garantir um bom desempenho.
    - O banco de dados MongoDB deve ser configurado para garantir alto desempenho.
- **Escalabilidade:**
    - O sistema deve ser escalável para acomodar um grande número de usuários e imagens.
    - A API deve ser capaz de lidar com um grande volume de solicitações.
    - O banco de dados MongoDB deve ser escalável para armazenar um grande número de imagens.
- **Usabilidade:**
    - O sistema deve ser fácil de usar para restaurantes, usuários e clientes.
    - A interface do usuário deve ser intuitiva e fácil de navegar.
    - A documentação da API deve ser clara e completa.