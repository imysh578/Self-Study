import ecdsa from "elliptic";
const ec = new ecdsa.ec("secp256k1");

class TxOut {
  public address: string;
  public amount: number;

  constructor (address: string, amount: number) {
    this.address = address;
    this.amount = amount;
  }
}

class TxIn {
  public txOutId: string;
  public txOutIndex: number;
  public signature: string;
}

class Transaction {
  public id: string;
  public txIns: TxIn[];
  public txOuts: TxOut[];
}

class UnspentTxOut {
  public readonly txOutId: string;
  public readonly txOutIndex: number;
  public readonly address: string;
  public readonly amount: number;

  constructor(txOutId: string, txOutIndex: number, address: string, amount: number) {
    this.txOutId = txOutId;
    this.txOutIndex = txOutIndex;
    this.address = address;
    this.amount = amount;
  }

  static unspentTxOuts: UnspentTxOut[] = [];
}


const getTransactionId = (transaction: Transaction): string => {
  const txInContent: string = transaction.txIns
		.map((txIn: TxIn) => txIn.txOutId + txIn.txOutIndex)
		.reduce((a, b) => a + b, "");
  
  const txOutContent: string = transaction.txOuts
		.map((txOut: TxOut) => txOut.address + txOut.amount)
		.reduce((a, b) => a + b, "");
  
  return CryptoJS.SHA256(txInContent + txOutContent).toString();
}

const signTxIn = (transaction: Transaction, txInIndex: number, privateKey: string, aUnspentTxOuts: UnspentTxOut[]): string => {
  const txIn: TxIn = transaction.txIns[txInIndex];
  const dataToSign = transaction.id;
  const referenceUnspentTxOut: UnspentTxOut = findUnspentTxOut(txIn.txOutId, txIn.txOutIndex, aUnspentTxOuts);
  const referenceAddress = referenceUnspentTxOut.address;
  const key = ec.keyFromPrivate(privateKey, 'hex');
  const signature: string = toHexString(key.sign(dataToSign).toDER());
  return signature;
}

// Everytime new block is added, update transaction output lists
// Retrieve all new unspent transaction outputs from the new block
const newUnspentTxOuts: UnspentTxOut[] = newTransactions.map((t) => {
  return t.txOuts
		.map(
			(txOut, index) =>
				new UnspentTxOut(t.id, index, txOut.address, txOut.amount)
		)
		.reduce((a, b) => a.concat(b), []);
})

// Find which transaction outputs are consumed by new transactions of the block
const consumedTxOuts: UnspentTxOut[] = newTransactions
	.map((t) => t.txIns)
	.reduce((a, b) => a.concat(b), [])
	.map((txIn) => new UnspentTxOut(txIn.txOutId, txIn.txOutIndex, "", 0));

