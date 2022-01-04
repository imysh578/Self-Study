/*****************/
/* httpServer.js */
/*****************/

const express = require("express");
const bodyParser = require("body-parser");
const { getVersion, getBlocks, nextBlock, addBlock, getLastBlock } = require("./chainedBlock");

/**
  # create env variable HTTP_PORT and init as 3001
  $ export HTTP_PORT=3001
  
  # check if HTTP_PORT is created
  $ env | grep HTTP
 */

// set server port
const http_port = process.env.HTTP_PORT || 3001;

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

  app.listen(port, (req, res) => {
    console.log(`Listening HTTP Port : ${port}`);
  })
}

// open server
initHttpServer(http_port);