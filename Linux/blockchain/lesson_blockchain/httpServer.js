/*****************/
/* httpServer.js */
/*****************/

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

// # create env variable HTTP_PORT and init as 3001
// $ export HTTP_PORT=3001
// # check if HTTP_PORT is created
// $ env | grep HTTP
// set multi-server's port
const http_port = process.env.HTTP_PORT || 3001;

function initHttpServer(port) {
	const app = express();
	app.use(bodyParser.json());
	app.get("/", (req, res) => {
		res.send(`Welcome to Server ${port}`)
	})
	
	// # add peers on 6002, 6003
	// $ curl -H "Content-type:application/json" --data "{\"data\" : [ \"ws://localhost:6002\", \"ws://localhost:6003\" ]}" http://localhost:3001/addPeers
	// $ curl -H "Content-type:application/json" --data '{"data" : ["ws://localhost:6002", "ws://localhost:6003"]}' http://localhost:3001/addPeers
	app.post("/addPeers", (req, res) => {
		const data = req.body.data || [];
		console.log(data);
		connectToPeers(data);
		res.send(data);
	});
	
	// $ curl -X GET http://localhost:3001/peers  | python3 -m json.tool
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
	initP2PServer(6001);
	initP2PServer(6002);
	initP2PServer(6003);
}

initHttpServer(http_port);
