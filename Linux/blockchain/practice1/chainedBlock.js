//chainedBlock.js
const fs = require("fs");
const merkle = require("merkle");
const cryptojs = require("crypto-js");
const { randomBytes } = require("crypto");
const { default: random } = require("random");

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

function getVersion() {
	const package = fs.readFileSync("package.json");
	// console.log(JSON.parse(package).version);
	return JSON.parse(package).version;
}

function createGenesisBlock() {
	const version = getVersion();
	const index = 0;
	const previousBlockHash = "0".repeat(64);
	const timestamp = 1131006505; // 2009/01/03 6:15pm (UTC)
	// const timestamp = parseInt(Date.now() / 1000); // Date.now() : milliseconds
	const body = ["The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"]
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

function createHash(data) {
	const {
		version,
		index,
		previousBlockHash,
		merkleRoot,
		timestamp,
		difficulty,
		nonce,
	} = data.header;
	const blockString =
		version + index + previousBlockHash + merkleRoot + timestamp + difficulty + nonce;
	// console.log('blockString : %s', blockString);
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
	const difficulty = 0;
	// const nonce = 0;
	// const header = new BlockHeader(version, index, previousBlockHash, merkleRoot, timestamp, difficulty, nonce);
	
	const header = findBlock(version, index, previousBlockHash, merkleRoot, timestamp, difficulty)
	return new Block(header, bodyData)
}

function addBlock(newBlock) {
	Blocks.push(newBlock);
}

function replaceChain(newBlocks){
	if (isValidChain(newBlocks)){ 
		if((newBlocks.length >= Blocks.length) && random.bloolean()) {
			Blocks = newBlocks;
			broadcast(responseLastestMasg());
		}

	} else {
		console.log("Error occurred on ledger");
	}
}

const genesisBlock = createGenesisBlock();
let Blocks = [genesisBlock];

const Block1 = nextBlock(["TX1"]);
addBlock(Block1);

const Block2 = nextBlock(["TX2"]);
addBlock(Block2);

// console.log("Blocks : ", Blocks);

const genesisHash = createHash(genesisBlock);
const block1Hash = createHash(Block1);
const block2Hash = createHash(Block2);
// console.log("Genesis Block's Hash: ", genesisHash);
// console.log("Block1's Hash:        ", block1Hash);
// console.log("Block2's Hash:        ", block2Hash);

function hexToBinary(s) {
	const lookupTable = {
		'0' : '0000', '1' :	'0001', '2'	: '0010', '3' : '0011',
		'4'	: '0100',	'5'	: '0101',	'6'	: '0110',	'7'	: '0111',
		'8'	: '1000', '9'	: '1001',	'A'	: '1010',	'B'	: '1011',
		'C'	: '1100',	'D'	: '1101', 'E'	: '1110',	'F'	: '1111',
	} 

	let ret = "";
	for (let i = 0; i < s.length; i++) {
		if(lookupTable[s[i]]){
			ret += lookupTable[s[i]];
		} else {
			return null;
		}
	}
	return ret;
}

function hashMatchesDifficulty(hash, difficulty) {
	const hashBinary = hexToBinary(hash.toUpperCase());
	const requirePrefix = '0'.repeat(difficulty);
	return hashBinary.startsWith(requirePrefix)
}

function findBlock(currentVersion, nextIndex, previousBlockHash, merkleRoot, nextTimestamp, difficulty) {
	let nonce = 0;

	while(true) {
		let hash = calculateHash(currentVersion, nextIndex, previousBlockHash, merkleRoot, nextTimestamp, difficulty, nonce)
		if (hashMatchesDifficulty(hash, difficulty)){
			return new BlockHeader(currentVersion, nextIndex, previousBlockHash, merkleRoot, nextTimestamp, difficulty, nonce)
		}
		nonce++;
	}
}

module.exports = {createHash, Blocks, getLastBlock, nextBlock, addBlock, getBlocks, getVersion}