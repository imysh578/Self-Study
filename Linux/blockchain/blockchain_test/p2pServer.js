/****************/
/* p2pServer.js */
/****************/

// modules
const WebSocket = require("ws");

function initP2PServer (p2p_port) {
  const server = new WebSocket.Server({port: p2p_port});
  server.on("connection", (ws) => {
    initConnection(ws);
  });
  console.log(`Listening webSocket port : ${p2p_port}`);
}


let sockets = [];

function initConnection(ws) {
  sockets.push(ws);
  initMessageHandler(ws);
  initErrorHandler(ws);
}

// Send message to other node
function write(ws, message) {
  ws.send(JSON.stringify(message));
}

// Send message to all nodes
function broadcast(message) {
  sockets.forEach((socket) => {
    write(socket, message);
  })
}

const MessageType = {
  QUERY_LATEST : 0,
  QUERY_ALL : 1,
  RESPONSE_BLOCKCHAIN : 2,
}

function initMessageHandler(ws) {
  ws.on("message", (data) => {
    const message = JSON.parse(data);

    switch (message.type) {
      case MessageType.QUERY_LATEST:
        write(ws, responseLastestMsg());
        break;
      case MessageType.QUERY_ALL:
        write(ws, responseAllMsg());
        break;
      case MessageType.RESPONSE_BLOCKCHAIN:
        handleBlockChainResponse(message);
        break;
      default:
        break;
    }
  })
}



module.exports = {initP2PServer}