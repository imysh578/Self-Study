#!/bin/bash

PS3="Enter a number: "

names=( Hulk Tony Wanda Hawkeye BlackWidow )

select name in ${names[@]}
do
	echo Selected Name: $name
	echo number : $REPLY
done
