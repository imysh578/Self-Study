import { getVersion } from "./utils";

class Block {
	public magicNumber: string;
	public blockSize: number;

	public header: BlockHeader;

	public txCounter: number;
	public txLists: object[];
	public hash: string;
	constructor(
		magicNumber: string,
		blockSize: number,
		header: BlockHeader,
		txCounter: number,
		txLists: object[],
		hash: string
	) {
		this.header = header;
		this.magicNumber = magicNumber;
		this.blockSize = blockSize;
		this.txCounter = txCounter;
		this.txLists = txLists;
		this.hash = hash;
	}
}

class BlockHeader {
	public version: string;
	public index: number;
	public prevHash: string;
	public timestamp: number;
	public difficulty: number;
	public nonce: number;

	constructor(
		version: string,
		index: number,

		prevHash: string,
		timestamp: number,
		difficulty: number,
		nonce: number
	) {
		this.version = version;
		this.index = index;
		this.prevHash = prevHash;
		this.timestamp = timestamp;
		this.difficulty = difficulty;
		this.nonce = nonce;
	}
}

export { Block,  BlockHeader };
