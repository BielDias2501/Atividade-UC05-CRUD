
const express = require("express")
const ClienteController = require("../controllers/index")

const router = express.Router()

router.post("/clientes", ClienteController.criarCliente)

router.get("/clientes", ClienteController.listarClientes)

router.get("/cliente/nome/:nome", ClienteController.listarClienteNome)

router.get("/cliente/id/:id", ClienteController.listarClienteID)

router.get("/cliente/cpf/:cpf", ClienteController.listarClienteCPF)

router.put("/cliente/:id", ClienteController.editarCliente)

router.delete("/cliente/:id", ClienteController.deletarCliente)

router.delete("/clientes", ClienteController.deletarTodosClientes)

module.exports = router
