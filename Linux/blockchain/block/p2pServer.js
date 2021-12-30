// p2pServer.js
const p2p_port = process.env.P2P_PORT || 6001;

const WebSocket = require("ws");

function initP2PServer(test_port) {
	const server = new WebSocket.Server({ port: test_port });
	server.on("connection", (ws) => {
		initConnection(ws);
	});
	console.log("Listening webSocket port : " + test_port);
}
initP2PServer(6001);
initP2PServer(6002);
initP2PServer(6003);

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
			console.log(peer);
			initConnection(ws);
		});
		ws.on("error", () => {
      console.log("Connection Failed!");
    });
	});
}
module.exports = {connectToPeers, getSockets}