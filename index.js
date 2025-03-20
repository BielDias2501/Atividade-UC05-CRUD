const express = require('express')
const dotenv = require('dotenv')
const ServicoRoutes = require('./src/modules/serviços/routes/index')
dotenv.config();

const port = process.env.PORTA;
const app = express();

//Aplicação use express com json
app.use(express.json());

app.use(ServicoRoutes)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});