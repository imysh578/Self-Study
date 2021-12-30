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
  "mineBlock") 
    # Set option values
    for option in ${options[@]}
    do
    case $option in
    -k) key="${options[$j+1 | bc]}"
      ;;
    -v) value="${options[$j+1 | bc]}"
      ;;
    -p) port=${options[$j+1 | bc]}
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
    # Set option values
    for option in ${options[@]}
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
esac






