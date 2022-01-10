import express from "express";
import bodyParser from "body-parser";
import { Block } from "./blockStructure";
import {
	getVersion,
	createNextBlock,
	addBlock,
} from "./utils";
import { connectToPeers, getSockets, initP2PServer } from "./p2pServer";

const httpPort: number = 3002;
const p2pPort: number = 6002;

const initHttpServer = (myHttpPort: number) => {
	const app = express();
	app.use(bodyParser.json());

	app.get("/", (req, res) => {
		console.log("Welcome to HTTP Server! Port : ", myHttpPort);
		res.send(`Welcome to HTTP Server! Port : ${myHttpPort}`);
	});

	app.get("/version", (req, res) => {
		console.log("version : ", getVersion());
		res.send(getVersion());
	});

	// $ curl -X GET http://localhost:3001/blockchain | python3 -m json.tool
	app.get("/blockchain", (req, res) => {
		const blockchain: Block[] = Block.blockchain;
		console.log(blockchain);
		res.send(blockchain);
	});

	// $ curl -H "Content-type:application/json" --data "{\"data\" : [{\"amount\":123}]}" http://localhost:3001/mineBlock
	app.post("/mineBlock", (req, res) => {
		const data = req.body.data || [];
		const newBlock: Block = createNextBlock(data);
		addBlock(newBlock);
		console.log("difficulty: ", newBlock.header.difficulty);
		console.log("nonce: ", newBlock.header.nonce);
		res.send(newBlock);
	});
	
	// $ curl -X GET http://localhost:3001/peers  | python3 -m json.tool
	app.get("/peers", (req, res) => {
		res.send(getSockets().map((s:any) => s._socket.remoteAddress + ":" + s._socket.remotePort))
	})
	
	// $ curl -H "Content-type:application/json" --data '{"data" : ["ws://localhost:6001"]}' http://localhost:3001/addPeers
	app.post("/addPeers", (req, res) => {
		const data = req.body.data || [];
		connectToPeers(data);
		res.send(data)
	})

	app.listen(myHttpPort, () => {
		console.log("Listening HTTP on port: ", myHttpPort);
	});
};

initHttpServer(httpPort);
initP2PServer(p2pPort);