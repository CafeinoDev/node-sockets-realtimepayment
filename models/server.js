const fs = require('fs');
const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {
    
    constructor(){
        this.app = express();
        this.allowed_origins = process.env.ALLOWED_ORIGINS.split(',');
        this.port = process.env.PORT || 9000;
        this.server = require('http').createServer( {
            key: fs.readFileSync('server.key'),
            cert: fs.readFileSync('server.crt')
          }, this.app );
        this.io     = require('socket.io')( this.server, {
            cors: {
                origin: this.allowed_origins,
                methods: ['GET', 'POST']
            }
        } );

        this.middlewares();
        this.sockets();
    }

    middlewares(){
        this.app.use( cors({
            origin: this.allowed_origins
        }) );

        this.app.use(express.urlencoded({ extended: true }));
    }

    sockets() {
        this.io.on('connection', socketController );
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;