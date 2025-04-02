const {pool} = require('../../../config/database')

class ServicoModel{
    static async criar(cliente, endereco, tipo_servico, data_hora, status){
        const dados = [cliente, endereco, tipo_servico, data_hora, status]
        const consulta = `insert into servicos(cliente, endereco, tipo_servico, data_hora, status)
        values ($1, $2, $3, $4, $5) returning *`
        const novoServico = await pool.query(consulta, dados)
        return novoServico.rows
    }
        static async editar(id,cliente, endereco, tipo_servico, data_hora, status){
        const dados = [id,cliente, endereco, tipo_servico, data_hora, status]
        const consulta = `update servicos set cliente = $2, endereco = $3, tipo_servico = $4, data_hora = $5, status = $6
        where id = $1 returning *`
        const servicoAtualizado = await pool.query(consulta,dados)
        return servicoAtualizado.rows
    }
        static async listar(){
        const consulta = `select * from servicos`
        const servicos = await pool.query(consulta)
        return servicos.rows
    }
        static async listarPorId(id){
        const dados = [id]
        const consulta = `select * from servicos where id = $1`
        const servicos = await pool.query(consulta,dados)
        return servicos.rows
    }
        static async excluirPorId(id){
        const dados = [id]
        const consulta = `delete from servicos where id = $1`
        const servicos = await pool.query(consulta,dados)
    }
        static async excluirTodos(){
        const consulta = `delete from servicos`
        await pool.query(consulta)
    }
}

module.exports = ServicoModel