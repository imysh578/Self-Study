#!/bin/bash

a=0

until [ $a -ge 10 ]
do
	echo $a
	a=`expr $a + 1`
done
