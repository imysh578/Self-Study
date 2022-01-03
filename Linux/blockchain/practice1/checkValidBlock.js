// 블록 구조가 유효한지
// 현재 블록의 인덱스 === 이전 블록의 인덱스 + 1
// 이전 블록 해시값과 현재 블록의 이전 해시가 같은지
const {createHash, getLastBlock, nextBlock, Blocks} = require('./chainedBlock.js')
const merkle = require("merkle");

function isValidBlockStructure(block) {
	return (
		typeof block.header.version === "string" &&
		typeof block.header.index === "number" &&
		typeof block.header.previousBlockHash === "string" &&
		typeof block.header.timestamp === "number" &&
		typeof block.header.merkleRoot === "string" &&
		typeof block.body === "object"
	);
}

function isValidNewBlock(newBlock, previousBlock) {
	if (isValidBlockStructure(newBlock) === false) {
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
			(merkle("sha256").sync(newBlock.body).root() !==
				newBlock.header.merkleRoot))
	) {
    console.log('Invalid merkleRoot');
    return false;
	}
	return true;
}

function addBlock(newBlock) {
  if (isValidNewBlock(newBlock, getLastBlock())) {
    Blocks.push(newBlock);
    return true;
  }
  return false;
}

// const Block = nextBlock(['new Transaction'])
// addBlock(Block)
// console.log(Block);
// Blocks.forEach((block) => {
//   console.log(isValidBlockStructure(block)); 
// })

module.exports = {addBlock, isValidNewBlock, isValidBlockStructure}