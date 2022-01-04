/*******************/
/* chainedBlock.js */
/*******************/

// modules
const fs = require("fs");
const merkle = require("merkle");
const cryptojs = require("crypto-js");

// from other local files
const { isValidNewBlock } = require("./validations");

// Block consists of header and body
class Block {
	constructor(header, body) {
		this.header = header;
		this.body = body;
	}
}

// Header details
class BlockHeader {
	constructor(
		version,
		index,
		previousBlockHash,
		merkleRoot,
		timestamp,
		difficulty,
		nonce
	) {
		this.version = version;
		this.index = index;
		this.previousBlockHash = previousBlockHash;
		this.merkleRoot = merkleRoot;
		this.timestamp = timestamp;
		this.difficulty = difficulty;
		this.nonce = nonce;
	}
}

/* Block functions */
// getVersion of this package
function getVersion() {
	const package = fs.readFileSync("package.json");
	return JSON.parse(package).version;
}

// Genesis Block : the first created block
function createGenesisBlock() {
	const version = getVersion();
	const index = 0;
	const previousBlockHash = "0".repeat(64);
	const timestamp = parseInt(Date.now() / 1000);
	const body = ["Genesis Block"];
	const tree = merkle("sha256").sync(body);
	const merkleRoot = tree.root() || "0".repeat(64);
	const difficulty = 0;
	const nonce = 0;
	
	const header = new BlockHeader(
		version,
		index,
		previousBlockHash,
		merkleRoot,
		timestamp,
		difficulty,
		nonce
	);
	
	return new Block(header, body);
}

function getBlocks() {
	return Blocks;
}

function getLastBlock() {
	return Blocks[Blocks.length - 1];
}

function createHash(block) {
	const {
		version,
		index,
		previousBlockHash,
		merkleRoot,
		timestamp,
		difficulty,
		nonce,
	} = block.header;
	const blockString =
		version + index + previousBlockHash + merkleRoot + timestamp + difficulty + nonce;
	const hash = cryptojs.SHA256(blockString).toString();
	return hash;
}

function nextBlock(bodyData) {
	const prevBlock = getLastBlock();
	const version = getVersion();
	const index = prevBlock.header.index + 1;
	const previousBlockHash = createHash(prevBlock);
	const tree = merkle("sha256").sync(bodyData);
	const merkleRoot = tree.root() || "0".repeat(64);
	const timestamp = parseInt(Date.now() / 1000);
	const difficulty = 0;
	const nonce = 0;

	const header = new BlockHeader(
		version,
		index,
		previousBlockHash,
		merkleRoot,
		timestamp,
		difficulty,
		nonce
	);
	return new Block(header, bodyData);
}

function addBlock(newBlock) {
	if(isValidNewBlock(newBlock, getLastBlock())) {
		Blocks.push(newBlock);
		return true;
	} else {
		return false;
	}
}

const genesisBlock = createGenesisBlock();
let Blocks = [genesisBlock];
// console.log("Blocks : ", Blocks);

// const genesisHash = createHash(genesisBlock);
// console.log("Genesis Block's Hash: ", genesisHash);



const Block1 = nextBlock(["TX1"])
console.log(Block1.header.previousBlockHash);
addBlock(Block1)
// const Block2 = nextBlock(["TX2"])
// addBlock(Block2)
// console.log(Blocks);

module.exports = {createHash}