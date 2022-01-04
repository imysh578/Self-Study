#!/bin/bash

# main command (eg. blocks, mineBlock, ...)
command=$1

# Init parameters
port=3001
key="data"
value="empty"

# Put params into options list
params=$@
i=0
for param in ${params[@]}
do
options[$i]=$param
((i++))
done


# Options for Each command
j=0
case "$command" in
  "restartServer")
    # kill existed http server and start http server on background
    kill -9 `ps -ef | grep httpServer.js | grep node | awk '{print $2}'`
node httpServer.js &
    ;;
    
  "addPeers")
    # Add peers(6001, 6002)
    for option in ${options[@]}
    ## Set option values
    do
    case $option in
    -p) port=${options[$j+1 | bc]}
      echo "port is $port"
      ;;
    --help)
      echo "usage: [-p port]"
      exit 1 
      ;;
    esac
    ((j++))
    done
    curl -H "Content-type:application/json" --data '{"data" : ["ws://localhost:6002", "ws://localhost:6003"]}' http://localhost:$port/addPeers
    ;;

  "peers")
    for option in ${options[@]}
    ## Set option values
    do
    case $option in
    -p) port=${options[$j+1 | bc]}
      echo "port is $port"
      ;;
    --help)
      echo "usage: [-p port]"
      exit 1 
      ;;
    esac
    ((j++))
    done
    curl -X GET http://localhost:${port}/peers  | python3 -m json.tool
    ;;

  "mineBlock") 
    # create block with body data
    # body data format : {key: [value]}
    for option in ${options[@]}
    ## Set option values
    do
    case $option in
    -k) key="${options[$j+1 | bc]}"
      echo "key is $key"
      ;;
    -v) value="${options[$j+1 | bc]}"
      echo "value is $value"
      ;;
    -p) port=${options[$j+1 | bc]}
      echo "port is $port"
      ;;
    --help)
      echo "usage: [-k key] | [-v value] | [-p port]"
      exit 1 
      ;;
    esac
    ((j++))
    done
    curl -H "Content-type:application/json" --data "{\"$key\" : [\"$value\"]}" http://localhost:${port}/mineBlock
    ;;

  "blocks") 
    # Get all blocks
    for option in ${options[@]}
    ## Set option values
    do
    case $option in
    -p) port=${options[$j+1 | bc]}
      echo "port is $port"
      ;;
    --help)
      echo "usage: [-p port]"
      exit 1 
      ;;
    esac
    ((j++))
    done
    curl -X GET http://localhost:${port}/blocks | python3 -m json.tool
    ;;

    "address") 
    # Get wallet's address
    for option in ${options[@]}
    ## Set option values
    do
    case $option in
    -p) port=${options[$j+1 | bc]}
      echo "port is $port"
      ;;
    --help)
      echo "usage: [-p port]"
      exit 1 
      ;;
    esac
    ((j++))
    done
    curl -X GET http://localhost:${port}/address | python3 -m json.tool
    ;;

    "initWallet") 
    # Init wallet
    for option in ${options[@]}
    ## Set option values
    do
    case $option in
    -p) port=${options[$j+1 | bc]}
      echo "port is $port"
      ;;
    --help)
      echo "usage: [-p port]"
      exit 1 
      ;;
    esac
    ((j++))
    done
    curl -X GET http://localhost:${port}/initWallet
    ;;
esac






