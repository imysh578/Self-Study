import { Block, BlockBody, BlockHeader } from "./blockStructure";
import {calculateHash} from "./hashing"
import fs = require("fs");

function getVersion() {
	const packagejson = fs.readFileSync("../package.json", "utf8");
	const version: string = JSON.parse(packagejson).version;
	return version;
}

function createGenesisBlock() {
	const magicNumber: string = "D9B4BEF9";
	const blocksize: number = 4;
	const txCounts: number = 0;
	const txLists: string[] = [];
	const body = new BlockBody(magicNumber, blocksize, txCounts, txLists);

	const version: string = getVersion();
	const index: number = 0;
  const prevHash: string = "0".repeat(64);
  const timestamp: number = Date.UTC(1991,10,30);
  const difficulty: number = 1;
  const nonce: number = 0;
	const header = new BlockHeader(version, index, prevHash, timestamp, difficulty, nonce);
  const hash: string = calculateHash(header);
  
  const genesisBlock = new Block(body, header, hash);
  return genesisBlock;
}

console.log(getVersion());
console.log(createGenesisBlock());


export { getVersion };
