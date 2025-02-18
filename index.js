const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const port = process.env.PORTA
const app = express()

app.use(express.json())

const bancoDados = []

//BUSCAR SERVIÇOS
app.get('/servicos', (requisicao,resposta) => {
    try {
        if(bancoDados.length === 0){
            return resposta.status(200).json({mensagem:"Banco de dados vazio"})
        }
        resposta.status(200).json(bancoDados);        
    } catch (error) {
        resposta.status(500).json({mensagem:"Erro ao buscar produto",
            erro: error.message
        })
    }

});

//CRIAR SERVIÇO
app.post('/servicos', (requisicao,resposta) => {
    try {
        const {id, Cliente, Endereco, TipoServico, DataHora, Status} = requisicao.body
        if(!id || !Cliente || !Endereco || !TipoServico || !DataHora || !Status){
            return resposta.status(200).json({mensagem:"Todos os dados devem ser inseridos"})
        }
        const novoServico = {id, Cliente, Endereco, TipoServico, DataHora, Status};
        bancoDados.push(novoServico)
        resposta.status(201).json({mensagem:"Servico criado com sucesso"});
    } catch (error) {
        resposta.status(500).json({mensagem:"Erro ao cadastrar servico"})
    }
});

//EDITAR SERVIÇOS
app.put('/servicos/:id', (requisicao, resposta) => {
    //http:localhost:3000/servicos/1
    try {
        const id = requisicao.params.id;
        const {novoCliente, novoEndereco, novoTipoServico, novaDataHora, novoStatus } = requisicao.body
        if(!id){
            return resposta.status(404).json({mensagem:"informe um paramentro"})
        }
        const servico = bancoDados.find(elemento => elemento.id == id)
        if(!servico){
            return resposta.status(404).json({mensagem:"Servico não encontrado"})
        }
        servico.Cliente = novoCliente || servico.Cliente
        servico.Endereco = novoEndereco || servico.Endereco
        servico.TipoServico = novoTipoServico || servico.TipoServico
        servico.DataHora = novaDataHora || servico.DataHora
        servico.Status = novoStatus || servico.Status
        resposta.status(200).json({mensagem:"Servico atualizado com sucesso"})
    } catch (error) {
        resposta.status(500).json({mensagem:"Erro ao editar servicos", erro: error.message})
    }
})

//DELETAR SERVICOS
app.delete('/servicos/:id', (requisicao,resposta) => {
    try {
        const id = requisicao.params.id
        const index = bancoDados.findIndex( elemento => elemento.id === id)
        if(index === -1){
            return resposta.status(404).json({mensagem:"Servico não encontrado"})
        }
        bancoDados.splice(index,1)
        resposta.status(200).json({mensagem:"Servico deletado com sucesso"})
    } catch (error) {
        resposta.status(500).json({mensagem:"Erro ao excluir serviços", erro: error.message})
    }
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
})