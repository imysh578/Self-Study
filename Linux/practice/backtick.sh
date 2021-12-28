#!/bin/bash

echo "This script name is `basename $0`"

# using variable
lsal_backtick=`ls -al | grep backtick`
echo "Output of 'ls -al | grep backtick' : $lsal_backtick"
echo

# for loop
echo "'for loop output'"
for filename in `cd ${HOME}; ls -al | grep bash`
do
	echo $filename
done

