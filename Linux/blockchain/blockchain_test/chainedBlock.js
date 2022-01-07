/*******************/
/* chainedBlock.js */
/*******************/

// modules
const fs = require("fs");
const merkle = require("merkle");
const cryptojs = require("crypto-js");
// const { isValidNewBlock } = require("./validations");

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
	const timestamp = 1131006505; // 2009/01/03 6:15pm (UTC)
	const body = [
		"The Times 03/Jan/2009 Chancellor on brink of second bailout for banks",
	];
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
		version +
		index +
		previousBlockHash +
		merkleRoot +
		timestamp +
		difficulty +
		nonce;
	const hash = cryptojs.SHA256(blockString).toString();
	return hash;
}

function calculateHash(
	version,
	index,
	previousBlockHash,
	merkleRoot,
	timestamp,
	difficulty,
	nonce
) {
	const blockString =
		version +
		index +
		previousBlockHash +
		merkleRoot +
		timestamp +
		difficulty +
		nonce;
	return cryptojs.SHA256(blockString).toString();
}

function findBlock(
	currentVersion,
	nextIndex,
	previousBlockHash,
	merkleRoot,
	nextTimestamp,
	difficulty
) {
	let nonce = 0;
	while (true) {
		let hash = calculateHash(
			currentVersion,
			nextIndex,
			previousBlockHash,
			merkleRoot,
			nextTimestamp,
			difficulty,
			nonce
		);
		if (hashMatchesDifficulty(hash, difficulty)) {
			return new BlockHeader(
				currentVersion,
				nextIndex,
				previousBlockHash,
				merkleRoot,
				nextTimestamp,
				difficulty,
				nonce
			);
		}
		nonce++;
	}
}

function nextBlock(bodyData) {
	const prevBlock = getLastBlock();
	const version = getVersion();
	const index = prevBlock.header.index + 1;
	const previousBlockHash = createHash(prevBlock);
	const tree = merkle("sha256").sync(bodyData);
	const merkleRoot = tree.root() || "0".repeat(64);
	const timestamp = parseInt(Date.now() / 1000);
	const difficulty = 3;
	// const nonce = 0;
	
	const header = findBlock(
		version,
		index,
		previousBlockHash,
		merkleRoot,
		timestamp,
		difficulty
	);

	return new Block(header, bodyData);
}

function addBlock(newBlock) {
	if (isValidNewBlock(newBlock, getLastBlock())) {
		Blocks.push(newBlock);
		return true;
	} else {
		return false;
	}
}


/****** Validataion functions ******/

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
	/**
	 * time unit : seconds
	 * Math.round : Round off number
	 */
	return Math.round(Date.now() / 1000);
}

function isValidTimestamp(newBlock, prevBlock) {
	/**
	 * check if block is created too early
	 */
	if (newBlock.header.timestamp - prevBlock.header.timestamp < 10) {
		return false;
	} else if (getCurrentTimestamp() - newBlock.header.timestamp < 10) {
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
			merkle("sha256").sync(newBlock.body).root() !==
				newBlock.header.merkleRoot)
	) {
		console.log("*** Invalid MerkleRoot ***");
		return false;
	} else if (!isValidTimestamp(newBlock, prevBlock)) {
		console.log("*** Invalid Timestamp ***");
		return false;
	} else if (
		!hashMatchesDifficulty(createHash(newBlock), newBlock.header.difficulty)
	) {
		console.log("*** Invalid Difficulty ***");
		return false;
	}
	return true;
}

function getCurrentTimestamp() {
	return Math.round(Date.now() / 1000);
}

function isValidTimestamp(newBlock, prevBlock) {
	// if block create time interval is less than 10 sec, return false
	if (newBlock.header.timestamp - prevBlock.header.timestamp < 10) {
		return false;
	}
	// new block create time should be smaller than Date.now()
	if (getCurrentTimestamp() < newBlock.header.timestamp) {
		return false;
	}
	return true;
}

function hashMatchesDifficulty(hash, difficulty) {
	// check how many "0"s the hash starts with
	const requiredPrefix = "0".repeat(difficulty);
	return hash.startsWith(requiredPrefix);
}

// function isValidChain(newBlocks) {
// 	/**
// 	 * 1. check if newBlocks' first block is same as original Blocks' first block
// 	 * 2. check if blocks in Blocks is valid
// 	 */
// 	if (JSON.stringify(newBlocks[0]) !== JSON.stringify(Blocks[0])){
// 		return false;
// 	}
// 	let tempBlocks = [newBlocks[0]];
// 	for (let i = 1; i < newBlocks.length; i++) {
// 		if(isValidNewBlock(newBlocks[i], newBlocks[i-1])){
// 			tempBlocks.push(newBlocks[i]);
// 		} else {
// 			return false;
// 		}
// 	}
// 	return true;
// }



/***** Using functions *****/
// Create genesisBlock
const genesisBlock = createGenesisBlock();
let Blocks = [genesisBlock];
// const genesisHash = createHash(genesisBlock);
// console.log("Genesis Block's Hash: ", genesisHash);

// Create Block1
// const Block1 = nextBlock(["TX1"]);
// addBlock(Block1);

// Create Block2 in 10 sec
// setTimeout(function() {
//   console.log('Add Block Delay!');
// 	const Block2 = nextBlock(["TX2"])
// 	addBlock(Block2)
// 	console.log(Blocks);
// }, 10000);

module.exports = {getVersion, getBlocks, nextBlock, addBlock, getLastBlock, createHash}