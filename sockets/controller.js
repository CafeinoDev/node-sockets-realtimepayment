

const socketController = (socket) => {
    console.log('Cliente conectado', socket.id );

    socket.on('qrScanned', payload => {
        console.log('QR code scanned:', result);
        socket.emit('qrScanned', payload);
      });

}



module.exports = {
    socketController
}
