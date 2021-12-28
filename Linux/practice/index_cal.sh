#!/bin/bash

# indexed array
AA=(00 11 22 33 44 55)
idx=2

echo "AA[idx] : ${AA[idx]}"
echo "AA[idx+1] : ${AA[idx+1]}"
echo "AA[idx == 2 ? 3 : 4] : ${AA[idx == 2 ? 3 : 4]}"

# associative array
declare -A CC
CC[$(echo aaa)]=100
CC[ $(echo aaa)]=200
CC[ $(echo aaa) ]=300

declare -p CC
