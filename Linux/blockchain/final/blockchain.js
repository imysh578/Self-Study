/**
 * 블록의 생성, 검증, 합의 알고리즘 포함
 * 프로토콜 변경하려면 여기서 수정
 */

class BlockHeader{
  constructor(version, index, prevBlockHash, merkleRoot, timestamp, difficulty, nonce) {
    this.version = version,
    this.index = index,
    this.prevBlockHash = prevBlockHash
  }
}

class Block {

}

const blockchain = []