
const { pool } = require("../../../config/database")

class ClienteModel{
    static async criarCliente(nome, idade, contato, cpf){
        const dados = [nome, idade, contato, cpf]
        const consulta = `insert into servicos_enderecos(nome, idade, contato, cpf)
                            values($1, $2, $3, $4) returning *`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }

    static async listarClientes(){
        const consulta = `select * from servicos_enderecos`
        const resultado = await pool.query(consulta)
        return resultado.rows
    }

    static async listarClienteNome(nome){
        const dados = [nome]
        const consulta = `select * from servicos_enderecos where nome = $1`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }

    static async listarClienteID(id){
        const dados = [id]
        const consulta = `select * from servicos_enderecos where id = $1`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }

    static async listarClienteCPF(cpf){
        const dados = [cpf]
        const consulta = `select * from servicos_enderecos where cpf = $1`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }

    static async editarCliente(id, nome, idade, contato, cpf){
        const dados = [id, nome, idade, contato, cpf]
        const consulta = `update servicos_enderecos set nome = $2, idade = $3, contato = $4, cpf = $5 where id = $1 returning *`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }

    static async deletarCliente(id){
        const dados = [id]
        const consulta = `delete from servicos_enderecos where id = $1`
        const resultado = await pool.query(consulta, dados)
    }

    static async deletarTodosClientes(){
        const consulta = `delete from servicos_enderecos`
        const resultado = await pool.query(consulta)
    }
}

module.exports = ClienteModel
