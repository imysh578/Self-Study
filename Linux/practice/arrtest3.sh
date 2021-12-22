#!/bin/bash

# append 1 element
NUMBER=(1 2 3 4)
echo ${NUMBER[*]}

NUMBER+=(5)
echo ${NUMBER[*]}
echo

# append serveral elements
NUMBER+=(6 7 8 9 10)
echo ${NUMBER[*]}
echo

# append variable's value
COMMAND=("ls" "pwd" "ps" "clear")
echo ${COMMAND[*]}
ELEMENT="123 456"
COMMAND+=($ELEMENT)
echo ${COMMAND[*]}

