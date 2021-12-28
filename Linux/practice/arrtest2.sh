#!/bin/bash

VAR="redhat debian gentoo darwin"
DISTRO=($VAR)
echo ${DISTRO[1]}

TODAY=(`date`)
echo ${TODAY[3]}

INFO=(`uname -a`)
echo ${INFO[0]}
