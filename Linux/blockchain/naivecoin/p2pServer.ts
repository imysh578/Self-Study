import WebSocket from "ws";

import { Block } from "./blockStructure";
import { addBlock, replaceChain } from "./utils";
import { isValidBlockStructure } from "./validataions";

const sockets: WebSocket[] = [];

enum MessageType {
	QUERY_LATEST = 0,
	QUERY_ALL = 1,
	RESPONSE_BLOCKCHAIN = 2,
}

class Message {
	public type: MessageType;
	public data: any;
	constructor(type: MessageType, data: any){
		this.type = type;
		this.data = data;
	}
}

const initP2PServer = (p2pPort: number) => {
	const server: WebSocket.Server = new WebSocket.Server({ port: p2pPort });
	server.on("connection", (ws: WebSocket) => {
		initConnection(ws);
	});
	console.log("Listening websocket p2p Port on: ", p2pPort);
};

const getSockets = () => sockets;

const initConnection = (ws: WebSocket) => {
	sockets.push(ws);
	initMessageHandler(ws);
	initErrorHandler(ws);
	write(ws, queryLatestMsg());
};

const initMessageHandler = (ws: WebSocket) => {
	ws.on("message", (data: string) => {
		const message: Message = JSON.parse(data);
		if (message === null) {
			console.log("Could not parse received JSON message: ", data);
			return;
		}
		console.log("Received message : ", message);
		switch (message.type) {
			case MessageType.QUERY_LATEST:
				console.log("Query lastest");
				write(ws, responseLatestMsg());
				break;
			case MessageType.QUERY_ALL:
				console.log("Query All");
				write(ws, responseChainMsg());
				break;
			case MessageType.RESPONSE_BLOCKCHAIN:
				console.log("Response Blockchain");
				const receiveBlocks: Block[] = JSON.parse(message.data);
				handleBlockchainResponse(receiveBlocks);
				break;
		}
	});
};

const write = (ws: WebSocket, message: Message): void =>
	ws.send(JSON.stringify(message));
	
const broadcast = (message: Message): void =>
	sockets.forEach((socket) => write(socket, message));

const queryAllMsg = (): Message => ({
	type: MessageType.QUERY_ALL,
	data: null,
});

const queryLatestMsg = (): Message => ({
	type: MessageType.QUERY_LATEST,
	data: null,
});

const responseChainMsg = (): Message => ({
	type: MessageType.QUERY_ALL,
	data: JSON.stringify(Block.blockchain),
});
const responseLatestMsg = (): Message => ({
	type: MessageType.QUERY_LATEST,
	data: JSON.stringify([Block.lastBlock()]),
});
// 
const initErrorHandler = (ws: WebSocket) => {
	const closeConnection = (myWs: WebSocket) => {
		console.log("Connection failed to peer: ", myWs.url);
		sockets.splice(sockets.indexOf(myWs), 1);
	};
	ws.on("close", () => closeConnection(ws));
	ws.on("error", () => closeConnection(ws));
};

const handleBlockchainResponse = (receiveBlocks: Block[]) => {
	if (receiveBlocks.length === 0) {
		console.log("Received blockchain length : 0");
		return;
	}
	const newBlockReceived: Block = receiveBlocks[receiveBlocks.length - 1];
	if (!isValidBlockStructure(newBlockReceived)) {
		console.log("Received Block Structure is invalid");
		return;
	}

	const newBlockHeld: Block = Block.lastBlock();
	if (newBlockReceived.header.index > newBlockHeld.header.index) {
		console.log("Received Blockchain is possibly longer than my blockchain");
		if (newBlockHeld.hash === newBlockReceived.header.prevHash) {
			if (addBlock(newBlockReceived)) {
				broadcast(responseLatestMsg());
			}
		} else if (receiveBlocks.length === 1) {
			console.log("We have to query the chain from our peer");
			broadcast(queryAllMsg());
		} else {
			console.log("Receive blockchain is longer than my blockchain");
			replaceChain(receiveBlocks);
		}
	} else {
		console.log(
			"Received blockchain is not longer than my blockchain. Nothing to do"
		);
	}
};

const broadcastLatest = (): void => {
	broadcast(responseLatestMsg());
};

const connectToPeers = (newPeer: string): void => {
	const ws: WebSocket = new WebSocket(newPeer);
	ws.on("open", () => {
		initConnection(ws);
	});
	ws.on("error", () => {
		console.log("Connection failed!");
	});
};

export { connectToPeers, broadcastLatest, initP2PServer, getSockets };
