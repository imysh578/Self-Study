/*****************/
/* validation.js */
/*****************/

const { createHash } = require("./chainedBlock");

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
	console.log(22);
	createHash(newBlock)
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

function isValidChain(newBlocks) {
	/**
	 * 1. check if newBlocks' first block is same as original Blocks' first block
	 * 2. check if blocks in Blocks is valid
	 * 			- true: 
	 */
	if (JSON.stringify(newBlocks[0]) !== JSON.stringify(Blocks[0])){
		return false;
	}
	let tempBlocks = [newBlocks[0]];
	for (let i = 1; i < newBlocks.length; i++) {
		if(isValidNewBlock(newBlocks[i], newBlocks[i-1])){
			tempBlocks.push(newBlocks[i]);
		} else {
			return false;
		}
	}
	return true;
}

module.exports = {isValidNewBlock}