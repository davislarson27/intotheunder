const { WebSocketServer, WebSocket } = require('ws');

function peerProxy(httpServer) {
    const socketServer = new WebSocketServer({ server: httpServer });

    socketServer.on('connection', (clientSocket) => {
        clientSocket.isAlive = true;

        clientSocket.on('message', () => {
            socketServer.clients.forEach((client) => {
                if (client !== clientSocket && client.readyState === WebSocket.OPEN) {
                  client.send(JSON.stringify({ update: true }));
                }
            });
        });

        clientSocket.on('pong', () => {
            clientSocket.isAlive = true;
        });

        clientSocket.send('hello from the socket world!');    

    });

    setInterval( () => {
        socketServer.clients.forEach((client) => {
            if (client.isAlive === false) return client.terminate();
            client.isAlive = false;
            client.ping();
        });
    }, 15000)

    setInterval( () => {
        socketServer.clients.forEach((client) => {
            client.send("hello from the socket world retry");
        });
    }, 5000)
    
}

module.exports = { peerProxy };