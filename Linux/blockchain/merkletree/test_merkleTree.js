// test_merkleTree.js

const {MerkleTree} = require('merkletreejs')

const SHA256 = require('crypto-js/sha256')
//console.log(SHA256('a').toString())

const testSet = ['a', 'b', 'c', 'd', 'e']
const testArray = testSet.map(v => SHA256(v).toString())

//console.log(testArray)

const testMerkleTree = new MerkleTree(testArray, SHA256)
//console.log(testMerkleTree)

// Get merkleRoot
const merkleRoot = testMerkleTree.getRoot()
//console.log(merkleRoot.toString('hex'))

// To verify hash 'a'
const testValue = 'a'
const leaf = SHA256(testValue)
const proof = testMerkleTree.getProof(leaf)
console.log(proof)

const result = testMerkleTree.verify(proof, leaf, merkleRoot)
console.log(result)

// To verify hash 'u'
const testValue_u = 'u'
const leaf_u = SHA256(testValue_u)
const proof_u = testMerkleTree.getProof(leaf_u)
console.log(proof_u)
const result_u = testMerkleTree.verify(proof_u, leaf_u, merkleRoot)
console.log(result_u)
