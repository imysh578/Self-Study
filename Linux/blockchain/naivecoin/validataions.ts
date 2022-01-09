// import modules
import merkle from "merkle";

// import functions from other files
import { Block, BlockHeader } from "./blockStructure";
import { genesisBlock } from "./utils";

function isValidBlockStructure(block: Block) {
	/**
	 * Validate types of Block's properties
	 */
	return (
		typeof block.magicNumber === "string" &&
		typeof block.blockSize === "number" &&
		typeof block.header.version === "string" &&
		typeof block.header.index === "number" &&
		typeof block.header.prevHash === "string" &&
		typeof block.header.timestamp === "number" &&
		typeof block.header.difficulty === "number" &&
		typeof block.header.nonce === "number" &&
		typeof block.txCounter === "number" &&
		typeof block.txLists === "object"
	);
}

function isValidNewBlock(newBlock: Block, prevBlock: Block) {
	/**
	 * Validate newBlock's
	 *  - blockStructure
	 *  - version
	 *  - index
	 *  - prevHash
	 *  - merkleRoot
	 *  - timestamp
	 *  - difficulty
	 */

	// 1. Validate blockStructure
	if (!isValidBlockStructure(newBlock)) {
		console.log("Invalid newBlock's structure");
		return false;
	}
	
	// 2. Validate version
	if (newBlock.header.version !== prevBlock.header.version) {
		console.log("Invalid newBlock's version")
		return false;
	}
	// 3. Validate index
	else if (newBlock.header.index !== prevBlock.header.index + 1) {
		console.log("Invalid newBlock's index");
		return false;
	}
	// 4. Validate prevHash
	else if (newBlock.header.prevHash !== prevBlock.hash) {
		console.log("Invalid newBlock's prevHash");
		return false;
	}
	// 5. Validate merkleRoot
	else if (
		// If no data exists in newBlock, merkleRoot is "0".repeat(64),
		(newBlock.txCounter === 0 && newBlock.header.merkleRoot === "0".repeat(64)) ||
		// otherwise compare to calculated one
		(newBlock.txCounter !== 0 && newBlock.header.merkleRoot !== merkle("sha256").sync(newBlock.txLists).root())
	) {
		console.log("Invalid newBlock's merkleRoot");
		return false;
	} 
	// 6. Validate timestamp
	else if (!isValidTimestamp) {
		console.log("Invalid newBlock's timestamp");
		return false;
	}
	return true;
}

function isValidBlockchain(blockchain: Block[]) {
	const isValidGenesis = () => {
		const firstBlock: Block = blockchain[0];
		return JSON.stringify(firstBlock) === JSON.stringify(genesisBlock);
	};
	// Check if first block is same with genesisBlock
	if (!isValidGenesis()) {
		return false;
	}
	console.log("blockchain length : ", blockchain.length);
	
	// Validate blocks in blockchain(except genesisblock)
	for (let i = 1; i < blockchain.length; i++) {
		if(!isValidNewBlock(blockchain[i], blockchain[i-1])) {
			return false;
		}
		return true;
	}
}

function isValidTimestamp(block: Block, prevBlock: Block) {
	// if block creation time gap is smaller than 10 sec, it is invalid block
	const currentTime = Math.round(Date.now()/1000);
	return (
		block.header.timestamp - prevBlock.header.timestamp < 10 &&
		currentTime - block.header.timestamp < 10
	);
}


export { isValidBlockStructure, isValidNewBlock, isValidBlockchain };
