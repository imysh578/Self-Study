import { createGenesisBlock, createNextBlock, } from "./utils";
import { isValidNewBlock } from "./validataions";

class Block {
	public magicNumber: string;
	public blockSize: number;
	public txCounter: number;
	public txLists: object[];

	public header: BlockHeader;
	public hash: string;
	constructor(
		magicNumber: string,
		blockSize: number,
		header: BlockHeader,
		txCounter: number,
		txLists: object[],
		hash: string
	) {
		this.magicNumber = magicNumber;
		this.blockSize = blockSize;
		this.header = header;
		this.txCounter = txCounter;
		this.txLists = txLists;
		this.hash = hash;
	}

	static getGenesisBlock(): Block {
		return createGenesisBlock();
	}

	// create blockchain
	static blockchain: Block[] = [];

	// get last block
	static lastBlock = () => {
		return this.blockchain.slice(-1)[0];
	}

	// get next block
	static nextBlock = (txLists: object[]) => {
		return createNextBlock(txLists)
	}

	// add new block
	static addBlock(newBlock: Block) {
		if (isValidNewBlock(newBlock, Block.lastBlock())) {
			this.blockchain.push(newBlock);
		}
	}
}

class BlockHeader {
	public version: string;
	public index: number;
	public prevHash: string;
	public merkleRoot: string;
	public timestamp: number;
	public difficulty: number;
	public nonce: number;

	constructor(
		version: string,
		index: number,
		prevHash: string,
		merkleRoot: string,
		timestamp: number,
		difficulty: number,
		nonce: number
	) {
		this.version = version;
		this.index = index;
		this.prevHash = prevHash;
		this.merkleRoot = merkleRoot;
		this.timestamp = timestamp;
		this.difficulty = difficulty;
		this.nonce = nonce;
	}
}

export { Block,  BlockHeader };
