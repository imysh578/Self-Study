#!/bin/bash

A=12
B=34

echo "$A+$B" | bc
echo "$A-$B" | bc
echo "$A*$B" | bc
echo "$A/$B" | bc
echo "$A%$B" | bc

echo "scale=2; $A/$B" | bc
echo "scale=5; $A/$B" | bc
