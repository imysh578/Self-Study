/*********************/
/*** merkleTree.js ***/
/*********************/

// Import modules
const { MerkleTree } = require("merkletreejs");
const SHA256 = require("crypto-js/sha256");

// Check output of SHA256()
// console.log("SHA256('a') : ", SHA256("a"));
// console.log("SHA256('a').toString() : ", SHA256("a").toString());

// Create an array and convert it into hash using SHA256
const testSet = ["a", "b", "c", "d", "e"];
const testArray = testSet.map((v) => SHA256(v).toString());
// console.log(testArray)

// Create a merkleTree of testArray
const testMerkleTree = new MerkleTree(testArray, SHA256);
// console.log("testMerkleTree : ", testMerkleTree);

// Get merkleRoot
const merkleRoot = testMerkleTree.getRoot();
// console.log("merkleRoot : ", merkleRoot);

// Verify valid hash, 'a'
const testValue_valid = "a";
const leaf_valid = SHA256(testValue_valid).toString();
const proof_valid = testMerkleTree.getProof(leaf_valid);
const result_valid = testMerkleTree.verify(proof_valid, leaf_valid, merkleRoot);
// console.log('leaf_valid : ', leaf_valid);
// console.log('proof_valid : ', proof_valid);
// console.log('result_valid : ', result_valid);

// Verify invalid hash, 'u'
const testValue_invalid = "u";
const leaf_invalid = SHA256(testValue_invalid).toString();
const proof_invalid = testMerkleTree.getProof(leaf_invalid);
const result_invalid = testMerkleTree.verify(proof_invalid, leaf_invalid, merkleRoot);
console.log('leaf_invalid : ', leaf_invalid);
console.log('proof_invalid : ', proof_invalid);
console.log('result_invalid : ', result_invalid);