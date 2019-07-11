const express = require('express');// chama a  biblioteca express
const mongoose = require("mongoose");
const path = require('path')
const cors = require('cors')

const app = express();// guarda todas as informaçoes da aplicaçao
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);


io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);

    });
});

mongoose.connect("mongodb+srv://Gaya:Gaya@cluster0-ui9il.mongodb.net/Gaya?retryWrites=true&w=majority",
    {
        useNewUrlParser: true
    }
);

app.use((req, res, next) => {
    req.io = io;

    return next();
});

//cadastra um modulo dentro do express
app.use(express.json());//ajuda a aplicação a enteder as requisições
app.use(express.urlencoded({ extended: true }));//permite que seja enviado arquivos 
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));



server.listen(process.env.PORT || 3333);