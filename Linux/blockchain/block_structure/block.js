const fs = require('fs')
const merkle = require('merkle')

class Block {
	constructor(header, body) {
		this.header = header
		this.body = body
	}
}

class BlockHeader {
	constructor(version, previousBlockHash, timestamp, merkleRoot, bit, nonce){
		this.version = version
		this.previousBlockHash = previousBlockHash
		this.merkleRoot = merkleRoot
		this.timestamp = timestamp
		this.bit = bit
		this.nonce = nonce
	}
}

function getVersion(){
	const package = fs.readFileSync("package.json")
	// console.log(JSON.parse(package).version);
	return JSON.parse(package).version
}

function createGenesisBlock() {
	const version = getVersion()
	const previousBlockHash = '0'.repeat(64)
	const timestamp = parseInt(Date.now()/1000) // Date.now() : milliseconds
	const body = ['hello block']
	const tree = merkle('sha256').sync(body)
	const merkleRoot = tree.root() || '0'.repeat(64)
	const bit = 0
	const nonce = 0

	console.log("version : %s, timestamp : %d, body: %s", version, timestamp, body);
	console.log("previousBlockHash : %d", previousBlockHash);
	console.log("tree : ", tree)
	console.log("merkleRoot : %s", merkleRoot.toString('hex'))

	const header = new BlockHeader(version, previousBlockHash, timestamp, merkleRoot, bit, nonce)
	return new Block(header, body)	
}

const block = createGenesisBlock()
console.log(block);
