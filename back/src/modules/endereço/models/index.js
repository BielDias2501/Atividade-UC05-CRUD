const { pool } = require("../../../config/database")
const axios = require("axios")

class EnderecoModel {
    static async criarEndereco(id, cep, numero, ponto_referencia){
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        const {logradouro, complemento, bairro, localidade, uf} = resposta.data
        const dados = [id, cep, numero, ponto_referencia, logradouro, complemento, bairro, localidade, uf]
        const consulta = `insert into servicos_enderecos(id_cliente, cep, numero, ponto_referencia, logradouro, complemento, bairro, localidade, uf)
                            values($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }

    static async listarEndereco(){
        const consulta = `select * from servicos_enderecos`
        const resultado = await pool.query(consulta)
        return resultado.rows
    }

    static async listarEnderecoCliente(cliente){
        const dados = [cliente]
        const consulta = `
        select servicos_cliente.*, servicos_enderecos.* 
        from servicos_enderecos join servicos_cliente 
        on servicos_cliente.id = servicos_enderecos.id_cliente where id_cliente = $1`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }

    static async listarEnderecoCidade(cidade){
        const dados = [`%${cidade}%`]
        const consulta = `select * from servicos_enderecos where lower(localidade) like lower($1)`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }

    static async listarEnderecoCEP(cep){
        const dados = [cep]
        const consulta = `select * from servicos_enderecos where cep = $1`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }

    static async editarEndereco(id, cep, numero, ponto_referencia){
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        const {logradouro, complemento, bairro, localidade, uf} = resposta.data
        const dados = [id, cep, numero, ponto_referencia, logradouro, complemento, bairro, localidade, uf]
        const consulta = `update servicos_enderecos set cep = $2 , numero = $3 , ponto_referencia = $4 , logradouro = $5 , complemento = $6 , bairro = $7 , localidade = $8 , uf = $9 where id_cliente = $1 returning *`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }
}

module.exports = EnderecoModel