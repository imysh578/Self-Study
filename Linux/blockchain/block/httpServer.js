const express = require("express");
const bodyParser = require("body-parser");
const http_port = process.env.HTTP_PORT || 3001;

function initHttpServer() {
	const app = express();
	app.use(bodyParser.json());

	app.get("/blocks", (req, res) => {
		res.send(getBlock());
	});
	app.post("/minBlock", (req, res) => {
		const data = req.body.data || [];
		const block = nextBlock(data);
		addBlock(block);
	});
	app.get("/version", (req, res) => {
		res.send(getVersion());
	});
	app.get("/stop", (req, res) => {
		res.send({ msg: "Stop Server!" });
		process.exit();
	});
	app.listen(http_port, () => {
		console.log("Listening HTTP Port : " + http_port);
	});
}

initHttpServer();
