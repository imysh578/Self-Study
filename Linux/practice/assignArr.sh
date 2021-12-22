#!/bin/bash

Array=(00 11 22)

Array1=${Array[@]}

echo "#Array1: " ${#Array1[@]} 
echo Array1[0]: ${Array1[0]}
echo Array1[1]: ${Array1[1]}
echo Array1[@]: ${Array1[@]}
echo

Array2=("${Array[@]}")
echo "#Array2: " ${#Array2[@]}
echo Array2[0]: ${Array2[0]}
echo Array2[1]: ${Array2[1]}
echo Array2[@]: ${Array2[@]}
