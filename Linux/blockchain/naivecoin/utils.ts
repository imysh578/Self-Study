import { Block, BlockHeader } from "./blockStructure";
import * as encryptions from "./encryptions";
import fs = require("fs");

function getVersion() {
	const packagejson = fs.readFileSync("package.json", "utf8");
	const version: string = JSON.parse(packagejson).version;
	return version;
}

function getSizeOf(data: any) {
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

function createGenesisBlock() {
	const magicNumber: string = "D9B4BEF9";
	let blockSize: number = 0;

	const version: string = getVersion();
	const index: number = 0;
	const prevHash: string = "0".repeat(64);
	const timestamp: number = Date.UTC(1991, 10, 30);
	const difficulty: number = 1;
	const nonce: number = 0;
	const header = new BlockHeader(
		version,
		index,
		prevHash,
		timestamp,
		difficulty,
		nonce
	);

	const txCounter: number = 1;
	const txLists: object[] = [{data: "this is Genesis Block"}];
	const hash: string = encryptions.getSHA256Of(header);
	// const blocksize: number =
	// 	getSizeOf(header) +
	// 	getSizeOf(magicNumber) +
	// 	getSizeOf(txCounter) +
	// 	getSizeOf(txLists) +
	// 	getSizeOf(hash);

	const genesisBlock = new Block(
		magicNumber,
		blockSize,
		header,
		txCounter,
		txLists,
		hash
	);
	genesisBlock.blockSize = getSizeOf(genesisBlock)

	return genesisBlock;
}

function getLastBlock() {
	return blockChain.slice(-1)[0];
}

const createNextBlock = (txLists: object[]) => {
	const prevBlock: Block = getLastBlock();

	const magicNumber = genesisBlock.magicNumber;
	let nextBlockSize: number = 0;

	const version: string = getVersion();
	const nextIndex: number = prevBlock.header.index + 1;
	const prevHash: string = prevBlock.hash;
	const nextTimestamp: number = Math.round(Date.now() / 1000);
	const nextDifficulty: number = 1;
	const nextNonce: number = 0;
	const nextHeader: BlockHeader = new BlockHeader(
		version,
		nextIndex,
		prevHash,
		nextTimestamp,
		nextDifficulty,
		nextNonce
	);

	const nextTxCounter: number = Object.keys(txLists[0]).length;
	const nextTxLists: object[] = txLists;
	const nextHash = calculateHash(nextHeader);

	// const nextBlockSize =
	// 	getSizeOf(magicNumber) +
	// 	getSizeOf(nextHeader) +
	// 	getSizeOf(nextTxCounter) +
	// 	getSizeOf(nextTxLists) +
	// 	getSizeOf(nextHash);

	const newBlock: Block = new Block(
		magicNumber,
		nextBlockSize,
		nextHeader,
		nextTxCounter,
		nextTxLists,
		nextHash
	);
	newBlock.blockSize = getSizeOf(newBlock)

	return newBlock;
};

const genesisBlock: Block = createGenesisBlock();
const blockChain: Block[] = [genesisBlock];

console.log("Genesis Block : ", genesisBlock);
console.log("Last Block : ", getLastBlock());
const block1: Block = createNextBlock([
	{
		tx1: { amount: 100, from: "Dr.Octavisu", to: "Peter" },
		tx2: { amount: 50, from: "Peter", to: "Goblin" },
	},
]);
console.log(block1);
console.log(getSizeOf(block1.txLists));

export { getVersion, getLastBlock };
