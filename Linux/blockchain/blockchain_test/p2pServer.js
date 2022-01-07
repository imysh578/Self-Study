/****************/
/* p2pServer.js */
/****************/

// modules
const WebSocket = require("ws");
const { getLastBlock, getBlocks, addBlock, createHash } = require("./chainedBlock");

function initP2PServer(p2p_port) {
	const server = new WebSocket.Server({ port: p2p_port });
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
	});
}

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
				write(ws, responseLatestMsg());
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
	});
}

// Response only last block
function responseLatestMsg() {
	return {
		type: RESPONSE_BLOCKCHAIN,
		data: JSON.stringify([getLastBlock()]),
	};
}

// Resonse all blocks
function responseAllMsg() {
	return {
		type: RESPONSE_BLOCKCHAIN,
		data: JSON.stringify([getBlocks()]),
	};
}

//
function handleBlockChainResponse(msg) {
	const receiveBlocks = JSON.parse(msg.data);
	const latestRecieveBlock = receiveBlocks[receiveBlocks.length - 1];
	const myLastBlock = getLastBlock();

  // if recieved block is longer than mine
	if (latestRecieveBlock.header.index > myLastBlock.header.index) {
    // if my last block's hash is same with recieve block's previousBlockHash
    if (createHash(myLastBlock) === latestRecieveBlock.header.previousBlockHash) {
      // Add recieved block to mine and if it'done successfully, response last block
      if(addBlock(latestRecieveBlock)){
        broadcast(responseLatestMsg())
      } else {
				console.log("AddBlock falied. Invalid block!");
			}
    }
    // if received block is genesis block, query all blocks
    else if (receiveBlocks.length === 1) {
      broadcast(queryAllMsg());
    }
  
    // my block is longer than others, replace all blocks
    else {
      replaceChain(receiveBlocks);
    }
  } else {
    console.log(
			"Do nothing : lastReceivedBlock.header.index <= lastMyBlock.header.index."
		);
  }
}


// query msg functions
function queryLatestMsg() {
  return {
    type: QUERY_LATEST,
    data: null,
  }
}

function queryAllMsg() {
  return {
    type: QUERY_ALL,
    data: null,
  }
}

function initErrorHandler(ws) {
  ws.on("close", () => {
    closeConnection(ws);
  })
  ws.on("error", () => {
    closeConnection(ws);
  })
}

function closeConnection(ws) {
  console.log(`Connection close ${ws.url}`);
  sockets.splice(sockets.indexOf(ws), 1);
}

module.exports = { initP2PServer };
