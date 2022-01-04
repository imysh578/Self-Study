/*******************/
/* chainedBlock.js */
/*******************/

const fs = require("fs");
const merkle = require("merkle");
const cryptojs = require("crypto-js");

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

	const body = ["Genesis Block"];
	
	return new Block(header, body);
}

function getBlocks() {
	return BlockChain;
}

function getLastBlock() {
	return BlockChain[BlockChain.length - 1];
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
		BlockChain.push(newBlock);
		return true;
	} else {
		return false;
	}
}

const genesisBlock = createGenesisBlock();
let BlockChain = [genesisBlock];
console.log("BlockChain : ", BlockChain);

const genesisHash = createHash(genesisBlock);
console.log("Genesis Block's Hash: ", genesisHash);


/****** Validation functions ******/
function isValidBlockStructure(block) {
	return(
		(typeof block.header.version					 === "string") &&
		(typeof block.header.index 					   === "number") &&
		(typeof block.header.previousBlockHash === "string") &&
		(typeof block.header.merkleRoot				 === "string") &&
		(typeof block.header.timestamp 				 === "number") &&
		(typeof block.header.difficulty				 === "number") &&
		(typeof block.header.nonce						 === "number")
	)
}

function getCurrentTimestamp() {
	// time unit : seconds
	// Math.round : Round off number
	return Math.round(Date.now()/1000)
}

function isValidTimestamp(newBlock, prevBlock) {
	/**
	 * check if block is created too early
	 */
	if (newBlock.header.timestamp - prevBlock.header.timestamp < 10 ){
		return false;
	} else if (getCurrentTimestamp() - newBlock.header.timestamp < 10 ) {
		return false;
	}
	return true;
}

function isValidNewBlock(newBlock, prevBlock) {
	/**
	 * 1. check if valid block structure
	 * 2. check if valid index
	 * 3. check if valid hash
	 * 4. check if valid merkleRoot
	 * 5. check if valid timestamp
	 * 6. check if valid difficulty
	 */
	if (!isValidBlockStructure(newBlock)) {
		console.log("*** Invalid BlockStructure ***");
		return false;
	} else if (newBlock.header.index !== prevBlock.header.index + 1) {
		console.log("*** Invalid Index ***");
		return false;
	} else if (newBlock.header.previousBlockHash !== createHash(prevBlock)) {
		console.log("*** Invalid BlockStructure ***");
		return false;
	} else if (
		// If body is empty, it should be "0".repeat(64),
		// If body is not empty, calculated body's merkle root is same with header.merkleRoot
		(newBlock.body.length === 0 &&
			"0".repeat(64) !== newBlock.header.merkleRoot) ||
		(newBlock.body.length !== 0 &&
			merkle("sha256").sync(newBlock.body).root() !== newBlock.header.merkleRoot)
	) {
		console.log("*** Invalid MerkleRoot ***");
		return false;
	} else if (!isValidTimestamp(newBlock, prevBlock)) {
		console.log("*** Invalid Timestamp ***");
		return false;
	}
	return true;
}

function isValidChain(newBlockChain) {
	/**
	 * 1. check if newBlockChain's first block is same as original BlockChain's first block
	 * 2. check if blocks in BlockChain is valid
	 * 			- true: 
	 */
	if (JSON.stringify(newBlockChain[0]) !== JSON.stringify(BlockChain[0])){
		return false;
	}
	let tempBlockChain = [newBlockChain[0]];
	for (let i = 1; i < newBlockChain.length; i++) {
		if(isValidNewBlock(newBlockChain[i], newBlockChain[i-1])){
			tempBlockChain.push(newBlockChain[i]);
		} else {
			return false;
		}
	}
	return true;
}


const Block1 = nextBlock(["TX1"])
addBlock(Block1)
const Block2 = nextBlock(["TX2"])
addBlock(Block2)
console.log(BlockChain);

