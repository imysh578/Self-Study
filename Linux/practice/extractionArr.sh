#!/bin/bash

AA=(JAN FEB MAR APR MAY JUN)

echo "${AA[@]:2}"
echo "${AA[@]:0:2}"
echo "${AA[@]:2:3}"
