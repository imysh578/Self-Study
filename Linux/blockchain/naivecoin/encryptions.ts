import {Block, BlockHeader} from "./blockStructure"
import * as cryptojs from "crypto-js"

function getSHA256Of (header: BlockHeader) {
  if (typeof header === "object") {
    const blcokString: string =
			header.version +
			header.index +
			header.prevHash +
			header.timestamp +
			header.difficulty +
			header.nonce;
    const hash = cryptojs.SHA256(blcokString).toString();
    
    return hash;
  } else {
    console.log("Invalid type of Block Header");
    return "null";
  }
}

export {getSHA256Of}