## commands
- restartServer
  ```sh
  kill -9 `ps -ef | grep httpServer.js | grep node | awk '{print $2}'`
  ```

- addPeers
  ```sh
  curl -H "Content-type:application/json" --data '{"data" : ["ws://localhost:6002", "ws://localhost:6003"]}' http://localhost:$port/addPeers
  ```
  `-p` port
  
- peers
  ```sh
  curl -X GET http://localhost:${port}/peers  | python3 -m json.tool
  ```
  `-p` port

- mineBlock 
  ```sh 
  curl -H "Content-type:application/json" --data "{\"$key\" : [\"$value\"]}" http://localhost:${port}/mineBlock 
  ```
  `-k` key of data  
  `-v` value of value  
  `-p` port  

- blocks
  ```sh 
  curl -X GET http://localhost:${port}/blocks | python3 -m json.tool 
  ```
  `-p` port

- initWallet
  ```sh 
  curl -X GET http://localhost:${port}/initWallet
  ```
  `-p` port

- address
  ```sh 
  curl -X GET http://localhost:${port}/address | python3 -m json.tool 
  ```
  `-p` port


## How to use?
```sh
./command.sh [mainCommand] [option] [value]
```
