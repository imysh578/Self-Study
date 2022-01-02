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
	const merkleRoot = tree.root() || "0".repeat(64);
	const bit = 0;
	const nonce = 0;

	const header = new BlockHeader(version, index, previousBlockHash, merkleRoot, timestamp, bit, nonce);
	return new Block(header, bodyData)
}

function addBlock(newBlock) {
	Blocks.push(newBlock);
}

const genesisBlock = createGenesisBlock();
let Blocks = [genesisBlock];

const Block1 = nextBlock(["TX1"]);
addBlock(Block1);

const Block2 = nextBlock(["TX2"]);
addBlock(Block2);

console.log("Blocks : ", Blocks);

const genesisHash = createHash(genesisBlock);
const block1Hash = createHash(Block1);
const block2Hash = createHash(Block2);
console.log("Genesis Block's Hash: ", genesisHash);
console.log("Block1's Hash:        ", block1Hash);
console.log("Block2's Hash:        ", block2Hash);


// const testHash = createHash(genesisBlock);
// console.log(testHash);

module.exports = {createHash, Blocks, getLastBlock, nextBlock, addBlock, getBlocks, getVersion}