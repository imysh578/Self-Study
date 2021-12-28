#!/bin/bash

AA=(00 11 22 33 44)

unset "AA[2]"
echo num of AA : ${#AA[@]}
echo

for v in ${AA[@]}; do echo $v; done
echo

echo ${AA[1]}, ${AA[2]}, ${AA[3]} # AA[2] is empty
echo

# reassign Array AA
AA=("${AA[@]}")
echo ${AA[1]}, ${AA[2]}, ${AA[3]}
