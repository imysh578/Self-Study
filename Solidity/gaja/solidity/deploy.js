const Web3 = require("web3");
const fs = require("fs");
const contractInfo = require ("./gacha.json");

const provider_ganache = new Web3.providers.HttpProvider("http://localhost:7545")
const web3 = new Web3(provider_ganache);
const gas = web3.utils.toWei("1.5", "Mwei"); // Mwei
const gasPrice = web3.utils.toWei("0.3", "Gwei"); // Mwei


async function deployContract () {
  // const provider_metamask = window.ethereum;
  let selectedAccount;
  await web3.eth.getAccounts().then(accounts => {
    selectedAccount = accounts[0];
    console.log(selectedAccount);
  });

  const gachaContract = new web3.eth.Contract(contractInfo.abi)
  await gachaContract.deploy({data: contractInfo.bytecode}).send({from: selectedAccount, gas, gasPrice}).on("receipt", (receipt) => {
    console.log(receipt.contractAddress)
    const data = {...contractInfo, "contractAddress": receipt.contractAddress}
    fs.writeFileSync("./gacha.json", JSON.stringify(data));
  });

}

deployContract();