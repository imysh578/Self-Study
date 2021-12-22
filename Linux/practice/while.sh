#!/bin/bash

number=0
while [ $number -le 2 ]
do
	echo "Number: ${number}"
	((number++))
done
