const pool = require('../../../config/database')

function ListarServicos() {
    try {
        const query = `select * from servicos`
        const resultado = pool.query(query)
        if(!resultado){
            
        }
    } catch (error) {
        
    }
}