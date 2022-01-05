/**********************/
/* checkValidBlock.js */
/**********************/

const merkle = require("merkle");
const { getLastBlock, createHash, isValidTimestamp, hashMatchesDifficulty, Blocks } = require("./chainedBlock.js");

function isValidBlockStructure(block) {
	return (
		typeof block.header.version === "string" &&
		typeof block.header.index === "number" &&
		typeof block.header.previousBlockHash === "string" &&
		typeof block.header.merkleRoot === "string" &&
		typeof block.header.timestamp === "number" &&
		typeof block.header.difficulty === "number" &&
		typeof block.header.nonce === "number" &&
		typeof block.body === "object"
	);
}

function isValidNewBlock(newBlock, previousBlock) {
	/**
	 * 1. check if valid block structure
	 * 2. check if valid index
	 * 3. check if valid hash
	 * 4. check if valid merkleRoot
	 * 5. check if valid timestamp
	 * 6. check if valid difficulty
	 */
	if (!isValidBlockStructure(newBlock)) {
		console.log("Invalid Block Structure");
		return false;
	} else if (newBlock.header.index !== previousBlock.header.index + 1) {
		console.log("Invalid Index");
		return false;
	} else if (createHash(previousBlock) !== newBlock.header.previousBlockHash) {
		console.log("Invalid previousBlockHash");
		return false;
	} else if (
		(newBlock.body.length === 0 &&
			"0".repeat(64) !== newBlock.header.merkleRoot) ||
		(newBlock.body.length !== 0 &&
			merkle("sha256").sync(newBlock.body).root() !==
				newBlock.header.merkleRoot)
	) {
		console.log("Invalid merkleRoot");
		return false;
	} 
	else if (!isValidTimestamp(newBlock, previousBlock)) {
		console.log("Invalid timestamp");
		return false;
	} 
	else if (!hashMatchesDifficulty(createHash(newBlock), newBlock.header.difficulty)) {
		console.log(createHash(newBlock), newBlock.header.difficulty);
		console.log("Invalid difficulty");
		return false;
	}
	return true;
}

function isValidChain(newBlocks) {
	if (JSON.stringify(newBlocks[0]) !== JSON.stringify(Blocks[0])){
		return false
	}
	let tempBlocks = [newBlocks[0]]
	for (let i = 1; i < newBlocks.length; i++) {
		if (isValidNewBlock(newBlocks[i], newBlocks[i-1])) {
			tempBlocks.push(newBlocks[i]);
		} else {
			return false;
		}
	}
	return true;
}

function addBlock(newBlock) {
	if (isValidNewBlock(newBlock, getLastBlock())) {
		console.log("difficulty: ", newBlock.header.difficulty);
		console.log("previousBlockHash: ", newBlock.header.previousBlockHash);
		console.log("nonce: ", newBlock.header.nonce);
		console.log("timestamp: ", newBlock.header.timestamp);
		Blocks.push(newBlock);
		return true;
	}
	return false;
}

function replaceChain(newBlocks) {
	if (isValidChain(newBlocks)) {
		if (
			newBlocks.length > Blocks.length ||
			(newBlocks.length === Blocks.length && random.bloolean())
		) {
			Blocks = newBlocks;
			broadcast(responseLastestMasg());
		}
	} else {
		console.log("Error occurred on ledger");
	}
}

// const Block = nextBlock(['new Transaction'])
// addBlock(Block)
// console.log(Block);                                                     
// Blocks.forEach((block) => {
//   console.log(isValidBlockStructure(block));
// })

module.exports = { addBlock, isValidNewBlock, isValidBlockStructure };
