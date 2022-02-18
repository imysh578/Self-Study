const Web3 = require("web3");
const fs = require("fs");

const ABI = JSON.parse(
	fs.readFileSync("./contracts_Voting_sol_VotingTest.abi").toString()
);

const BYTECODE = fs.readFileSync("./contracts_Voting_sol_VotingTest.bin").toString();

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");


const initVoting = async () => {
  const accounts = await getAccounts()
  const votingContract = await deployContract(accounts[0], ABI, BYTECODE);
  
  votingContract.methods.getMyVoteRight().call().then(console.log);
}

const getAccounts = async () => {
  const accounts = await web3.eth.getAccounts();                              // getAccounts()  : account 목록 불러움
  return accounts;
}

const deployContract = async (account, abi, bytecode) => {
	const compliedContract = await new web3.eth.Contract(abi);                  // Contract(abi) : abi로 compile된 Contract를 불러옴
	const deployedContract = await compliedContract
    .deploy({ data: bytecode })                                               // deploy()      : EVM으로 실행할 수 있도록 bytecode를 넣어줌
		.send({                                                                   // send()        : Contract 생성 정보를 담은 트랜잭션을 보냄
			from: account,
			gas: 1500000,
			gasPrice: 3000000000,
		})
    /**
     * on()     
     * : send()로 생성된 트랜잭션에 대한 이벤트 핸들링
     * 
     * - 사용 방법 : on("event_name", callback())
     * - event 종류
     *    1. transactionHash : transaction의 Hash값 반환
     *    2. receipt : 채굴 후 Transaction receipt를 반환
     *    3. confirmation" : 채굴 후 Transaction confirmation Number와 receipt를 반환
     */
    // .on("transactionHash", console.log )
		// .on("receipt", (receipt) => {
		// 	console.log(receipt);
    // })
    // .on("confirmation", (confirmationNumber, receipt) => {
    //   console.log(confirmationNumber);
    //   console.log(receipt);
    // })
    .then(newContractInstance => newContractInstance);
  
  return deployedContract;
}; 

initVoting();

