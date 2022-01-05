/*****************/
/* encryption.js */
/*****************/

const fs = require("fs");
// ECDSA(Elliptic Curve Digital Signature Algorithm) : 타원 곡선 디지털 서명 알고리즘
// 영지식 증명?
const ecdsa = require("elliptic");
const ec = new ecdsa.ec("secp256k1");
// 비트 마다 0, 1을 랜덤하게 줌 => 256비트, 2^256 가지 경우의 수

const privateKeyLocation = "wallet/" + (process.env.PRIVATE_KEY || "default");
const privateKeyFile = privateKeyLocation + "/private_key";

function initWallet() {
	if (fs.existsSync(privateKeyFile)) {
		console.log("Exist wallet private key location : ", privateKeyFile);
		return;
	}
	if (!fs.existsSync("wallet/")) {
		fs.mkdirSync("wallet/");
	}
	if (!fs.existsSync(privateKeyLocation)) {
		fs.mkdirSync(privateKeyLocation);
	}
	const newPrivateKey = generatePrivateKey();
	fs.writeFileSync(privateKeyFile, newPrivateKey);
	console.log("New wallet private key location : ", privateKeyFile);
}

function generatePrivateKey() {
	const keyPair = ec.genKeyPair();
	const privateKey = keyPair.getPrivate();
	return privateKey.toString(16);
}

function getPrivateKeyFromWallet(){
  const buffer = fs.readFileSync(privateKeyFile, "utf8");
  return buffer.toString();
}

function getPublicKeyFromWallet(){
  const privateKey = getPrivateKeyFromWallet();
  const key = ec.keyFromPrivate(privateKey, "hex");
  return key.getPublic().encode("hex");
}

module.exports = { initWallet, getPublicKeyFromWallet };
