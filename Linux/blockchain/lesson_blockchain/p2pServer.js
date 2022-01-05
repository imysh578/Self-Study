/****************/
/* p2pServer.js */
/****************/

const p2p_port = process.env.P2P_PORT || 6001;

const WebSocket = require("ws");
const { getLastBlock, getBlocks, createHash } = require("./chainedBlock");
const { addBlock } = require("./checkValidBlock");

function initP2PServer(test_port) {
	const server = new WebSocket.Server({ port: test_port });
	server.on("connection", (ws) => {
		initConnection(ws);
	});
	console.log("Listening webSocket port : " + test_port);
}

let sockets = [];

function initConnection(ws) {
	sockets.push(ws);
	initMessageHandler(ws);
	initErrorHandler(ws);
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

// Handling messages
const MessageType = {
	QUERY_LATEST: 0,
	QUERY_ALL: 1,
	RESPONSE_BLOCKCHAIN: 2,
};

function initMessageHandler(ws) {
	ws.on("message", (data) => {
		const message = JSON.parse(data);

		switch (message.type) {
			case MessageType.QUERY_LATEST:
				write(ws, responseLastestMsg());
				break;
			case MessageType.QUERY_ALL:
				write(ws, responseAllChainMsg());
				break;
			case MessageType.RESPONSE_BLOCKCHAIN:
				handleBlockChainResponse(message);
				break;
			default:
				break;
		}
	});
}

function responseLastestMsg() {
	return {
		type: RESPONSE_BLOCKCHAIN,
		data: JSON.stringify([getLastBlock()]),
	};
}

function responseAllChainMsg() {
	return {
		type: RESPONSE_BLOCKCHAIN,
		data: JSON.stringify(getBlocks()),
	};
}

function handleBlockChainResponse(msg) {
	const receiveBlocks = JSON.parse(message.data);
	const latestReceivedBlock = receiveBlocks[receiveBlocks.length - 1];
	const lastMyBlock = getLastBlock();

	// 데이터로 받은 블록 중에 마지막 블록의 인덱스가 내가 보유 중인 블록 중인 마지막 블록의 인덱스보다 클 때/작을 때
	if (latestReceivedBlock.header.index > lastMyBlock.header.index) {
		// 받은 마지막 블록의 이전 해시값이 내 마지막 블록일 때 : 내 블록의 nextBlock이므로 addBlock 해준다
		if (
			createHash(lastMyBlock) === latestReceivedBlock.header.previousBlockHash
		) {
			// addBlock이 잘 됐으면
			if (addBlock(latestReceivedBlock)) {
				broadcast(responseLastestMsg());
			} else {
				console.log("AddBlock falied. Invalid block!");
			}
		}
		// 받은 블럭의 전체 크기가 1일 때
		else if (receiveBlocks.length === 1) {
			broadcast(queryAllMsg());
		}
		// 내 블록이 제일 긴 블록일 때 : 다른 블록들을 다 바꿔줘야함
		else {
			replaceChain(receiveBlocks);
		}
	} else {
		console.log(
			"Do nothing : lastReceivedBlock.header.index <= lastMyBlock.header.index."
		);
	}
}

function queryAllMsg() {
	return {
		type: QUERY_ALL,
		data: null,
	};
}

function queryLastestMsg() {
	return {
		type: QUERY_LATEST,
		data: null,
	};
}

function initErrorHandler(ws) {
	ws.on("close", () => {
		closeConnection(ws);
	});
	ws.on("error", () => {
		closeConnection(ws);
	});
}

function closeConnection(ws) {
	console.log(`Connection close ${ws.url}`);	
	sockets.splice(sockets.indexOf(ws), 1);
}

module.exports = {
	connectToPeers,
	getSockets,
	queryAllMsg,
	queryLastestMsg,
	initP2PServer,
};
