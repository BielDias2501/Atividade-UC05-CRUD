const ServicoModel = require ("../models/index")

class ServicoController{
    static async criar(requisicao,resposta){
        try {
            const {id,cliente, endereco, tipo_servico, data_hora, status} = requisicao.body
            if(!id|| !cliente || !endereco || !tipo_servico || !data_hora || !status){
                return resposta.status(400).json({mensagem: "Todos os campos devem ser preenchidos!"})
            }
            const novoServico = await ServicoModel.criar(id,cliente, endereco, tipo_servico, data_hora, status)
            resposta.status(201).json({mensagem: "Servico criado com sucesso", servico: novoServico})
        } catch (error) {
            resposta.status(500).json({mensagem:"Erro ao criar o servico!",
                erro: error.message})
        }
    }
    static async editar(requisicao,resposta){
        try {
            const id = requisicao.params.id
            const {cliente, endereco, tipo_servico, data_hora, status} = requisicao.body
            if(!cliente || !endereco || !tipo_servico || !data_hora || !status){
                return resposta.status(400).json({mensagem: "Todos os campos devem ser preenchidos!"})
            }
            const servico = await ServicoModel.editar(id,cliente, endereco, tipo_servico, data_hora, status)
            if(servico.length === 0){
                return resposta.status(400).json({mensagem: "Servico não encontrado"})   
            }
            resposta.status(200).json({mensagem: "Servico editado com sucesso!", servico: servico})
        } catch (error) {
            resposta.status(500).json({mensagem:"Erro ao editar o servico!",
                erro: error.message})
        }
    }
    static async listarTodos(requisicao, resposta) {
        try {
            const servicos = await ServicoModel.listar()
            if(servicos.length === 0){
                return resposta.status(400).json({mensagem: "Não existem servicos para serem exibidos"})
            }
            return resposta.status(200).json(servicos);
        } catch (error) {
            resposta.status(500).json({mensagem:"Erro ao listar o servicos!",
                erro: error.message})
        }
    }
    
    static async listarPorId(requisicao,resposta){
        try {
            const id = requisicao.params.id
            const servico = await ServicoModel.listarPorId(id)
            if(!servico){
                return resposta.status(400).json({mensagem:"Servico não encontrado"})
            }
            resposta.status(200).json(servico)
        } catch (error) {
            resposta.status(500).json({mensagem:"Erro ao listar o servico pela id!",
                erro: error.message}) 
        }
    }
    static async excluirTodos(requisicao,resposta){
        try {
            await ServicoModel.excluirTodos()
            resposta.status(200).json({mensagem: "Todos os servicos excluídos com sucesso"})
        } catch (error) {
            resposta.status(500).json({mensagem:"Erro ao excluir todos os servicos!",
                erro: error.message})
        }
    }
    static async excluirPorId(requisicao,resposta){
        try {
            const id = requisicao.params.id
            const servico = await ServicoModel.listarPorId(id)
            if(!servico){
                return resposta.status(400).json({mensagem: "servico não encontrado"})
            }
            await ServicoModel.excluirPorId(id)
            resposta.status(200).json({mensagem:"Servico excluído com sucesso"})
        } catch (error) {
            resposta.status(500).json({mensagem:"Erro ao excluir o servico!",
                erro: error.message})
        }
    }
}

module.exports = ServicoController