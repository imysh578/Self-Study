// httpServer.js
const express = require("express");
const bodyParser = require("body-parser");
const {
	getLastBlock,
	getBlocks,
	nextBlock,
	getVersion,
	Blocks,
} = require("./chainedBlock.js");
const { addBlock, isValidChain, } = require("./checkValidBlock.js");
const { connectToPeers, getSockets, initMessageHandler, initP2PServer } = require("./p2pServer.js");
const { getPublicKeyFromWallet, initWallet } = require("./encryption.js");

const http_port = 3002;

function initHttpServer(port) {
	const app = express();
	app.use(bodyParser.json());
	app.get("/", (req, res) => {
		res.send(`Welcome to Server ${port}`)
	})
	
	// # add peers on 6005, 6006
	// $ curl -H "Content-type:application/json" --data "{\"data\" : [ \"ws://localhost:6005\", \"ws://localhost:6006\" ]}" http://localhost:3001/addPeers
	// $ curl -H "Content-type:application/json" --data '{"data" : ["ws://localhost:6005", "ws://localhost:6006"]}' http://localhost:3001/addPeers
	app.post("/addPeers", (req, res) => {
		const data = req.body.data || [];
		console.log(data);
		connectToPeers(data);
		res.send(data);
	});
	
	// $ curl -X GET http://localhost:3001/peers  |  python3 -m json.tool
	app.get("/peers", (req, res) => {
		let socketInfo = []
		getSockets().forEach((s) => {
			socketInfo.push(s._socket.remoteAddress + ":" + s._socket.remotePort)
		})
		res.send(socketInfo);
	})

	// Get blocks' info
	app.get("/blocks", (req, res) => {
		res.send(getBlocks());
	});

	// Add new block(== mine block)
	app.post("/mineBlock", (req, res) => {
		const data = req.body.data || [];
		const newBlock = nextBlock(data);
		const addBlockSuccess = addBlock(newBlock);
		console.log(`block: `, newBlock);
		console.log(`Add Block Success? : ${addBlockSuccess}`);
		const result_isValidChain = isValidChain(Blocks)
		console.log('Is valid chain? : ', result_isValidChain)
		res.send(getLastBlock());
	});

	// Get version
	app.get("/version", (req, res) => {
		res.send(getVersion());
	});

	app.post("/stop", (req, res) => {
		res.send({ msg: "Stop Server!" });
		process.exit();
	});

	app.get("/initWallet", (req, res) => {
		initWallet();
		res.send("Wallet is initiated!");
	})

	app.get("/address", (req, res) => {
		const address = getPublicKeyFromWallet().toString();
		if (address != ""){
			res.send({"address": address})
		} else {
			// if address is empty
			res.send("empty address!");
		}
	});

	app.listen(port, () => {
		console.log("Listening HTTP Port : " + port);
	});
	initP2PServer(6004);
	initP2PServer(6005);
	initP2PServer(6006);
}

initHttpServer(http_port);
