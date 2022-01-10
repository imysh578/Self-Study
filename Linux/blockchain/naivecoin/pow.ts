import { Block, BlockHeader } from "./blockStructure";
import { calculateHashOfBlock } from "./encryptions";

const BLOCK_GENERATION_INTERVAL: number = 10;
const DIFFICULTY_ADJUSTMENT_INTERVAL: number = 10;

const hasMatchesDifficulty = (hash: string, difficulty: number): boolean => {
  const requirePrefix: string = "0".repeat(difficulty);
  return hash.startsWith(requirePrefix);
}

const findBlock = (block: Block): Block=> {
  let nonce = 0;  
  while(true) {    
    const hash: string = calculateHashOfBlock(block.header);
    if (hasMatchesDifficulty(hash, block.header.difficulty)){
      return block
    }
    nonce++;
    block.header.nonce = nonce;
  }
}

const getDifficulty = (aBlockchain: Block[]): number => {
  const newBlock: Block = aBlockchain[Block.blockchain.length - 1];
  if(newBlock.header.index % DIFFICULTY_ADJUSTMENT_INTERVAL === 0 && newBlock.header.index !== 0) {
    return getAdjustedDifficulty(newBlock, aBlockchain);
  } else {
    return newBlock.header.difficulty;
  }
}

const getAdjustedDifficulty = (newBlock: Block, aBlockchain: Block[]): number => {
  const prevAdjustmentBlock: Block = aBlockchain[Block.blockchain.length - DIFFICULTY_ADJUSTMENT_INTERVAL];
  const timeExpected: number = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL;
  const timeTaken: number = newBlock.header.timestamp - prevAdjustmentBlock.header.timestamp;
  if(timeTaken < timeExpected/2) {
    return prevAdjustmentBlock.header.difficulty + 1;
  } else if(timeTaken > timeExpected*2) {
    return prevAdjustmentBlock.header.difficulty - 1;
  } else {
    return prevAdjustmentBlock.header.difficulty;
  }
}

export { findBlock, getDifficulty, getAdjustedDifficulty }