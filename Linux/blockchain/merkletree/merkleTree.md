![](https://images.velog.io/images/imysh578/post/016ec14b-4cd9-49d4-aa36-fb60ee50a9b8/image.png)
# 머클 트리 개념
머클 트리에 대한 개념은 [`네이버 블로그`](https://blog.naver.com/yse1030/222609084028)에 간단하게 작성해두었습니다.
이 단어를 처음 듣는 분은 [링크](https://blog.naver.com/yse1030/222609084028)를 클릭하여 가볍게 읽고 오시는 것을 추천드립니다.
<br>

# 머클 트리 코드로 구현하기
## 1. 개발 환경
- `Ubuntu-20.04`
<br>

## 2. 사용한 언어
- `Javascript`
<br>

## 3. 사용 모듈
- [`merkletreejs`](https://www.npmjs.com/package/merkletreejs) : 머클 트리 생성 및 검증 메서드 제공
- [`crypto-js`](https://www.npmjs.com/package/crypto-j) : SHA256, AES 등의 여러 암호화 메서드 제공
<br>

## 4. 전체 소스 코드
- [`githup`](https://github.com/imysh578/Self-Study/tree/main/Linux/blockchain/merktree) 에 올려두었습니다.
[github 링크](https://github.com/imysh578/Self-Study/tree/main/Linux/blockchain/merktree)
<br>

## 5. 구현 목표
머클 트리가 어떻게 생성되는지, 그리고 어떤 방식으로 검증이 되는지 알아보기.
<br>

## 6. 구현 과정
### 1) 필요한 모듈 설치하기
```
$ npm i merkletreejs crypto-js
```
### 2) SHA256 암호화 사용해보기
```
// Import modules
const SHA256 = require("crypto-js/sha256");

// Check output of SHA256()
console.log("SHA256('a') : ", SHA256("a"));
console.log("SHA256('a').toString() : ", SHA256("a").toString());
```
![](https://images.velog.io/images/imysh578/post/f3cd3394-a004-4fe2-9e87-55798886bee9/image.png)  
`crypto-js`의 `SHA256`함수의 출력값을 보면 우리가 원하는 64자리의 16진수가 안나온다.
`toString()` 함수를 사용하면 원하는 형태의 해시값이 출력된다.

이를 활용해서 테스트 할 배열을 만들고 내부 요소들을 모두 해시화 한다.
```
// Create an array and convert it into hash using SHA256
const testSet = ['a', 'b', 'c', 'd', 'e']
const testArray = testSet.map((v) => SHA256(v).toString());
console.log(testArray)
```
![](https://images.velog.io/images/imysh578/post/9e7eeff5-f1c2-4869-9a5b-254982182171/image.png)  
<br>

### 3) 머클 트리 만들기
위에서 만든 테스트 배열을 이용해서 머클 트리를 만들어보자.
```
// Import modules
const SHA256 = require("crypto-js/sha256");
const { MerkleTree } = require("merkletreejs");

...

// Create a merkleTree of testArray
const testMerkleTree = new MerkleTree(testArray, SHA256);
console.log("testMerkleTree : ", testMerkleTree);

// Get merkleRoot
const merkleRoot = testMerkleTree.getRoot();
console.log("merkleRoot : ", merkleRoot);
```
![](https://images.velog.io/images/imysh578/post/c9c010ae-8477-4c9f-8e60-21471516192d/image.png)  

출력된 값을 보면 아래의 정보들이 존재한다.
- `leaves` : 자식 노드가 없는 최하단 노드들
- `layers` : 각 레이어에 존재하는 노드들을 나타냄, 제일 마지막 레이어(원래는 최상단 노드)에 `Merkle Root`가 있음을 알 수 있다.
<br>

### 4) 검증해보기
마지막으로 위에서 만든 머클 트리에 속한 값인지 아닌지 검증해보자.
#### 4-1) 머클 트리에 존재하는 값 검증
```
...

// Verify valid hash, 'a'
const testValue_valid = "a";
const leaf_valid = SHA256(testValue_valid).toString();
const proof_valid = testMerkleTree.getProof(leaf_valid)
const result_valid = testMerkleTree.verify(proof_valid, leaf_valid, merkleRoot)
console.log('leaf_valid : ', leaf_valid);
console.log('proof_valid : ', proof_valid);
console.log('result_valid : ', result_valid);
```
![](https://images.velog.io/images/imysh578/post/b2dc730d-4c86-410d-ad17-08a935bbfcd6/image.png)  
`proof_valid` 값을 보면 어떤 순서로 어느 값과 비교를 진행했는지 알 수 있다.
`leaves`가 홀수인 경우엔 아래 그림처럼 진행된다.
![](https://images.velog.io/images/imysh578/post/3d298c90-22e9-4721-8c2a-2467f7cf5515/image.png)  
자세한 내용은 [Verifiable data structures](https://transparency.dev/verifiable-data-structures/)를 참고하자.

<br>

#### 4-2) 머클 트리에 존재하지 않는 값 검증
```
...

// Verify invalid hash, 'u'
const testValue_invalid = "u";
const leaf_invalid = SHA256(testValue_invalid).toString();
const proof_invalid = testMerkleTree.getProof(leaf_invalid);
const result_invalid = testMerkleTree.verify(proof_invalid, leaf_invalid, merkleRoot);
console.log('leaf_invalid : ', leaf_invalid);
console.log('proof_invalid : ', proof_invalid);
console.log('result_invalid : ', result_invalid);
```
![](https://images.velog.io/images/imysh578/post/ddc7e588-a7c2-4e77-a937-c42a064a9a91/image.png)
존재하지 않는 값이므로 `proof`는 비어있는 배열을,`result`는 false를 반환한다.
<br>



## 7. 마무리
직접 알고리즘을 짜본 건 아니지만, 모듈을 활용해서 머클 트리가 어떻게 검증되는지 이해할 수 있었다.
이를 통해서 블록체인에서는 각각의 `Peer`가 모든 트랜잭션 데이터를 갖고 있지 않아도, 효율적인 검증이 가능하다는 것이 어떤 뜻인지 조금은 알 것 같다.
앞으로 활용방법에 대해서 더 공부해야겠다.
