#!/bin/bash

# indexed array
ARR1=(00 11 22)

for idx in ${!ARR1[@]}; do
	echo ARR1 index : $idx, ARR1 value : "${ARR1[idx]}"
done
echo


# associative array
declare -A ARR2

ARR2=( [ab]=44 [cd]="array" [ef]=55 )

for idx in ${!ARR2[@]}; do
	echo ARR2 index : $idx, ARR2 value : "${ARR2[$idx]}"
done


