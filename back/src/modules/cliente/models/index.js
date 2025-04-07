const ClienteModel = require("../models/index")

class ClienteController {
    static async criarCliente(req, res) {
        try {
            const { nome, idade, contato, cpf } = req.body
            if (!nome || !idade || !contato || !cpf) {
                return res.status(400).json({ mensagem: "Todos os campos devem ser preenchidos" })
            }
            const novoCliente = await ClienteModel.criarCliente(nome, idade, contato, cpf)
            res.status(201).json(novoCliente)
        } catch (error) {
            res.status(500).json({ msg: "Erro ao criar um novo cliente", erro: error.message })
        }
    }

    static async listarClientes(req, res) {
        try {
            const listar = await ClienteModel.listarClientes()
            if (listar.length === 0) {
                return res.status(400).json({ mensagem: "Não há nenhum cliente registrado" })
            }
            res.status(200).json(listar)
        } catch (error) {
            res.status(500).json({ msg: "Erro ao listar os clientes", erro: error.message })
        }
    }

    static async listarClienteNome(req, res) {
        try {
            const nome = req.params.nome
            const listar = await ClienteModel.listarClienteNome(nome)
            if (listar.length === 0) {
                return res.status(200).json({ mensagem: "O cliente solicitado não existe" })
            }
            res.status(200).json(listar)
        } catch (error) {
            res.status(500).json({ msg: "Erro ao listar cliente pelo nome", erro: error.message })
        }
    }

    static async listarClienteID(req, res) {
        try {
            const id = req.params.id
            const listar = await ClienteModel.listarClienteID(id)
            if (listar.length === 0) {
                return res.status(200).json({ mensagem: "O ID solicitado não existe" })
            }
            res.status(200).json(listar)
        } catch (error) {
            res.status(500).json({ msg: "Erro ao listar cliente pelo ID", erro: error.message })
        }
    }

    static async listarClienteCPF(req, res) {
        try {
            const cpf = req.params.cpf
            const listar = await ClienteModel.listarClienteCPF(cpf)
            if (listar.length === 0) {
                return res.status(200).json({ mensagem: "O CPF solicitado não existe" })
            }
            res.status(200).json(listar)
        } catch (error) {
            res.status(500).json({ msg: "Erro ao listar cliente pelo CPF", erro: error.message })
        }
    }

    static async editarCliente(req, res) {
        try {
            const id = req.params.id
            const { nome, idade, contato, cpf } = req.body
            if (!nome || !idade || !contato) {
                return res.status(400).json({ mensagem: "Todos os campos obrigatorios devem ser preenchidos" })
            }
            const editar = await ClienteModel.editarCliente(id, nome, idade, contato, cpf)
            if (editar.length === 0) {
                return res.status(500).json({ mensagem: "Não foi possivel retornar a edição desse cliente" })
            }
            res.status(200).json({
                mensagem: "Cliente editado com sucesso",
                cliente: editar
            })
        } catch (error) {
            res.status(500).json({ msg: "Erro ao editar o cliente", erro: error.message })
        }
    }

    static async deletarCliente(req, res) {
        try {
            const id = req.params.id
            const deletar = await ClienteModel.deletarCliente(id)
            res.status(200).json({mensagem: "Cliente deletado com sucesso"})
        } catch (error) {
            res.status(500).json({ msg: "Erro ao deletar o cliente", erro: error.message })
        }
    }

    static async deletarTodosClientes(req, res) {
        try {
            const deletar = await ClienteModel.deletarTodosClientes()
            res.status(200).json({mensagem: "Todos os cliente foram deletados com sucesso"})
        } catch (error) {
            res.status(500).json({ msg: "Erro ao deletar todos os clientes", erro: error.message })
        }
    }
}

module.exports = ClienteController