#!/bin/bash

AA=(11 "hello array" 22)
BB=(/usr/bin/x* /usr/bin/y*)

var=2
CC=([0]=11 [1]="hello array" [var]=22)


DD[0]=11
DD[1]="hello array"
DD[var]=22

echo "AA{*} : ${AA[*]}"
echo "BB{*} : ${BB[*]}"
echo "CC{*} : ${CC[*]}"
echo "DD{*} : ${DD[*]}"
echo "DD : $DD"
echo "DD[1] : ${DD[1]}"
