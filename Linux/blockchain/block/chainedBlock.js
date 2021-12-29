//chainedBlock.js
const fs = require("fs");
const merkle = require("merkle");
const cryptojs = require("crypto-js");

class Block {
	constructor(header, body) {
		this.header = header;
		this.body = body;
	}
}

class BlockHeader {
	constructor(
		version,
		index,
		previousBlockHash,
		merkleRoot,
		timestamp,
		bit,
		nonce
	) {
		this.version = version;
		this.index = index;
		this.previousBlockHash = previousBlockHash;
		this.merkleRoot = merkleRoot;
		this.timestamp = timestamp;
		this.bit = bit;
		this.nonce = nonce;
	}
}

function getVersion() {
	const package = fs.readFileSync("package.json");
	// console.log(JSON.parse(package).version);
	return JSON.parse(package).version;
}

function createGenesisBlock() {
	const version = getVersion();
	const index = 0;
	const previousBlockHash = "0".repeat(64);
	const timestamp = parseInt(Date.now() / 1000); // Date.now() : milliseconds

	const body = ["hello block"];
	const tree = merkle("sha256").sync(body);
	const merkleRoot = tree.root() || "0".repeat(64);
	const bit = 0;
	const nonce = 0;

	const header = new BlockHeader(
		version,
		index,
		previousBlockHash,
		merkleRoot,
		timestamp,
		bit,
		nonce
	);

	return new Block(header, body);
}

let Blocks = [createGenesisBlock()];

function getBlocks() {
	return Blocks;
}

function getLastBlock() {
	return Blocks[Blocks.length - 1];
}

function createHash(data) {
	const {
		version,
		index,
		previousBlockHash,
		merkleRoot,
		timestamp,
		bit,
		nonce,
	} = data.header;
	const blockString =
		version + index + previousBlockHash + merkleRoot + timestamp + bit + nonce;
	// console.log('blockString : %s', blockString);
	const hash = cryptojs.SHA256(blockString).toString();
	return hash;
}

function nextBlock(bodyData) {
	const prevBlock = getLastBlock();
	const version = getVersion();
	const index = prevBlock.header.index + 1;
	const previousBlockHash = createHash(prevBlock);
	const timestamp = parseInt(Date.now() / 1000);
	const tree = merkle("sha256").sync(bodyData);
	const merkleRoot = tree.root() || "0".repeat();
	const bit = 0;
	const nonce = 0;

	const header = new BlockHeader(version, index, previousBlockHash, merkleRoot, timestamp, bit, nonce);
	return new Block(header, bodyData)
}

function addBlock(bodyData) {
	const newBlock = nextBlock(bodyData);
	Blocks.push(newBlock);
}

const genesisBlock = createGenesisBlock();
// console.log(genesisBlock);

const block1 = nextBlock(["transaction1"])
// console.log(block1);

addBlock(['transaction1'])
addBlock(['transaction3'])
addBlock(['transaction4'])
addBlock(['transaction5'])
// console.log(Blocks);

// const testHash = createHash(genesisBlock);
// console.log(testHash);

// 과제 : var, let, const 차이

module.exports = {createHash, Blocks, getLastBlock, nextBlock, addBlock, getBlocks, getVersion}