const EnderecoModel = require("../models/index")

class EnderecoController {
    static async criarEndereco(req, res) {
        try {
            const { id, cep, numero, ponto_referencia } = req.body
            if (!id || !cep || !numero) {
                return res.status(400).json({ mensagem: "Todos os campos solicitados devem ser preenchidos corretamente" })
            }
            const endereco = await EnderecoModel.criarEndereco(id, cep, numero, ponto_referencia)
            res.status(201).json({
                mensagem: "Endereço criado com sucesso",
                endereco: endereco
            })
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao criar endereço", erro: error.message })
        }
    }

    static async listarEndereco(req, res) {
        try {
            const listar = await EnderecoModel.listarEndereco()
            if (listar.length === 0) {
                return res.status(400).json({ mensagem: "Nenhum endereço foi encontrado" })
            }
            res.status(200).json(listar)
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao listar todos os endereços", erro: error.message })
        }
    }

    static async listarEnderecoCliente(req, res) {
        try {
            const cliente = req.params.cliente
            const listar = await EnderecoModel.listarEnderecoCliente(cliente)
            if (listar.length === 0) {
                return res.status(400).json({ mensagem: "Não foi possível encontrar nenhum endereço por meio desse cliente" })
            }
            res.status(200).json(listar)
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao listar o endereço pelo cliente específico", erro: error.message })
        }
    }

    static async listarEnderecoCidade(req, res) {
        try {
            const cidade = req.params.cidade
            const listar = await EnderecoModel.listarEnderecoCidade(cidade)
            if (listar.length === 0) {
                return res.status(400).json({ mensagem: "Não foi possível encontrar nenhum endereço por meio dessa cidade" })
            }
            res.status(200).json(listar)
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao listar o endereço pela cidade específica", erro: error.message })
        }
    }

    static async listarEnderecoCEP(req, res) {
        try {
            const cep = req.params.cep
            const listar = await EnderecoModel.listarEnderecoCEP(cep)
            if (listar.length === 0) {
                return res.status(400).json({ mensagem: "Não foi possível encontrar esse endereço por meio deste CEP" })
            }
            res.status(200).json(listar)
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao listar o endereço por meio deste CEP", erro: error.message })
        }
    }

    static async editarEndereco(req, res) {
        try {
            const id = req.params.id
            const { cep, numero, ponto_referencia } = req.body
            if (!cep || !numero) {
                return res.status(400).json({ mensagem: "Todos os campos obrigatorios devem ser preenchidos corretamente" })
            }
            const enderecoAtualizado = await EnderecoModel.editarEndereco(id, cep, numero, ponto_referencia)
            if (enderecoAtualizado.length === 0) {
                return res.status(200).json({ mensagem: "Esse endereço não existe" })
            }
            res.status(200).json({
                mensagem: "Endereço Atualizado com sucesso",
                endereco: enderecoAtualizado
            })
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao editar o endereço", erro: error.message })
        }
    }
}

module.exports = EnderecoController