#!/bin/bash

AA=( "Straw Berry" Apple Banana )
AA=( "${AA[@]}" Grape Pear )
echo "${AA[@]}"
echo

BB=( 11 22 33 )
echo num of BB : ${#BB[@]}
echo "${BB[@]}"
echo

BB+=( 44 )
echo num of BB : ${#BB[@]}
echo "${BB[@]}"
echo

declare -A CC=( [aa]=11 [bb]=22 [cc]=33 )
echo num of CC : ${#CC[@]}
echo "${CC[@]}"
echo

CC+=( [dd]=44 )
echo num of CC : ${#CC[@]}
echo "${CC[@]}"
