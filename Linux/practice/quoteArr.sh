#!/bin/bash

# withoud quotes

AA=( "JAN     FEB" "MAR     APR" "MAY     JUN" )
echo "#AA[@] : ${#AA[@]}"
echo "AA[@] : ${AA[@]}"
echo

echo "#AA[*] : ${#AA[*]}"
echo "AA[*] : ${AA[*]}"
echo

echo "AA[@] Elements"
for v in ${AA[@]}; do echo "$v"; done
echo

echo "AA[*] Elements"
for v in ${AA[*]}; do echo "$v"; done
echo

# with quotes
echo '"AA[@]"' : "${AA[@]}"
echo

echo '"AA[*]"' : "${AA[*]}"
echo

echo '"AA[@]" Elements'
for v in "${AA[@]}"; do echo "$v"; done
echo

echo '"AA[*]" Elements'
for v in "${AA[*]}"; do echo "$v"; done   
