import { brotliDecompressSync } from "zlib";
import {getVersion} from "./utils"

class Block {
	public header: object;
	public body: object;
	public hash: string;
	constructor(header: object, body: object, hash: string) {
		this.header = header;
		this.body = body;
		this.hash = hash;
	}
}

class BlockBody {
	public magicNumber: string;
	public blockSize: number;
	public txCount: number;
	public txLists: string[];

	constructor(
		magicNumber: string,
		blockSize: number,
		txCount: number,
		txLists: string[],
	) {
    this.magicNumber = magicNumber;
    this.blockSize = blockSize;
    this.txCount = txCount;
    this.txLists = txLists;
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



export {Block, BlockBody, BlockHeader}