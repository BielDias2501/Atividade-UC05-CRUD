const express = require("express")
const EnderecoController = require("../controllers/index")

const router = express.Router()



router.get("/enderecos", EnderecoController.listarEndereco)

router.get("/enderecos/cep/:cep", EnderecoController.listarEnderecoCEP)

router.get("/enderecos/cidade/:cidade", EnderecoController.listarEnderecoCidade)

router.get("/enderecos/cliente/:cliente", EnderecoController.listarEnderecoCliente)

router.post("/endereco", EnderecoController.criarEndereco)

router.put("/endereco/:id", EnderecoController.editarEndereco)



module.exports = router