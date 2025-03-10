const express = require('express')
const {pool} = require('./src/config/database')
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORTA
const app = express()

app.use(express.json())

//BUSCAR SERVIÇOS
app.get('/servico', async (requisicao,resposta) => {
    try {
        const consulta = `select * from servicos`
        const servicos = await pool.query(consulta)
        if(servicos.rows.length === 0){
            return resposta.status(200).json({mensagem: "banco de dados vazio"}) 
        } 
         resposta.status(200).json(servicos.rows);        
    } catch (error) {
        resposta.status(500).json({mensagem:"Erro ao buscar produto",
            erro: error.message
        })
    }
});

//CRIAR SERVIÇO
app.post('/servico', async (requisicao,resposta) => {
    try {
        const {cliente, endereco, tipo_servico, data_hora , status} = requisicao.body
        if(!cliente || !endereco || !tipo_servico || !data_hora  || !status){
            return resposta.status(200).json({mensagem:"Todos os dados devem ser inseridos"})
        }
        const dados = [cliente, endereco, tipo_servico, data_hora , status]
        const consulta = `insert into servicos(cliente, endereco, tipo_servico, data_hora , status)
        values ($1, $2, $3, $4, $5) returning *`
        await pool.query(consulta,dados)
        resposta.status(201).json({mensagem:"Servico criado com sucesso"});
    } catch (error) {
        resposta.status(500).json({mensagem:"Erro ao cadastrar servico",
            error: error.message
        })
    }
});

//EDITAR SERVIÇOS
app.put('/servico/:id', async (requisicao, resposta) => {
    //http:localhost:3000/servicos/1
    try {
        const id = requisicao.params.id;
        const {novoCliente, novoEndereco, novoTipoServico, novadata_hora , novoStatus } = requisicao.body
        if(!id){
            return resposta.status(404).json({mensagem:"informe um paramentro"})
        }
        const dados1 = [id]
        const consulta1 = `select * from servicos where id = $1`
        const resultado1 = await pool.query(consulta1, dados1)
        if(!resultado1.rows.length === 0){
            return resposta.status(404).json({mensagem:"Servico não encontrado"})
        }
        const dados2 = [novoCliente, novoEndereco, novoTipoServico, novadata_hora , novoStatus, id]
        const consulta2 = `update servicos set cliente = $1, endereco = $2, tipo_servico = $3, data_hora  = $4, status = $5 where id = $6`
        await pool.query(consulta2, dados2)
        resposta.status(200).json({mensagem:"Servico atualizado com sucesso"})
    } catch (error) {
        resposta.status(500).json({mensagem:"Erro ao editar servicos", erro: error.message})
    }
})

//DELETAR SERVICOS
app.delete('/servico/:id', async (requisicao,resposta) => {
    try {
        const dados1 = [id]
        const consulta1 = `select * from servicos where id = $1`
        const resultado1 = await pool.query(consulta1, dados1)
        if(!resultado1.rows.length === 0){
            return resposta.status(404).json({mensagem:"Servico não encontrado"})
        }
        const dados2 = [id]
        const consulta2 = `delete from servicos where id = $1`
        await pool.query(consulta2, dados2)
        resposta.status(200).json({mensagem:"Servico deletado com sucesso"})
    } catch (error) {
        resposta.status(500).json({mensagem:"Erro ao excluir serviços", erro: error.message})
    }
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
})