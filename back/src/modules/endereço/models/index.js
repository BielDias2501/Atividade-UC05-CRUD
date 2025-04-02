const axios = require('axios')
const { pool } = require ('../../../config/database')

class EnderecoModel{
    static async criarEndereco(){
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        const { logradouro, complemento, bairro, localidade, uf} = resposta.data
        const dados = [
            id,
            cep,
            logradouro,
            numero,
            complemento
        ]
    }
}