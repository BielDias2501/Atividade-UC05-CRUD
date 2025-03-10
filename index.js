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
        resposta.status(500).json({mensagem:"Erro ao buscar servico",
            erro: error.message
        })
    }
});

//CRIAR SERVIÇO
app.post('/servico', async (requisicao,resposta) => {
    try {
        const {id, Cliente, Endereco, TipoServico, DataHora, Status} = requisicao.body
        if(!id || !Cliente || !Endereco || !TipoServico || !DataHora || !Status){
            return resposta.status(200).json({mensagem:"Todos os dados devem ser inseridos"})
        }
        const novoServico = {id, Cliente, Endereco, TipoServico, DataHora, Status};
        bancoDados.push(novoServico)
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
        const {novoCliente, novoEndereco, novoTipoServico, novaDataHora, novoStatus } = requisicao.body
        if(!id){
            return resposta.status(404).json({mensagem:"informe um paramentro"})
        }
        const dados1 = [id]
        const consulta1 = `select * from servicos where id = $1`
        const resultado1 = await pool.query(consulta1, dados1)
        if(!resultado1.rows.length === 0){
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

//BUSCAR PELO ID
app.get('/servicos/:id', (requisicao,resposta) => {
    try {
      const id = requisicao.params.id
      const servico = bancoDados.find(elemento => elemento.id === id)
      if(!servico){
        return resposta.status(404).json({mensagem:"servico não encontrado"})
      }
      resposta.status(200).json(servico)
    } catch (error) {
      resposta.status(500).json({mensagem:"Erro ao buscar o servico", erro: error.message})
    }
  });
  


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