const p2p_port = process.env.P2P_PORT || 6001;

const WebSocket = require("ws");

function initP2PServer() {
	const server = WebSocket.server({ port: p2p_port });
	server.on("connection", (ws) => {
		initConnection(ws);
	});
	console.log("Listening webSocket port : " + p2p_port);
}

let sockets = [];

function initConnection(ws) {
	sockets.push(ws);
}

function getSockets() {
	return sockets;
}

function write(ws, message) {
	ws.send(JSON.stringify(message));
}

function broadcast(message) {
	sockets.forEach((socket) => {
		write(socket, message);
	});
}

function connectToPeers(newPeers) {
	newPeers.forEach((peer) => {
		const ws = new WebSocket(peer);
		ws.on("open", () => {
			initConnection(ws);
		});
		ws.on("error", () => {
      console.log("Connection Failed!");
    });
	});
}
module.exports = {connectToPeers}