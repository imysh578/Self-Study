#!/bin/bash

A=12
B=5

echo $A $B | awk '{print $1 + $2}'
echo $A $B | awk '{print $1 - $2}'
echo $A $B | awk '{print $1 * $2}'
echo $A $B | awk '{print $1 / $2}'
echo $A $B | awk '{print $1 % $2}'
