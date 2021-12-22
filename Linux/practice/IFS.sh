#!/bin/bash

ifs_backup=IFS
IFS=,

echo "@ : IFS not applied => $@"
echo "* : IFS applied => $*"
