const express = require('express')
const ServicoController = require ("../controllers/index")

const router = express.Router()

router.get("/servico", ServicoController.listarTodos)
router.post("/servico", ServicoController.criar)
router.put("/servico/:id", ServicoController.editar)
router.get("/servico/:id", ServicoController.listarPorId)
router.delete("/servico/:id",ServicoController.excluirPorId)
router.delete("/servico",ServicoController.excluirTodos)

module.exports = router