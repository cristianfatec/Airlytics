# Airlytics - IoT Environmental Monitoring Solution

Airlytics é uma solução baseada em IoT para monitoramento de dados ambientais, incluindo temperatura, umidade e níveis de CO2. A aplicação coleta e exibe informações em tempo real em um painel interativo, apresentando estatísticas e dados históricos. Utiliza React Native para o front-end, Node.js para o back-end e dispositivos IoT para capturar dados dos sensores.

---

## Índice

- [Visão Geral do Projeto](#visão-geral-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instruções de Configuração](#instruções-de-configuração)
  - [Configuração IoT](#configuração-iot)
  - [Configuração do Frontend](#configuração-do-frontend)
  - [Configuração do Backend](#configuração-do-backend)
- [Documentação da API](#documentação-da-api)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## Visão Geral do Projeto

Airlytics permite o monitoramento em tempo real de dados ambientais, como temperatura, umidade e CO2, através de sensores IoT conectados. Ele armazena os dados no MongoDB e os apresenta em um painel amigável construído com React. O sistema é projetado para facilitar o monitoramento da qualidade do ar e outras variáveis ambientais, oferecendo gráficos visuais e tendências de dados históricos.

---

## Tecnologias Utilizadas

- **Frontend**: React, React Router, React Chart.js
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **IoT**: Arduino (DHT22 para umidade e temperatura, sensor MQ para CO2)
- **Database**: MongoDB
- **Libraries**:
  - axios para fazer requisições HTTP
  - serialport para comunicação com Arduino via porta serial
  - chart.js para visualização de dados no frontend

---

## Instruções de Configuração

Para rodar a aplicação localmente, você precisa configurar o frontend, backend e o ambiente IoT. Abaixo estão os passos para cada componente.

### Configuração IoT

1. **Hardware**: Conecte o sensor DHT22 a uma placa Arduino e o sensor de gás MQ aos pinos especificados.
   - **DHT22**: Sensor de umidade e temperatura.
   - **Sensor MQ**: Sensor de gás CO2.
   
2. **Código do Arduino**:
   - O código do Arduino lê dados dos sensores e os envia pela conexão serial em formato JSON.
   - O código para o Arduino está localizado na pasta IOT.

3. **Instalar Dependências**:
   - Você precisa instalar as bibliotecas necessárias para a comunicação serial:

     ```bash
     npm install serialport mongodb
     ```

4. **Rodar a aplicação IoT**:
   - Execute o código para começar a ler dados dos sensores e salvá-los no MongoDB.

     ```bash
     node app.js
     ```

### Configuração do Frontend

1. **Clonar o repositório**:

   ```bash
   git clone https://github.com/cristianfatec/API-Airlytics.git
   cd frontend
    