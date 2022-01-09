// import modules
import fs from "fs";
import merkle from "merkle";

// import functions from other files
import { Block, BlockHeader } from "./blockStructure";
import * as encryptions from "./encryptions";
import * as validations from "./validataions"

function getVersion():string {
	const packagejson = fs.readFileSync("package.json", "utf8");
	const version: string = JSON.parse(packagejson).version;
	return version;
}

// get memory size of each types
function memorySizeOf(data: any):number {
	let objectList: object[] = [];
	let stack: any[] = [data];
	let bytes: number = 0;

	while (stack.length) {
		let value: any = stack.pop();
		if (typeof value === "boolean") {
			bytes += 4;
		} else if (typeof value === "string") {
			bytes += value.length * 2;
		} else if (typeof value === "number") {
			bytes += 8;
		} else if (typeof value === "object" && objectList.indexOf(value) === -1) {
			objectList.push(value);
			for (let i in value) {
				stack.push(value[i]);
			}
		}
	}
	return bytes;
}

// Create genesisBlock
function createGenesisBlock():Block {
	/**
	 * Magic Number: identifier for the Blockchain network
	 *    - 0xD9B4BEF9 : bitcoin
	 */
	const magicNumber: string = "D9B4BEF9"; 
	let blockSize: number = 0;
	const txCounter: number = 1;
	const txLists: object[] = [{data: "this is Genesis Block"}];

	// header properties
	const version: string = getVersion();
	const index: number = 0;
	const prevHash: string = "0".repeat(64);
	const merkleRoot: string = merkle("sha256").sync(txLists).root() || "0".repeat(64);
	const timestamp: number = Date.UTC(1991, 10, 30);
	const difficulty: number = 1;
	const nonce: number = 0;
	const header = new BlockHeader(
		version,
		index,
		prevHash,
		merkleRoot,
		timestamp,
		difficulty,
		nonce
	);

	const hash: string = encryptions.calculateHashOfBlock(header);

	const genesisBlock = new Block(
		magicNumber,
		blockSize,
		header,
		txCounter,
		txLists,
		hash
	);

	// get size of Block and put into `blockSize` 
	genesisBlock.blockSize = memorySizeOf(genesisBlock)

	return genesisBlock;
}

// function getLastBlock():Block {
// 	return Block.blockchain.slice(-1)[0];
// }

const createNextBlock = (txLists: object[]) => {
	const prevBlock: Block = Block.lastBlock();

	const magicNumber = genesisBlock.magicNumber;
	let nextBlockSize: number = 0;
	const nextTxCounter: number = Object.keys(txLists[0]).length;
	const nextTxLists: object[] = txLists;

	// header properties
	const version: string = getVersion();
	const nextIndex: number = prevBlock.header.index + 1;
	const prevHash: string = prevBlock.hash;
	const merkleRoot: string = merkle("sha256").sync(nextTxLists).root();
	const nextTimestamp: number = Math.round(Date.now() / 1000);
	const nextDifficulty: number = 1;
	const nextNonce: number = 0;
	const nextHeader: BlockHeader = new BlockHeader(
		version,
		nextIndex,
		prevHash,
		merkleRoot,
		nextTimestamp,
		nextDifficulty,
		nextNonce
	);

	// next block's hash
	const nextHash = encryptions.calculateHashOfBlock(nextHeader);

	const nextBlock: Block = new Block(
		magicNumber,
		nextBlockSize,
		nextHeader,
		nextTxCounter,
		nextTxLists,
		nextHash
	);

	// get block size of newBock
	nextBlock.blockSize = memorySizeOf(nextBlock)

	return nextBlock;
};

function replaceChain (newBlocks: Block[]) {
	if (validations.isValidBlockchain(newBlocks) && newBlocks.length > Block.blockchain.length) {
		console.log("Received blockchain is valid! Replace current blockchain with received one");
		Block.blockchain = newBlocks;
		// broadcastLatest();
	} else {
		console.log("Received blockchain invalid");
	}
}

// Create genesis Block and push it into blockchain
const genesisBlock = createGenesisBlock();
Block.blockchain.push(genesisBlock);

const block1: Block = Block.nextBlock([
	{
		tx1: { amount: 100, from: "Dr.Octavisu", to: "Peter" },
		tx2: { amount: 50, from: "Peter", to: "Goblin" },
	},
]);
Block.addBlock(block1)
// console.log(Block.lastBlock());


// console.log("Genesis Block : ", genesisBlock);
// console.log("block1 : ", block1);
// console.log("Last Block : ", getLastBlock());

export { getVersion, createGenesisBlock, createNextBlock, genesisBlock };
