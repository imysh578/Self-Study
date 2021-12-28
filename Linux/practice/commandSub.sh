#!/bin/bash

today=$(date +%Y-%m-%d)
filename="file-${today}.txt"
touch ${filename}

echo "Hello World" > $filename
echo "End" >> $filename
echo "Last line is '$(tail -n 1 ${filename})'."

for result in $(cd ${HOME}; ls -al | grep bash)
do
	echo ${result}
done	
