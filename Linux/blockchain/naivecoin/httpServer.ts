import express from "express"
import bodyParser from "body-parser"
import { Block } from "./blockStructure";
import {getVersion, createGenesisBlock, createNextBlock, genesisBlock} from "./utils"

const httpPort: number = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 3001;
const p2pPort: number = process.env.P2P_PORT ? parseInt(process.env.P2P_PORT) : 6001;

const initHttpServer = (myHttpPort: number) => {
  const app = express();
  app.use(bodyParser.json());

  app.get("/", (req, res) => {
    console.log("Welcome to HTTP Server! Port : ", myHttpPort);
    res.send(`Welcome to HTTP Server! Port : ${myHttpPort}`)
  })

  app.get("/version", (req, res)=>{
    res.send(getVersion());
  })

  app.get("/blocks", (req, res)=> {
    Block.blockchain
    console.log(Block.blockchain);
    
  })

  app.listen(myHttpPort, ()=>{
    console.log("Listening HTTP on port: ", myHttpPort);
  });
}

initHttpServer(httpPort);