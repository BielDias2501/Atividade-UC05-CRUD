const express = require('express')
const dotenv = require('dotenv')
const ServicoRoutes = require('./src/modules/cliente/routes/index')
const ServicoRoutesss = require('./src/modules/endereço/routes/index')
const ServicoRoutess = require('./src/modules/ordem_serviços/routes/index')
dotenv.config();

const port = process.env.PORTA;
const app = express();

//Aplicação use express com json
app.use(express.json());

app.use(ServicoRoutes)
app.use(ServicoRoutess)
app.use(ServicoRoutesss)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});