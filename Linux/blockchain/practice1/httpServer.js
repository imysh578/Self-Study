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
const { connectToPeers, getSockets, initMessageHandler } = require("./p2pServer.js");

// # create env variable HTTP_PORT and init as 3001
// $ export HTTP_PORT=3001
// # check if HTTP_PORT is created
// $ env | grep HTTP
const http_port = process.env.HTTP_PORT || 3001;

// open multi-server
const port2 = 3002

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

	// $ curl -X GET http://localhost:3001/blocks | python3 -m json.tool
	app.get("/blocks", (req, res) => {
		res.send(getBlocks());
	});

	// $ curl -H "Content-type:application/json" --data '{"data" : ["testBlock1"]}' http://localhost:3001/mineBlock
	app.post("/mineBlock", (req, res) => {
		const data = req.body.data || [];
		const newBlock = nextBlock(data);
		const addBlockSuccess = addBlock(newBlock);
		console.log(`block: `, newBlock);
		console.log(`Add Block Success? : ${addBlockSuccess}`);
		const resutl_isValidChain = isValidChain(Blocks)
		console.log('Is valid chain? : ', resutl_isValidChain)
		res.send(getLastBlock());
	});

	app.get("/version", (req, res) => {
		res.send(getVersion());
	});

	app.post("/stop", (req, res) => {
		res.send({ msg: "Stop Server!" });
		process.exit();
	});

	app.listen(port, () => {
		console.log("Listening HTTP Port : " + port);
	});
}

initHttpServer(http_port);
initHttpServer(port2);
