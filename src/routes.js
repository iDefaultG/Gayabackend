const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();// rotas separadas do server

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

routes.post('/boxes', BoxController.store);// rota de acesso para a app)
routes.get('/boxes/:id', BoxController.show);
routes.post('/boxes/:id/files', multer(multerConfig).single('file'), FileController.store);// rota de acesso para a app)

module.exports = routes;//exporta alguma informação do arquivo no caso a variavel Routes