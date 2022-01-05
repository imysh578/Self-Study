/*****************/
/* httpServer2.js */
/*****************/

const express = require("express");
const bodyParser = require("body-parser");
const { getVersion, getBlocks, nextBlock, addBlock, getLastBlock } = require("./chainedBlock");
const { initP2PServer } = require("./p2pServer");

// set server port
const http_port = 3002;

function initHttpServer(port) {
  const app = express();
  app.use(bodyParser.json())

  app.get("/", (req, res) => {
    res.send(`Welcome to Server 1 (port: ${port})`);
  })

  // Get version
  app.get("/version", (req, res) => {
    console.log("Version : ", getVersion());
    res.send(getVersion())
  })

 	// Get blocks' info
	app.get("/blocks", (req, res) => {
    console.log("Blocks: ", getBlocks());
		res.send(getBlocks());
	});

  // Mining blocks
  app.post("/mineBlock", (req,res) => {
    const data = req.body.data || [];
    const newBlock = nextBlock(data);
    const result_addBlock = addBlock(newBlock);
    if (result_addBlock) {
      console.log("Mining has done Successfuly");
      console.log("New Block : ", getLastBlock());
    } else {
      console.log("Mining has failed.");
      console.log("Check the error message.");
    }
    res.send(getLastBlock())
  })

  app.get("/initP2P", (req, res) => {
    initP2PServer(6002)
    res.send("Open P2P server")
  })

  app.listen(port, (req, res) => {
    console.log(`Listening HTTP Port : ${port}`);
  })
}

// open server
initHttpServer(http_port);