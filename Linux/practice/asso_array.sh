#!/bin/bash

declare -A EE

var=ef
EE=([0]=11 [1]="hello array" [$var]=22)

key1=foo key2=bar key3=zoo value=100
EE[$key1,$key2,$key3]=$value

echo "EE : $EE"
echo "EE[*] : ${EE[*]}"
echo "EE[foo,bar,zoo] : ${EE[foo,bar,zoo]}"
echo "EE[key1,key2,key3]: ${EE[$key1,$key2,$key3]}"
