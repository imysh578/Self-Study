package main

import (
	"bytes"

	"log"
	"math/big"
	"strings"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
)

func main() {
	ABI := `[{      "anonymous": false,      "inputs": [        {          "indexed": false,          "name": "from",          "type": "address"        },        {          "indexed": false,          "name": "to",          "type": "address"        },        {          "indexed": false,          "name": "value",          "type": "uint256"        }      ],      "name": "Transfer",      "type": "event"    }]`
	tokenAbi, err := abi.JSON(strings.NewReader(ABI))
	var logData []byte = common.Hex2Bytes("0000000000000000000000007043beb2f0f9544392aa2b69fb7d3ffa93ae0b67000000000000000000000000dfd152d47e50a23a733b8d0ed6dd060b98226bcc0000000000000000000000000000000000000000000000000000000005f5e100")
	var transferEvent struct {
		From  common.Address
		To    common.Address
		Value *big.Int
	}

	log.Println("Event:", tokenAbi.Events["Transfer"])
	buff := new(bytes.Buffer)
	buff.Write(logData)
	err = tokenAbi.UnpackIntoInterface(&transferEvent, "Transfer", buff.Bytes())
	if err != nil {
		log.Println(err)
		log.Println("Failed to unpack")
	}

	log.Println("From:", transferEvent.From.Hex())
	log.Println("To:", transferEvent.To.Hex())
	log.Println("Value:", transferEvent.Value)
}
