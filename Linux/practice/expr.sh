#!/bin/bash

# expr
# basic operator
A=3
B=4
C=`expr $A + $B`
D=`expr $A \* $B`
E=`expr $A / $B`
F=`expr $A % $B`

echo $C
echo $D
echo $E
echo $F
echo

# boolean operator
G=`expr 1 \& 1`
H=`expr 0 \& 1`
I=`expr 0 \& 0`
J=`expr 1 \| 1`
K=`expr 0 \| 1`
L=`expr 0 \| 0`

echo $G
echo $H
echo $I
echo $J
echo $K
echo $L
