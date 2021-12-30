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
const { addBlock } = require("./checkValidBlock.js");
const { connectToPeers, getSockets } = require("./p2pServer.js");

const http_port = process.env.HTTP_PORT || 3001;

function initHttpServer() {
	const app = express();
	app.use(bodyParser.json());

	// curl -H "Content-type:application/json" --data "{\"data\" : [ \"ws://localhost:6002\", \"ws://localhost:6003\" ] }"

	app.post("/addPeers", (req, res) => {
		const data = req.body.data || [];
		console.log(data);
		connectToPeers(data);
		res.send(data);
	});

	app.get("/peers", (req, res) => {
		let socketInfo = []
		getSockets().forEach((s) => {
			socketInfo.push(s._socket.remoteAddress + ":" + s._socket.remotePort)
		})
		res.send(socketInfo);
	})

	app.get("/blocks", (req, res) => {
		res.send(getBlocks());
	});

	app.post("/mineBlock", (req, res) => {
		const data = req.body.data || [];
		const block = nextBlock(data);
		const test = addBlock(block);
		console.log(block);
		console.log(test);
		res.send(getLastBlock());
	});

	app.get("/version", (req, res) => {
		res.send(getVersion());
	});

	app.post("/stop", (req, res) => {
		res.send({ msg: "Stop Server!" });
		process.exit();
	});

	app.listen(http_port, () => {
		console.log("Listening HTTP Port : " + http_port);
	});
}

initHttpServer();
